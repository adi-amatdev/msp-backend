import { UserCircleIcon } from "lucide-react"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}


export function PageHeader({ title, description, action }: PageHeaderProps) {
  const paths = ["/msp-backend/work-orders/create"];
  const path = usePathname();
  if (paths.includes(path)){
    return null;
  }
  return (
    <div className="border-b pb-4">
      <div className="flex items-center justify-between py-4">
        <BackButton />
        <Button variant="ghost" size="sm" asChild className="font-medium">
          <Link href="/vendor-account" className="flex items-center gap-2">
            <UserCircleIcon className="h-5 w-5" />
            <span>Backend Team Account</span>
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
        {action && (
          <Button className="gap-2">
            <span className="text-lg">+</span>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
