class TodoView {
  constructor(onAdd, onUpdate, onDelete, onSearch) {
    this.onAdd = onAdd;
    this.onUpdate = onUpdate;
    this.onDelete = onDelete;
    this.onSearch = onSearch;

    this.todoList = document.querySelector('#todo-list');
    this.addForm = document.querySelector('#add-form');
    this.searchInput = document.querySelector('#search-bar');

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = e.target.title.value.trim();
      const description = e.target.description.value.trim();
      if (title) {
        this.onAdd(title, description);
        e.target.reset();
      }
    });

    this.searchInput.addEventListener('input', (e) => {
      this.onSearch(e.target.value);
    });
  }

  displayTodos(todos) {
    this.todoList.innerHTML = todos
      .map(
        (todo) => `
        <div class="list-group-item d-flex justify-content-between align-items-start ${todo.completed ? 'list-group-item-success' : ''}" data-id="${todo.id}">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${todo.title}</div>
            ${todo.description}
          </div>
          <div>
            <button class="btn btn-sm btn-success complete-btn me-2">${todo.completed ? 'Unmark' : 'Complete'}</button>
            <button class="btn btn-sm btn-warning edit-btn me-2">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn">Delete</button>
          </div>
        </div>
      `
      )
      .join('');

    this.attachTodoEventListeners();
  }

  attachTodoEventListeners() {
    this.todoList.querySelectorAll('.complete-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.todo-item').dataset.id, 10);
      const completed = !e.target.closest('.todo-item').classList.contains('completed');
      this.onUpdate(id, { completed });
    }));

    this.todoList.querySelectorAll('.edit-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const item = e.target.closest('.todo-item');
      const id = parseInt(item.dataset.id, 10);
      const newTitle = prompt('Edit title:', item.querySelector('h3').textContent);
      const newDescription = prompt('Edit description:', item.querySelector('p').textContent);
      if (newTitle !== null && newDescription !== null) {
        this.onUpdate(id, { title: newTitle, description: newDescription });
      }
    }));

    this.todoList.querySelectorAll('.delete-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.todo-item').dataset.id, 10);
      this.onDelete(id);
    }));
  }
}

export default TodoView;
