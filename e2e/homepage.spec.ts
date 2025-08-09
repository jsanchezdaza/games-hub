import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Javi's Games Hub/);
  });

  test('should display main header', async ({ page }) => {
    const header = page.getByRole('heading', { name: '🎮 Javi\'s Games Hub' });
    await expect(header).toBeVisible();
  });

  test('should display all game cards', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 3, name: 'Connect 4' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Quest Forge' })).toBeVisible();
  });

  test('should show correct game statuses', async ({ page }) => {
    await expect(page.getByText('🟢 Available')).toBeVisible();
    await expect(page.getByText('🟡 In Development')).toBeVisible();
  });

  test('should display game descriptions', async ({ page }) => {
    await expect(page.getByText(/Classic strategy game/)).toBeVisible();
    await expect(page.getByText(/Classic text-based role-playing game/)).toBeVisible();
  });

  test('should display technology tags', async ({ page }) => {
    await expect(page.getByText('React').first()).toBeVisible();
    await expect(page.getByText('TypeScript').first()).toBeVisible();
    await expect(page.getByText('CSS').first()).toBeVisible();
    await expect(page.getByText('Tailwind CSS')).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    await expect(page.getByText('About this Hub')).toBeVisible();
    await expect(page.getByText(/Welcome to my personal collection/)).toBeVisible();
    await expect(page.getByText(/The games are constantly evolving/)).toBeVisible();
  });

  test('should display footer with correct information', async ({ page }) => {
    const currentYear = new Date().getFullYear();
    await expect(page.getByText(`Developed by Javier Sánchez | ${currentYear}`)).toBeVisible();
    
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/jsanchezdaza');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    
    const portfolioLink = page.getByRole('link', { name: 'Portfolio' });
    await expect(portfolioLink).toHaveAttribute('href', 'https://javisan.dev');
    await expect(portfolioLink).toHaveAttribute('target', '_blank');
  });

  test('should have responsive layout', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});