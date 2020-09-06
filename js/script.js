'use strict';

class Todo {
   constructor(form, input, todoList, todoCompleted, todoContainer) {
      this.form = document.querySelector(form);
      this.input = document.querySelector(input);
      this.todoList = document.querySelector(todoList);
      this.todoCompleted = document.querySelector(todoCompleted);
      this.todoContainer = document.querySelector(todoContainer);
      this.todoDate = new Map(JSON.parse(localStorage.getItem('toDoList')));
   }

   addToStorage() {
      localStorage.setItem('toDoList', JSON.stringify([...this.todoDate]));
   }

   render() {
      this.addToStorage();
      this.todoList.textContent = '';
      this.todoCompleted.textContent = '';
      this.todoDate.forEach(this.createItem, this);
   }

   createItem(todo) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.insertAdjacentHTML('beforeend', `
       <span class = "text-todo" >${todo.value}</span> 
       <div class="todo-buttons">
           <button class="todo-remove"></button> 
           <button class="todo-complete"></button>
       </div>`);

      if (todo.complated) {
         this.todoCompleted.append(li);
      } else {
         this.todoList.append(li);
      }
   }


   completedItem(item) {
      this.todoDate.forEach((elem) => {
         if (item === elem.value) {
            elem.complated = !elem.complated;
         }
      });
   }

   deleteItem(item) {
      this.todoDate.forEach((elem) => {
         if (item === elem.value) {
            this.todoDate.delete(elem.key);
         }
      });
   }

   handler() {
      this.todoContainer.addEventListener('click', (event) => {
         let target = event.target;
         let targetItem = target.closest('.todo-item');
         let items = document.querySelectorAll('.todo-item');
         let item, key;
         items.forEach((elem, i) => {
            if (elem === targetItem) {
               item = elem.textContent.trim();

            }
         });
         if (target.classList.contains('todo-complete')) {
            this.completedItem(item);
         }
         if (target.classList.contains('todo-remove')) {
            this.deleteItem(item);
         }
         this.render();

      });

   }

   addTodo(event) {
      event.preventDefault();
      if (this.input.value.trim()) {
         const newTodo = {
            value: this.input.value.trim(),
            complated: false,
            key: `f${(+new Date()).toString(32)}`
         };
         this.todoDate.set(newTodo.key, newTodo);
      }
      this.input.value = '';
      this.render();
   }

   init() {
      this.form.addEventListener('submit', this.addTodo.bind(this));
      this.render();
      this.handler();
   }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();