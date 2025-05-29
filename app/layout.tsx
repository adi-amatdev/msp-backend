import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LayoutWrapper from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MSP Frontend Team - TalentBridge",
  description: "MSP Frontend Team Platform for Managing Hiring Process",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
