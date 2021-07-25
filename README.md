# RabiKart Backend API Server

## Tech Stack

- NodeJs
- ExpressJs
- MongoDB

## API Routes

### /api/auth

- POST /signup to register new user.
- POST /signin to authenticate a user.
- POST /change-password to change user password.

### /api/users

- GET / to get all the users.`.
- GET / {userId} to get a user with `userId`.
- POST / {userId} to update a user with `userId`.
- GET /cart to get a user's cart.
- POST /cart to insert new product to cart.
- PUT /cart/sync to add new product array to cart.
- GET /wishlist to get a user's wishlist.
- POST /wishlist to add new product to wishlist.
- DELETE /wishlist/ {productId} to remove a product with `productId` from wishlist.

### /api/categories

- GET / to get all categories.
- GET / {categoryId} to get the category with `categoryId`.
- POST / to create new category.
- POST / {categoryId} to update a category with `categoryId`.
- DELETE / {categoryId} to delete a category with `categoryId`.

### /api/products

- GET / to get all products.
- GET / {productId} to get a product with `productId`.
- POST / to create new product.
- POST / {productId} to update a product with `productId`.
- DELETE / {productId} to delete a product with `productId`.
