const ImmediatePriority = 1 // 立即执行的优先级, 级别最高 [点击事件，输入框，]
const UserBlockingPriority = 2 // 用户阻塞级别的优先级, [滚动，拖拽这些]
const NormalPriority = 3 // 正常的优先级 [redner 列表 动画 网络请求]
const LowPriority = 4 // 低优先级  [分析统计]
const IdlePriority = 5 // 最低阶的优先级, 可以被闲置的那种 [console.log]

// 获取当前时间
function getCurrentTime() {
  return performance.now()
}

class SimpleScheduler {
  constructor() {
    this.taskQueue = [] // 任务队列
    this.isPerformingWork = false // 当前是否在执行任务

    // 使用 MessageChannel 处理任务调度
    const channel = new MessageChannel()
    this.port = channel.port2
    channel.port1.onmessage = this.performWorkUntilDeadline.bind(this)
  }

  // 调度任务
  scheduleCallback(priorityLevel, callback) {
    const curTime = getCurrentTime()
    let timeout
    // 根据优先级设置超时时间
    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = -1
        break
      case UserBlockingPriority:
        timeout = 250
        break
      case LowPriority:
        timeout = 10000
        break
      case IdlePriority:
        timeout = 1073741823
        break
      case NormalPriority:
      default:
        timeout = 5000
        break
    }

    const task = {
      callback,
      priorityLevel,
      expirationTime: curTime + timeout // 直接根据当前时间加上超时时间
    }

    this.push(this.taskQueue, task) // 将任务加入队列
    this.schedulePerformWorkUntilDeadline()
  }

  // 通过 MessageChannel 调度执行任务
  schedulePerformWorkUntilDeadline() {
    if (!this.isPerformingWork) {
      this.isPerformingWork = true
      this.port.postMessage(null) // 触发 MessageChannel 调度
    }
  }

  // 执行任务
  performWorkUntilDeadline() {
    this.isPerformingWork = true
    this.workLoop()
    this.isPerformingWork = false
  }

  // 任务循环
  workLoop() {
    let curTask = this.peek(this.taskQueue)
    while (curTask) {
      const callback = curTask.callback
      if (typeof callback === 'function') {
        callback() // 执行任务
      }
      this.pop(this.taskQueue) // 移除已完成任务
      curTask = this.peek(this.taskQueue) // 获取下一个任务
    }
  }

  // 获取队列中的任务
  peek(queue) {
    return queue[0] || null
  }

  // 向队列中添加任务
  push(queue, task) {
    queue.push(task)
    queue.sort((a, b) => a.expirationTime - b.expirationTime) // 根据优先级排序，优先级高的在前 从小到大
  }

  // 从队列中移除任务
  pop(queue) {
    return queue.shift()
  }
}

// 测试---执行顺序为 2 4 5 1 3
const scheduler = new SimpleScheduler()

scheduler.scheduleCallback(LowPriority, () => {
  console.log('Task 1: Low Priority')
})

scheduler.scheduleCallback(ImmediatePriority, () => {
  console.log('Task 2: Immediate Priority')
})

scheduler.scheduleCallback(IdlePriority, () => {
  console.log('Task 3: Idle Priority')
})

scheduler.scheduleCallback(UserBlockingPriority, () => {
  console.log('Task 4: User Blocking Priority')
})

scheduler.scheduleCallback(NormalPriority, () => {
  console.log('Task 5: Normal Priority')
})
