import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

interface StatsCardProps {
  title: string
  value: string | number
  trend?: {
    type: 'up' | 'down' | 'neutral'
    value: string
  }
  icon?: ReactNode
  variant?: 'default' | 'gradient' | 'glass'
}

const StatsCard = ({ title, value, trend, icon, variant = 'default' }: StatsCardProps) => {
  return (
    <StyleWrapper $variant={variant}>
      <div className="card-content">
        <div className="stat-info">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {trend && (
            <div className={`trend-indicator ${trend.type}`}>
              {trend.type === 'up' && '↑ '}
              {trend.type === 'down' && '↓ '}
              {trend.value}
            </div>
          )}
        </div>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
    </StyleWrapper>
  )
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

interface StyleWrapperProps {
  $variant: 'default' | 'gradient' | 'glass'
}

const StyleWrapper = styled.div<StyleWrapperProps>`
  background: ${(props) =>
    props.$variant === 'glass'
      ? 'rgba(255, 255, 255, 0.05)'
      : props.$variant === 'gradient'
        ? 'linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(0, 206, 201, 0.2))'
        : 'rgba(255, 255, 255, 0.05)'};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    animation: ${glow} 2s infinite;
  }

  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .stat-info {
    flex: 1;
  }

  .stat-title {
    font-size: var(--font-size-base);
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(45deg, #6c5ce7, #00cec9);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .trend-indicator {
    font-size: var(--font-size-sm);
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;

    &.up {
      color: #00b894;
      background-color: rgba(0, 184, 148, 0.1);
    }

    &.down {
      color: #ff7675;
      background-color: rgba(255, 118, 117, 0.1);
    }

    &.neutral {
      color: #fdcb6e;
      background-color: rgba(253, 203, 110, 0.1);
    }
  }

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--font-size-xl);
  }
`

export default StatsCard
