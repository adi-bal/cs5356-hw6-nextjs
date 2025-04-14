"use client"

import Link from "next/link"
import { useSession } from "@/lib/hooks"
import { useEffect, useState } from "react"
import { isAdmin } from "@/lib/role-check"

export function AdminLink() {
    const { session } = useSession();
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    
    useEffect(() => {
        if (session?.user) {
            isAdmin(session.user.id).then(setIsUserAdmin);
        }
    }, [session]);
    
    if (!session?.user || !isUserAdmin) {
        return null;
    }

    return (
        <Link
            href="/admin"
            className="text-sm font-medium transition-colors hover:text-primary"
        >
            Admin
        </Link>
    )
}
