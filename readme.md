# E-commerce Backend API Project

## Overview

This project is an e-commerce backend system that provides APIs for managing products, orders, users, and other related functionalities.

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order management (CRUD operations)
- Cart management
- RESTful API design

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Express Validator for input validation
- Express Rate Limit for rate limiting
- Bcrypt for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ecommerce-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   `plaintext
    PORT=5002
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    `

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. The server will be running at `http://localhost:5002`.

## API Endpoints

- **User Routes**

  - `POST /api/users/register` - Register a new user
  - `POST /api/users/login` - Login a user
  - `GET /api/users/profile` - Get user profile

- **Product Routes**

  - `GET /api/products` - Get all products
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product by ID
  - `DELETE /api/products/:id` - Delete a product by ID

- **Order Routes**
  - `GET /api/orders` - Get all orders
  - `POST /api/orders` - Create a new order
  - `PUT /api/orders/:id` - Update an order by ID
  - `DELETE /api/orders/:id` - Delete an order by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact me.
