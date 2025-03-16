import styled from 'styled-components'

const VotingPage = (): JSX.Element => {
  return (
    <StyleWrapper>
      <div className="voting-container">
        <h2>投票</h2>

        <div className="proposal-details">
          <h3>提案 #1: 增加社区基金分配比例</h3>
          <p className="proposal-description">将社区基金分配比例从当前的5%增加到8%，以支持更多社区项目开发。</p>

          <div className="proposal-info">
            <div className="info-item">
              <span className="info-label">提交人:</span>
              <span className="info-value">0x71C...9E3F</span>
            </div>
            <div className="info-item">
              <span className="info-label">提交时间:</span>
              <span className="info-value">2023-06-15</span>
            </div>
            <div className="info-item">
              <span className="info-label">投票截止时间:</span>
              <span className="info-value">2023-06-22</span>
            </div>
          </div>
        </div>

        <div className="voting-status">
          <div className="status-header">
            <h4>当前投票状态</h4>
            <span className="time-remaining">剩余时间: 3天 14小时</span>
          </div>

          <div className="vote-bars">
            <div className="vote-type">
              <div className="vote-label">
                <span className="vote-option">赞成</span>
                <span className="vote-percentage">68%</span>
              </div>
              <div className="progress-bar">
                <div className="progress approve" style={{ width: '68%' }}></div>
              </div>
              <span className="vote-count">850票</span>
            </div>

            <div className="vote-type">
              <div className="vote-label">
                <span className="vote-option">反对</span>
                <span className="vote-percentage">32%</span>
              </div>
              <div className="progress-bar">
                <div className="progress reject" style={{ width: '32%' }}></div>
              </div>
              <span className="vote-count">395票</span>
            </div>
          </div>
        </div>

        <div className="voting-actions">
          <h4>投下您的一票</h4>
          <div className="voting-buttons">
            <button className="vote-button approve">赞成</button>
            <button className="vote-button reject">反对</button>
          </div>
          <p className="voting-note">注意：投票一旦提交将无法更改</p>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .voting-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 28px;
    margin-top: 20px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: #ffffff;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #6c5ce7, #00cec9);
      border-radius: 2px;
    }
  }

  .proposal-details {
    margin-bottom: 32px;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: #ffffff;
    }

    .proposal-description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 20px;
    }
  }

  .proposal-info {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
    margin-top: 20px;

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .info-value {
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .voting-status {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;

    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h4 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #ffffff;
        margin: 0;
      }

      .time-remaining {
        background: rgba(116, 185, 255, 0.2);
        color: #74b9ff;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .vote-bars {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .vote-type {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .vote-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;

      .vote-option {
        font-weight: 500;
      }

      .vote-percentage {
        font-weight: 700;
      }
    }

    .progress-bar {
      height: 12px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      border-radius: 6px;
      transition: width 0.5s ease;

      &.approve {
        background: linear-gradient(90deg, #00b894, #00cec9);
      }

      &.reject {
        background: linear-gradient(90deg, #d63031, #ff7675);
      }
    }

    .vote-count {
      text-align: right;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .voting-actions {
    background: rgba(108, 92, 231, 0.1);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid rgba(108, 92, 231, 0.3);

    h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 20px;
    }

    .voting-buttons {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;

      @media (max-width: 500px) {
        flex-direction: column;
      }
    }

    .vote-button {
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;

      &.approve {
        background: linear-gradient(135deg, #00b894, #00cec9);
        color: #ffffff;

        &:hover {
          background: linear-gradient(135deg, #00cec9, #00b894);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
        }
      }

      &.reject {
        background: linear-gradient(135deg, #d63031, #ff7675);
        color: #ffffff;

        &:hover {
          background: linear-gradient(135deg, #ff7675, #d63031);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 118, 117, 0.3);
        }
      }
    }

    .voting-note {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      margin-top: 16px;
    }
  }
`

export default VotingPage
