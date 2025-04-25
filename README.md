# Food Ordering App

This project is a full-stack food ordering application built with React on the frontend and Express.js/Node.js on the backend. It allows users to browse a menu, add items to their cart, place orders, and view their order history.  Admins can add new items to the menu.

## Installation

### Backend

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following:

   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

   Replace `<your_mongodb_uri>` with your MongoDB connection string and `<your_jwt_secret>` with a strong, secret key for JWT.


### Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## API Routes and Dummy JSON Responses

### Backend

**`/admin/additem` (POST)**

* **Request (Dummy JSON):**

```json
{
  "name": "Pepperoni Pizza",
  "category": "Pizza",
  "price": 12.99,
  "description": "Classic pepperoni pizza with mozzarella cheese.",
  "imageUrl": "https://example.com/pepperoni_pizza.jpg",
  "isAvailable": true
}
```

* **Response (Dummy JSON):**

```json
{
  "item": {
    "_id": "65127b78a3e1e57b477a0d01",
    "name": "Pepperoni Pizza",
    "category": "Pizza",
    "price": 12.99,
    "description": "Classic pepperoni pizza with mozzarella cheese.",
    "imageUrl": "https://example.com/pepperoni_pizza.jpg",
    "isAvailable": true,
    "createdAt": "2024-07-30T12:00:00.000Z",
    "updatedAt": "2024-07-30T12:00:00.000Z",
    "__v": 0
  }
}
```


**`/user/signup` (POST)**

* **Request (Dummy JSON):**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "password": "securepassword"
}
```

* **Response (Dummy JSON):**

```json
{
  "token": "your_jwt_token"
}
```

**`/user/signin` (POST)**

* **Request (Dummy JSON):**

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

* **Response (Dummy JSON):**

```json
{
  "msg": "Signin Success",
  "token": "your_jwt_token"
}
```

**`/user/menu` (GET)**

* **Response (Dummy JSON):**

```json
{
  "Pizza": [
    {
      "_id": "65127c1ea3e1e57b477a0d03",
      "name": "Margherita Pizza",
      "category": "Pizza",
      "price": 10.99,
      "description": "Simple and delicious margherita pizza.",
      "imageUrl": "https://example.com/margherita_pizza.jpg",
      "isAvailable": true
    }
  ],
  "Drinks": [
    {
      "_id": "65127c7ba3e1e57b477a0d05",
      "name": "Coke",
      "category": "Drinks",
      "price": 2.50,
      "description": "Refreshing cola.",
      "imageUrl": "https://example.com/coke.jpg",
      "isAvailable": true
    }
  ]
}
```

*Similar JSON responses can be crafted for other routes like `/user/addtoCart`, `/user/removefromCart`, `/user/order`, `/user/cart`, and `/user/`* (refer to codebase logic for expected data structure).


## Run Locally

### Backend

1. **Start the server:**

   ```bash
   npm run dev
   ```

This will start the backend server on port 3000.

### Frontend

1. **Start the development server:**

   ```bash
   npm run dev
   ```

This will start the frontend development server.  It typically runs on port 5173 and will automatically proxy API requests to your backend.
```
