import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangleIcon, ExternalLinkIcon, ClockIcon } from "lucide-react"
import Link from "next/link"

export function RecentDisputes() {
  const disputes = [
    {
      id: "TD-2024-015",
      worker: "John Smith",
      vendor: "TechStaff Solutions",
      issue: "Overtime Hours Discrepancy",
      amount: "$480",
      priority: "High",
      daysOpen: 3,
      status: "Under Review",
    },
    {
      id: "TD-2024-016",
      worker: "Sarah Johnson",
      vendor: "CloudTech Partners",
      issue: "Missing Break Deductions",
      amount: "$120",
      priority: "Medium",
      daysOpen: 1,
      status: "Pending Response",
    },
    {
      id: "TD-2024-017",
      worker: "Mike Chen",
      vendor: "Design Collective",
      issue: "Holiday Pay Calculation",
      amount: "$320",
      priority: "Low",
      daysOpen: 5,
      status: "Awaiting Documentation",
    },
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Pending Response":
        return "bg-yellow-100 text-yellow-800"
      case "Awaiting Documentation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangleIcon className="h-5 w-5" />
          Recent Disputes
        </CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/msp-backend/timesheet-disputes">
            View All
            <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{dispute.id}</span>
                  <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
                </div>
                <p className="text-sm font-medium">{dispute.issue}</p>
                <p className="text-xs text-gray-600">
                  {dispute.worker} • {dispute.vendor}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {dispute.daysOpen} days open
                  </span>
                  <span>Amount: {dispute.amount}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                <Button size="sm" variant="outline">
                  Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
