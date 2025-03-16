import { Icon } from '@iconify/react'
import styled from 'styled-components'

const ProposalsPage = (): JSX.Element => {
  return (
    <StyleWrapper>
      <div className="proposals-container">
        <div className="proposals-header">
          <h2>提案列表</h2>
          <button className="create-proposal-btn">
            <Icon icon="mdi:plus" className="icon" />
            创建提案
          </button>
        </div>

        <div className="proposals-filter">
          <div className="filter-group">
            <Icon icon="mdi:filter-variant" className="filter-icon" />
            <select className="filter-select">
              <option value="all">全部提案</option>
              <option value="active">活跃提案</option>
              <option value="passed">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div className="search-group">
            <Icon icon="mdi:magnify" className="search-icon" />
            <input type="text" placeholder="搜索提案..." className="search-input" />
          </div>
        </div>

        <div className="proposals-list">
          <div className="proposal-item">
            <div className="proposal-status active">活跃</div>
            <div className="proposal-content">
              <h3>提案 #1: 增加社区基金分配比例</h3>
              <p className="proposal-description">将社区基金分配比例从当前的5%增加到8%，以支持更多社区项目开发。</p>
              <div className="proposal-meta">
                <span className="proposal-date">
                  <Icon icon="mdi:calendar" className="meta-icon" />
                  提交于: 2023-06-15
                </span>
                <span className="proposal-votes">
                  <Icon icon="mdi:vote" className="meta-icon" />
                  总票数: 1,245
                </span>
              </div>
            </div>
            <div className="proposal-actions">
              <button className="view-details-btn">查看详情</button>
            </div>
          </div>

          <div className="proposal-item">
            <div className="proposal-status passed">已通过</div>
            <div className="proposal-content">
              <h3>提案 #2: 调整治理参数</h3>
              <p className="proposal-description">降低提案通过所需的最低投票率从30%到25%，以提高治理效率。</p>
              <div className="proposal-meta">
                <span className="proposal-date">
                  <Icon icon="mdi:calendar" className="meta-icon" />
                  提交于: 2023-05-28
                </span>
                <span className="proposal-votes">
                  <Icon icon="mdi:vote" className="meta-icon" />
                  总票数: 2,876
                </span>
              </div>
            </div>
            <div className="proposal-actions">
              <button className="view-details-btn">查看详情</button>
            </div>
          </div>

          <div className="proposal-item">
            <div className="proposal-status rejected">已拒绝</div>
            <div className="proposal-content">
              <h3>提案 #3: 新增激励机制</h3>
              <p className="proposal-description">为社区贡献者提供额外的代币奖励，鼓励更多的社区参与。</p>
              <div className="proposal-meta">
                <span className="proposal-date">
                  <Icon icon="mdi:calendar" className="meta-icon" />
                  提交于: 2023-05-10
                </span>
                <span className="proposal-votes">
                  <Icon icon="mdi:vote" className="meta-icon" />
                  总票数: 1,782
                </span>
              </div>
            </div>
            <div className="proposal-actions">
              <button className="view-details-btn">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  .proposals-container {
    padding: 20px 0;
  }

  .proposals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      position: relative;
      display: inline-block;
      margin: 0;

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

    .create-proposal-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      .icon {
        font-size: 1.2rem;
      }

      &:hover {
        background: linear-gradient(135deg, #a29bfe, #6c5ce7);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
      }
    }
  }

  .proposals-filter {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    .filter-group,
    .search-group {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 0 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .filter-group {
      width: 220px;

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    .search-group {
      flex: 1;
    }

    .filter-icon,
    .search-icon {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.2rem;
      margin-right: 8px;
    }

    .filter-select,
    .search-input {
      background: transparent;
      border: none;
      color: #ffffff;
      padding: 12px 0;
      width: 100%;
      font-size: 1rem;
      outline: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    .filter-select {
      cursor: pointer;

      option {
        background: #2d3436;
        color: #ffffff;
      }
    }
  }

  .proposals-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .proposal-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 24px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .proposal-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    height: fit-content;
    white-space: nowrap;

    &.active {
      background-color: rgba(0, 184, 148, 0.1);
      color: #00b894;
      border: 1px solid rgba(0, 184, 148, 0.3);
    }

    &.passed {
      background-color: rgba(116, 185, 255, 0.1);
      color: #74b9ff;
      border: 1px solid rgba(116, 185, 255, 0.3);
    }

    &.rejected {
      background-color: rgba(255, 118, 117, 0.1);
      color: #ff7675;
      border: 1px solid rgba(255, 118, 117, 0.3);
    }

    @media (max-width: 768px) {
      width: fit-content;
    }
  }

  .proposal-content {
    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 12px;
      color: #ffffff;
    }

    .proposal-description {
      font-size: 1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 16px;
    }
  }

  .proposal-meta {
    display: flex;
    gap: 20px;

    @media (max-width: 500px) {
      flex-direction: column;
      gap: 8px;
    }

    .proposal-date,
    .proposal-votes {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .meta-icon {
      margin-right: 6px;
      font-size: 1.1rem;
    }
  }

  .proposal-actions {
    display: flex;
    align-items: flex-start;

    .view-details-btn {
      background: transparent;
      color: #6c5ce7;
      border: 1px solid #6c5ce7;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(108, 92, 231, 0.1);
        transform: translateY(-2px);
      }
    }
  }
`

export default ProposalsPage
