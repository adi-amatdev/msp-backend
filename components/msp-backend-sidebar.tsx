"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LayoutDashboardIcon, FileTextIcon, ClockIcon, CreditCardIcon, UsersIcon, StarIcon, XIcon, ArrowLeftIcon, CuboidIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  showBackButton?: boolean
  onBack?: () => void
}

const navigation = [
  {
    name: "Dashboard",
    href: "/msp-backend",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Work Orders",
    href: "/msp-backend/work-orders",
    icon: FileTextIcon,
  },
  {
    name: "Timesheet Disputes",
    href: "/msp-backend/timesheet-disputes",
    icon: ClockIcon,
  },
  {
    name: "Expense Management",
    href: "/msp-backend/expense-management",
    icon: CreditCardIcon,
  },
  {
    name: "Worker Lifecycle",
    href: "/msp-backend/worker-lifecycle",
    icon: UsersIcon,
  },
  {
    name: "Special Billing",
    href: "/msp-backend/special-billing",
    icon: StarIcon,
  },
]

export function Sidebar({ isOpen, onClose, showBackButton = false, onBack }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Only show sidebar on the dashboard page
  const isDashboard = pathname === "/msp-backend-dashboard"

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isDashboard) return null

  return (
    <>
      {/* Overlay */}
      <div className={cn("app-sidebar-overlay", isOpen && "open")} onClick={onClose} />

      {/* Sidebar */}
      <div className={cn("app-sidebar", isOpen && "open")}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CuboidIcon className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">MSP Backend</span>
            </div>
            {isMobile && (
              <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="mt-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
                    isActive && "bg-blue-50 text-blue-700"
                  )}
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
