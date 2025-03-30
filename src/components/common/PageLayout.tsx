import { ReactNode } from 'react'
import styled from 'styled-components'

interface PageLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  actionButton?: ReactNode
}

const PageLayout = ({ title, subtitle, children, actionButton }: PageLayoutProps) => {
  return (
    <StyleWrapper>
      <div className="page-header">
        <div className="title-area">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        {actionButton && <div className="action-area">{actionButton}</div>}
      </div>
      <div className="page-content">{children}</div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  padding: 24px;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
    }
  }

  .title-area {
    display: flex;
    flex-direction: column;
  }

  .page-title {
    font-size: $font-size-xxl-rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(45deg, #6c5ce7, #00cec9);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #6c5ce7, #00cec9);
      border-radius: 2px;
    }
  }

  .page-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 16px 0 0 0;
  }

  .page-content {
    flex: 1;
  }
`

export default PageLayout
