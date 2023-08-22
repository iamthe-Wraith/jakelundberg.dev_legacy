import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	reporter: [['html', { open: 'never' }], [process.env.CI ? 'github' : 'list']],
	retries: 1,
	use: {
		trace: 'retain-on-failure'
	},
	expect: { timeout: 10000 }, // expect assertions timeout at 10 seconds
	timeout: 30000, // test timeout at 30 seconds
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] }
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] }
		}
	]
};

export default config;
