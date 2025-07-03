<!-- components/TodoList.vue -->
<template>
  <div class="space-y-3">
    <!-- Empty State -->
    <div
      v-if="todos.length === 0"
      class="text-center py-8"
    >
      <UIcon
        name="i-heroicons-clipboard-document-list"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
      />
      <p
        class="text-gray-500 dark:text-gray-400"
        data-testid="empty-state"
      >
        No todos yet. Add one above to get started!
      </p>
    </div>

    <!-- Todo Items -->
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: string
  text: string
  completed: boolean
}

interface Props {
  todos: Todo[]
}

interface Emits {
  (e: 'toggle' | 'delete', id: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
