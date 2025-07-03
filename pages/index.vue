<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Todo List
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Stay organized and get things done
        </p>
      </div>

      <!-- Add Todo Form -->
      <TodoForm @add="handleAddTodo" />

      <!-- Stats -->
      <div class="mb-6 flex justify-between items-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <span data-testid="stats-total">{{ stats.total }}</span> total,
          <span data-testid="stats-completed">{{ stats.completed }}</span> completed,
          <span data-testid="stats-pending">{{ stats.pending }}</span> pending
        </div>

        <UButton
          v-if="stats.completed > 0"
          color="error"
          variant="outline"
          size="sm"
          data-testid="clear-completed-button"
          @click="handleClearCompleted"
        >
          Clear Completed
        </UButton>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="text-center py-8"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4"
        />
        <p class="text-gray-500 dark:text-gray-400">Loading todos...</p>
      </div>

      <!-- Todo List -->
      <TodoList
        v-else
        :todos="todos"
        @toggle="handleToggleTodo"
        @delete="handleDeleteTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types/todo'

// SEO
useSeoMeta({
  title: 'Todo List - Stay Organized',
  description: 'A simple and elegant todo list application to help you stay organized and productive.',
  ogTitle: 'Todo List App',
  ogDescription: 'Stay organized and get things done with our simple todo list application.',
})

// Reactive state
const todos = ref<Todo[]>([])
const isLoading = ref(false)

// Computed stats
const stats = computed(() => {
  const total = todos.value.length
  const completed = todos.value.filter(todo => todo.completed).length
  const pending = total - completed

  return {
    total,
    completed,
    pending,
  }
})

// Generate unique ID
const generateId = () => {
  return (todos.value.length + 1).toString()
}

// Load todos from localStorage
const loadTodos = () => {
  if (import.meta.client) {
    try {
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos)
      }
    }
    catch (error) {
      console.error('Error loading todos:', error)
    }
  }
}

// Save todos to localStorage
const saveTodos = () => {
  if (import.meta.client) {
    try {
      localStorage.setItem('todos', JSON.stringify(todos.value))
    }
    catch (error) {
      console.error('Error saving todos:', error)
    }
  }
}

// Watch for changes and save
watch(todos, saveTodos, { deep: true })

// Event handlers
const handleAddTodo = (todoData: Omit<Todo, 'id'>) => {
  const newTodo: Todo = {
    id: generateId(),
    ...todoData,
  }
  todos.value.push(newTodo)
}

const handleToggleTodo = (id: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const handleDeleteTodo = (id: string) => {
  const index = todos.value.findIndex(t => t.id === id)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

const handleClearCompleted = () => {
  todos.value = todos.value.filter(todo => !todo.completed)
}

// Initialize on mount
onMounted(() => {
  loadTodos()
})
</script>
