"use client"

import { WifiIcon, WifiOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ConnectionStatusProps {
  isConnected: boolean
}

export default function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={cn(
        "flex items-center gap-2 text-xs mb-3 p-2 rounded-full w-fit",
        isConnected
          ? "bg-green-500/10 text-green-500 border border-green-500/20"
          : "bg-red-500/10 text-red-500 border border-red-500/20",
      )}
    >
      {isConnected ? (
        <>
          <motion.div
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <WifiIcon className="h-3 w-3" />
          </motion.div>
          <span>متصل به پشتیبانی</span>
        </>
      ) : (
        <>
          <motion.div
            // animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <WifiOffIcon className="h-3 w-3" />
          </motion.div>
          <span>قطع ارتباط با سرور</span>
        </>
      )}
    </motion.div>
  )
}
