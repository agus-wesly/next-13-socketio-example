'use client'

import useOnMounted from '@/app/hooks/useOnMounted'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Provider({ children }: Props) {
  useOnMounted(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

    let scriptTag = document.createElement('script')
    scriptTag.src = midtransScriptUrl

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    scriptTag.setAttribute(
      'data-client-key',
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    )

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  })

  return <>{children}</>
}
