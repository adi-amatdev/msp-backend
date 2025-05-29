import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, AlertTriangleIcon, DollarSignIcon, UserPlusIcon, StarIcon, ClockIcon } from "lucide-react"

export function MspBackendDashboardStats() {
  const stats = [
    {
      title: "Active Work Orders",
      value: "34",
      change: "+5 this week",
      icon: <FileTextIcon className="h-5 w-5 text-blue-600" />,
      color: "text-blue-600",
    },
    {
      title: "Pending Disputes",
      value: "8",
      change: "3 urgent",
      icon: <AlertTriangleIcon className="h-5 w-5 text-red-600" />,
      color: "text-red-600",
    },
    {
      title: "Expense Reviews",
      value: "42",
      change: "+12 today",
      icon: <DollarSignIcon className="h-5 w-5 text-green-600" />,
      color: "text-green-600",
    },
    {
      title: "Lifecycle Requests",
      value: "16",
      change: "8 onboarding",
      icon: <UserPlusIcon className="h-5 w-5 text-purple-600" />,
      color: "text-purple-600",
    },
    {
      title: "Special Billing Cases",
      value: "6",
      change: "2 new",
      icon: <StarIcon className="h-5 w-5 text-orange-600" />,
      color: "text-orange-600",
    },
    {
      title: "Avg. Resolution Time",
      value: "2.4 days",
      change: "-0.3 days vs last month",
      icon: <ClockIcon className="h-5 w-5 text-indigo-600" />,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.color}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
