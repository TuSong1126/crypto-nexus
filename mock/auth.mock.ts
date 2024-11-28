import { defineMock } from './base'

export default defineMock([
  {
    url: 'auth/login',
    method: ['POST'],
    body: {
      code: 200,
      data: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk',
        userInfo: {
          name: 'zhangsan',
          sex: 'man'
        }
      },
      msg: '登录'
    }
  },
  {
    url: 'auth/register',
    method: ['POST'],
    body: {
      code: 200,
      data: {},
      msg: '注册成功'
    }
  },
  {
    url: 'auth/permission',
    method: ['GET'],
    body: {
      code: 200,
      data: {
        btns: [
          'btn:article/list/edit',
          'btn:article/detail/edit',
          'btn:postOffice/list/edit',
          'btn:postOffice/detail/edit',
          'btn:timeAxis/list/edit',
          'btn:timeAxis/detail/edit',
          'btn:treeHole/list/edit',
          'btn:treeHole/detail/edit'
        ],
        routes: [
          'route:home',
          'route:article',
          'route:article/list',
          'route:article/detail',
          'route:postOffice',
          'route:postOffice/list',
          'route:postOffice/detail',
          'route:timeAxis',
          'route:timeAxis/list',
          'route:timeAxis/detail',
          'route:treeHole',
          'route:treeHole/list',
          'route:treeHole/detail'
        ]
      },
      msg: '获取权限'
    }
  }
])
