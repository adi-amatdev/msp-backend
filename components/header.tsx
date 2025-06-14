"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { CuboidIcon, UserCircleIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onOpenSidebar: () => void
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const pathname = usePathname()

  // Only show header on /msp-backend-dashboard
  if (pathname !== "/msp-backend-dashboard") {
    return null
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 justify-between">
      <div className="flex items-center gap-2 md:hidden">
        <button onClick={onOpenSidebar} className="p-2 rounded-md hover:bg-gray-100">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>
      <div className="flex items-center gap-2 font-semibold">
        <CuboidIcon className="h-6 w-6 text-blue-600" />
        <span className="hidden md:inline-block">TalentBridge</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="font-medium">
          <Link href="/msp-backend" className="flex items-center gap-2">
            <UserCircleIcon className="h-5 w-5" />
            <span>Backend Team Account</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}
