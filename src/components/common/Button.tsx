import { ButtonHTMLAttributes, ReactNode } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  icon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
  glow?: boolean
  gradient?: boolean
  children: ReactNode
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  fullWidth = false,
  glow = false,
  gradient = true,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $glow={glow}
      $gradient={gradient && variant === 'primary'}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {icon && !loading && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </StyledButton>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  $size: 'small' | 'medium' | 'large'
  $fullWidth: boolean
  $glow: boolean
  $gradient: boolean
}

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${rotate} 1s linear infinite;
  margin-right: 10px;
`

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  position: relative;
  overflow: hidden;
  animation: ${(props) => (props.$glow ? `${glow} 2s infinite` : 'none')};

  ${(props) => {
    switch (props.$size) {
      case 'small':
        return css`
          padding: 6px 12px;
          font-size: 0.85rem;
        `
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: 1.1rem;
        `
      default: // medium
        return css`
          padding: 10px 18px;
          font-size: 1rem;
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
      case 'outline':
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
          background: ${props.$gradient ? 'linear-gradient(45deg, #6c5ce7, #00cec9)' : '#6c5ce7'};
          border: none;

          &:hover:not(:disabled) {
            background: ${props.$gradient ? 'linear-gradient(45deg, #8a7bff, #00fff7)' : '#8a7bff'};
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

  .button-icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
`

export default Button
