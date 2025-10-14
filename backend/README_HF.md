---
title: RetroTech Inventory API
emoji: 🎮
colorFrom: cyan
colorTo: blue
sdk: docker
pinned: false
license: mit
short_description: A retro-themed inventory management system API
---

# RetroTech Inventory API

A beautiful retro-themed inventory management system backend built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 📦 Product Management (CRUD operations)
- 📊 Low Stock Alerts with Email Notifications
- 🎮 Retro Tech Theme
- 📱 RESTful API

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user

### Products
- `GET /api/products` - Get all products (requires auth)
- `POST /api/products` - Create new product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

## Environment Variables

Set these in your Hugging Face Spaces secrets:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key
- `EMAIL_USER` - Email for notifications (optional)
- `EMAIL_PASS` - Email password (optional)
- `EMAIL_TO` - Admin email for alerts (optional)

## Usage

The API is now running! You can test it by visiting the root endpoint or use it with the RetroTech Inventory frontend.
