const SwapPage = (): JSX.Element => {
  return (
    <div className="swap-container">
      <h2>代币交换</h2>
      <div className="swap-card">
        <div className="swap-form">
          <div className="form-group">
            <label>从</label>
            <input type="text" placeholder="0.0" />
            <select>
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
            </select>
          </div>
          <div className="swap-icon">↓</div>
          <div className="form-group">
            <label>到</label>
            <input type="text" placeholder="0.0" />
            <select>
              <option value="usdt">USDT</option>
              <option value="eth">ETH</option>
            </select>
          </div>
          <button className="swap-button">交换</button>
        </div>
      </div>
    </div>
  )
}

export default SwapPage
