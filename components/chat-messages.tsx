"use client"

import { useEffect, useRef } from "react"
import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center p-8 rounded-2xl glass-effect fun-shadow max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            className="text-5xl mb-4"
          >
            👋
          </motion.div>
          <p className="text-muted-foreground">به پشتیبانی اسنپ خوش آمدید. چطور می‌توانیم به شما کمک کنیم؟</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4 py-6">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-start" : "justify-end" ,
              index > 0 && messages[index - 1].sender === message.sender ? "mt-2" : "mt-6",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] message-bubble",
                message.sender === "user" ? "message-bubble-user" : "message-bubble-bot",
              )}
            >
              <p className="break-words">{message.content}</p>
              <div className={cn("text-xs opacity-70 mt-1", message.sender === "user" ? "text-left" : "text-right")}>
                {new Date(message.timestamp).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Fun tail for message bubbles */}

            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex justify-end mt-6"
          >
            <div className="message-bubble message-bubble-bot">
              <div className="flex space-x-2 rtl:space-x-reverse py-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{
                      y: [0, -10, 0],
                      backgroundColor: ["#10b981", "#059669", "#10b981"],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  )
}
