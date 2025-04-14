import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    // Check for authentication cookie
    const authCookie = request.cookies.get('better-auth-session');
    
    // If no auth cookie is present, redirect to sign-in page
    if (!authCookie && (request.nextUrl.pathname === '/todos' || request.nextUrl.pathname === '/admin')) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    
    // For admin route, we'll do the actual role check in the page component
    // since we can't access the database from Edge middleware
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/todos", "/admin"]
}

