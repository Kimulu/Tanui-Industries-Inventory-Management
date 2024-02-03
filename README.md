# Tanui Industries Project

This project utilizes Firebase Cloud Functions to offer convenient HTTP-triggered endpoints for efficient inventory management.

## Endpoints

### Create Inventory

- **Function URL:(https://createinventory-mzgijoedqq-uc.a.run.app)
- **HTTP Method:** POST
- **Example Usage (Postman):**
  ```json
  {
    "name": "item1",
    "brand": "brand1",
    "quantity": 10,
    "price": 20
  }

## Get Inventory

- **Function URL:(https://getinventory-mzgijoedqq-uc.a.run.app)
- **HTTP Method:** GET
- **Example Usage (Postman):**
  - **Params:**
    - ID: `yourItemId`

## Delete Inventory

- **Function URL:(https://deleteinventory-mzgijoedqq-uc.a.run.app)
- **HTTP Method:** POST
- **Example Usage (Postman):**
  ```json
  {
    "id": "yourItemId"
  }

  ## Update Inventory

- **Function URL:(https://updateinventory-mzgijoedqq-uc.a.run.app)
- **HTTP Method:** POST
- **Example Usage (Postman):**
  ```json
  {
    "id": "yourItemId",
    "name": "updatedItem",
    "brand": "updatedBrand",
    "quantity": 15,
    "price": 25
  }


  # References

- AI language models were utilized to optimize the retrieval of data using params in the `get` function.
- Youtube tutorials were referred to during the setup of the Firebase project.


  
