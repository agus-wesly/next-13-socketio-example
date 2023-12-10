'use client'

import { EffectCallback, useEffect } from 'react'

export default function useOnMounted(callbackFn: EffectCallback) {
  useEffect(callbackFn, [])
}
