import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import ActionCard from '@/components/common/ActionCard'
import Button from '@/components/common/Button'
import PageLayout from '@/components/common/PageLayout'
import StatsCard from '@/components/common/StatsCard'

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
    <PageLayout
      title="DAO 社区治理"
      subtitle="去中心化自治组织，参与社区治理与决策"
      actionButton={
        <Button variant="primary" size="medium" icon={<Icon icon="mdi:plus" />}>
          创建提案
        </Button>
      }
    >
      <StyleWrapper>
        <div className="stats-row">
          <StatsCard title="活跃提案" value="12" icon={<Icon icon="mdi:file-document-outline" />} variant="gradient" />
          <StatsCard
            title="社区成员"
            value="342"
            trend={{ type: 'up', value: '14人' }}
            icon={<Icon icon="mdi:account-group" />}
          />
          <StatsCard
            title="治理代币"
            value="158.5k"
            trend={{ type: 'up', value: '2.4%' }}
            icon={<Icon icon="mdi:ticket-percent" />}
          />
        </div>

        <div className="section">
          <h2 className="section-title">热门提案</h2>
          <div className="proposals-list">
            {proposals.map((proposal) => (
              <div className="proposal-card" key={proposal.id}>
                <div className="proposal-header">
                  <div className="proposal-badge active">进行中</div>
                  <div className="proposal-time-left">{getTimeLeft(proposal.endTime)}</div>
                </div>

                <h3 className="proposal-title">{proposal.title}</h3>

                <div className="vote-bars">
                  <div className="vote-bar-container">
                    <div className="vote-label">
                      <span>赞成</span>
                      <span>{proposal.votes.yes}%</span>
                    </div>
                    <div className="vote-bar-bg">
                      <div className="vote-bar vote-yes" style={{ width: `${proposal.votes.yes}%` }}></div>
                    </div>
                  </div>

                  <div className="vote-bar-container">
                    <div className="vote-label">
                      <span>反对</span>
                      <span>{proposal.votes.no}%</span>
                    </div>
                    <div className="vote-bar-bg">
                      <div className="vote-bar vote-no" style={{ width: `${proposal.votes.no}%` }}></div>
                    </div>
                  </div>

                  <div className="vote-bar-container">
                    <div className="vote-label">
                      <span>弃权</span>
                      <span>{proposal.votes.abstain}%</span>
                    </div>
                    <div className="vote-bar-bg">
                      <div className="vote-bar vote-abstain" style={{ width: `${proposal.votes.abstain}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="proposal-actions">
                  <Button variant="primary" size="small">
                    投票
                  </Button>
                  <Button variant="outline" size="small">
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">参与治理</h2>
          <div className="governance-actions">
            <ActionCard
              title="投票委托"
              description="将您的投票权委托给社区代表"
              icon={<Icon icon="mdi:account-check" />}
              variant="primary"
            >
              <Button variant="primary" fullWidth>
                委托投票
              </Button>
            </ActionCard>

            <ActionCard
              title="讨论区"
              description="参与提案讨论，分享您的想法"
              icon={<Icon icon="mdi:forum" />}
              variant="secondary"
            >
              <Button variant="secondary" fullWidth>
                前往讨论区
              </Button>
            </ActionCard>

            <ActionCard title="治理统计" description="查看历史提案和投票统计数据" icon={<Icon icon="mdi:chart-box" />}>
              <Button variant="outline" fullWidth>
                查看统计
              </Button>
            </ActionCard>
          </div>
        </div>

        <div className="content-outlet">
          <Outlet />
        </div>
      </StyleWrapper>
    </PageLayout>
  )
}

const StyleWrapper = styled.div`
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .section {
    margin-bottom: 36px;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #ffffff;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #6c5ce7, #00cec9);
      border-radius: 2px;
    }
  }

  .proposals-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .proposal-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .proposal-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .proposal-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;

    &.active {
      background-color: rgba(0, 184, 148, 0.1);
      color: #00b894;
    }

    &.completed {
      background-color: rgba(116, 185, 255, 0.1);
      color: #74b9ff;
    }

    &.rejected {
      background-color: rgba(255, 118, 117, 0.1);
      color: #ff7675;
    }
  }

  .proposal-time-left {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .proposal-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  .vote-bars {
    margin-bottom: 24px;
  }

  .vote-bar-container {
    margin-bottom: 12px;
  }

  .vote-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .vote-bar-bg {
    height: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }

  .vote-bar {
    height: 100%;
    border-radius: 4px;

    &.vote-yes {
      background: linear-gradient(90deg, #00b894, #00cec9);
    }

    &.vote-no {
      background: linear-gradient(90deg, #ff7675, #d63031);
    }

    &.vote-abstain {
      background: linear-gradient(90deg, #fdcb6e, #e17055);
    }
  }

  .proposal-actions {
    display: flex;
    gap: 12px;
  }

  .governance-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`

export default Dao
