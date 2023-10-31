<script setup>
import { useTodoStore } from "../store/todo";
const store = useTodoStore();
const computedTodos = computed(() => store.todos);

onMounted(() => {
  store.fetchAllPosts();
});
</script>

<template>
  <!-- component -->
  <div
    class="flex justify-center items-center min-h-[calc(100vh-70px)] overflow-hidden p-10"
  >
    <div
      class="w-11/12 p-6 m-4 bg-white rounded-lg shadow lg:w-3/4 lg:max-w-lg"
    >
      <div
        class="flex items-center justify-center p-3 border-2 rounded-full m-14"
      >
        <h1 class="text-xl font-semibold">Full-Stack ToDo</h1>
      </div>
      <div class="mb-4">
        <div class="flex mt-4">
          <input
            type="text"
            placeholder="Insert your todo"
            class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
            v-model="store.newTodo"
          />
          <button
            v-if="store.addButton"
            class="p-2 border-2 rounded-md text-teal border-teal hover:text-white hover:bg-green-600"
            @click="store.addTodo()"
          >
            Submit
          </button>
          <button
            v-if="store.updateButton"
            class="p-2 border-2 rounded-md text-teal border-teal hover:text-white hover:bg-red-500"
            @click="store.updateTodo()"
          >
            Update
          </button>
        </div>
        <p class="justify-center m-2 text-xs text-center text-red-600">
          {{ store.errMsg }}
        </p>
      </div>
      <ul>
        <li>
          <div class="p-3 mt-4 border rounded-lg border-white-600">
            <div class="list-text">
              <div><h2 class="text-lg font-semibold">Task 1</h2></div>
            </div>
            <div class="todo-list" v-for="todo in computedTodos" :key="todo.id">
              <div
                class="flex items-center justify-between p-2 mt-3 border rounded-lg border-white-500"
              >
                <div class="items">
                  <p
                    class="font-sans text-lg font-bold font-xl text-slate-500"
                    :style="{ color: todo.color }"
                  >
                    {{ todo.todo }}
                  </p>
                </div>
                <div class="button">
                  <button
                    class="p-2 ml-2 text-red-500 border-red-500 rounded hover:text-white hover:bg-red-500"
                    @click="store.editTodo(todo.id, todo)"
                  >
                    Edit
                  </button>
                  <button
                    class="p-2 ml-2 text-red-500 border-red-500 rounded hover:text-white hover:bg-red-500"
                    @click="store.deleteTodo(todo.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
