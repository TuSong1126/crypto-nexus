import styled from 'styled-components'

// 定义主题变量
export const theme = {
  primaryColor: '#6c5ce7',
  primaryDark: '#5849c2',
  secondaryColor: '#00b894',
  backgroundDark: '#121212',
  cardBg: '#1e1e24',
  textPrimary: '#fff',
  textSecondary: '#a0a0a0',
  errorColor: '#e74c3c',
  warningColor: '#f39c12',
  successColor: '#2ecc71',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  gradientBg: 'linear-gradient(135deg, #6c5ce7, #8e44ad)'
}

// 容器组件
export const Container = styled.div`
  position: relative;
  min-height: 90vh;
  padding: 1rem;
  color: ${(props) => props.theme.textPrimary};
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: ${(props) => props.theme.backgroundDark};
  background-image: radial-gradient(
    circle at 15% 50%,
    rgba(108, 92, 231, 0.08) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  overflow-x: hidden;
`

// 钱包连接容器（右上角）
export const WalletConnectContainer = styled.div`
  margin-bottom: 2rem;
`

// 内容区域
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideUp 0.6s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

export const LeftColumn = styled.div`
  width: 500px;
  transition: transform 0.3s ease;
`

export const RightColumn = styled.div`
  flex: 1;
  transition: transform 0.3s ease;
`

// 卡片组件
export const Card = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.cardBg};
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0)
  );
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`

export const CardTitle = styled.h2`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: -0.3px;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    margin-left: 10px;
    background: ${(props) => props.theme.gradientBg};
    border-radius: 2px;
  }
`

export const WalletConnectWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
`

// 表单样式
export const Form = styled.form``

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.textSecondary};
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 0.9rem;
  color: ${(props) => props.theme.textPrimary};
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${(props) => props.theme.primaryColor};
    outline: none;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

// 提示组件
export const Alert = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  animation: fadeIn 0.3s ease;
`

export const WarningAlert = styled(Alert)`
  color: ${(props) => props.theme.warningColor};
  background-color: rgba(243, 156, 18, 0.15);
  border-left: 4px solid ${(props) => props.theme.warningColor};
`

export const InfoAlert = styled(Alert)`
  color: ${(props) => props.theme.textPrimary};
  background-color: rgba(108, 92, 231, 0.15);
  border-left: 4px solid ${(props) => props.theme.primaryColor};
`

export const ErrorAlert = styled(Alert)`
  color: ${(props) => props.theme.errorColor};
  background-color: rgba(231, 76, 60, 0.15);
  border-left: 4px solid ${(props) => props.theme.errorColor};
`

// 按钮
export const Button = styled.button`
  display: inline-block;
  width: 100%;
  padding: 0.9rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
`

export const PrimaryButton = styled(Button)`
  color: white;
  background: ${(props) => props.theme.gradientBg};
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    transform: none;
    cursor: not-allowed;
    opacity: 0.7;
    filter: grayscale(30%);
    box-shadow: none;
  }
`

// 交易历史样式
export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

export const TransactionItem = styled.div`
  padding: 1.2rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${(props) => props.theme.borderRadius};
  transition: all 0.3s ease;
`

export const TransactionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const TransactionTitleContainer = styled.div``

export const TransactionTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`

export const TransactionTime = styled.div`
  margin-top: 0.3rem;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.85rem;
`

export const TransactionStatus = styled.div`
  padding: 0.4rem 0.9rem;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 20px;
`

export const PendingStatus = styled(TransactionStatus)`
  color: #f39c12;
  background-color: rgba(243, 156, 18, 0.15);
`

export const SuccessStatus = styled(TransactionStatus)`
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.15);
`

export const ErrorStatus = styled(TransactionStatus)`
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.15);
`

export const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

export const TransactionDetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`

export const DetailLabel = styled.div`
  min-width: 90px;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.9rem;
`

export const DetailValue = styled.div`
  word-break: break-all;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
`

export const TransactionHash = styled.a`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  color: ${(props) => props.theme.primaryColor};
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
`

export const EmptyIcon = styled.div`
  margin-bottom: 1rem;
  font-size: 3rem;
  opacity: 0.7;
`

export const EmptyText = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: 1.1rem;
`

// 主题提供者
export const ThemeProvider = styled.div`
  ${(props) =>
    Object.entries(props.theme)
      .map(([key, value]) => `--${key}: ${value};`)
      .join('\n')}
`
