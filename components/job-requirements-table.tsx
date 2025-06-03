import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar } from "lucide-react"
import Link from "next/link"

export function WorkOrderManagement() {
  const workOrders = [
    {
      id: "WO-2024-001",
      title: "Senior React Developer",
      vendor: "TechStaff Solutions",
      client: "Acme Corp",
      status: "Active",
      priority: "High",
      amount: "$85,000",
      approvedBy: "John Manager",
      endDate: "Aug 01, 2024",
    },
    {
      id: "WO-2024-002",
      title: "DevOps Engineer",
      vendor: "CloudTech Partners",
      client: "Beta Inc",
      status: "Pending Approval",
      priority: "Medium",
      amount: "$92,000",
      approvedBy: "Pending",
      endDate: "Dec 15, 2024",
    },
    {
      id: "WO-2024-003",
      title: "UX Designer",
      vendor: "Design Collective",
      client: "Gamma LLC",
      status: "Draft",
      priority: "Low",
      amount: "$68,000",
      approvedBy: "Pending",
      endDate: "Sep 01, 2024",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
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
        <CardTitle>Work Order Management</CardTitle>
        <Link href="/msp-backend/work-orders/create">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Create Work Order
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{order.title}</h3>
                  <p className="text-sm text-gray-600">{order.client}</p>
                  <p className="text-sm text-gray-500">Vendor: {order.vendor}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  <Badge variant="outline" className={getPriorityColor(order.priority)}>
                    {order.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium ml-1">{order.amount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Approved By:</span>
                  <span className="font-medium ml-1">{order.approvedBy}</span>
                </div>
                <div>
                  <span className="text-gray-500">End Date:</span>
                  <span className="font-medium ml-1">{order.endDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/msp-backend/work-orders/view/${order.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Users className="h-3 w-3" />
                    View Details
                  </Button>
                </Link>
                <Link href={`/msp-backend/work-orders/edit/${order.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Calendar className="h-3 w-3" />
                    Edit Work Order
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
