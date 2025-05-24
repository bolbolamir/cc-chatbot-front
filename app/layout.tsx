import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Vazirmatn } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const vazirmatn = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazirmatn" })

export const metadata: Metadata = {
  title: "Snapp Chat",
  description: "Snapp Ride-Hailing Chat Support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} ${vazirmatn.variable} font-vazirmatn`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
