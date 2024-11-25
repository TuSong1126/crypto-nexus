import { Button } from 'antd'

export default function Home() {
  const logout = () => {
    console.log('退出')
  }

  return (
    <>
      <Button type="primary" onClick={logout}>
        退出
      </Button>
    </>
  )
}
