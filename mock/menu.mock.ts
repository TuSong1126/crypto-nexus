import { defineMock } from './base'

export default defineMock([
  {
    url: 'menus/permission',
    method: ['GET'],
    body: {
      code: '00000',
      data: [],
      msg: '由后端返回菜单(路由)权限，前端按实际返回值,对应过滤之后，再动态添加路由(addRoute)'
    }
  }
])
