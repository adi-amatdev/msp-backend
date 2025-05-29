import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileTextIcon, ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

export function PendingWorkOrders() {
  const workOrders = [
    {
      id: "WO-2024-001",
      title: "Senior React Developer",
      vendor: "TechStaff Solutions",
      status: "Pending Approval",
      priority: "High",
      created: "2024-01-15",
      amount: "$85,000",
    },
    {
      id: "WO-2024-002",
      title: "DevOps Engineer",
      vendor: "CloudTech Partners",
      status: "In Review",
      priority: "Medium",
      created: "2024-01-14",
      amount: "$92,000",
    },
    {
      id: "WO-2024-003",
      title: "UX Designer",
      vendor: "Design Collective",
      status: "Draft",
      priority: "Low",
      created: "2024-01-13",
      amount: "$68,000",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "In Review":
        return "bg-blue-100 text-blue-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Pending Work Orders
        </CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/msp-backend/work-orders">
            View All
            <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{order.id}</span>
                  <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                </div>
                <p className="text-sm font-medium">{order.title}</p>
                <p className="text-xs text-gray-600">{order.vendor}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Created: {order.created}</span>
                  <span>Amount: {order.amount}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
