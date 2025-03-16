const VotingPage = (): JSX.Element => {
  return (
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
              <div className="progress" style={{ width: '68%', backgroundColor: '#4caf50' }}></div>
            </div>
            <span className="vote-count">850票</span>
          </div>

          <div className="vote-type">
            <div className="vote-label">
              <span className="vote-option">反对</span>
              <span className="vote-percentage">32%</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '32%', backgroundColor: '#f44336' }}></div>
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
  )
}

export default VotingPage
