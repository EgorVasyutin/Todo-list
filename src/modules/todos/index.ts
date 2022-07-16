/* TODO:
 *   реализовать класс Todo
 *
 *
 * */

import { Dialog, ModalOptions } from '../../plugins/dialog'

export type Todo = {
  title: string
  completed: boolean
  id: number
  userId: number
}
export type TodoElementOptions = {
  todo: Todo
  root: HTMLElement
  dialog: Dialog
}
export const buttonListener = {
  edit() {
    const text: HTMLElement = document.querySelector('.task__text')
    const input: HTMLInputElement = document.querySelector('.modal__input')
    text.innerHTML = input['value']
  },
  delete() {
    const task: HTMLElement = document.querySelector('.task')
    task['style'].display = 'none'
  }
}

export class TodoElement {
  private element: Element = null
  private root: HTMLElement = null
  private dialog: Dialog = null
  public title: string = null

  constructor(options: TodoElementOptions) {
    this.root = options.root
    this.element = this.createElement(options.todo)
    this.addEventListeners()
    this.root.appendChild(this.element)
    this.dialog = options.dialog
  }

  private addEventListeners() {
    const buttonEdit: HTMLButtonElement = this.element.querySelector('.edit')
    buttonEdit.addEventListener('click', () => {
      const dialogOptionsEdit: ModalOptions = {
        title: 'Изменение задачи',
        bodyHTML: `
          <div class="modal__text">Редактировать задачу</div>
          <input class='modal__input' value='${
            this.element.querySelector('.task__text').innerHTML
          }'/>
                  `,
        primaryButtonText: 'Редактировать',
        primaryButtonCallback: () => {
          console.log(123)
          const text: HTMLInputElement = document.querySelector('.modal__input')
          this.title = text['value']
          this.element.querySelector('.task__text').innerHTML = this.title
        },
        secondaryButtonText: 'Отмена'
      }
      this.dialog.open(dialogOptionsEdit)
    })
    const buttonDelete: HTMLButtonElement = this.element.querySelector('.delete')
    buttonDelete.addEventListener('click', () => {
      const dialogOptionsDelete = {
        title: 'Удаление задачи',
        bodyHTML: `
        <div class="modal__text">Удалить задачу '${
          document.querySelector('.task__text').innerHTML
        }'</div>

      `,
        primaryButtonText: 'Удалить',
        primaryButtonCallback: () => {
          this.element.remove()
        },
        secondaryButtonText: 'Отмена'
      }
      this.dialog.open(dialogOptionsDelete)
    })
  }

  createElement(options) {
    const element = document.createElement('div')
    element.className = 'task'
    element.insertAdjacentHTML(
      'afterbegin',
      `
            <label>    
              <input type="checkbox" class="task__checkbox"  ${options.completed ? 'checked' : ''}/>
              <div class='checkbox'></div>   
              <div class="task__text">${options.title}</div>    
            </label>
            <div class="task__img">
              <img src="assets/img/pen.svg" alt="pen" class="edit" />
              <img
                src="assets/img/pannier.svg"
                alt="pannier"
                class="delete"
              />
            </div>
          `
    )
    return element
  }
}
