// src/Model/todo-model.js

class TodoModel {
    constructor() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }
  
    getTodos() {
      return this.todos;
    }
  
    addTodo(title, description) {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    }
  
    updateTodo(id, updatedData) {
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      );
      this.saveTodos();
    }
  
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
    }
  
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
  
  export default TodoModel;
  