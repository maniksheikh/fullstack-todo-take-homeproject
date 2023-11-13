
<template>
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
            class="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-red-500"
            @click="store.addTodo()"
          >
            Submit
          </button>
          <button
            v-if="store.updateButton"
            class="p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-red-500"
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
// const swal = require('sweetalert2')

// export default {
//   data() {
//     return {
//       bookName: "",
//       authorName: "",
//       released: "",
//       isPostItem: false,
//       isUpdatingTodo: false,
//       isEditing: false,
//       loadingScreener: false,
//       selectedIndex: null,
//       allTodoLists: [],
//     };
//   },
//   fetch() {
//     this.fetchAllData();
//   },

//   methods: {
//     async fetchAllData() {
//       try {
//         this.loadingScreener = true;
//         const { data } = await this.$axios.get(
//           "https://zany-rose-alligator-yoke.cyclic.app/todo/all"
//         );
//         this.allTodoLists = data.todos;
//         // console.log(data)
//       } catch (error) {
//         alert(error);
//       } finally {
//         this.loadingScreener = false;
//       }
//     },

//     // Post Api
//     async postItem() {
//       try {
//         this.isPostItem = true;
//         const { data } = await this.$axios.post(
//           "https://zany-rose-alligator-yoke.cyclic.app/todo",
//           {
//             bookName: this.bookName,
//             author: this.authorName,
//             released: this.released,
//           }
//         );
//         this.allTodoLists.push({
//           bookName: this.bookName,
//           author: this.authorName,
//           released: this.released,
//         });
//         this.$swal("Good job!", "Added New Todo List", "success");
//         this.bookName = "";
//         this.authorName = "";
//         this.released = "";
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.isPostItem = false;
//       }
//     },

//     updateItem(id, allTodoList) {
//       this.bookName = allTodoList.bookName;
//       this.authorName = allTodoList.author;
//       this.released = allTodoList.released;
//       this.selectedIndex = id;
//       this.isEditing = true;
//     },

//     // Update  Api
//     async updateTodoItem() {
//       try {
//         this.isUpdatingTodo = true;
//         const { data } = await this.$axios.put(
//           `https://zany-rose-alligator-yoke.cyclic.app/todo/${this.selectedIndex}`,
//           {
//             bookName: this.bookName,
//             author: this.authorName,
//             released: this.released,
//           }
//         );
//         this.$swal("Good job!", "Updated Todo List", "success");
//         this.bookName = "";
//         this.authorName = "";
//         this.released = "";
//         if (data.success === true) {
//           this.fetchAllData();
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         this.isEditing = false;
//         this.isUpdatingTodo = false;
//       }
//     },

//     // Delete Api
//     deleteItem(id) {
//       try {
//         // Add sweet alert lifeberry
//         this.$swal({
//           title: "Are you sure?",
//           text: "Do you want to delete the content?",
//           type: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#1b8fb4",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, delete it!",
//         }).then(async (result) => {
//           if (result) {
//             await this.$axios.delete(
//               `https://zany-rose-alligator-yoke.cyclic.app/todo/${id}`
//             );
//             // Delete Object From Array On Way
//             const item = this.allTodoLists.filter((el) => el.id !== id);
//             this.allTodoLists = item;
//             // Delete Object From Array On Other Way
//             // const index = this.allTodoLists.map((item) => item.id).indexOf(id) // find index
//             // this.allTodoLists.splice(index, 1)
//             this.$swal("Deleted!", "Your List has been deleted.", "success");
//           }
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   },
// };
</script>
