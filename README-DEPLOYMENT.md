# KAI Restaurant - Deployment Guide for Render

## 🚀 Deployment Steps

### 1. Prepare Repository

- Ensure all code is committed and pushed to GitHub
- Make sure both `build.sh` and `start.sh` are in the root directory

### 2. Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `restaurant-fullstack`

### 3. Configure Render Settings

```
Name: kai-restaurant-backend
Environment: Node
Branch: main
Build Command: ./build.sh
Start Command: ./start.sh
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
2. Build Command: `npm run build:frontend`
3. Publish Directory: `frontend/dist`

### 6. Update Frontend API URLs

After backend is deployed, update frontend API base URL:

```typescript
// In frontend/src/api/config.ts or similar
const API_BASE_URL = "https://your-backend-service.onrender.com/api";
```

## 🔧 Files Created for Deployment

- `build.sh` - Builds both frontend and backend
- `start.sh` - Starts the backend server
- `.env.example` - Template for environment variables
- This deployment guide

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
