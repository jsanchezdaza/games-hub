import { test, expect } from '@playwright/test';

test.describe('Game Cards Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle live game card clicks', async ({ page, context }) => {
    // Create a new page promise before clicking
    const newPagePromise = context.waitForEvent('page');
    
    // Click on the live game (Connecta 4)
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    await expect(connecta4Card).toBeVisible();
    await connecta4Card.click();
    
    // Wait for the new page to open
    const newPage = await newPagePromise;
    await expect(newPage).toHaveURL('/connecta4');
  });

  test('should handle keyboard navigation for live games', async ({ page, context }) => {
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    await connecta4Card.focus();
    
    // Test Enter key
    const newPagePromise1 = context.waitForEvent('page');
    await connecta4Card.press('Enter');
    const newPage1 = await newPagePromise1;
    await expect(newPage1).toHaveURL('/connecta4');
    await newPage1.close();
    
    // Test Space key
    await connecta4Card.focus();
    const newPagePromise2 = context.waitForEvent('page');
    await connecta4Card.press(' ');
    const newPage2 = await newPagePromise2;
    await expect(newPage2).toHaveURL('/connecta4');
  });

  test('should not be clickable for development games', async ({ page }) => {
    const questForgeCard = page.getByText('Quest Forge').locator('..');
    
    // Should not have button role or be focusable
    await expect(questForgeCard).not.toHaveAttribute('role', 'button');
    await expect(questForgeCard).not.toHaveAttribute('tabindex');
    
    // Should not open new page when clicked
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page', { timeout: 1000 }).catch(() => null),
      questForgeCard.click()
    ]);
    
    expect(newPage).toBeNull();
  });

  test('should display correct hover states for live games', async ({ page }) => {
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    
    // Check if the card has clickable class
    await expect(connecta4Card).toHaveClass(/clickable/);
    
    // Hover over the card
    await connecta4Card.hover();
    
    // Should still be visible and maintain its properties
    await expect(connecta4Card).toBeVisible();
    await expect(page.getByText('¡Jugar ahora! →')).toBeVisible();
  });

  test('should display all game card elements correctly', async ({ page }) => {
    // Test Connecta 4 card elements
    const connecta4Section = page.locator('.game-card').filter({ hasText: 'Connecta 4' });
    await expect(connecta4Section.getByText('🔴')).toBeVisible();
    await expect(connecta4Section.getByText('Connecta 4')).toBeVisible();
    await expect(connecta4Section.getByText(/Juego clásico de estrategia/)).toBeVisible();
    await expect(connecta4Section.getByText('🟢 Disponible')).toBeVisible();
    await expect(connecta4Section.getByText('¡Jugar ahora! →')).toBeVisible();
    await expect(connecta4Section.getByText('React')).toBeVisible();
    await expect(connecta4Section.getByText('TypeScript')).toBeVisible();
    await expect(connecta4Section.getByText('CSS')).toBeVisible();
    
    // Test Quest Forge card elements
    const questForgeSection = page.locator('.game-card').filter({ hasText: 'Quest Forge' });
    await expect(questForgeSection.getByText('⚔️')).toBeVisible();
    await expect(questForgeSection.getByText('Quest Forge')).toBeVisible();
    await expect(questForgeSection.getByText(/Herramienta para crear/)).toBeVisible();
    await expect(questForgeSection.getByText('🟡 En desarrollo')).toBeVisible();
    await expect(questForgeSection.getByText('React')).toBeVisible();
    await expect(questForgeSection.getByText('TypeScript')).toBeVisible();
    await expect(questForgeSection.getByText('Tailwind CSS')).toBeVisible();
    
    // Quest Forge should NOT have the play button
    await expect(questForgeSection.getByText('¡Jugar ahora! →')).not.toBeVisible();
  });

  test('should maintain accessibility standards', async ({ page }) => {
    // Check that live games have proper ARIA labels
    const connecta4Card = page.getByRole('button', { name: /Jugar Connecta 4/ });
    await expect(connecta4Card).toHaveAttribute('aria-label');
    
    // Check that non-live games don't have button semantics
    const questForgeCard = page.getByText('Quest Forge').locator('..');
    await expect(questForgeCard).not.toHaveRole('button');
    
    // Check that all links in footer have proper attributes
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const portfolioLink = page.getByRole('link', { name: 'Portfolio' });
    await expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});