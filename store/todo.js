import { defineStore } from "pinia";

import axios from "axios";

export const useTodoStore = defineStore("todo", () => {

    const { $axios } = useNuxtApp();
  
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
        const { data } = await $axios.get(`/person?email=${user.value.email}`);
        setUserDetails(data.person);
        return data.person;
      } catch (error) {
        console.log(error);
      }
    };

  const newTodo = ref("");
  const todos = ref([]);
  const editingTodo = ref(null);
  const errMsg = ref("");

  const addButton = ref(true);
  const updateButton = ref(false);


  function setUser(payload) {
    user.value = payload;
  }

  const uppercaseFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getRandomColor = () => {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://todo-api-take-home-peoject.onrender.com/todo/all"
      );
      console.log(response.data.todos);
      todos.value = response.data.todos;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addTodo = async () => {
    try {
      if (newTodo.value.length < 5) {
        errMsg.value = "Please enter more than 5 letters.";
        return;
      }

      const response = await axios.post(
        "https://todo-api-take-home-peoject.onrender.com/todo",
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
      fetchAllPosts();
    }
  };

  const editTodo = (id, todo) => {
    updateButton.value = true;
    addButton.value = false;

    editingTodo.value = { id, todo };

    newTodo.value = todo.todo;
  };

  const updateTodo = async () => {
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
        `https://todo-api-take-home-peoject.onrender.com/todo/:id${editingTodo.value.id}`,
        updatedTodo
      );

      const updatedTodoItem = response.data.data;

      const index = todos.value.findIndex(
        (todo) => todo.id === updatedTodoItem.id
      );
      if (index !== -1) {
        todos.value.splice(index, 1, updatedTodoItem);
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
  };

  const deleteTodo = async (postId) => {
    try {
      await axios.delete(
        `https://todo-api-take-home-peoject.onrender.com/todo/:id${postId}`
      );

      todos.value = todos.value.filter((todo) => todo.id !== postId);
    } catch (error) {
      console.error("Error deleting the todo:", error);
    }
  };

  // onMounted(() => {
  //   fetchAllPosts();
  // });

  const computedTodos = computed(() => todos.value.slice());

  return {
    user,
    userDetails,
    setUserDetails,
    getUserDetails,
    setUser,
    newTodo,
    todos: computedTodos,
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
