"use client"

import { MoonIcon, SunIcon, CarIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ChatHeaderProps {
  isConnected: boolean
}

export default function ChatHeader({ isConnected }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.header
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-10 glass-effect p-4 flex justify-between items-center fun-shadow"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 20, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-500 p-2 rounded-full shadow-lg"
        >
          <CarIcon className="h-6 w-6 text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold">اسنپ چت</h1>
          <div className="flex items-center gap-2">
            <motion.span
              className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
              animate={{
                scale: isConnected ? [1, 1.5, 1] : 1,
                boxShadow: isConnected
                  ? [
                      "0 0 0 0 rgba(0, 209, 112, 0)",
                      "0 0 0 10px rgba(0, 209, 112, 0.3)",
                      "0 0 0 0 rgba(0, 209, 112, 0)",
                    ]
                  : "none",
              }}
              transition={{ repeat: isConnected ? Number.POSITIVE_INFINITY : 0, duration: 2 }}
            ></motion.span>
            <span className="text-xs text-muted-foreground">{isConnected ? "آنلاین" : "آفلاین"}</span>
          </div>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="relative rounded-full h-10 w-10 fun-shadow"
        >
          <motion.div
            initial={false}
            animate={{
              rotate: theme === "dark" ? 180 : 0,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-indigo-500" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </motion.header>
  )
}
