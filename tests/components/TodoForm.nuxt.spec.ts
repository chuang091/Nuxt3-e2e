import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoForm from '~/components/TodoForm.vue'

describe('TodoForm', () => {
  it('renders form elements correctly', async () => {
    const component = await mountSuspended(TodoForm)

    expect(component.find('[data-testid="todo-input"]').exists()).toBe(true)
    expect(component.find('[data-testid="add-todo-button"]').exists()).toBe(true)
  })

  it('disables submit button when input is empty', async () => {
    const component = await mountSuspended(TodoForm)

    const submitButton = component.find('[data-testid="add-todo-button"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('enables submit button when input has text', async () => {
    const component = await mountSuspended(TodoForm)

    const input = component.find('[data-testid="todo-input"]')
    await input.setValue('New todo')

    const submitButton = component.find('[data-testid="add-todo-button"]')
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })

  it('emits add event with correct data on form submit', async () => {
    const component = await mountSuspended(TodoForm)

    const input = component.find('[data-testid="todo-input"]')
    await input.setValue('New todo')

    await component.find('form').trigger('submit')

    const emittedEvents = component.emitted('add')
    expect(emittedEvents).toHaveLength(1)

    interface TodoEventData {
      text: string
      completed: boolean
    }

    const emittedData = emittedEvents![0][0] as TodoEventData
    expect(emittedData.text).toBe('New todo')
    expect(emittedData.completed).toBe(false)
  })

  it('resets form after submission', async () => {
    const component = await mountSuspended(TodoForm)

    const input = component.find('[data-testid="todo-input"]')
    await input.setValue('New todo')

    await component.find('form').trigger('submit')

    // Check if input is cleared
    expect((input.element as HTMLInputElement).value).toBe('')
  })
})
