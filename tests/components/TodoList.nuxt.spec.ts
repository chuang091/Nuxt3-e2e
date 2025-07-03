import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TodoList from '~/components/TodoList.vue'

describe('TodoList', () => {
  const mockTodos = [
    {
      id: '1',
      text: 'First todo',
      completed: false,
    },
    {
      id: '2',
      text: 'Second todo',
      completed: true,
    },
  ]

  it('renders all todos', async () => {
    const component = await mountSuspended(TodoList, {
      props: { todos: mockTodos },
    })

    expect(component.findAll('[data-testid^="todo-text-"]')).toHaveLength(2)
    expect(component.find('[data-testid="todo-text-1"]').text()).toBe('First todo')
    expect(component.find('[data-testid="todo-text-2"]').text()).toBe('Second todo')
  })

  it('shows empty state when no todos', async () => {
    const component = await mountSuspended(TodoList, {
      props: { todos: [] },
    })

    expect(component.find('[data-testid="empty-state"]').exists()).toBe(true)
    expect(component.find('[data-testid="empty-state"]').text()).toContain('No todos yet')
  })

  it('forwards events correctly', async () => {
    const component = await mountSuspended(TodoList, {
      props: { todos: mockTodos },
    })

    // Test toggle event
    await component.find('[data-testid="todo-checkbox-1"]').trigger('click')
    expect(component.emitted('toggle')).toEqual([['1']])

    // Test delete event
    await component.find('[data-testid="todo-delete-1"]').trigger('click')
    expect(component.emitted('delete')).toEqual([['1']])
  })
})
