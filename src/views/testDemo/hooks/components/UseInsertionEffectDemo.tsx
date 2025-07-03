import { useInsertionEffect, useRef } from 'react'

export default function UseInsertionEffectDemo() {
  const ref = useRef<HTMLDivElement>(null)
  useInsertionEffect(() => {
    if (ref.current) {
      ref.current.style.color = 'red'
    }
  }, [])
  return <div ref={ref}>useInsertionEffect applied color</div>
}
