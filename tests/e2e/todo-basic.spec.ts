// tests/e2e/todo-basic.spec.ts
import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('Todo App - Basic Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage first
    await page.goto('/')
    // Then try to clear localStorage if possible
    try {
      await page.evaluate(() => {
        if (typeof localStorage !== 'undefined') {
          localStorage.clear()
        }
      })
    }
    catch {
      // Ignore localStorage errors in test environment
    }
  })

  test('loads homepage correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible()
    await expect(page.getByTestId('todo-input')).toBeVisible()
    await expect(page.getByTestId('add-todo-button')).toBeVisible()
    await expect(page.getByTestId('empty-state')).toBeVisible()
  })

  test('adds and displays todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('My first todo')
    await page.getByTestId('add-todo-button').click()

    await expect(page.getByTestId('todo-text-1')).toContainText('My first todo')
    await expect(page.getByTestId('todo-input')).toHaveValue('')
    await expect(page.getByTestId('stats-total')).toContainText('1')
  })

  test('toggles todo completion', async ({ page }) => {
    // Add a todo
    await page.getByTestId('todo-input').fill('Test todo')
    await page.getByTestId('add-todo-button').click()

    // Toggle completion
    await page.getByTestId('todo-checkbox-1').click()

    // Check completed state
    await expect(page.getByTestId('todo-text-1')).toHaveClass(/line-through/)
    await expect(page.getByTestId('stats-completed')).toContainText('1')
  })

  test('deletes todo', async ({ page }) => {
    // Add a todo
    await page.getByTestId('todo-input').fill('Delete me')
    await page.getByTestId('add-todo-button').click()

    // Delete it
    await page.getByTestId('todo-delete-1').click()

    // Check it's gone
    await expect(page.getByTestId('empty-state')).toBeVisible()
    await expect(page.getByTestId('stats-total')).toContainText('0')
  })
})
