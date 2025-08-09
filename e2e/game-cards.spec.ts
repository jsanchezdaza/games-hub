import { test, expect } from '@playwright/test';

test.describe('Game Cards Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle live game card clicks', async ({ page, context }) => {
    // Create a new page promise before clicking
    const newPagePromise = context.waitForEvent('page');
    
    // Click on the live game (Connect 4)
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    await expect(connect4Card).toBeVisible();
    await connect4Card.click();
    
    // Wait for the new page to open
    const newPage = await newPagePromise;
    await expect(newPage.url()).toContain('conecta4');
  });

  test('should handle keyboard navigation for live games', async ({ page, context }) => {
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    await connect4Card.focus();
    
    // Test Enter key
    const newPagePromise1 = context.waitForEvent('page');
    await connect4Card.press('Enter');
    const newPage1 = await newPagePromise1;
    await expect(newPage1.url()).toContain('conecta4');
    await newPage1.close();
    
    // Test Space key
    await connect4Card.focus();
    const newPagePromise2 = context.waitForEvent('page');
    await connect4Card.press(' ');
    const newPage2 = await newPagePromise2;
    await expect(newPage2.url()).toContain('conecta4');
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
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    
    // Check if the card has clickable class
    await expect(connect4Card).toHaveClass(/clickable/);
    
    // Hover over the card
    await connect4Card.hover();
    
    // Should still be visible and maintain its properties
    await expect(connect4Card).toBeVisible();
    await expect(page.getByText('Play now! →')).toBeVisible();
  });

  test('should display all game card elements correctly', async ({ page }) => {
    // Test Connect 4 card elements
    const connect4Section = page.locator('.game-card').filter({ hasText: 'Connect 4' });
    await expect(connect4Section.getByText('🔴')).toBeVisible();
    await expect(connect4Section.getByRole('heading', { level: 3, name: 'Connect 4' })).toBeVisible();
    await expect(connect4Section.getByText(/Classic strategy game/)).toBeVisible();
    await expect(connect4Section.getByText('🟢 Available')).toBeVisible();
    await expect(connect4Section.getByText('Play now! →')).toBeVisible();
    await expect(connect4Section.getByText('React')).toBeVisible();
    await expect(connect4Section.getByText('TypeScript')).toBeVisible();
    await expect(connect4Section.getByText('CSS')).toBeVisible();
    
    // Test Quest Forge card elements
    const questForgeSection = page.locator('.game-card').filter({ hasText: 'Quest Forge' });
    await expect(questForgeSection.getByText('⚔️')).toBeVisible();
    await expect(questForgeSection.getByRole('heading', { level: 3, name: 'Quest Forge' })).toBeVisible();
    await expect(questForgeSection.getByText(/Classic text-based role-playing game/)).toBeVisible();
    await expect(questForgeSection.getByText('🟡 In Development')).toBeVisible();
    await expect(questForgeSection.getByText('React')).toBeVisible();
    await expect(questForgeSection.getByText('TypeScript')).toBeVisible();
    await expect(questForgeSection.getByText('Tailwind CSS')).toBeVisible();
    await expect(questForgeSection.getByText('Supabase')).toBeVisible();
    
    // Quest Forge should NOT have the play button
    await expect(questForgeSection.getByText('Play now! →')).not.toBeVisible();
  });

  test('should maintain accessibility standards', async ({ page }) => {
    // Check that live games have proper ARIA labels
    const connect4Card = page.getByRole('button', { name: /Play Connect 4/ });
    await expect(connect4Card).toHaveAttribute('aria-label');
    
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