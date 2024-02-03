const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();

exports.createInventory = onRequest({maxInstances: 10}, async (req, res) => {
  try {
    // Assuming you receive data in the request body
    const {name, brand, quantity, price} = req.body;
    // Validate that required fields are present
    if (!name || !brand || !quantity || !price) {
      return res.status(400).json({error:
        "Incomplete data. Please provide all required fields."});
    }
    // Create a reference to the Firestore collection
    const inventoryRef = admin.firestore().collection("inventory");
    // Add a new document to the collection
    const newInventoryItem = await inventoryRef.add({
      name,
      brand,
      quantity,
      price,
    });
    logger.info(`Inventory item created with ID: ${newInventoryItem.id}`);
    return res.status(201).json({id: newInventoryItem.id, message:
      "Inventory item created successfully."});
  } catch (error) {
    logger.error("Error creating inventory item:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

exports.getInventory = onRequest({maxInstances: 10}, async (req, res) => {
  try {
    // Extract item ID from URL parameters
    const itemId = req.query.id;

    // Validate that required fields are present
    if (!itemId) {
      return res.status(400).json({error: "Please provide the ID."});
    }

    // Create a reference to the Firestore collection
    const inventoryRef = admin.firestore().collection("inventory");

    // Retrieve inventory item by document ID
    const docSnapshot = await inventoryRef.doc(itemId).get();

    if (!docSnapshot.exists) {
      return res.status(404).json({error: "Inventory item not found."});
    }

    // Extract data from the document
    const docData = docSnapshot.data();

    return res.status(200).json({data: docData});
  } catch (error) {
    logger.error("Error retrieving inventory item:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});


exports.deleteInventory = onRequest({maxInstances: 10}, async (req, res) => {
  try {
    // Receive data in the request body
    const {id} = req.body;

    // Validate that the required field (ID) is present
    if (!id) {
      return res.status(400).json({
        error: "Incomplete data. Please provide the ID of the item to delete.",
      });
    }

    // Create a reference to the Firestore collection
    const inventoryRef = admin.firestore().collection("inventory");

    // Delete the inventory item by document ID
    const deleteResult = await inventoryRef.doc(id).delete();

    if (deleteResult && deleteResult.writeTime) {
      return res.status(200).json({
        message: `Inventory item with ID ${id} deleted successfully.`,
        deletedAt: deleteResult.writeTime.toDate(),
      });
    } else {
      return res.status(500).json({
        error: "Failed to delete inventory item. Please try again.",
      });
    }
  } catch (error) {
    logger.error("Error deleting inventory item:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

exports.updateInventory = onRequest({maxInstances: 10}, async (req, res) => {
  try {
    // Receive data in the request body
    const {id, name, brand, quantity, price} = req.body;

    // Validate that required fields are present
    if (!id) {
      return res.status(400).json({
        error: "Incomplete data. Please provide the ID of the item to update.",
      });
    }

    // Create a reference to the Firestore collection
    const inventoryRef = admin.firestore().collection("inventory");

    // Check if the inventory item exists
    const docSnapshot = await inventoryRef.doc(id).get();
    if (!docSnapshot.exists) {
      return res.status(404).json({error: "Inventory item not found."});
    }

    // Update the inventory item with the provided data
    const updateData = {
      name: name || docSnapshot.data().name,
      brand: brand || docSnapshot.data().brand,
      quantity: quantity || docSnapshot.data().quantity,
      price: price || docSnapshot.data().price,
    };

    await inventoryRef.doc(id).update(updateData);

    return res.status(200).json({
      message: `Inventory item with ID ${id} updated successfully.`,
      updatedAt: new Date(),
    });
  } catch (error) {
    logger.error("Error updating inventory item:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});