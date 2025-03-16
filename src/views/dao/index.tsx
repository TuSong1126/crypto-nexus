import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Dao = () => {
  // 示例数据
  const proposals = [
    {
      id: 1,
      title: '提高生态系统激励计划预算',
      status: 'active',
      votes: { yes: 65, no: 20, abstain: 15 },
      endTime: '2023-12-15T18:00:00Z'
    },
    {
      id: 2,
      title: '协议升级：实现 DIP-23 标准',
      status: 'active',
      votes: { yes: 72, no: 8, abstain: 20 },
      endTime: '2023-12-18T18:00:00Z'
    }
  ]

  // 计算剩余时间
  const getTimeLeft = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr).getTime()
    const now = new Date().getTime()
    const diff = endTime - now

    if (diff <= 0) return '已结束'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    return `${days}天 ${hours}小时`
  }

  return (
    <StyleWrapper>
      <div className="header">
        <div className="title-section">
          <h1>DAO 社区治理</h1>
          <p className="description">去中心化自治组织，参与社区治理与决策</p>
        </div>
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-value">12</span>
            <span className="stat-label">活跃提案</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">342</span>
            <span className="stat-label">社区成员</span>
          </div>
          <div className="stat-card highlight">
            <span className="stat-value">62.8%</span>
            <span className="stat-label">参与率</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-button primary">
          <svg viewBox="0 0 24 24" width="18" height="18" className="action-icon">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          创建提案
        </button>
        <button className="action-button">
          <svg viewBox="0 0 24 24" width="18" height="18" className="action-icon">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z" />
          </svg>
          管理投票权
        </button>
        <button className="action-button">
          <svg viewBox="0 0 24 24" width="18" height="18" className="action-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          查看文档
        </button>
      </div>

      <div className="navigation">
        <button className="nav-item active">提案</button>
        <button className="nav-item">投票</button>
        <button className="nav-item">治理代币</button>
        <button className="nav-item">社区</button>
      </div>

      <div className="proposals-preview">
        <div className="section-header">
          <h2 className="section-title">活跃提案</h2>
          <button className="view-all-button">查看全部</button>
        </div>

        <div className="proposals-grid">
          {proposals.map((proposal) => (
            <div className="proposal-card" key={proposal.id}>
              <div className="proposal-header">
                <div className="proposal-status active">活跃</div>
                <div className="proposal-time-left">{getTimeLeft(proposal.endTime)}</div>
              </div>
              <h3 className="proposal-title">{proposal.title}</h3>

              <div className="vote-progress">
                <div className="progress-bar">
                  <div className="progress-yes" style={{ width: `${proposal.votes.yes}%` }}></div>
                  <div className="progress-no" style={{ width: `${proposal.votes.no}%` }}></div>
                  <div className="progress-abstain" style={{ width: `${proposal.votes.abstain}%` }}></div>
                </div>
                <div className="vote-legend">
                  <div className="legend-item">
                    <span className="color-dot yes"></span>
                    <span className="legend-label">赞成 {proposal.votes.yes}%</span>
                  </div>
                  <div className="legend-item">
                    <span className="color-dot no"></span>
                    <span className="legend-label">反对 {proposal.votes.no}%</span>
                  </div>
                  <div className="legend-item">
                    <span className="color-dot abstain"></span>
                    <span className="legend-label">弃权 {proposal.votes.abstain}%</span>
                  </div>
                </div>
              </div>

              <div className="proposal-actions">
                <button className="vote-button">投票</button>
                <button className="details-button">详情</button>
              </div>
            </div>
          ))}

          <div className="proposal-card new-proposal">
            <div className="plus-icon">+</div>
            <h3 className="new-proposal-title">创建新提案</h3>
            <p className="new-proposal-desc">分享您的想法，参与社区治理</p>
            <button className="create-button">创建提案</button>
          </div>
        </div>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .title-section {
    h1 {
      font-size: 2.5rem;
      background: linear-gradient(90deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .description {
      font-size: 1.1rem;
      color: #64748b;
      max-width: 450px;
    }
  }

  .stats-section {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
      margin-top: 1.5rem;
      width: 100%;
    }
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8fafc;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    min-width: 120px;
    border: 1px solid #e2e8f0;
    transition:
      transform 0.3s,
      box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
    }

    &.highlight {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none;

      .stat-value,
      .stat-label {
        color: white;
      }
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #334155;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.25rem;
    }
  }

  .quick-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .action-button {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    background-color: white;
    border: 1px solid #e2e8f0;
    color: #334155;
    transition: all 0.2s;
    font-weight: 500;

    .action-icon {
      margin-right: 0.5rem;
      fill: currentColor;
    }

    &:hover {
      background-color: #f8fafc;
      border-color: #cbd5e1;
    }

    &.primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border: none;

      &:hover {
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }
    }
  }

  .navigation {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
    overflow-x: auto;
    padding-bottom: 1px;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 3px;
    }

    .nav-item {
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      font-size: 1rem;
      color: #64748b;
      cursor: pointer;
      position: relative;
      white-space: nowrap;

      &.active {
        color: #6366f1;
        font-weight: 600;

        &:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #6366f1;
        }
      }

      &:hover:not(.active) {
        color: #334155;
      }
    }
  }

  .proposals-preview {
    margin-bottom: 2rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #334155;
  }

  .view-all-button {
    font-size: 0.9rem;
    color: #6366f1;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  .proposals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .proposal-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }

    &.new-proposal {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px dashed #cbd5e1;
      background-color: #f8fafc;
      text-align: center;
    }
  }

  .proposal-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .proposal-status {
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;

    &.active {
      background-color: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
  }

  .proposal-time-left {
    font-size: 0.8rem;
    color: #64748b;
  }

  .proposal-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  .vote-progress {
    margin-bottom: 1.5rem;
  }

  .progress-bar {
    height: 8px;
    background-color: #f1f5f9;
    border-radius: 4px;
    display: flex;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-yes {
    height: 100%;
    background-color: #10b981;
  }

  .progress-no {
    height: 100%;
    background-color: #ef4444;
  }

  .progress-abstain {
    height: 100%;
    background-color: #94a3b8;
  }

  .vote-legend {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
  }

  .color-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 0.35rem;

    &.yes {
      background-color: #10b981;
    }

    &.no {
      background-color: #ef4444;
    }

    &.abstain {
      background-color: #94a3b8;
    }
  }

  .legend-label {
    color: #64748b;
  }

  .proposal-actions {
    display: flex;
    gap: 0.5rem;
  }

  .vote-button,
  .details-button {
    flex: 1;
    padding: 0.65rem 0;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .vote-button {
    background-color: #6366f1;
    color: white;
    border: none;

    &:hover {
      background-color: #4f46e5;
    }
  }

  .details-button {
    background-color: white;
    color: #6366f1;
    border: 1px solid #6366f1;

    &:hover {
      background-color: #f5f3ff;
    }
  }

  .plus-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(99, 102, 241, 0.1);
    color: #6366f1;
    font-size: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .new-proposal-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .new-proposal-desc {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .create-button {
    background-color: transparent;
    color: #6366f1;
    border: 1px solid #6366f1;
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #6366f1;
      color: white;
    }
  }

  .content {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    min-height: 400px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
`

export default Dao
