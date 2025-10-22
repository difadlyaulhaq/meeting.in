import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Route yang bisa diakses tanpa login
const isPublicRoute = createRouteMatcher([
  '/',              // Landing page
  '/sign-in(.*)',   // Sign in pages
  '/sign-up(.*)',   // Sign up pages
])

export default clerkMiddleware(async (auth, req) => {
  // Jika bukan public route, require authentication
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  
  // Redirect user yang sudah login dari landing page ke dashboard
  const { userId } = await auth()
  if (userId && req.nextUrl.pathname === '/') {
    // Hanya redirect jika dari root path
    return NextResponse.redirect(new URL('/upcoming', req.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}