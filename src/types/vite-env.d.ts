interface ImportMetaEnv {
  /** 应用端口 */
  VITE_APP_PORT: number
  /** API 基础路径(代理前缀) */
  VITE_APP_BASE_API: string
  /** API 地址 */
  VITE_APP_API_URL: string
  /** 是否开启 Mock 服务 */
  VITE_MOCK_DEV_SERVER: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
