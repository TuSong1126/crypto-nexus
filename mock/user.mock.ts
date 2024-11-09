import { defineMock } from './base'

export default defineMock([
  {
    url: 'users/me',
    method: ['GET'],
    body: {
      code: '00000',
      data: {
        userId: 1,
        nickname: '超级管理员',
        username: 'admin',
        roles: ['ROOT'],
        perms: [
          'sys:menu:delete',
          'sys:dept:edit',
          'sys:dict_type:add',
          'sys:dict:edit',
          'sys:dict:delete',
          'sys:dict_type:edit',
          'sys:menu:add',
          'sys:user:add',
          'sys:role:edit',
          'sys:dept:delete',
          'sys:user:edit'
        ]
      },
      msg: '一切ok'
    }
  }
])
