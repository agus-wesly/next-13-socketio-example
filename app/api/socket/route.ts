import { NextRequest, NextResponse } from 'next/server'
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import { Server } from 'socket.io'

const PORT = 5000

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MySocketType {
  io?: IOServer | undefined
}

let mySocket: MySocketType = {
  io: undefined,
}

export async function GET(request: NextRequest) {
  if (mySocket.io) {
    return NextResponse.json({ message: 'Connected' }, { status: 200 })
  }

  const io = new Server({
    path: '/api/socket',
    addTrailingSlash: false,
    cors: { origin: '*' },
  }).listen(4173)

  io.on('connection', (socket) => {
    const _socket = socket
    console.log('socket connect', socket.id)

    socket.on('disconnect', async () => {
      console.log('socket disconnect', socket.id)
    })

    _socket.on('add-message', async (val) => {
      io.emit('new-message', { from: socket.id, message: val })
    })
  })

  mySocket.io = io
  console.log('udh di set woi')
  return NextResponse.json({ message: 'bar' })
}
