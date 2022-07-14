/* TODO:
 *   реализовать класс Todo
 * */

import { Dialog } from '../../plugins/dialog'

export type Todo = {
  title: string
  complete: boolean
  id: number
  userId: number
}
export const buttonListener = {
  Edit() {
    const text: HTMLElement = document.querySelector('.task__text')
    const input: HTMLInputElement = document.querySelector('.modal__input')
    text.innerHTML = input.value
  },
  Delete() {
    const task: HTMLElement = document.querySelector('.task')
    task.style.display = 'none'
  }
}

export class TodoElement {
  private element: Element = null

  constructor(options) {
    // this.element = this.createTodo()
    // this.addEventListeners()
    this.element = document.createElement('div')
    this.element.className = 'task'
    this.element.insertAdjacentHTML(
      'afterbegin',
      `
              
            <label>    
            
              <input type="checkbox" class="task__checkbox"  ${options.complete ? 'checked' : ''}/>
              <div class='checkbox'></div>   
              <div class="task__text">${options.title}</div>    
            </label>
            <div class="task__img">
              <img src="assets/img/pen.svg" alt="pen" class="task__img--pen" />
              <img
                src="assets/img/pannier.svg"
                alt="pannier"
                class="task__img--pannier"
              />
            </div>
          `
    )

    document.querySelector('.tasks').appendChild(this.element)
    const buttonDelete: HTMLButtonElement = this.element.querySelector('.task__img--pannier')
    buttonDelete.addEventListener('click', function () {
      new Dialog(dialogOptionsDelete).open()
    })
    const dialogOptionsDelete = {
      title: 'Удаление задачи',
      bodyHTML: `
    <div class="modal__text">Удалить задачу '${
      document.querySelector('.task__text').innerHTML
    }'</div>
    
  `,
      primaryButtonText: 'Удалить',
      secondaryButtonText: 'Отмена'
    }

    const buttonEdit: HTMLButtonElement = this.element.querySelector('.task__img--pen')
    buttonEdit.addEventListener('click', function () {
      console.log('Edit')
      new Dialog(dialogOptionsEdit).open()
    })
    const dialogOptionsEdit = {
      title: 'Изменение задачи',
      bodyHTML: `
    <div class="modal__text">Редактировать задачу</div>
    <input class='modal__input' value='${document.querySelector('.task__text').innerHTML}'/>
  `,
      primaryButtonText: 'Редактировать',
      secondaryButtonText: 'Отмена'
    }
  }

  private addEventListeners() {}

  createTodo() {}
}
