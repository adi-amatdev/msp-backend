"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-backend-sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ClockIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  FilterIcon,
  SearchIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react"

export default function TimesheetDisputesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const router = useRouter()

  const disputes = [
    {
      id: "TD-2024-015",
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
          message:
            "I worked from 9 AM to 11 PM on Friday with 2 hours of overtime. The system is not reflecting the correct hours.",
        },
        {
          author: "Sarah Johnson",
          date: "2024-01-16",
          message: "Reviewing the access logs and project timeline. Will need to verify with the hiring manager.",
        },
      ],
    },
    {
      id: "TD-2024-016",
      worker: "Sarah Johnson",
      vendor: "CloudTech Partners",
      workOrder: "WO-2024-002",
      issue: "Missing Break Deductions",
      description: "Timesheet shows full 8 hours but worker took extended lunch breaks.",
      amount: "$120",
      priority: "Medium",
      status: "Pending Response",
      submittedDate: "2024-01-16",
      daysOpen: 1,
      lastActivity: "2024-01-16",
      assignedTo: "Mike Chen",
      comments: [
        {
          author: "Vendor Manager",
          date: "2024-01-16",
          message:
            "Worker was observed taking 2-hour lunch breaks on multiple days but timesheet shows standard deductions.",
        },
      ],
    },
    {
      id: "TD-2024-017",
      worker: "Mike Chen",
      vendor: "Design Collective",
      workOrder: "WO-2024-003",
      issue: "Holiday Pay Calculation",
      description: "Dispute over holiday pay rate calculation for Martin Luther King Jr. Day.",
      amount: "$320",
      priority: "Low",
      status: "Awaiting Documentation",
      submittedDate: "2024-01-12",
      daysOpen: 5,
      lastActivity: "2024-01-14",
      assignedTo: "Sarah Johnson",
      comments: [
        {
          author: "Mike Chen",
          date: "2024-01-12",
          message: "Holiday pay should be calculated at 1.5x rate but I was paid at regular rate.",
        },
        {
          author: "Sarah Johnson",
          date: "2024-01-14",
          message:
            "Need to review the contract terms for holiday pay calculations. Requesting documentation from vendor.",
        },
      ],
    },
  ]

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch = dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.worker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.issue.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dispute.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesPriority = priorityFilter === "all" || dispute.priority.toLowerCase() === priorityFilter.toLowerCase()
    const matchesAssignee = assigneeFilter === "all" || dispute.assignedTo.toLowerCase().includes(assigneeFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  const handleAction = (action: string, disputeId: string) => {
    switch (action) {
      case "approve":
        // Handle approval logic
        break
      case "reject":
        // Handle rejection logic
        break
      case "request-info":
        // Handle request for more information
        break
      case "view-details":
        router.push(`/msp-backend/timesheet-disputes/details/${disputeId}`)
        break
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
    <main className="w-full min-h-screen bg-white p-4 md:p-6 space-y-6">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <PageHeader
        title="Timesheet Dispute Resolution"
        description="Review and resolve timesheet disputes between workers and vendors"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search disputes..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="pending">Pending Response</SelectItem>
                <SelectItem value="awaiting">Awaiting Documentation</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredDisputes.map((dispute) => (
          <Card key={dispute.id}>
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
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-red-100">
                  <TabsTrigger  value="details">Details</TabsTrigger>
                  <TabsTrigger value="comments">Comments ({dispute.comments.length})</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Dispute Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Submitted:</span>
                          <span>{dispute.submittedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Activity:</span>
                          <span>{dispute.lastActivity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Assigned To:</span>
                          <span>{dispute.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Description</h4>
                      <p className="text-sm text-gray-600">{dispute.description}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4">
                  <div className="space-y-4">
                    {dispute.comments.map((comment, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">Add Comment</h4>
                    <Textarea placeholder="Enter your comment or resolution notes..." rows={3} />
                    <Button size="sm">
                      <MessageSquareIcon className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAction("view-details", dispute.id)}
                    >
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAction("approve", dispute.id)}
                    >
                      <CheckCircleIcon className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAction("reject", dispute.id)}
                    >
                      <XCircleIcon className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAction("request-info", dispute.id)}
                    >
                      <MessageSquareIcon className="mr-2 h-4 w-4" />
                      Request Info
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
