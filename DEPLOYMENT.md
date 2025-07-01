# Vercel Deployment Guide

## Quick Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select framework: "Other"

3. **Configure Build Settings**
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Environment Variables**
   Copy variables from `.env.production` to Vercel dashboard:
   - NODE_ENV=production
   - BUILD_ENV=TESTNET
   - NETWORK=TESTNET
   - PROOFSENABLED=true
   - (Add your API keys and secrets)

5. **Deploy**
   Click "Deploy" and wait for build completion.

## Test Endpoints After Deployment

```bash
# Health check
curl https://your-app.vercel.app/api/health

# GLEIF API
curl https://your-app.vercel.app/api/gleif/test

# Corporate API
curl https://your-app.vercel.app/api/corporate/test
```

## Local Development (Unchanged)

All your existing scripts continue to work:
- `npm run build` - Build TypeScript
- `npm run test:gleif` - Run GLEIF tests
- `npm run test:complete` - Run complete tests
- All other existing scripts remain functional

## New Deployment Scripts

- `npm run vercel-build` - Build for Vercel deployment
- `npm run deploy` - Deploy to production
- `npm run deploy-preview` - Deploy preview version

## Notes

- All existing functionality is preserved
- No breaking changes to your current workflow
- API endpoints remain the same
- Build process enhanced for Vercel compatibility
