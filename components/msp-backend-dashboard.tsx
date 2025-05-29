"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-sidebar"
import { MspBackendDashboardStats } from "@/components/msp-backend-dashboard-stats"
import { BackendQuickActions } from "@/components/backend-quick-actions"
import { PendingWorkOrders } from "@/components/pending-work-orders"
import { RecentDisputes } from "@/components/recent-disputes"
import { ExpenseReviewQueue } from "@/components/expense-review-queue"

export function MspBackendDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MSP Backend Dashboard</h1>
              <p className="text-gray-600">Manage work orders, disputes, and worker lifecycle</p>
            </div>
          </div>

          <MspBackendDashboardStats />
          <BackendQuickActions />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingWorkOrders />
            <RecentDisputes />
          </div>

          <ExpenseReviewQueue />
        </main>
      </div>
    </div>
  )
}
