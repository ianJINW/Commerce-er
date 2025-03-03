# Commerce-er

This is a comprehensive eCommerce application built with Node.js, Express, Sequelize, and PostgreSQL. It includes features for user authentication, product management, shopping cart functionality, and order processing.

## Features

- **Authentication**: Secure user authentication using session-based login.
- **Products**: CRUD operations for product management.
- **Cart**: Add, update, and remove items from the shopping cart.
- **Order**: Create and view orders.
- **Database**: Sequelize ORM with PostgreSQL database.

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/ianJINW/Commerce-er.git
    cd Commerce-er
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following:

    ```
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=your_db_name
    SESSION_SECRET=your_session_secret
    ```

4. **Migrate and seed the database**

    ```bash
    npx sequelize db:migrate
    npx sequelize db:seed:all
    ```

5. **Start the server**

    ```bash
    npm start
    ```

    The application will be running at `http://localhost:8080`.

## Usage

### Authentication

- **Sign Up**: Create a new user account.
- **Login**: Access your account using email and password.
- **Logout**: End your session securely.

### Products

- **View Products**: Browse all available products.
- **Add Product**: (Admin only) Create a new product.


### Cart

- **Add to Cart**: Add products to your shopping cart.
- **Remove from Cart**: Remove items from the cart.

### Orders

- **Create Order**: Place an order with the items in your cart.
- **View Orders**: See a list of your orders.
- **Order Details**: View detailed information about a specific order.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Sequelize**: Promise-based ORM for Node.js.
- **PostgreSQL**: Relational database.
- **EJS**: Embedded JavaScript templating.
- **CSS**: Styling for the application.

## License
