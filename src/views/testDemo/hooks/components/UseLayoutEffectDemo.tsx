import { useLayoutEffect, useRef } from 'react'

export default function UseLayoutEffectDemo() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.background = '#e0f7fa'
    }
  }, [])
  return <div ref={ref}>useLayoutEffect applied background</div>
}
