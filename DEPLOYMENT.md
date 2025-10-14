# 🚀 Deployment Guide - IntelliJournal

This guide will walk you through deploying the IntelliJournal Next.js application to Vercel

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Database Provider** - Neon DB, Supabase, or any PostgreSQL provider
4. **OpenAI API Key** - Get from [OpenAI Platform](https://platform.openai.com/api-keys)
5. **Clerk Account** - For authentication at [clerk.com](https://clerk.com)

## 🗄️ Database Setup

### Option 1: Neon DB (Recommended - Free Tier Available)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string from the dashboard
4. The connection string should look like:
   ```
   postgresql://username:password@ep-example.us-east-1.aws.neon.tech/journal_db?sslmode=require
   ```

### Option 2: Supabase (Alternative)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

## 🔐 Authentication Setup (Clerk)

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Go to "API Keys" section
4. Copy the following keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## 🤖 OpenAI API Setup

1. Go to [platform.openai.com](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Create a new API key
4. Copy the key (starts with `sk-`)

## 🚀 Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**
   In the Vercel dashboard, add these environment variables:
   
   | Variable Name | Value | Description |
   |---------------|-------|-------------|
   | `DATABASE_URL` | Your PostgreSQL connection string | Database connection |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key | Frontend auth |
   | `CLERK_SECRET_KEY` | Your Clerk secret key | Backend auth |
   | `OPENAI_API_KEY` | Your OpenAI API key | AI functionality |

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   vercel env add CLERK_SECRET_KEY
   vercel env add OPENAI_API_KEY
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## 🗃️ Database Migration

After deployment, you need to run database migrations:

### Option 1: Using Vercel CLI
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

### Option 2: Using Prisma Studio (Recommended)
1. Go to your Vercel dashboard
2. Open the Functions tab
3. Create a new serverless function to run migrations
4. Or use Prisma Studio online

### Option 3: Manual Migration
1. Connect to your database directly
2. Run the SQL from `prisma/migrations/` folder
3. Execute each migration file in order

## 🔧 Post-Deployment Configuration

### 1. Update Clerk Settings
1. Go to your Clerk dashboard
2. Navigate to "Domains" section
3. Add your Vercel domain: `https://your-app-name.vercel.app`
4. Update allowed origins and redirect URLs

### 2. Test Your Deployment
1. Visit your deployed URL
2. Try signing up/signing in
3. Create a journal entry
4. Test the AI analysis feature
5. Test the Q&A functionality

## 🐛 Troubleshooting

### Common Issues:

#### 1. MIDDLEWARE_INVOCATION_FAILED Error
- **Problem**: `500: INTERNAL_SERVER_ERROR Code: MIDDLEWARE_INVOCATION_FAILED`
- **Cause**: Clerk middleware trying to validate without proper environment variables
- **Solution**: 
  - Ensure all environment variables are set in Vercel dashboard
  - The middleware has been updated to handle missing variables gracefully
  - Deploy with proper Clerk keys to resolve the issue

#### 2. Database Connection Errors
- **Problem**: `PrismaClientInitializationError`
- **Solution**: Check your `DATABASE_URL` environment variable
- **Debug**: Verify the connection string format and credentials

#### 3. Authentication Issues
- **Problem**: Clerk authentication not working
- **Solution**: Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- **Debug**: Check Clerk dashboard for domain configuration

#### 4. OpenAI API Errors
- **Problem**: AI analysis not working
- **Solution**: Verify `OPENAI_API_KEY` is correct and has credits
- **Debug**: Check OpenAI dashboard for API usage

#### 5. Build Failures
- **Problem**: Build fails during deployment
- **Solution**: Check Vercel build logs
- **Common fixes**:
  - Ensure all dependencies are in `package.json`
  - Check TypeScript errors
  - Verify environment variables are set

#### 6. Dynamic Server Usage Error (Expected)
- **Problem**: `Route /journal couldn't be rendered statically because it used 'headers'`
- **Status**: ✅ **This is expected and good!**
- **Explanation**: Your pages are correctly configured as dynamic (server-side rendered)
- **Action**: No action needed - this confirms SSR is working properly

### Debug Commands:
```bash
# Check build locally
npm run build

# Test production build
npm run start

# Check Prisma connection
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 🔄 Continuous Deployment

Once set up, Vercel will automatically deploy when you push to your main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
# Vercel will automatically deploy
```

If you encounter issues:
1. Check Vercel deployment logs
2. Review this troubleshooting section
3. Check the main README.md for additional help
4. Open an issue in the GitHub repository

---
