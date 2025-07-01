import { domMax, LazyMotion, m } from 'framer-motion'

type Props = {
  children: React.ReactNode
}
/**
 * [Reduce bundle size by lazy-loading a subset of Motion's features](https://www.framer.com/motion/lazy-motion/)
 */
export function MotionLazy({ children }: Props) {
  return (
    <LazyMotion features={domMax}>
      <m.div style={{ height: '100vh' }}> {children} </m.div>
    </LazyMotion>
  )
}
