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
      <body className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 text-gray-900 relative">
        <GsapProvider>
          <TransitionProvider>
            {/* Ana içerik - bottom nav'ın üzerinde olmaması için */}
            <main className="relative z-10">
              {children}
            </main>
            <Toaster position="top-center" />
          </TransitionProvider>
        </GsapProvider>
        
        {/* Bottom nav'ın her zaman en üstte olmasını sağla */}
        <style jsx global>{`
          /* Bottom nav için özel z-index garantisi */
          .bottom-nav {
            z-index: 99999 !important;
          }
          
          /* Tüm overlay'leri bottom nav'ın altına it */
          .transition-container,
          .gsap-container,
          [class*="overlay"],
          [class*="modal"],
          [class*="dialog"] {
            z-index: auto !important;
          }
          
          /* Body'nin bottom nav'ı kesmemesini sağla */
          body {
            overflow-x: hidden !important;
            padding-bottom: 0 !important;
          }
        `}</style>
      </body>
    </html>
  )
}
