import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      react(),
      env.VITE_MOCK_DEV_SERVER === 'true' ? mockDevServerPlugin() : null,
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')], //svg地址
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      {
        ...viteCompression(),
        apply: 'build'
      }
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src') // @代替src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd']
          }
        }
      }
    },
    base: '/',
    server: {
      // 允许IP访问
      host: '0.0.0.0',
      // 应用端口 (默认:8888)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /** 代理前缀为 /dev-api 的请求  */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    }
  })
}
