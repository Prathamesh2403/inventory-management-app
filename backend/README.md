# RetroTech Inventory Backend

A beautiful retro-themed inventory management system backend built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 📦 Product Management (CRUD)
- 📊 Low Stock Alerts
- 📧 Email Notifications
- 🎮 Retro Tech Theme

## Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=admin@yourcompany.com
NODE_ENV=production
```

## Docker Deployment

### Build the Docker image:
```bash
docker build -t retro-inventory-backend .
```

### Run the container:
```bash
docker run -p 5000:5000 --env-file .env retro-inventory-backend
```

## API Endpoints

- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Hugging Face Spaces Deployment

This backend is optimized for deployment on Hugging Face Spaces with Docker.
