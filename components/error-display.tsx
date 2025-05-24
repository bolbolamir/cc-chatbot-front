"use client"

import { AlertCircleIcon, XIcon, RefreshCwIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ErrorDisplayProps {
  error: string
  onRetry: () => void
  onDismiss: () => void
}

export default function ErrorDisplay({ error, onRetry, onDismiss }: ErrorDisplayProps) {
  return (
    <motion.div
      className="absolute top-4 left-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Alert variant="destructive" className="flex items-center justify-between fun-shadow border-2 border-red-500/20">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 1 }}
          >
            <AlertCircleIcon className="h-5 w-5" />
          </motion.div>
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={onRetry}
              className="h-8 w-8 rounded-full border-red-500/30 hover:bg-red-500/10"
            >
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={onDismiss}
              className="h-8 w-8 rounded-full border-red-500/30 hover:bg-red-500/10"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </Alert>
    </motion.div>
  )
}
