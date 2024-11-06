import { defineConfig, ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return {
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/styles/variable.scss";',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/'),
        },
      },
    },
  }
}

// export default defineConfig({
//   plugins: [vue()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         javascriptEnabled: true,
//         additionalData: '@import "./src/assets/styles/variable.scss";',
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
//     },
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })
