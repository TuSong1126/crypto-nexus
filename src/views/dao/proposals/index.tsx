const ProposalsPage = (): JSX.Element => {
  return (
    <div className="proposals-container">
      <div className="proposals-header">
        <h2>提案列表</h2>
        <button className="create-proposal-btn">创建提案</button>
      </div>

      <div className="proposals-filter">
        <select className="filter-select">
          <option value="all">全部提案</option>
          <option value="active">活跃提案</option>
          <option value="passed">已通过</option>
          <option value="rejected">已拒绝</option>
        </select>
        <input type="text" placeholder="搜索提案..." className="search-input" />
      </div>

      <div className="proposals-list">
        <div className="proposal-item">
          <div className="proposal-status active">活跃</div>
          <div className="proposal-content">
            <h3>提案 #1: 增加社区基金分配比例</h3>
            <p className="proposal-description">将社区基金分配比例从当前的5%增加到8%，以支持更多社区项目开发。</p>
            <div className="proposal-meta">
              <span className="proposal-date">提交于: 2023-06-15</span>
              <span className="proposal-votes">总票数: 1,245</span>
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
              <span className="proposal-date">提交于: 2023-05-28</span>
              <span className="proposal-votes">总票数: 2,876</span>
            </div>
          </div>
          <div className="proposal-actions">
            <button className="view-details-btn">查看详情</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalsPage
