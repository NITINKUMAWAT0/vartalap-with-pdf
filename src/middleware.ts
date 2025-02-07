import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Exclude Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|json|jpg|jpeg|png|gif|svg|webp|ico|ttf|woff|woff2|eot|otf|mp4|webm|mp3|wav|ogg|pdf|txt|csv|docx?|xlsx?|zip)).*)",
    // Apply middleware to API routes
    "/api/:path*",
  ],
};
