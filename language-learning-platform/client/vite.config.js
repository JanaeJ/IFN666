import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/language-learning/',  // 设置 base 路径前缀，确保生成的静态文件的路径前缀正确
  plugins: [react()],
  build: {
    outDir: 'dist',  // 输出目录，这里是 dist，Caddy 配置应指向此目录
    rollupOptions: {
      input: {
        main: './index.html',  // 确保入口文件是 index.html
      }
    }
  },
});
