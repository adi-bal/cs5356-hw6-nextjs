import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { isAdmin } from "@/lib/role-check"

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });

    // Handle /todos route - redirect to sign in if not authenticated
    if (request.nextUrl.pathname === '/todos') {
        if (!session?.user) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
    }

    // Handle /admin route - redirect to home if not authenticated or not admin
    if (request.nextUrl.pathname === '/admin') {
        if (!session?.user) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }

        const isUserAdmin = await isAdmin(session.user.id);
        if (!isUserAdmin) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ["/todos", "/admin"]
}

