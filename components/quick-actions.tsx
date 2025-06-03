import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  ClockIcon,
  CreditCardIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Work Orders",
      description: "Manage client work requests",
      icon: <FileTextIcon className="h-5 w-5" />,
      href: "/msp-backend/work-orders",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Timesheet Disputes",
      description: "Resolve worker timesheet issues",
      icon: <ClockIcon className="h-5 w-5" />,
      href: "/msp-backend/timesheet-disputes",
      color: "bg-yellow-600 hover:bg-yellow-700",
    },
    {
      title: "Expense Management",
      description: "Approve and manage expenses",
      icon: <CreditCardIcon className="h-5 w-5" />,
      href: "/msp-backend/expense-management",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Worker Lifecycle",
      description: "Onboard and offboard resources",
      icon: <UsersIcon className="h-5 w-5" />,
      href: "/msp-backend/worker-lifecycle",
      color: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Special Billing",
      description: "Handle custom client billing",
      icon: <StarIcon className="h-5 w-5" />,
      href: "/msp-backend/special-billing",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button className={`w-full h-auto p-4 flex flex-col gap-2 ${action.color} text-white`}>
                {action.icon}
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90 break-words text-wrap leading-tight">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
