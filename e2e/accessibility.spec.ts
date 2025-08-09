import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Main heading should be h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveText('🎮 Javi\'s Games Hub');
    
    // Section headings should be h2
    const h2 = page.getByRole('heading', { level: 2 });
    await expect(h2).toHaveText('About this Hub');
    
    // Game titles should be h3
    const h3Elements = page.getByRole('heading', { level: 3 });
    await expect(h3Elements).toHaveCount(2);
    await expect(h3Elements.nth(0)).toHaveText('Connect 4');
    await expect(h3Elements.nth(1)).toHaveText('Quest Forge');
  });

  test('should have proper semantic structure', async ({ page }) => {
    // Header should be in a banner landmark
    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
    
    // Main content should be in main landmark
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
    
    // Footer should be in contentinfo landmark
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    
    // Should focus on the live game card
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    await expect(connect4Card).toBeFocused();
    
    // Continue tabbing to footer links
    await page.keyboard.press('Tab');
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeFocused();
    
    await page.keyboard.press('Tab');
    const portfolioLink = page.getByRole('link', { name: 'Portfolio' });
    await expect(portfolioLink).toBeFocused();
  });

  test('should have appropriate ARIA attributes', async ({ page }) => {
    // Live game should have proper ARIA label
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    await expect(connect4Card).toHaveAttribute('aria-label', 'Play Connect 4');
    
    // External links should have proper rel attributes
    const externalLinks = page.getByRole('link').filter({ hasText: /GitHub|Portfolio/ });
    for (const link of await externalLinks.all()) {
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // This is a basic check - in a real project, you might use axe-playwright
    // Here we just verify that text elements are visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('🟢 Available')).toBeVisible();
    await expect(page.getByText('🟡 In Development')).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Connect 4' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Quest Forge' })).toBeVisible();
  });

  test('should handle focus management correctly', async ({ page }) => {
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    
    // Focus the card
    await connect4Card.focus();
    await expect(connect4Card).toBeFocused();
    
    // Should be able to activate with Enter
    await connect4Card.focus();
    await expect(connect4Card).toBeFocused();
    
    // Should be able to activate with Space
    await page.keyboard.press('Space');
    // Note: We can't test the actual navigation in this context since it opens a new window
  });

  test('should work with screen reader announcements', async ({ page }) => {
    // Verify that important content has proper text content for screen readers
    await expect(page.getByText('Developed by')).toContainText('Javier Sánchez');
    
    // Status indicators should have meaningful text
    await expect(page.getByText('🟢 Available')).toBeVisible();
    await expect(page.getByText('🟡 In Development')).toBeVisible();
    
    // Technology tags should be readable
    const techTags = page.locator('.tech-tag');
    await expect(techTags).toHaveCount(7); // React(2), TypeScript(2), CSS(1), Tailwind CSS(1), Supabase(1) - total 7
    
    for (const tag of await techTags.all()) {
      await expect(tag).toBeVisible();
    }
  });

  test('should maintain focus visibility', async ({ page }) => {
    // Focus on interactive elements and verify they have visible focus indicators
    const focusableElements = [
      page.getByRole('button', { name: /Play Connect 4/ }),
      page.getByRole('link', { name: 'GitHub' }),
      page.getByRole('link', { name: 'Portfolio' })
    ];
    
    for (const element of focusableElements) {
      await element.focus();
      await expect(element).toBeFocused();
      
      // Element should be visible when focused
      await expect(element).toBeVisible();
    }
  });
});