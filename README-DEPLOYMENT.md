# KAI Restaurant - Deployment Guide for Render

## 🚀 Deployment Steps

### 1. Prepare Repository

- Ensure all code is committed and pushed to GitHub
- Make sure both `build.sh` and `start.sh` are in the root directory

### 2. Create Render Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `restaurant-fullstack`

### 3. Configure Backend Settings

```
Name: kai-restaurant-backend
Environment: Node
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 4. Environment Variables

Set these in Render Dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant-db
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.onrender.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Frontend Deployment (Static Site)

1. Create another Render service → "Static Site"
2. Connect same GitHub repository: `restaurant-fullstack`
3. Configure:
   ```
   Name: kai-restaurant-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

### 6. Configure Frontend Environment Variables

In Render frontend static site, set environment variable:

```
VITE_API_BASE_URL=https://restaurant-fullstack-yt2f.onrender.com/api
```

Or update `frontend/.env.production` with your actual backend URL.

## 🔧 Files Created for Deployment

- `backend/.env.example` - Backend environment variables template
- `frontend/.env.example` - Frontend environment variables template
- `frontend/.env.production` - Production API URL configuration
- `backend/server.js` - Updated to serve API only (no static files)
- This deployment guide

## 📚 Deployment Architecture

```
┌─────────────────┐    ┌──────────────────┐
│  Frontend       │───▶│  Backend         │
│  Static Site    │    │  Web Service     │
│  (Render)       │    │  (Render)        │
└─────────────────┘    └──────────────────┘
        │                        │
        └──────────┬─────────────┘
                   ▼
          ┌─────────────────┐
          │  MongoDB Atlas  │
          │  Database       │
          └─────────────────┘
```

## ✅ Deployment Checklist

- [ ] MongoDB Atlas database created and accessible
- [ ] Cloudinary account setup (for image uploads)
- [ ] Environment variables configured in Render
- [ ] CORS settings allow Render domain
- [ ] Frontend API URLs point to deployed backend
- [ ] Test all API endpoints after deployment

## 🐛 Troubleshooting

**Build fails**: Check build logs in Render dashboard
**CORS errors**: Verify FRONTEND_URL environment variable
**Database connection**: Check MONGODB_URI format and network access
**Images not uploading**: Verify Cloudinary credentials

## 📝 Notes

- Free tier on Render may have cold starts (service sleeps after inactivity)
- Consider upgrading to paid tier for production use
- Monitor logs regularly through Render dashboard
