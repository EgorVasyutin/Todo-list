import './assets/styles/style.scss'
import { Todo, TodoElement, TodoElementOptions } from './modules/todos'
import { Dialog } from './plugins/dialog'

const dialog = new Dialog()

const tasks: HTMLElement = document.querySelector('.tasks')

let todos = null
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
// .catch(() => console.log('Ошибка'))
// .finally(() => console.log('Конец'))
// buttonCreateTodo.addEventListener('click', createTodo())

// const buttonCreateTodo: HTMLButtonElement = document.querySelector('.create-button')
// buttonCreateTodo.addEventListener('click', createTodo)

const buttonCreateTodo: HTMLButtonElement = document.querySelector('.create-button')

buttonCreateTodo.addEventListener('click', () => {
  const input: HTMLInputElement = document.querySelector('.body__input')
  if (input['value'].length > 0) {
    const todoElementOptions: TodoElementOptions = {
      todo: {
        title: input['value'],
        complete: false,
        id: Date.now(),
        userId: 1
      },
      root: tasks,
      dialog
    }
    new TodoElement(todoElementOptions)
  }
})
