# Production Deployment Guide

## Backend Deployment (Render)

### Service: interview-exp-app-1.onrender.com

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Environment Variables Required:**
```
NODE_ENV=production
PORT=5000
SUPABASE_URL=https://rdmidrmfwqrmbweebfcz.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Frontend Deployment (Render)

### Service: manikanth-project.onrender.com

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Environment Variables Required:**
```
NEXT_PUBLIC_API_URL=https://interview-exp-app-1.onrender.com/api
```

---

## Deployment Checklist

### Before Pushing to GitHub:

- [x] Backend CORS configured with frontend URL
- [x] Frontend API URL points to backend
- [x] Environment variables documented
- [x] Database schema is up to date
- [x] All filters updated (Year, Branch)
- [x] Search functionality working

### After Pushing to GitHub:

1. **Backend Service:**
   - Wait for automatic deployment
   - Check logs for successful startup
   - Test health endpoint: `https://interview-exp-app-1.onrender.com/health`
   - Verify CORS allows frontend domain

2. **Frontend Service:**
   - Wait for automatic deployment
   - Check build logs for success
   - Test homepage loads
   - Test login/register
   - Test company search and filters

### Post-Deployment Testing:

- [ ] User registration works
- [ ] User login works
- [ ] Dashboard loads with companies
- [ ] Company search works
- [ ] Year filter works
- [ ] Branch filter works
- [ ] Experience posting works
- [ ] Comments work
- [ ] Chat functionality works
- [ ] Admin login works
- [ ] Admin approval works

---

## URLs

- **Frontend:** https://manikanth-project.onrender.com
- **Backend API:** https://interview-exp-app-1.onrender.com/api
- **Backend Health:** https://interview-exp-app-1.onrender.com/health
- **Database:** Supabase (rdmidrmfwqrmbweebfcz.supabase.co)

---

## Troubleshooting

### Frontend shows "Not Found"
- Check if `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running
- Check browser console for CORS errors

### Backend CORS errors
- Verify frontend URL is in CORS whitelist
- Check `NODE_ENV=production` is set
- Restart backend service

### Database connection issues
- Verify Supabase credentials
- Check database schema is applied
- Test connection from backend logs

---

## Quick Commands

### Push to GitHub:
```bash
git add .
git commit -m "Production ready deployment"
git push
```

### Check Backend Logs (Render):
Go to: https://dashboard.render.com → interview-exp-app-1 → Logs

### Check Frontend Logs (Render):
Go to: https://dashboard.render.com → manikanth-project → Logs
