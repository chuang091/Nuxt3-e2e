import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoItem from '~/components/TodoItem.vue'

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false,
  }

  it('renders todo item correctly', async () => {
    const component = await mountSuspended(TodoItem, {
      props: { todo: mockTodo },
    })

    expect(component.find('[data-testid="todo-text-1"]').text()).toBe('Test todo')
    expect(component.find('[data-testid="todo-checkbox-1"]').exists()).toBe(true)
    expect(component.find('[data-testid="todo-delete-1"]').exists()).toBe(true)
  })

  it('shows completed state correctly', async () => {
    const completedTodo = { ...mockTodo, completed: true }
    const component = await mountSuspended(TodoItem, {
      props: { todo: completedTodo },
    })

    const todoText = component.find('[data-testid="todo-text-1"]')
    expect(todoText.classes()).toContain('line-through')
    expect(todoText.classes()).toContain('text-gray-500')
  })

  it('emits toggle event when checkbox is clicked', async () => {
    const component = await mountSuspended(TodoItem, {
      props: { todo: mockTodo },
    })

    await component.find('[data-testid="todo-checkbox-1"]').trigger('click')
    expect(component.emitted('toggle')).toEqual([['1']])
  })

  it('emits delete event when delete button is clicked', async () => {
    const component = await mountSuspended(TodoItem, {
      props: { todo: mockTodo },
    })

    await component.find('[data-testid="todo-delete-1"]').trigger('click')
    expect(component.emitted('delete')).toEqual([['1']])
  })
})
