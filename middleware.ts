import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    // Check for authentication cookie
    const authCookie = request.cookies.get('better-auth-session');
    const isAuthenticated = !!authCookie?.value;

    // Handle /todos route - redirect to sign in if not authenticated
    if (request.nextUrl.pathname === '/todos') {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
    }

    // For /admin route, we can't check admin status in middleware
    // since it requires database access which isn't Edge compatible
    // We'll redirect to sign-in if not authenticated and let the admin
    // page component handle the admin role check
    if (request.nextUrl.pathname === '/admin') {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/todos", "/admin"]
}

