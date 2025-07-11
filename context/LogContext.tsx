"use client"
import { useUser } from "@clerk/nextjs"
import { createContext, ReactNode, useState } from "react"
import { LogContextType,LogEntry } from "@/utils/type"

export const Logcontext = createContext<LogContextType | null>(null)

const LogContextProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setlogs] = useState<LogEntry[]>([])
  const { user, isLoaded } = useUser()

  const addLogs = (message: string) => {
    if (!isLoaded || !user) return

    const adminName =
      user.fullName ||
      user.firstName ||
      user.username ||
      user.emailAddresses[0]?.emailAddress ||
      "Unknown"

    const newLog = {
      admin: adminName,
      timestamp: new Date().toLocaleString(),
      message,
    }



    setlogs((prev) => [newLog, ...prev])
  }

  return (
    <Logcontext.Provider value={{ logs, setlogs, addLogs  }}>
      {children}
    </Logcontext.Provider>
  )
}

export default LogContextProvider
