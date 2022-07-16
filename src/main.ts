import './assets/styles/style.scss'
import { Todo, TodoElement, TodoElementOptions } from './modules/todos'
import { DialogElement } from './plugins/dialog'

const dialog = new DialogElement()

const tasks: HTMLElement = document.querySelector('.todo-list')

let todos: Todo[] = null
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => (todos = json.slice(0, 10)))
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
    const todoElementOptions: TodoElementOptions = {
      todo: {
        title: createTodoInput['value'],
        completed: false,
        id: Date.now(),
        userId: 1
      },
      root: tasks,
      dialog
    }
    new TodoElement(todoElementOptions)
    createTodoInput['value'] = ''
  }
})
