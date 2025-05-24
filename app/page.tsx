'use client'
import ChatInterface from "@/components/chat-interface"
import { useIsMobile } from "@/hooks/use-mobile"


export default function Home() {
  const isMobile = useIsMobile()

  return (
    <main className={`mx-auto h-screen ${isMobile ? 'w-screen' : 'w-[70vw]'} overflow-hidden`}>
      <ChatInterface />
    </main>
  )
}
