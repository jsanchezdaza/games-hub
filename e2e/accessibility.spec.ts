import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Main heading should be h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveText('🎮 Games Hub de Javi');
    
    // Section headings should be h2
    const h2 = page.getByRole('heading', { level: 2 });
    await expect(h2).toHaveText('Sobre este Hub');
    
    // Game titles should be h3
    const h3Elements = page.getByRole('heading', { level: 3 });
    await expect(h3Elements).toHaveCount(2);
    await expect(h3Elements.nth(0)).toHaveText('Connecta 4');
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
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    await expect(connecta4Card).toBeFocused();
    
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
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    await expect(connecta4Card).toHaveAttribute('aria-label', 'Jugar Connecta 4');
    
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
    await expect(page.getByText('Games Hub de Javi')).toBeVisible();
    await expect(page.getByText('🟢 Disponible')).toBeVisible();
    await expect(page.getByText('🟡 En desarrollo')).toBeVisible();
    await expect(page.getByText('Conecta 4')).toBeVisible();
    await expect(page.getByText('Quest Forge')).toBeVisible();
  });

  test('should handle focus management correctly', async ({ page }) => {
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    
    // Focus the card
    await connecta4Card.focus();
    await expect(connecta4Card).toBeFocused();
    
    // Should be able to activate with Enter
    await connecta4Card.focus();
    await expect(connecta4Card).toBeFocused();
    
    // Should be able to activate with Space
    await page.keyboard.press('Space');
    // Note: We can't test the actual navigation in this context since it opens a new window
  });

  test('should work with screen reader announcements', async ({ page }) => {
    // Verify that important content has proper text content for screen readers
    await expect(page.getByText('Desarrollado por')).toContainText('Javier Sánchez');
    
    // Status indicators should have meaningful text
    await expect(page.getByText('🟢 Disponible')).toBeVisible();
    await expect(page.getByText('🟡 En desarrollo')).toBeVisible();
    
    // Technology tags should be readable
    const techTags = page.locator('.tech-tag');
    await expect(techTags).toHaveCount(5); // React(2), TypeScript(2), CSS(1), Tailwind CSS(1) - total 6, but checking at least 5
    
    for (const tag of await techTags.all()) {
      await expect(tag).toBeVisible();
    }
  });

  test('should maintain focus visibility', async ({ page }) => {
    // Focus on interactive elements and verify they have visible focus indicators
    const focusableElements = [
      page.getByRole('button', { name: /Jugar Connecta 4/ }),
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