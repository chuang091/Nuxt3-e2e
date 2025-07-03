<!-- components/TodoItem.vue -->
<template>
  <div
    class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    :class="{ 'opacity-60': todo.completed }"
  >
    <!-- Checkbox -->
    <UCheckbox
      :model-value="todo.completed"
      :data-testid="`todo-checkbox-${todo.id}`"
      @update:model-value="$emit('toggle', todo.id)"
    />

    <!-- Todo Text -->
    <div class="flex-1">
      <span
        :class="[
          'text-sm font-medium',
          todo.completed
            ? 'line-through text-gray-500 dark:text-gray-400'
            : 'text-gray-900 dark:text-gray-100'
        ]"
        :data-testid="`todo-text-${todo.id}`"
      >
        {{ todo.text }}
      </span>
    </div>

    <!-- Delete Button -->
    <UButton
      icon="i-heroicons-trash"
      size="lg"
      color="error"
      variant="ghost"
      :data-testid="`todo-delete-${todo.id}`"
      @click="$emit('delete', todo.id)"
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
  todo: Todo
}

interface Emits {
  (e: 'toggle' | 'delete', id: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>