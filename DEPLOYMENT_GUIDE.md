# 🚀 RetroTech Inventory - Deployment Guide

Deploy your beautiful retro-themed inventory management system to the cloud!

## 📋 Prerequisites

- GitHub account
- Hugging Face account
- Vercel account
- MongoDB Atlas account (free tier available)

## 🎯 Deployment Overview

1. **Backend** → Hugging Face Spaces (Docker)
2. **Frontend** → Vercel
3. **Database** → MongoDB Atlas

---

## 🔧 Step 1: Deploy Backend to Hugging Face Spaces

### 1.1 Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/inventory-app`)

### 1.2 Create Hugging Face Space

1. Go to [Hugging Face Spaces](https://huggingface.co/spaces)
2. Click "Create new Space"
3. Choose:
   - **Name**: `retro-inventory-api` (or your preferred name)
   - **License**: MIT
   - **SDK**: Docker
   - **Visibility**: Public or Private

### 1.3 Upload Backend Code

1. Clone your repository locally
2. Copy the `backend` folder contents to your new Hugging Face Space
3. Or upload via Git:
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   cd YOUR_SPACE_NAME
   # Copy backend files here
   git add .
   git commit -m "Add backend code"
   git push
   ```

### 1.4 Set Environment Variables

In your Hugging Face Space settings, add these secrets:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A random secret key (e.g., `your-super-secret-jwt-key-123`)
- `EMAIL_USER`: Your Gmail (optional, for notifications)
- `EMAIL_PASS`: Gmail app password (optional)
- `EMAIL_TO`: Admin email (optional)

### 1.5 Deploy

Hugging Face will automatically build and deploy your Docker container. Your API will be available at:
```
https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
```

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Frontend

1. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/api
   ```

### 2.2 Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/api`
5. Click "Deploy"

### 2.3 Verify Deployment

Your frontend will be available at:
```
https://your-project-name.vercel.app
```

---

## 🔗 Step 3: Connect Everything

### 3.1 Test Backend API

Visit your Hugging Face Space URL to see:
```
API is running...
```

### 3.2 Test Frontend

Visit your Vercel URL and:
1. Register a new account
2. Add some retro products
3. Test all CRUD operations

---

## 🎮 Your RetroTech Inventory is Live!

### Features Available:
- ✅ **Beautiful retro-themed UI**
- ✅ **User authentication**
- ✅ **Product management**
- ✅ **Real-time inventory stats**
- ✅ **Low stock alerts**
- ✅ **Responsive design**

### URLs:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-username-your-space.hf.space`

---

## 🛠️ Troubleshooting

### Backend Issues:
- Check Hugging Face Space logs
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend Issues:
- Check Vercel build logs
- Verify `VITE_API_URL` environment variable
- Test API endpoints manually

### Database Issues:
- Check MongoDB Atlas connection
- Verify database user permissions
- Test connection string

---

## 🎉 Congratulations!

Your retro-themed inventory management system is now live on the internet! Share it with the world and manage your vintage electronics collection like a pro! 🎮📱

## 📞 Support

If you encounter any issues, check the logs in:
- Hugging Face Spaces → Settings → Logs
- Vercel Dashboard → Functions → Logs
- MongoDB Atlas → Monitoring
