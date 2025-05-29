"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-backend-sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ClockIcon, MessageSquareIcon, CheckCircleIcon, XCircleIcon, FileTextIcon, UserIcon } from "lucide-react"

export default function TimesheetDisputeDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data - in a real app, this would be fetched based on the ID
  const dispute = {
    id: params.id,
    worker: "John Smith",
    vendor: "TechStaff Solutions",
    workOrder: "WO-2024-001",
    issue: "Overtime Hours Discrepancy",
    description: "Worker claims 8 hours of overtime on Friday, but system shows only 6 hours logged.",
    amount: "$480",
    priority: "High",
    status: "Under Review",
    submittedDate: "2024-01-15",
    daysOpen: 3,
    lastActivity: "2024-01-17",
    assignedTo: "Sarah Johnson",
    comments: [
      {
        author: "John Smith",
        date: "2024-01-15",
        message: "I worked from 9 AM to 11 PM on Friday with 2 hours of overtime. The system is not reflecting the correct hours.",
      },
      {
        author: "Sarah Johnson",
        date: "2024-01-16",
        message: "Reviewing the access logs and project timeline. Will need to verify with the hiring manager.",
      },
    ],
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Pending Response":
        return "bg-yellow-100 text-yellow-800"
      case "Awaiting Documentation":
        return "bg-purple-100 text-purple-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        showBackButton={true}
        onBack={() => router.push("/msp-backend/timesheet-disputes")}
      />
      <div className="md:pl-64 flex flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <PageHeader
            title={`Timesheet Dispute ${dispute.id}`}
            description="Review and resolve timesheet dispute details"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">{dispute.id}</span>
                        <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                        <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
                      </div>
                      <h3 className="text-xl font-medium">{dispute.issue}</h3>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <UserIcon className="h-4 w-4" />
                          {dispute.worker}
                        </span>
                        <span>{dispute.vendor}</span>
                        <span>WO: {dispute.workOrder}</span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {dispute.daysOpen} days open
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{dispute.amount}</div>
                      <div className="text-sm text-gray-500">Disputed Amount</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-gray-600">{dispute.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Comments</h4>
                      <div className="space-y-4">
                        {dispute.comments.map((comment, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-gray-600">{comment.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Add Comment</h4>
                      <Textarea placeholder="Type your comment here..." className="mb-2" />
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <CheckCircleIcon className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button className="w-full" variant="outline">
                      <XCircleIcon className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquareIcon className="mr-2 h-4 w-4" />
                      Request Info
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Download Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dispute Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Submitted Date</div>
                      <div>{dispute.submittedDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Activity</div>
                      <div>{dispute.lastActivity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Assigned To</div>
                      <div>{dispute.assignedTo}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 