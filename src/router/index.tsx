import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom'

import routes from '@/router/routes'

export default function Router() {
  const router = createHashRouter(routes as unknown as RouteObject[])

  return <RouterProvider router={router} />
}
