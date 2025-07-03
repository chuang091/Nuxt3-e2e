// tests/utils/test-helpers.ts
import type { Todo } from '~/types/todo'

export const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: '1',
  text: 'Test todo',
  completed: false,
  ...overrides,
})

export const createMockTodos = (count: number = 3): Todo[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    text: `Todo ${index + 1}`,
    completed: index % 2 === 0, // Make every other todo completed
  }))
}
