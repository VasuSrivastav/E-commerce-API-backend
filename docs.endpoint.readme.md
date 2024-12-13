# E-Commerce Backend API Documentation

## Rate Limiting

All endpoints are rate-limited to 100 requests per 15 minutes per IP address. If the limit is exceeded, the server will respond with a 429 status code and the message "Too many requests, please try again later."

## Endpoints

# Vendor

### /api/vendors/register

**Description:** Register a new vendor.

**Method:** POST

**Request Body:**

```json
{
  "name": "string (min length: 3)",
  "email": "string (valid email)",
  "password": "string (min length: 6)"
}
```

**Responses:**

- **201 Created:** Vendor registered successfully.
  ```json
  {
    "message": "Vendor registered successfully"
  }
  ```
- **400 Bad Request:** Validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Enter a Valid name, min Length is 3",
        "param": "name",
        "location": "body"
      },
      {
        "msg": "Enter a Valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Enter a Valid password, min length is 6",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

##

### /api/vendors/login

**Description:** Login a vendor.

**Method:** POST

**Request Body:**

```json
{
  "email": "string (valid email)",
  "password": "string (not empty)"
}
```

**Responses:**

- **200 OK:** Login successful.
  ```json
  {
    "token": "JWT token"
  }
  ```
- **400 Bad Request:** Validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Enter a Valid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Invalid credential",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
- **404 Not Found:** Vendor not found.
  ```json
  {
    "message": "Vendor not found"
  }
  ```
- **401 Unauthorized:** Invalid credentials.
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

# Product

### /api/products

**Description:** Add a new product.

**Method:** POST

**Request Body:**

```json
{
  "name": "string (min length: 3)",
  "price": "number (not empty)",
  "stock": "number (not empty)"
}
```

**Responses:**

- **201 Created:** Product added successfully.
  ```json
  {
    "name": "Product name",
    "price": "Product price",
    "stock": "Product stock",
    "vendor": "Vendor ID",
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp",
    "__v": 0
  }
  ```
- **400 Bad Request:** Validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Enter a Valid product name, min Length is 3",
        "param": "name",
        "location": "body"
      },
      {
        "msg": "Enter a Valid price",
        "param": "price",
        "location": "body"
      },
      {
        "msg": "Enter a Valid Quantity",
        "param": "stock",
        "location": "body"
      }
    ]
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

##

### /api/products

**Description:** Get products.

**Method:** GET

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Number of products per page (default: 10)

**Responses:**

- **200 OK:** List of products.
  ```json
  [
    {
      "name": "Product name",
      "price": "Product price",
      "stock": "Product stock",
      "vendor": "Vendor ID",
      "createdAt": "Timestamp",
      "updatedAt": "Timestamp",
      "__v": 0
    }
  ]
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

##

### /api/products/:id

**Description:** Update a product.

**Method:** PUT

**Request Body:**

```json
{
  "name": "string (optional)",
  "price": "number (optional)",
  "stock": "number (optional)"
}
```

**Responses:**

- **200 OK:** Product updated successfully.
  ```json
  {
    "name": "Updated product name",
    "price": "Updated product price",
    "stock": "Updated product stock",
    "vendor": "Vendor ID",
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp",
    "__v": 0
  }
  ```
- **404 Not Found:** Product not found.
  ```json
  {
    "message": "Product not found"
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

##

### /api/products/:id

**Description:** Delete a product.

**Method:** DELETE

**Responses:**

- **200 OK:** Product deleted successfully.
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **404 Not Found:** Product not found.
  ```json
  {
    "message": "Product not found"
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

# Order

### /api/orders

**Description:** Add a new order.

**Method:** POST

**Request Body:**

```json
{
  "productId": "string (Product ID)",
  "quantity": "number (not empty)"
}
```

**Responses:**

- **201 Created:** Order added successfully.
  ```json
  {
    "product": "Product ID",
    "quantity": "Order quantity",
    "status": "Order status",
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp",
    "__v": 0
  }
  ```
- **400 Bad Request:** Validation errors.
  ```json
  {
    "message": "Product ID and quantity are required"
  }
  ```
- **404 Not Found:** Product not found.
  ```json
  {
    "message": "Product not found"
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

##

### /api/orders

**Description:** View orders.

**Method:** GET

**Responses:**

- **200 OK:** List of orders.
  ```json
  [
    {
      "product": {
        "name": "Product name",
        "price": "Product price",
        "stock": "Product stock",
        "vendor": "Vendor ID",
        "createdAt": "Timestamp",
        "updatedAt": "Timestamp",
        "__v": 0
      },
      "quantity": "Order quantity",
      "status": "Order status",
      "createdAt": "Timestamp",
      "updatedAt": "Timestamp",
      "__v": 0
    }
  ]
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```

##

### /api/orders/:id

**Description:** Update an order.

**Method:** PUT

**Responses:**

- **200 OK:** Order updated successfully.
  ```json
  {
    "product": "Product ID",
    "quantity": "Order quantity",
    "status": "shipped",
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp",
    "__v": 0
  }
  ```
- **404 Not Found:** Order not found.
  ```json
  {
    "message": "Order not found"
  }
  ```
- **500 Internal Server Error:** Server error.
  ```json
  {
    "error": "Error message"
  }
  ```
