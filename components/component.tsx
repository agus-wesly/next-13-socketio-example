'use client'

// 100000000
// 1000000000

import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import type { Socket } from 'socket.io-client'

type Props = {}

export default function Component({}: Props) {
  let socketInstace = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  )
  let [messages, setMessages] = useState<
    Array<{ from: number; message: string }>
  >([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const socket = io(`:${4173}`, {
      path: '/api/socket',
      addTrailingSlash: false,
    })

    socket.on('connect', () => {
      socketInstace.current = socket
    })

    socket.on('disconnect', () => {
      socketInstace.current = null
    })

    socket.on('connect_error', async (err) => {
      console.log(`connect_error due to ${err.message}`)
      await fetch('/api/socket')
    })

    socket.on(
      'new-message',
      (newMessage: { from: number; message: string }) => {
        setMessages((prev) => [...prev, newMessage])
      }
    )

    return () => {
      socket.disconnect()
    }
  }, [])

  async function handleSubmit() {
    if (!socketInstace.current) return

    socketInstace.current.emit('add-message', msg)
  }

  return (
    <div>
      <h1>Message list : </h1>

      {messages.map((item) => (
        <div className="border" key={item.message}>
          <p>From : {item.from}</p>

          <p>{item.message}</p>
        </div>
      ))}

      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="bg-transparent border"
      />
      <button onClick={handleSubmit}>Add realtime message</button>
    </div>
  )
}
