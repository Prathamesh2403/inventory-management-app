# RetroTech Inventory Frontend - Deployment Guide

## Deploy to Vercel

### 1. Prepare Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=https://your-username-your-app-name.hf.space/api
```

Replace `your-username-your-app-name` with your actual Hugging Face Spaces URL.

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set the root directory to `frontend`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-username-your-app-name.hf.space/api`
5. Deploy!

### 3. Build Command
Vercel will automatically detect this is a Vite project and use:
```bash
npm run build
```

### 4. Output Directory
The build output will be in the `dist` folder.

## Local Development

For local development, make sure your backend is running on `http://localhost:5000` and the frontend will automatically proxy API calls to it.

## Environment Variables

- `VITE_API_URL` - The URL of your deployed backend API (Hugging Face Spaces URL)

## Features

- 🎮 Retro-themed UI with beautiful animations
- 📱 Fully responsive design
- 🔐 JWT authentication
- 📦 Product management (CRUD)
- 📊 Real-time inventory stats
- ⚡ Fast and modern React app
