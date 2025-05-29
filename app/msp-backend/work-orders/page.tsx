"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-backend-sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileTextIcon, PlusIcon, EditIcon, EyeIcon, DownloadIcon, FilterIcon, SearchIcon } from "lucide-react"
import Link from "next/link"

export default function WorkOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const workOrders = [
    {
      id: "WO-2024-001",
      title: "Senior React Developer",
      vendor: "TechStaff Solutions",
      client: "Acme Corp",
      status: "Active",
      priority: "High",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      amount: "$85,000",
      approvedBy: "John Manager",
      created: "2024-01-15",
    },
    {
      id: "WO-2024-002",
      title: "DevOps Engineer",
      vendor: "CloudTech Partners",
      client: "Beta Inc",
      status: "Pending Approval",
      priority: "Medium",
      startDate: "2024-02-15",
      endDate: "2024-12-15",
      amount: "$92,000",
      approvedBy: "Pending",
      created: "2024-01-14",
    },
    {
      id: "WO-2024-003",
      title: "UX Designer",
      vendor: "Design Collective",
      client: "Gamma LLC",
      status: "Draft",
      priority: "Low",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      amount: "$68,000",
      approvedBy: "Pending",
      created: "2024-01-13",
    },
    {
      id: "WO-2024-004",
      title: "Full Stack Developer",
      vendor: "TechStaff Solutions",
      client: "Delta Corp",
      status: "Completed",
      priority: "Medium",
      startDate: "2023-08-01",
      endDate: "2024-01-31",
      amount: "$78,000",
      approvedBy: "Sarah Director",
      created: "2023-07-20",
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <PageHeader
            title="Work Orders Management"
            description="Create, modify, and track work orders based on hiring manager approvals"
            action={
              <Button asChild>
                <Link href="/msp-backend/work-orders/create">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Work Order
                </Link>
              </Button>
            }
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
                  <Input placeholder="Search work orders..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vendors</SelectItem>
                    <SelectItem value="techstaff">TechStaff Solutions</SelectItem>
                    <SelectItem value="cloudtech">CloudTech Partners</SelectItem>
                    <SelectItem value="design">Design Collective</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Work Orders ({workOrders.length})
              </CardTitle>
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                        </div>
                        <h3 className="text-xl font-medium">{order.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Vendor:</span>
                            <p className="font-medium">{order.vendor}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Client:</span>
                            <p className="font-medium">{order.client}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <p className="font-medium">
                              {order.startDate} - {order.endDate}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Amount:</span>
                            <p className="font-medium text-green-600">{order.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Created: {order.created}</span>
                          <span>Approved by: {order.approvedBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <EditIcon className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
