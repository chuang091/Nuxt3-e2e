<!-- components/TodoForm.vue -->
<template>
  <UCard class="mb-6">
    <template #header>
      <h2 class="text-lg font-semibold">Add New Todo</h2>
    </template>

    <form class="flex gap-2" @submit.prevent="addTodo">
      <UInput
        v-model="newTodoText"
        placeholder="What needs to be done?"
        class="flex-1"
        data-testid="todo-input"
        :disabled="isLoading"
      />
      <UButton
        type="submit"
        :loading="isLoading"
        :disabled="!newTodoText.trim()"
        data-testid="add-todo-button"
      >
        Add Todo
      </UButton>
    </form>
  </UCard>
</template>

<script setup lang="ts">
interface Todo {
  id: string
  text: string
  completed: boolean
}

interface Emits {
  (e: 'add', todo: Omit<Todo, 'id'>): void
}

const emit = defineEmits<Emits>()

const newTodoText = ref('')
const isLoading = ref(false)

const addTodo = async () => {
  if (!newTodoText.value.trim()) return

  isLoading.value = true

  try {
    const newTodo: Omit<Todo, 'id'> = {
      text: newTodoText.value.trim(),
      completed: false
    }

    emit('add', newTodo)

    // Reset form
    newTodoText.value = ''
  } finally {
    isLoading.value = false
  }
}
</script>