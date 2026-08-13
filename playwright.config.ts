import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './e2e',

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  }
});