import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, context: any) {
  console.log('c', context)

  return NextResponse.json({ ok: true })
}
