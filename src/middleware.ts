import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/journal(.*)'])

export default clerkMiddleware(async (auth, req) => {
    try {
        // Check if we have valid Clerk environment variables
        const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        const secretKey = process.env.CLERK_SECRET_KEY;
        
        // If we don't have valid keys, skip authentication
        if (!publishableKey || !secretKey || 
            publishableKey.includes('dummy') || 
            secretKey.includes('dummy')) {
            console.log('Clerk keys not configured, skipping auth middleware');
            return NextResponse.next();
        }
        
        // Only protect routes if we have valid authentication
        if(isProtectedRoute(req)) {
            await auth.protect();
        }
    } catch (error) {
        console.log('Middleware error:', error);
        // If auth fails, allow the request to continue
        // This prevents middleware from breaking the entire app
        return NextResponse.next();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}