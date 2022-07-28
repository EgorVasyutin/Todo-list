import './assets/styles/style.scss'
import { Todo, TodoElement, TodoElementOptions } from './modules/todos'
import { DialogElement } from './plugins/dialog'

const dialog = new DialogElement()

const tasks: HTMLElement = document.querySelector('.todo-list')

let todos: Todo[] = null
fetch('http://localhost:1000/api/todo')
  .then((response) => response.json())
  .then((data) => {
    todos = data
  })
  .then(() => {
    todos.forEach((todo: Todo) => {
      const todoElementOptions: TodoElementOptions = {
        todo,
        root: tasks,
        dialog
      }
      new TodoElement(todoElementOptions)
    })
  })

const createTodoButton: HTMLButtonElement = document.querySelector('.create-todo__button')
const createTodoInput: HTMLInputElement = document.querySelector('.create-todo__input')

createTodoButton.addEventListener('click', () => {
  if (createTodoInput['value'].length > 0) {
    fetch('http://localhost:1000/api/todo', {
      method: 'POST',
      body: JSON.stringify({
        title: createTodoInput['value'],
        isDone: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((createdTodo: Todo) => {
        const todoElementOptions: TodoElementOptions = {
          todo: createdTodo,
          root: tasks,
          dialog
        }

        new TodoElement(todoElementOptions)
        createTodoInput['value'] = ''
      })
  }
})
