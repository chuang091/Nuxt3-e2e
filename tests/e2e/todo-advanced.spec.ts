
// tests/e2e/todo-advanced.spec.ts
import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('Todo App - Advanced Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Clear localStorage safely
    try {
      await page.evaluate(() => {
        if (typeof localStorage !== 'undefined') {
          localStorage.clear()
        }
      })
    } catch {
      // Ignore localStorage errors
    }
  })

  test('clears completed todos', async ({ page }) => {
    // Add two todos
    await page.getByTestId('todo-input').fill('Completed todo')
    await page.getByTestId('add-todo-button').click()
    
    await page.getByTestId('todo-input').fill('Active todo')
    await page.getByTestId('add-todo-button').click()
    
    // Complete first todo
    await page.getByTestId('todo-checkbox-1').click()
    
    // Clear completed
    await page.getByTestId('clear-completed-button').click()
    
    // Check only active todo remains
    await expect(page.getByTestId('todo-text-2')).toBeVisible()
    await expect(page.getByTestId('stats-total')).toContainText('1')
  })

  test('handles multiple todos correctly', async ({ page }) => {
    const todos = ['Todo 1', 'Todo 2', 'Todo 3']
    
    // Add todos quickly
    for (const todo of todos) {
      await page.getByTestId('todo-input').fill(todo)
      await page.getByTestId('add-todo-button').click()
    }
    
    // Check stats
    await expect(page.getByTestId('stats-total')).toContainText('3')
    
    // Complete first and third todo
    await page.getByTestId('todo-checkbox-1').click()
    await page.getByTestId('todo-checkbox-3').click()
    
    // Check updated stats
    await expect(page.getByTestId('stats-completed')).toContainText('2')
    await expect(page.getByTestId('stats-pending')).toContainText('1')
  })

  test('handles empty input correctly', async ({ page }) => {
    // Try to submit empty form - button should be disabled
    const addButton = page.getByTestId('add-todo-button')
    await expect(addButton).toBeDisabled()
    
    // Should still show empty state
    await expect(page.getByTestId('empty-state')).toBeVisible()
    await expect(page.getByTestId('stats-total')).toContainText('0')
    
    // Try typing and clearing input
    await page.getByTestId('todo-input').fill('test')
    await expect(addButton).toBeEnabled()
    
    await page.getByTestId('todo-input').clear()
    await expect(addButton).toBeDisabled()
  })

  test('form validation works', async ({ page }) => {
    // Button should be disabled when input is empty
    await expect(page.getByTestId('add-todo-button')).toBeDisabled()
    
    // Button should be enabled when input has text
    await page.getByTestId('todo-input').fill('New todo')
    await expect(page.getByTestId('add-todo-button')).toBeEnabled()
    
    // Clear input, button should be disabled again
    await page.getByTestId('todo-input').clear()
    await expect(page.getByTestId('add-todo-button')).toBeDisabled()
  })
})