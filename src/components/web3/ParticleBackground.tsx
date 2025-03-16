import { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface ParticleProps {
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
  speed?: number
  connectParticles?: boolean
  opacity?: number
}

// 使用$前缀来标记样式属性，避免它们传递到DOM
interface ParticleContainerProps {
  $connectParticles?: boolean
}

const ParticleContainer = styled.div<ParticleContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`

const ParticleBackground = ({
  count = 100,
  color = '#6c5ce7',
  minSize = 1,
  maxSize = 3,
  speed = 0.5,
  connectParticles = true,
  opacity = 0.8
}: ParticleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // 设置canvas大小为窗口大小
    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 粒子类
    class Particle {
      x: number
      y: number
      directionX: number
      directionY: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.directionX = Math.random() * 2 - 1
        this.directionY = Math.random() * 2 - 1
        this.size = Math.random() * (maxSize - minSize) + minSize
        this.color = color
      }

      // 更新粒子位置
      update() {
        if (this.x > width || this.x < 0) {
          this.directionX = -this.directionX
        }
        if (this.y > height || this.y < 0) {
          this.directionY = -this.directionY
        }

        this.x += this.directionX * speed
        this.y += this.directionY * speed
      }

      // 绘制粒子
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = opacity
        ctx.fill()
      }
    }

    // 创建粒子数组
    const particles: Particle[] = []
    const createParticles = () => {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    // 连接粒子
    const connectParticlesDots = () => {
      if (!ctx) return
      const connectionDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.globalAlpha = ((connectionDistance - distance) / connectionDistance) * opacity
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // 动画循环
    const animate = () => {
      if (!ctx) return
      animationRef.current = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      if (connectParticles) {
        connectParticlesDots()
      }
    }

    createParticles()
    animate()

    // 清理
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [count, color, minSize, maxSize, speed, connectParticles, opacity])

  return (
    <ParticleContainer $connectParticles={connectParticles}>
      <Canvas ref={canvasRef} />
    </ParticleContainer>
  )
}

export default ParticleBackground
