# GRABIT E-commerce Site

Welcome to the **GRABIT** e-commerce site! GRABIT is a full-featured online store that delivers a seamless shopping experience for users and robust management features for administrators.

## About The Project

GRABIT offers a comprehensive shopping experience. Users can browse product categories, add items to their cart, and proceed with secure checkout. Administrators have functionalities to manage products and view inventory.

### Admin Features

The admin panel includes:
- **Add Product**: Allows administrators to add new products to the frontend via the backend.
- **List Product**: Displays a list of all products currently in stock.

### Backend Features

The backend handles:
- Image uploading using Multer
- Product management: Add, remove, and fetch products
- User authentication with JWT
- User registration and login
- Cart management: Add, remove, and fetch cart data
- Endpoints for creating new collections and popular products in the women's section

### Frontend Features

The frontend includes:
- Shop categories: Men, Women, and Kids
- Cart page
- Login/sign-up functionalities

It leverages the backend to provide a dynamic and interactive user experience.

## Built With

- **Frontend**: React, React Router DOM, CSS
- **Backend**: Express, MongoDB, Mongoose, JWT, Multer
- **Deployment**: Vercel

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- npm

### Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/ujjwal105/e-commerce-website.git
    ```
2. **Navigate to the project directory**:
    ```sh
    cd e-commerce-website
    ```
3. **Install backend dependencies**:
    ```sh
    cd backend
    npm install
    ```
4. **Set up environment variables**:
    - Add the following variables:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```
5. **Start the backend server**:
    ```sh
    node index.js
    ```
    The backend server will start on `http://localhost:4000`.

6. **Install frontend dependencies**:
    ```sh
    cd ../frontend
    npm install
    ```
7. **Start the frontend server**:
    ```sh
    npm start
    ```
    The frontend server will start on `http://localhost:3000`.

8. **Access the application**:
    - Open your browser and navigate to `http://localhost:3000` to access the frontend.
    - Use `http://localhost:5000/api` to interact with the backend APIs.

## Usage

Once the application is set up, you can start exploring its features:

### User Side

- **Browse Products**: Navigate through different categories (Men, Women, Kids) and view product details.
- **Cart Management**: Add products to the cart, update quantities, and proceed to checkout.
- **Authentication**: Register a new account or login to an existing one for a personalized shopping experience.

### Admin Side

- **Add Product**: Use the admin panel to add new products, including images and descriptions.
- **Manage Inventory**: View and manage the list of products in stock.

## Deployment

GRABIT is deployed using Vercel. For deploying your own version, follow these steps:

1. **Build the frontend**:
    ```sh
    cd frontend
    npm build
    ```
2. **Deploy to Vercel**:
    - Sign up for a Vercel account and link it to your GitHub repository.
    - Push your changes to GitHub.
    - Follow the instructions on Vercel to deploy your project.

## Roadmap

Future enhancements and planned features:

- **Order History**: Allow users to view their past orders.
- **Product Reviews**: Enable users to leave reviews and ratings for products.
- **Advanced Search**: Implement a search functionality with filters and sorting options.
- **Wishlist**: Allow users to save products to a wishlist for future purchase.

## Acknowledgments

Special thanks to the following resources and tools that made this project possible:

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Multer](https://github.com/expressjs/multer)
- [JWT](https://jwt.io/)
- [Vercel](https://vercel.com/)


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Ujjwal Tyagi - ujjwaltyagi2969@gmail.com

Project Link: [GRABIT E-commerce Site](https://e-commerce-website-alpha-two.vercel.app)
