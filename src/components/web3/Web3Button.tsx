import { ButtonHTMLAttributes, ReactNode } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface Web3ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  icon?: ReactNode
  isLoading?: boolean
  fullWidth?: boolean
  glow?: boolean
  gradient?: boolean
  children: ReactNode
}

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// 使用$前缀来标记样式属性，避免它们传递到DOM
interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'outlined' | 'ghost'
  $size?: 'small' | 'medium' | 'large'
  $fullWidth?: boolean
  $glow?: boolean
  $gradient?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  overflow: hidden;

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) => {
    switch (props.$size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `
      case 'large':
        return css`
          padding: 14px 32px;
          font-size: 18px;
        `
      default: // medium
        return css`
          padding: 12px 24px;
          font-size: 16px;
        `
    }
  }}
  
  ${(props) => {
    switch (props.$variant) {
      case 'secondary':
        return css`
          color: #fff;
          background: linear-gradient(45deg, #00b5ad, #00cec9);
          border: none;

          &:hover:not(:disabled) {
            background: linear-gradient(45deg, #00cec9, #81ecec);
            transform: translateY(-2px);
            box-shadow:
              0 7px 14px rgba(0, 0, 0, 0.3),
              0 0 10px rgba(0, 206, 201, 0.5);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
          }
        `
      case 'outlined':
        return css`
          color: #6c5ce7;
          background: transparent;
          border: 2px solid #6c5ce7;

          &:hover:not(:disabled) {
            background: rgba(108, 92, 231, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
          }
        `
      case 'ghost':
        return css`
          color: #6c5ce7;
          background: transparent;
          border: none;

          &:hover:not(:disabled) {
            background: rgba(108, 92, 231, 0.1);
          }

          &:active:not(:disabled) {
            background: rgba(108, 92, 231, 0.2);
          }
        `
      default: // primary
        return css`
          color: #fff;
          background: linear-gradient(45deg, #6c5ce7, #00cec9);
          border: none;

          &:hover:not(:disabled) {
            background: linear-gradient(45deg, #8a7bff, #00fff7);
            transform: translateY(-2px);
            box-shadow:
              0 7px 14px rgba(0, 0, 0, 0.3),
              0 0 10px rgba(108, 92, 231, 0.5);
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
          }
        `
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.$glow &&
    css`
      animation: ${glow} 2s infinite;
    `}

  ${(props) =>
    props.$gradient &&
    css`
      background-size: 200% 200%;
      background-position: 0% 0%;
      transition: background-position 0.5s ease;

      &:hover:not(:disabled) {
        background-position: 100% 100%;
      }
    `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
`

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${rotate} 1s linear infinite;
`

const Web3Button = ({
  variant = 'primary',
  size = 'medium',
  icon,
  isLoading = false,
  fullWidth = false,
  glow = false,
  gradient = true,
  children,
  ...props
}: Web3ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $glow={glow}
      $gradient={gradient}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  )
}

export default Web3Button
