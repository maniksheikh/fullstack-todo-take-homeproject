import { defineStore } from "pinia";
import { ref, computed } from "vue"; // You need to import `ref` and `computed` from Vue

import axios from "axios";

export const useTodoStore = defineStore("todo", () => {
  const user = ref(null);
  const userDetails = ref(null);

  function setUser(payload) {
    user.value = payload;
  }

  function setUserDetails(payload) {
    userDetails.value = payload;
  }

  async function getUserDetails() {
    try {
      const { data } = await axios.get(`/person?email=${user.value.email}`);
      setUserDetails(data.person);
      return data.person;
    } catch (error) {
      console.error(error); // Use `console.error` to log errors
    }
  }

  const newTodo = ref("");
  const todos = ref([]);
  const editingTodo = ref(null);
  const errMsg = ref("");

  const addButton = ref(true);
  const updateButton = ref(false);

  function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getRandomColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  async function fetchAllPosts() {
    try {
      const response = await axios.get(
        "https://todo-api-take-home-peoject.onrender.com/todo/all" // Fix the URL
      );
      console.log(response.data.todos);
      todos.value = response.data.todos;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function addTodo() {
    try {
      if (newTodo.value.length < 5) {
        errMsg.value = "Please enter more than 5 letters.";
        return;
      }

      const response = await axios.post(
        "https://todo-api-take-home-peoject.onrender.com/todo", // Fix the URL
        {
          todo: uppercaseFirstLetter(newTodo.value),
          color: getRandomColor(),
        }
      );

      const newTodoItem = response.data.todos;

      todos.value.push(newTodoItem);
      errMsg.value = "";
    } catch (error) {
      console.error("Error adding a todo:", error);
    } finally {
      newTodo.value = "";
      await fetchAllPosts(); // Wait for the posts to be fetched before updating the UI
    }
  }

  function editTodo(id, todo) {
    updateButton.value = true;
    addButton.value = false;

    editingTodo.value = { id, todo };
    newTodo.value = todo.todo;
  }

  async function updateTodo() {
    try {
      if (!editingTodo.value) {
        errMsg.value = "No todo item selected for editing.";
        return;
      }

      if (newTodo.value.length < 5) {
        errMsg.value = "Please enter more than 5 letters.";
        return;
      }

      const updatedTodo = {
        id: editingTodo.value.id,
        todo: uppercaseFirstLetter(newTodo.value),
        color: getRandomColor(),
      };

      const response = await axios.put(
        `https://todo-api-take-home-peoject.onrender.com/todo/${editingTodo.value.id}`, // Fix the URL
        updatedTodo
      );
     
      const updatedTodoItem = response.data.todo;
      console.log(updatedTodoItem, 'ffg');

      const index = todos.value.findIndex(
        (todo) => todo.id === updatedTodoItem.id
      );
      if (index !== -1) {
        todos.value[index] = updatedTodoItem;
      }

      errMsg.value = "";
    } catch (error) {
      console.error("Error updating a todo:", error);
    } finally {
      newTodo.value = "";
      editingTodo.value = null;
      addButton.value = true;
      updateButton.value = false;
    }
  }

  async function deleteTodo(postId) {
    try {
      await axios.delete(
        `https://todo-api-take-home-peoject.onrender.com/todo/${postId}` // Fix the URL
      );

      todos.value = todos.value.filter((todo) => todo.id !== postId);
      alert('Are you sure Delete this.?')
    } catch (error) {
      console.error("Error deleting the todo:", error);
    }
  }

  return {
    user,
    userDetails,
    setUserDetails,
    getUserDetails,
    setUser,
    newTodo,
    todos,
    addTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    errMsg,
    addButton,
    updateButton,
    fetchAllPosts,
  };
});
