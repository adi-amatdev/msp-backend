"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-sidebar"
import { MspDashboardStats } from "@/components/msp-dashboard-stats"
import { ActiveJobRequirements } from "@/components/active-job-requirements"
import { PendingApprovals } from "@/components/pending-approvals"
import {  WorkerLifecycleCards } from "@/components/recent-submissions"
import { QuickActions } from "@/components/quick-actions"
import { Link, UserCircleIcon } from "lucide-react"
import { Button } from "react-day-picker"
import { WorkOrderManagement } from "./job-requirements-table"

export function MspFrontendDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {/* Left side: Title and Description */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Backend Team Dashboard</h1>
                <p className="text-gray-600">Manage the complete hiring pipeline from job creation to offer release</p>
              </div>

              {/* Right side: User icon and label */}
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5" />
                <span className="ml-2 text-sm font-semibold">Backend Team Account</span>
              </div>
            </div>
            <MspDashboardStats />

            <QuickActions />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <WorkOrderManagement />
              <PendingApprovals />
            </div>

            <WorkerLifecycleCards />
          </div>
        </main>
      </div>
    </div>
  )
}
