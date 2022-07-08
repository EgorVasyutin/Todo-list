import './assets/styles/style.scss'

import { Dialog } from './plugins/dialog'

/* TODO
 *  получать тудушки с сайта и сохранять их в переменную
 *  отрисовывать каждую (содать класс Todo)
 *  */

const dialogOptions = {
  title: 'Изменение задачи',
  bodyHTML: `
    <div class="modal__text">Название задачи</div>
    <input class="modal__input">Название задачи</input>
  `,
  primaryButtonText: 'Редактировать'
}

const editDialog = new Dialog(dialogOptions)

const buttonCreateTodo = document.querySelector('.body__input-button')

const tasks = document.querySelector('.tasks')

// buttonCreateTodo.addEventListener('click')
