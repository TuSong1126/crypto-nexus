// tsx--->bable|swc--->React.createElement  编译为一个函数

const React = {
  createElement(type, props, ...children) {
    return {
      type,
      level: 'createElement',
      props: {
        ...props,
        children: children.map((child) => {
          if (typeof child === 'object') {
            return child
          } else {
            // 如果是文本节点
            return React.createTextElement(child)
          }
        })
      }
    }
  },
  // 创建一个文本节点
  createTextElement(text) {
    // 原生方式
    // const textNode = document.createTextNode()
    // textNode.nodeValue = text

    return {
      type: 'TEXT_ELEMENT',
      level: 'createTextElement',
      props: {
        nodeValue: text,
        children: []
      }
    }
  }
}

const vdom = React.createElement('div', { id: 1 }, React.createElement('span', null, 'tusong'))

console.log('Virtual DOM:', vdom)
