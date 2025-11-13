#!/usr/bin/env bash
# Build script for Render deployment

echo "🔧 Installing dependencies..."
npm run install:all

echo "🏗️ Building frontend..."
npm run build:frontend

echo "✅ Build completed successfully!"