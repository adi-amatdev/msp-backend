import { CalendarIcon, ClockIcon, BriefcaseIcon, CheckCircleIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const lifecycleRequests = [
  {
    id: "WL-2024-001",
    type: "Onboarding",
    worker: "Alex Rodriguez",
    vendor: "TechStaff Solutions",
    workOrder: "WO-2024-005",
    position: "Senior Frontend Developer",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    status: "Pending Approval",
    priority: "High",
    submittedDate: "2024-01-15",
    submittedBy: "Sarah Johnson",
    documents: ["Contract", "Background Check", "Tax Forms"],
    notes: "Urgent requirement for project starting February 1st. All documentation completed.",
    notifications: [
      { recipient: "Vendor", status: "Sent", date: "2024-01-15" },
      { recipient: "HR", status: "Pending", date: "N/A" },
    ],
  },
  {
    id: "WL-2024-002",
    type: "Offboarding",
    worker: "Jennifer Lee",
    vendor: "CloudTech Partners",
    workOrder: "WO-2024-003",
    position: "DevOps Engineer",
    startDate: "2023-06-01",
    endDate: "2024-01-31",
    status: "In Progress",
    priority: "Medium",
    submittedDate: "2024-01-10",
    submittedBy: "Mike Chen",
    documents: ["Exit Interview", "Equipment Return", "Final Timesheet"],
    notes: "Contract completion. Equipment return scheduled for January 30th.",
    notifications: [
      { recipient: "Vendor", status: "Sent", date: "2024-01-10" },
      { recipient: "IT", status: "Sent", date: "2024-01-12" },
    ],
  },
  {
    id: "WL-2024-003",
    type: "Onboarding",
    worker: "David Kim",
    vendor: "Design Collective",
    workOrder: "WO-2024-006",
    position: "UX/UI Designer",
    startDate: "2024-02-15",
    endDate: "2024-12-15",
    status: "Completed",
    priority: "Low",
    submittedDate: "2024-01-08",
    submittedBy: "Sarah Johnson",
    documents: ["Contract", "NDA", "Equipment Request"],
    notes: "Standard onboarding process completed successfully.",
    notifications: [
      { recipient: "Vendor", status: "Sent", date: "2024-01-08" },
      { recipient: "HR", status: "Sent", date: "2024-01-09" },
    ],
  },
]

export function WorkerLifecycleCards() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Worker Lifecycle Updates</CardTitle>
        <p className="text-sm text-muted-foreground">Recent onboarding and offboarding requests</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {lifecycleRequests.map((req) => (
            <Card key={req.id} className="overflow-hidden border border-gray-200">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 border-b p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-semibold uppercase">
                    {req.worker
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{req.worker}</h3>
                    <p className="text-sm text-muted-foreground truncate">{req.vendor}</p>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(req.priority)}>
                    {req.priority}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{req.position}</div>
                      <div className="text-muted-foreground">{req.workOrder}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>Start: {req.startDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>End: {req.endDate}</span>
                  </div>

                  <Badge variant="outline" className={`${getStatusColor(req.status)} w-full justify-center`}>
                    {req.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 border-t">
                  <Button variant="ghost" className="rounded-none py-3 text-sm">
                    View
                  </Button>
                  <Button variant="ghost" className="rounded-none border-l py-3 text-sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/msp-backend/worker-lifecycle"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View All Worker Lifecycles
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
