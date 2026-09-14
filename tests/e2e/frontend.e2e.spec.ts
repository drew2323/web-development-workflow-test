import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  for (const viewport of [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'notebook', width: 1366, height: 768 },
  ]) {
    test(`renders the homepage at ${viewport.name} width`, async ({ page }) => {
      await page.setViewportSize(viewport)

      const response = await page.goto('http://localhost:3000')

      expect(response?.status()).toBe(200)
      await expect(page.locator('body')).toHaveText('Hello world')

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      )
      expect(hasHorizontalOverflow).toBe(false)
    })
  }
})
