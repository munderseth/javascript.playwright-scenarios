require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');
const isWSL = !!process.env.WSL_DISTRO_NAME;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit/results.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--window-position=80,80',
            '--window-size=1440,900',
            '--start-maximized',
            ...(isWSL ? ['--ozone-platform=x11', '--disable-gpu'] : [])
          ]
        }
      }
    }
  ],
  outputDir: 'test-results/artifacts'
});