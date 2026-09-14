import { expect, test } from '@playwright/test'
import { getPayload } from 'payload'

import config from '../../src/payload.config.js'

const testPageTitle = 'Homepage E2E'

const richText = (text: string) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})

test.describe('Frontend', () => {
  test.beforeEach(async () => {
    const payload = await getPayload({ config })
    await payload.delete({
      collection: 'pages',
      where: { title: { equals: testPageTitle } },
    })
  })

  test.afterEach(async () => {
    const payload = await getPayload({ config })
    await payload.delete({
      collection: 'pages',
      where: { title: { equals: testPageTitle } },
    })
  })

  test('renders the exact fallback when no Page exists', async ({ page }) => {
    const payload = await getPayload({ config })
    await payload.delete({ collection: 'pages', where: {} })

    const response = await page.goto('http://localhost:3000')

    expect(response?.status()).toBe(200)
    await expect(page.locator('.home')).toHaveText('Hello world')
  })

  test('reflects Page rich-text edits without horizontal overflow', async ({ page }) => {
    const payload = await getPayload({ config })
    const createdPage = await payload.create({
      collection: 'pages',
      data: {
        title: testPageTitle,
        content: richText('Initial homepage content'),
      },
    })

    await page.goto('http://localhost:3000')
    await expect(page.getByText('Initial homepage content')).toBeVisible()

    await payload.update({
      collection: 'pages',
      id: createdPage.id,
      data: { content: richText('Edited homepage content') },
    })

    await page.reload()
    await expect(page.getByText('Edited homepage content')).toBeVisible()

    for (const viewport of [
      { width: 375, height: 667 },
      { width: 1366, height: 768 },
    ]) {
      await page.setViewportSize(viewport)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
        true,
      )
    }
  })
})
