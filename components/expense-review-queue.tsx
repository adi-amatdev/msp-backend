import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSignIcon, ExternalLinkIcon, CalendarIcon } from "lucide-react"
import Link from "next/link"

export function ExpenseReviewQueue() {
  const expenses = [
    {
      id: "EXP-2024-089",
      worker: "Alice Brown",
      vendor: "TechStaff Solutions",
      category: "Travel",
      amount: "$1,245.50",
      submitted: "2024-01-15",
      status: "Pending Review",
      items: 4,
    },
    {
      id: "EXP-2024-090",
      worker: "David Wilson",
      vendor: "CloudTech Partners",
      category: "Equipment",
      amount: "$890.00",
      submitted: "2024-01-15",
      status: "Requires Documentation",
      items: 2,
    },
    {
      id: "EXP-2024-091",
      worker: "Emma Davis",
      vendor: "Design Collective",
      category: "Training",
      amount: "$650.00",
      submitted: "2024-01-14",
      status: "Under Review",
      items: 1,
    },
    {
      id: "EXP-2024-092",
      worker: "James Miller",
      vendor: "TechStaff Solutions",
      category: "Meals",
      amount: "$320.75",
      submitted: "2024-01-14",
      status: "Pending Review",
      items: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Requires Documentation":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Travel":
        return "bg-purple-100 text-purple-800"
      case "Equipment":
        return "bg-green-100 text-green-800"
      case "Training":
        return "bg-blue-100 text-blue-800"
      case "Meals":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <DollarSignIcon className="h-5 w-5" />
          Expense Review Queue
        </CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/msp-backend/expense-management">
            View All
            <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{expense.id}</span>
                  <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                </div>
                <p className="text-sm font-medium">{expense.worker}</p>
                <p className="text-xs text-gray-600">{expense.vendor}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {expense.submitted}
                  </span>
                  <span>{expense.items} items</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-lg font-bold text-green-600">{expense.amount}</span>
                <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
