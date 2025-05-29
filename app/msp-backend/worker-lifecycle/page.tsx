"use client"

import { useState } from "react"
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
  UserPlusIcon,
  UserMinusIcon,
  CalendarIcon,
  BellIcon,
  FilterIcon,
  SearchIcon,
  MailIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react"
import Link from "next/link"

export default function WorkerLifecyclePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [vendor, setVendor] = useState("all");

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

  const filteredRequests = lifecycleRequests.filter((request) => {
    const matchesSearch =
      request.worker.toLowerCase().includes(search.toLowerCase()) ||
      request.vendor.toLowerCase().includes(search.toLowerCase()) ||
      request.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || request.type === type;
    const matchesStatus = status === "all" || request.status === status;
    const matchesPriority = priority === "all" || request.priority === priority;
    const matchesVendor = vendor === "all" || request.vendor === vendor;
    return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesVendor;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Onboarding":
        return "bg-green-100 text-green-800"
      case "Offboarding":
        return "bg-orange-100 text-orange-800"
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
    <main className="w-full min-h-screen bg-white p-4 md:p-6 space-y-6">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <PageHeader
        title="Worker Lifecycle Management"
        description="Manage worker onboarding and offboarding requests with vendor notifications"
        action={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/msp-backend/worker-lifecycle/onboard">
                <UserPlusIcon className="h-4 w-4 mr-2" />
                New Onboarding
              </Link>
            </Button>
            <Button asChild>
              <Link href="/msp-backend/worker-lifecycle/offboard">
                <UserMinusIcon className="h-4 w-4 mr-2" />
                New Offboarding
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserPlusIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Onboarding</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UserMinusIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Offboarding</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed This Month</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search requests..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Onboarding">Onboarding</SelectItem>
                <SelectItem value="Offboarding">Offboarding</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vendor} onValueChange={setVendor}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Vendor" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Vendors</SelectItem>
                <SelectItem value="TechStaff Solutions">TechStaff Solutions</SelectItem>
                <SelectItem value="CloudTech Partners">CloudTech Partners</SelectItem>
                <SelectItem value="Design Collective">Design Collective</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{request.id}</span>
                    <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                  </div>
                  <h3 className="text-xl font-medium">
                    {request.worker} - {request.position}
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>{request.vendor}</span>
                    <span>WO: {request.workOrder}</span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {request.startDate} - {request.endDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Submitted: {request.submittedDate}</div>
                  <div className="text-sm text-gray-500">By: {request.submittedBy}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Request Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Request Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Worker:</span>
                          <span className="font-medium">{request.worker}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Position:</span>
                          <span className="font-medium">{request.position}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Vendor:</span>
                          <span className="font-medium">{request.vendor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Work Order:</span>
                          <span className="font-medium">{request.workOrder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium">
                            {request.startDate} - {request.endDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Notes</h4>
                      <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{request.notes}</p>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Actions</h5>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MailIcon className="h-4 w-4 mr-2" />
                            Notify Vendor
                          </Button>
                          <Button size="sm" variant="outline">
                            <BellIcon className="h-4 w-4 mr-2" />
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Required Documents</h4>
                      <div className="space-y-2">
                        {request.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">{doc}</span>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Document Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          Upload Additional Documents
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Request Missing Documents
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Generate Completion Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Notification History</h4>
                      <div className="space-y-2">
                        {request.notifications.map((notification, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="text-sm font-medium">{notification.recipient}</span>
                              <p className="text-xs text-gray-500">{notification.date}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                notification.status === "Sent"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {notification.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Send New Notification</h4>
                      <div className="space-y-3">
                        <Select>
                          <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                            <SelectValue placeholder="Select recipient..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendor">Vendor</SelectItem>
                            <SelectItem value="hr">HR Department</SelectItem>
                            <SelectItem value="it">IT Department</SelectItem>
                            <SelectItem value="manager">Hiring Manager</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea placeholder="Custom message (optional)..." rows={3} />
                        <Button className="w-full">
                          <MailIcon className="h-4 w-4 mr-2" />
                          Send Notification
                        </Button>
                      </div>
                    </div>
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
