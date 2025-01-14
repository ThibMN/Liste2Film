/* eslint-disable max-len */
import TodoModel from '../Model/todo-model';
import TodoView from '../View/todo-view';

class TodoController {
  constructor() {
    this.model = new TodoModel();
    this.view = new TodoView(this.handleAddTodo, this.handleUpdateTodo, this.handleDeleteTodo, this.handleSearch);

    this.renderTodos();
  }

  renderTodos() {
    const todos = this.model.getTodos();
    this.view.displayTodos(todos);
  }

  handleAddTodo = (title, description) => {
    this.model.addTodo(title, description);
    this.renderTodos();
  };

  handleUpdateTodo = (id, updatedData) => {
    this.model.updateTodo(id, updatedData);
    this.renderTodos();
  };

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
    this.renderTodos();
  };

  handleSearch = (query) => {
    const todos = this.model.getTodos();
    const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
    this.view.displayTodos(filteredTodos);
  };
}

export default TodoController;
