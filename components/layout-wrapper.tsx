"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/msp-backend-sidebar"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname === "/msp-backend-dashboard"

  if (isDashboard) {
    return (
      <div className="flex min-h-screen">
        <Sidebar isOpen={true} onClose={() => {}} />
        <main className="flex-1">{children}</main>
      </div>
    )
  }

  // All other pages: full width
  return <main className="w-full min-h-screen">{children}</main>
} 