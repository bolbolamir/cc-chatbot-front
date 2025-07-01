"use client"

import { useState, useEffect, useRef } from "react"
import type { Message } from "@/lib/types"
import ChatHeader from "@/components/chat-header"
import ChatMessages from "@/components/chat-messages"
import ChatInput from "@/components/chat-input"
import ErrorDisplay from "@/components/error-display"
import { motion, AnimatePresence } from "framer-motion"

const baseurl = "ws://localhost:8001/chat"

export default function ChatInterface() {
  const ws = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const connectWebSocket = () => {
      setIsConnecting(true)
      ws.current = new WebSocket(baseurl)

      ws.current.onopen = () => {
        setIsConnected(true)
        setIsConnecting(false)
        setError(null)
      }

      ws.current.onclose = () => {
        setIsConnected(false)
        setIsConnecting(true)
      }

      ws.current.onerror = (err) => {
        setError(`اتصال با مشکل مواجه شد`)
        setIsConnected(false)
        setIsConnecting(false)
      }

      ws.current.onmessage = (event) => {
        const message: Message = {
          id: Date.now().toString(),
          content: event.data,
          sender: "bot",
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, message])
        setIsLoading(false)
        setIsConnecting(false)
      }
    }

    connectWebSocket()

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  const sendMessage = (content: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      setError("اتصال برقرار نیست. لطفا دوباره تلاش کنید.")
      return
    }

    if (!content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)
    setIsConnecting(true)

    ws.current.send(content)
  }

  const retryConnection = () => {
    if (ws.current) {
      ws.current.close()
    }
    setError(null)
    setIsConnected(false)
    setIsConnecting(true)
    const connectWebSocket = () => {
      ws.current = new WebSocket(baseurl)

      ws.current.onopen = () => {
        setIsConnected(true)
        setIsConnecting(false)
        setError(null)
      }

      ws.current.onclose = () => {
        setIsConnected(false)
        setIsConnecting(false)
      }

      ws.current.onerror = () => {
        setError(`اتصال با مشکل مواجه شد`)
        setIsConnected(false)
        setIsConnecting(false)
      }

      ws.current.onmessage = (event) => {
        const message: Message = {
          id: Date.now().toString(),
          content: event.data,
          sender: "bot",
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, message])
        setIsLoading(false)
        setIsConnecting(false)
      }
    }
    connectWebSocket()
  }

  const clearError = () => setError(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-background fun-pattern border border-gray-200"
    >
      <ChatHeader isConnected={isConnected} />

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence>
          {error && !isConnecting && (
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
              <ErrorDisplay error={error} onRetry={retryConnection} onDismiss={clearError} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-full overflow-y-auto border border-gray-100">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>
      </div>

      <div className="p-4 glass-effect">
        {/* <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} /> */}
        <ChatInput onSendMessage={sendMessage} disabled={!isConnected || isLoading} />
      </div>
    </motion.div>
  )
}
