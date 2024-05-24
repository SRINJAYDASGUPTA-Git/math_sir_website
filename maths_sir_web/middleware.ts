import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher([
  '/courses/(.*)',
  '/contact',
  '/note',
  '/exams/(.*)',
  '/exams'
])

export default clerkMiddleware((auth, req)=>{
  if(protectedRoutes(req)) auth().protect()
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)'], // Run middleware on API routes
};