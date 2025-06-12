# Stationery Shop Application

The Stationery Shop application is a comprehensive web application built using Express and TypeScript to manage the operations of a stationery shop. It allows users to manage products, place orders, and track the total revenue from all orders. The application integrates with MongoDB using Mongoose for data storage and schema validation.

## Features

# Product Management

- Create a Product: Add new stationery products with details like name, brand, price, category, description, and stock quantity.

- Get All Products: Retrieve a list of all products or filter products based on search parameters (e.g., name, brand, category).

- Get a Specific Product: Fetch the details of a specific product by its ID.
- Update a Product: Modify the details of an existing product, such as price or quantity.
- Delete a Product: Remove a product from the inventory.

# Order Management

- Create an Order: Allow customers to place an order for a product by specifying their email, the product ID, quantity, and total price. The inventory is updated accordingly.

- Revenue Calculation: Calculate the total revenue generated from all orders using MongoDB's aggregation pipeline.

# Data Integrity

- The application uses Mongoose schema and zod validation to ensure that the data entered is valid (e.g., price must be a positive number, quantity cannot be negative, etc...).

## Installation

### Prerequisites

Ensure that the following software is installed on your machine:

- #### node.js
- #### mongoDB
- #### git

### Set Up the Project Locally

1. #### Clone the repository:

```bash
  git clone https://github.com/ZH-Jihan/Stationery_Shop_Project.git
```

2. #### Setup & run Project

```bash
  cd  Stationery_Shop_Project
  npm install
  npm run start:dev
```

The application should now be running on http://localhost:8000

## Demo

Github Link - https://github.com/ZH-Jihan/Stationery_Shop_Project.git.  
Live Server Link - https://store-stationery-project.vercel.app.

## Authors

- [@ZH Jihan](https://github.com/ZH-Jihan)

## 🚀 About Me

I'm a full stack developer...
