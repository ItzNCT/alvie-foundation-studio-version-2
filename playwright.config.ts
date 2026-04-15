import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Thư mục chứa các file test (ví dụ: ./tests hoặc ./e2e tùy bạn đặt)
  testDir: './e2e', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Báo cáo HTML sau khi test xong
  use: {
    // Đảm bảo port trùng với port Vite đang chạy (thường là 8080)
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Tự động bật server dev trước khi chạy test
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});