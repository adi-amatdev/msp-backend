"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-backend-sidebar"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Your content goes here */}
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p>Welcome to the MSP Backend!</p>
          </div>
        </main>
      </div>
    </div>
  )
}
