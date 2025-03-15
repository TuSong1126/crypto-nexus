import { HTMLAttributes, ReactNode } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface Web3CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'glass' | 'outline'
  hover?: boolean
  animate?: boolean
  glow?: boolean
  title?: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
}

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(108, 92, 231, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(108, 92, 231, 0.8), 0 0 30px rgba(0, 206, 201, 0.4);
  }
  100% {
    box-shadow: 0 0 5px rgba(108, 92, 231, 0.5);
  }
`

const CardContainer = styled.div<Omit<Web3CardProps, 'children' | 'title' | 'subtitle' | 'icon'>>`
  position: relative;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  overflow: hidden;

  ${(props) =>
    props.hover &&
    css`
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
    `}

  ${(props) =>
    props.animate &&
    css`
      animation: ${float} 4s ease-in-out infinite;
    `}
  
  ${(props) =>
    props.glow &&
    css`
      animation: ${glow} 2s infinite;
    `}
  
  ${(props) => {
    switch (props.variant) {
      case 'gradient':
        return css`
          background: linear-gradient(135deg, rgba(108, 92, 231, 0.8), rgba(0, 206, 201, 0.8));
          color: #fff;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(0, 206, 201, 0.2));
            backdrop-filter: blur(10px);
            z-index: -1;
          }
        `
      case 'glass':
        return css`
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
        `
      case 'outline':
        return css`
          background: transparent;
          border: 2px solid rgba(108, 92, 231, 0.5);
          color: #fff;

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 16px;
            padding: 2px;
            background: linear-gradient(45deg, #6c5ce7, #00cec9);
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }
        `
      default: // default
        return css`
          background: rgba(15, 14, 19, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
        `
    }
  }}
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  background: rgba(108, 92, 231, 0.2);
  border-radius: 50%;
  color: #6c5ce7;
`

const TitleContainer = styled.div`
  flex: 1;
`

const Title = styled.h3`
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 600;
`

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`

const CardContent = styled.div`
  position: relative;
`

const Web3Card: React.FC<Web3CardProps> = ({
  variant = 'default',
  hover = true,
  animate = false,
  glow = false,
  title,
  subtitle,
  icon,
  children,
  ...props
}) => {
  return (
    <CardContainer variant={variant} hover={hover} animate={animate} glow={glow} {...props}>
      {(title || icon) && (
        <CardHeader>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          {(title || subtitle) && (
            <TitleContainer>
              {title && <Title>{title}</Title>}
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </TitleContainer>
          )}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  )
}

export default Web3Card
