import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

interface ActionCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  onClick?: () => void
  variant?: 'default' | 'primary' | 'secondary'
}

const ActionCard = ({ title, description, icon, children, onClick, variant = 'default' }: ActionCardProps) => {
  return (
    <StyleWrapper $variant={variant} onClick={onClick} $clickable={!!onClick}>
      <div className="card-header">
        {icon && <div className="card-icon">{icon}</div>}
        <div className="card-title">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      {children && <div className="card-content">{children}</div>}
    </StyleWrapper>
  )
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(108, 92, 231, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(108, 92, 231, 0);
  }
`

interface StyleWrapperProps {
  $variant: 'default' | 'primary' | 'secondary'
  $clickable: boolean
}

const StyleWrapper = styled.div<StyleWrapperProps>`
  background: ${(props) =>
    props.$variant === 'primary'
      ? 'linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(108, 92, 231, 0.05))'
      : props.$variant === 'secondary'
        ? 'linear-gradient(135deg, rgba(0, 206, 201, 0.2), rgba(0, 206, 201, 0.05))'
        : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};

  &:hover {
    transform: ${(props) => (props.$clickable ? 'translateY(-5px)' : 'none')};
    border-color: ${(props) =>
      props.$variant === 'primary'
        ? 'rgba(108, 92, 231, 0.3)'
        : props.$variant === 'secondary'
          ? 'rgba(0, 206, 201, 0.3)'
          : 'rgba(255, 255, 255, 0.2)'};

    ${(props) =>
      props.$clickable &&
      `
      animation: ${pulse} 1.5s infinite;
    `}
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => (props.children ? '16px' : '0')};
  }

  .card-icon {
    font-size: 2rem;
    margin-right: 16px;
    color: ${(props) =>
      props.$variant === 'primary'
        ? '#6c5ce7'
        : props.$variant === 'secondary'
          ? '#00cec9'
          : 'rgba(255, 255, 255, 0.7)'};
  }

  .card-title {
    h3 {
      margin: 0 0 8px 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #ffffff;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .card-content {
    margin-top: 16px;
  }
`

export default ActionCard
