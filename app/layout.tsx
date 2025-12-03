import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GsapProvider } from "@/components/gsap-provider"
import { TransitionProvider } from "@/components/transition-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ayzio Technology - CRM System",
  description: "Awwwards-inspired site using Next.js, GSAP, and Three.js",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={inter.className}>
      <body className="bg-gradient-to-br from-gray-50 via-white to-blue-50/20 text-gray-900">
        <GsapProvider>
          <TransitionProvider>
            <main>{children}</main>
            <Toaster position="top-center" />
          </TransitionProvider>
        </GsapProvider>
      </body>
    </html>
  )
}
