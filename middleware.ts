import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    // Handle /todos route - redirect to sign in if not authenticated
    if (request.nextUrl.pathname === '/todos') {
        // Check for auth cookie - this is a simple check that doesn't require database access
        const authCookie = request.cookies.get('better-auth-session');
        if (!authCookie?.value) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
    }

    // Handle /admin route - redirect to sign in if not authenticated
    // The actual admin check will happen in the page component
    if (request.nextUrl.pathname === '/admin') {
        const authCookie = request.cookies.get('better-auth-session');
        if (!authCookie?.value) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
        // We'll do the admin role check in the page component instead of middleware
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ["/todos", "/admin"]
}
