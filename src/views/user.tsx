import { Await, useAsyncValue, useLoaderData } from 'react-router-dom'

import { fetchGetList } from '@/apis/user'
import type { User } from '@/router/loader'

export default function User() {
  const { data } = useLoaderData() as { data: Promise<User[]> }

  setTimeout(() => {
    fetchGetList()
  }, 1000)

  return (
    <Await resolve={data}>
      <List />
    </Await>
  )
}

const List = () => {
  const data = useAsyncValue() as User[]
  return (
    <>
      {data.map((o) => (
        <div key={o.id}>{o.name}</div>
      ))}
    </>
  )
}
