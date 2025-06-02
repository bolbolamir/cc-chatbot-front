"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { SendIcon, SmileIcon, MicIcon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight > 200 ? "200px" : `${scrollHeight}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 10px 25px -5px rgba(0, 209, 112, 0.3), 0 8px 10px -6px rgba(0, 209, 112, 0.2)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          className="flex items-end border gap-2 bg-background rounded-3xl p-1 fun-shadow "
        >
          <div className="flex gap-1 px-2 !self-center align-middle">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-green-500 p-2 rounded-full"
            >
              <SmileIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-green-500 p-2 rounded-full"
            >
              <ImageIcon className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="relative flex-grow">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="پیام خود را بنویسید..."
              className="resize-none rounded-3xl pr-4 pl-12 py-3 min-h-[50px] max-h-[200px] overflow-y-auto border-0 focus-visible:ring-1 focus-visible:ring-green-500"
              disabled={disabled}
              rows={1}
            />

            {message.trim() ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-2 bottom-2"
              >
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full w-9 h-9 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg shadow-green-500/30"
                  disabled={disabled || !message.trim()}
                >
                  <SendIcon className="h-5 w-5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute left-2 bottom-2">
                <Button
                  type="button"
                  size="icon"
                  className="rounded-full w-9 h-9 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg shadow-green-500/30"
                  disabled={disabled}
                >
                  <MicIcon className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}
