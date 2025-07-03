import { test, expect } from '@playwright/test'

test.describe('Todo App - Simple Tests', () => {
  test('loads homepage and basic functionality', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Check if page loads
    await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible()
    await expect(page.getByTestId('todo-input')).toBeVisible()
    await expect(page.getByTestId('add-todo-button')).toBeVisible()
    
    // Should show empty state initially
    await expect(page.getByTestId('empty-state')).toBeVisible()
    
    // Add a todo
    await page.getByTestId('todo-input').fill('Test todo')
    await page.getByTestId('add-todo-button').click()
    
    // Wait a bit for the todo to be added
    await page.waitForTimeout(1000)
    
    // Check if todo appears - try different possible selectors
    const todoText = page.locator('[data-testid*="todo-text-"]').first()
    await expect(todoText).toContainText('Test todo')
    
    // Toggle completion - use the first checkbox
    const todoCheckbox = page.locator('[data-testid*="todo-checkbox-"]').first()
    await todoCheckbox.click()
    
    // Check if todo is marked as completed
    await expect(todoText).toHaveClass(/line-through/)
    
    // Delete todo - use the first delete button
    const deleteButton = page.locator('[data-testid*="todo-delete-"]').first()
    await deleteButton.click()
    
    // Check if todo is removed and empty state is shown
    await expect(page.getByTestId('empty-state')).toBeVisible()
  })
})