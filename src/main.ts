import './assets/styles/style.scss'
import { Todo, TodoElement } from './modules/todos'
import { Dialog } from './plugins/dialog'

/* TODO
 *  получать тудушки с сайта и сохранять их в переменную
 *  отрисовывать каждую (содать класс Todo)
 *  */

const tasks = document.querySelector('.tasks')

let todos = null
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => (todos = json.slice(0, 10)))
  .then(() => {
    todos.forEach((todo: Todo) => {
      new TodoElement(todo)
    })
  })
// .catch(() => console.log('Ошибка'))
// .finally(() => console.log('Конец'))
// buttonCreateTodo.addEventListener('click', createTodo())

// const buttonCreateTodo: HTMLButtonElement = document.querySelector('.body__input-button')
// buttonCreateTodo.addEventListener('click', createTodo)

const buttonCreateTodo: HTMLButtonElement = document.querySelector('.body__input-button')

buttonCreateTodo.addEventListener('click', () => {
  const input: HTMLInputElement = document.querySelector('.body__input')
  if (input.value.length > 0) {
    new TodoElement({
      title: `${input.value}`,
      completed: false
    })
  }
})
