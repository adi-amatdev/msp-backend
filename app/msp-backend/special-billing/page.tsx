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
  StarIcon,
  PlusIcon,
  TrendingUpIcon,
  FilterIcon,
  SearchIcon,
  MailIcon,
  CheckCircleIcon,
  DollarSignIcon,
  CalendarIcon,
} from "lucide-react"
import Link from "next/link"

export default function SpecialBillingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [vendor, setVendor] = useState("all");

  const specialBillingCases = [
    {
      id: "SB-2024-001",
      type: "Performance Bonus",
      worker: "John Smith",
      vendor: "TechStaff Solutions",
      workOrder: "WO-2024-001",
      amount: "$2,500.00",
      reason: "Exceptional performance in Q4 project delivery",
      description: "Worker exceeded project expectations by delivering 2 weeks ahead of schedule with zero defects.",
      status: "Pending Approval",
      priority: "Medium",
      submittedDate: "2024-01-15",
      submittedBy: "Sarah Johnson",
      approvedBy: null,
      effectiveDate: "2024-01-31",
      category: "Performance",
      vendorNotified: false,
      paymentScheduled: false,
    },
    {
      id: "SB-2024-002",
      type: "Recognition Award",
      worker: "Maria Garcia",
      vendor: "CloudTech Partners",
      workOrder: "WO-2024-002",
      amount: "$1,000.00",
      reason: "Outstanding client feedback and innovation",
      description:
        "Client specifically requested to recognize worker for innovative solution that saved 40% processing time.",
      status: "Approved",
      priority: "Low",
      submittedDate: "2024-01-12",
      submittedBy: "Mike Chen",
      approvedBy: "Director Smith",
      effectiveDate: "2024-01-25",
      category: "Recognition",
      vendorNotified: true,
      paymentScheduled: true,
    },
    {
      id: "SB-2024-003",
      type: "Retention Bonus",
      worker: "David Kim",
      vendor: "Design Collective",
      workOrder: "WO-2024-003",
      amount: "$3,000.00",
      reason: "Contract extension retention incentive",
      description: "Critical worker for ongoing project. Retention bonus to secure 6-month contract extension.",
      status: "In Review",
      priority: "High",
      submittedDate: "2024-01-14",
      submittedBy: "Sarah Johnson",
      approvedBy: null,
      effectiveDate: "2024-02-01",
      category: "Retention",
      vendorNotified: false,
      paymentScheduled: false,
    },
    {
      id: "SB-2024-004",
      type: "Milestone Bonus",
      worker: "Lisa Wong",
      vendor: "TechStaff Solutions",
      workOrder: "WO-2024-001",
      amount: "$1,500.00",
      reason: "Successful completion of critical project milestone",
      description: "Worker successfully delivered Phase 1 of the project on time and within budget.",
      status: "Paid",
      priority: "Medium",
      submittedDate: "2024-01-08",
      submittedBy: "Mike Chen",
      approvedBy: "Manager Jones",
      effectiveDate: "2024-01-20",
      category: "Milestone",
      vendorNotified: true,
      paymentScheduled: true,
    },
  ]

  const filteredCases = specialBillingCases.filter((item) => {
    const matchesSearch =
      item.worker.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || item.type === type;
    const matchesStatus = status === "all" || item.status === status;
    const matchesPriority = priority === "all" || item.priority === priority;
    const matchesVendor = vendor === "all" || item.vendor === vendor;
    return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesVendor;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "In Review":
        return "bg-blue-100 text-blue-800"
      case "Paid":
        return "bg-purple-100 text-purple-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Performance Bonus":
        return "bg-green-100 text-green-800"
      case "Recognition Award":
        return "bg-blue-100 text-blue-800"
      case "Retention Bonus":
        return "bg-purple-100 text-purple-800"
      case "Milestone Bonus":
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
        title="Special Billing Management"
        description="Handle special billing cases including rewards, recognition, and bonuses for contingent workers"
        action={
          <Button asChild>
            <Link href="/msp-backend/special-billing/create">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Special Billing
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved This Month</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSignIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">$28.5K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUpIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
                <p className="text-2xl font-bold">3.2 days</p>
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
              <Input placeholder="Search billing cases..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Performance Bonus">Performance Bonus</SelectItem>
                <SelectItem value="Recognition Award">Recognition Award</SelectItem>
                <SelectItem value="Retention Bonus">Retention Bonus</SelectItem>
                <SelectItem value="Milestone Bonus">Milestone Bonus</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
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
        {filteredCases.map((billingCase) => (
          <Card key={billingCase.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{billingCase.id}</span>
                    <Badge className={getTypeColor(billingCase.type)}>{billingCase.type}</Badge>
                    <Badge className={getStatusColor(billingCase.status)}>{billingCase.status}</Badge>
                    <Badge className={getPriorityColor(billingCase.priority)}>{billingCase.priority}</Badge>
                  </div>
                  <h3 className="text-xl font-medium">
                    {billingCase.worker} - {billingCase.reason}
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>{billingCase.vendor}</span>
                    <span>WO: {billingCase.workOrder}</span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Effective: {billingCase.effectiveDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{billingCase.amount}</div>
                  <div className="text-sm text-gray-500">Submitted: {billingCase.submittedDate}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Case Details</TabsTrigger>
                  <TabsTrigger value="approval">Approval Process</TabsTrigger>
                  <TabsTrigger value="communication">Vendor Communication</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Case Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Worker:</span>
                          <span className="font-medium">{billingCase.worker}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Vendor:</span>
                          <span className="font-medium">{billingCase.vendor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Work Order:</span>
                          <span className="font-medium">{billingCase.workOrder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <span className="font-medium">{billingCase.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Amount:</span>
                          <span className="font-medium text-green-600">{billingCase.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Effective Date:</span>
                          <span className="font-medium">{billingCase.effectiveDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Description</h4>
                      <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{billingCase.description}</p>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Status Indicators</h5>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${billingCase.vendorNotified ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                            <span>Vendor Notified</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${billingCase.paymentScheduled ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                            <span>Payment Scheduled</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="approval" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Approval Status</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Submitted By:</span>
                          <span className="font-medium">{billingCase.submittedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Submitted Date:</span>
                          <span className="font-medium">{billingCase.submittedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Approved By:</span>
                          <span className="font-medium">{billingCase.approvedBy || "Pending"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Current Status:</span>
                          <Badge className={getStatusColor(billingCase.status)}>{billingCase.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Approval Actions</h4>
                      <div className="space-y-2">
                        <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          Approve Case
                        </Button>
                        <Button className="w-full justify-start" variant="destructive">
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          Reject Case
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          Request Additional Information
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Approval Comments</h5>
                        <Textarea placeholder="Add approval comments..." rows={3} />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="communication" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Vendor Notification</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Notification Status</span>
                            <Badge
                              className={
                                billingCase.vendorNotified
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {billingCase.vendorNotified ? "Sent" : "Pending"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">
                            {billingCase.vendorNotified
                              ? "Vendor has been notified of the special billing case."
                              : "Vendor notification pending approval."}
                          </p>
                        </div>
                        <Button className="w-full" variant="outline">
                          <MailIcon className="h-4 w-4 mr-2" />
                          {billingCase.vendorNotified ? "Resend Notification" : "Send Notification"}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Communication Template</h4>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template..." />
                          </SelectTrigger>
                          <SelectContent className="select-content-menu">
                            <SelectItem value="approval">Approval Notification</SelectItem>
                            <SelectItem value="payment">Payment Confirmation</SelectItem>
                            <SelectItem value="rejection">Rejection Notice</SelectItem>
                            <SelectItem value="custom">Custom Message</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Custom message to vendor..."
                          rows={4}
                          defaultValue={`Dear ${billingCase.vendor},\n\nWe are pleased to inform you of a special billing case for ${billingCase.worker}.\n\nCase Type: ${billingCase.type}\nAmount: ${billingCase.amount}\nReason: ${billingCase.reason}\n\nPlease process this additional payment according to your standard procedures.\n\nBest regards,\nMSP Backend Team`}
                        />
                        <Button className="w-full">
                          <MailIcon className="h-4 w-4 mr-2" />
                          Send Custom Message
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
