"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LayoutDashboardIcon, FileTextIcon, ClockIcon, CreditCardIcon, UsersIcon, StarIcon, XIcon } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
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

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-6 border-b">
        <h2 className="text-lg font-semibold">MSP Backend</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="md:hidden">
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link key={item.name} href={item.href} onClick={onClose}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100")}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}
