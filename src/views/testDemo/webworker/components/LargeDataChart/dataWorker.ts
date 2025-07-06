// dataWorker.ts
self.onmessage = (event: MessageEvent) => {
  const { data, chunkSize } = event.data

  // 分片处理数据
  const chunks: any[] = []
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize))
  }

  // 模拟异步分片发送
  let index = 0
  const sendChunk = () => {
    if (index < chunks.length) {
      self.postMessage({ chunk: chunks[index], index })
      index++
      setTimeout(sendChunk, 100) // 模拟逐步发送
    } else {
      self.postMessage({ done: true })
    }
  }

  sendChunk()
}
