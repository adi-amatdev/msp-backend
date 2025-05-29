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
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
  FilterIcon,
  SearchIcon,
  DownloadIcon,
  EyeIcon,
  AlertTriangleIcon,
  DollarSignIcon,
} from "lucide-react"

export default function ExpenseManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [category, setCategory] = useState("all")
  const [compliance, setCompliance] = useState("all")

  const expenses = [
    {
      id: "EXP-2024-001",
      worker: "John Smith",
      vendor: "TechStaff Solutions",
      workOrder: "WO-2024-001",
      category: "Travel",
      description: "Client site visit for project kickoff",
      amount: "$450.00",
      submittedDate: "2024-01-15",
      status: "Pending Review",
      priority: "Medium",
      receipts: 3,
      policyCompliance: "Compliant",
      items: [
        { description: "Flight tickets", amount: "$320.00" },
        { description: "Hotel accommodation", amount: "$100.00" },
        { description: "Meals", amount: "$30.00" },
      ],
      notes: "Required travel for project initiation meeting with client stakeholders.",
    },
    {
      id: "EXP-2024-002",
      worker: "Sarah Johnson",
      vendor: "CloudTech Partners",
      workOrder: "WO-2024-002",
      category: "Equipment",
      description: "Laptop and software licenses",
      amount: "$2,150.00",
      submittedDate: "2024-01-14",
      status: "Policy Review",
      priority: "High",
      receipts: 2,
      policyCompliance: "Requires Review",
      items: [
        { description: "MacBook Pro", amount: "$1,800.00" },
        { description: "Software licenses", amount: "$350.00" },
      ],
      notes: "Equipment purchase exceeds standard allowance. Requires manager approval.",
    },
    {
      id: "EXP-2024-003",
      worker: "Mike Chen",
      vendor: "Design Collective",
      workOrder: "WO-2024-003",
      category: "Training",
      description: "Professional development course",
      amount: "$800.00",
      submittedDate: "2024-01-13",
      status: "Approved",
      priority: "Low",
      receipts: 1,
      policyCompliance: "Compliant",
      items: [{ description: "UX Design Certification", amount: "$800.00" }],
      notes: "Pre-approved training course for skill development.",
    },
    {
      id: "EXP-2024-004",
      worker: "Lisa Wong",
      vendor: "TechStaff Solutions",
      workOrder: "WO-2024-001",
      category: "Meals",
      description: "Client entertainment expenses",
      amount: "$180.00",
      submittedDate: "2024-01-12",
      status: "Rejected",
      priority: "Low",
      receipts: 2,
      policyCompliance: "Non-Compliant",
      items: [
        { description: "Business dinner", amount: "$120.00" },
        { description: "Drinks", amount: "$60.00" },
      ],
      notes: "Alcohol expenses not covered under company policy.",
    },
  ]

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.worker.toLowerCase().includes(search.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(search.toLowerCase()) ||
      expense.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || expense.status === status;
    const matchesCategory = category === "all" || expense.category === category;
    const matchesCompliance = compliance === "all" || expense.policyCompliance === compliance;
    return matchesSearch && matchesStatus && matchesCategory && matchesCompliance;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Policy Review":
        return "bg-orange-100 text-orange-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
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

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "Compliant":
        return "bg-green-100 text-green-800"
      case "Requires Review":
        return "bg-yellow-100 text-yellow-800"
      case "Non-Compliant":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="w-full min-h-screen bg-white p-4 md:p-6 space-y-6">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <PageHeader
        title="Expense Management"
        description="Review and approve expense submissions from vendors and workers"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">12</p>
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
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">3</p>
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
                <p className="text-2xl font-bold">$15.2K</p>
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
              <Input placeholder="Search expenses..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Policy Review">Policy Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Meals">Meals</SelectItem>
              </SelectContent>
            </Select>
            <Select value={compliance} onValueChange={setCompliance}>
              <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <SelectValue placeholder="Compliance" />
              </SelectTrigger>
              <SelectContent className="select-content-menu">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Compliant">Compliant</SelectItem>
                <SelectItem value="Requires Review">Requires Review</SelectItem>
                <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredExpenses.map((expense) => (
          <Card key={expense.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{expense.id}</span>
                    <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                    <Badge className={getPriorityColor(expense.priority)}>{expense.priority}</Badge>
                    <Badge className={getComplianceColor(expense.policyCompliance)}>
                      {expense.policyCompliance}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-medium">{expense.description}</h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>{expense.worker}</span>
                    <span>{expense.vendor}</span>
                    <span>WO: {expense.workOrder}</span>
                    <span>{expense.category}</span>
                    <span>{expense.receipts} receipts</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{expense.amount}</div>
                  <div className="text-sm text-gray-500">Submitted: {expense.submittedDate}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Expense Details</TabsTrigger>
                  <TabsTrigger value="policy">Policy Check</TabsTrigger>
                  <TabsTrigger value="actions">Review Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Expense Items</h4>
                      <div className="space-y-2">
                        {expense.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">{item.description}</span>
                            <span className="font-medium">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Notes</h4>
                      <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{expense.notes}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Receipts ({expense.receipts})
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="policy" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Policy Compliance Check</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm">Amount within limits</span>
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm">Valid business purpose</span>
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <span className="text-sm">Receipt quality</span>
                          <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Policy Notes</h4>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Travel expenses require pre-approval for amounts over $500. Equipment purchases must
                          include business justification.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Review Actions</h4>
                      <div className="space-y-2">
                        <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          Approve Expense
                        </Button>
                        <Button className="w-full justify-start" variant="destructive">
                          <XCircleIcon className="h-4 w-4 mr-2" />
                          Reject Expense
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          Request Additional Information
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Review Comments</h4>
                      <Textarea placeholder="Add comments for approval/rejection..." rows={4} />
                      <Button variant="outline" className="w-full">
                        Save Comments
                      </Button>
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
