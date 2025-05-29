import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, AlertTriangleIcon, DollarSignIcon, UserPlusIcon, FileTextIcon } from "lucide-react"
import Link from "next/link"

export function BackendQuickActions() {
  const actions = [
    {
      title: "Create Work Order",
      description: "Generate new work order from approved requisition",
      icon: <PlusIcon className="h-5 w-5" />,
      href: "/msp-backend/work-orders/create",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Review Disputes",
      description: "Resolve pending timesheet disputes",
      icon: <AlertTriangleIcon className="h-5 w-5" />,
      href: "/msp-backend/timesheet-disputes",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      title: "Process Expenses",
      description: "Review and approve expense submissions",
      icon: <DollarSignIcon className="h-5 w-5" />,
      href: "/msp-backend/expense-management",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Worker Onboarding",
      description: "Initiate new worker onboarding process",
      icon: <UserPlusIcon className="h-5 w-5" />,
      href: "/msp-backend/worker-lifecycle/onboard",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              asChild
              className={`h-auto p-4 flex flex-col items-start gap-2 ${action.color} text-white`}
            >
              <Link href={action.href}>
                <div className="flex items-center gap-2 w-full">
                  {action.icon}
                  <span className="font-medium">{action.title}</span>
                </div>
                <p className="text-xs text-left opacity-90">{action.description}</p>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
