import { DialogElement, DialogOptions } from '../../plugins/dialog'

export type Todo = {
  title: string
  completed: boolean
  id: number
  userId: number
}
export type TodoElementOptions = {
  todo: Todo
  root: HTMLElement
  dialog: DialogElement
}

export class TodoElement {
  private element: Element = null
  private root: HTMLElement = null
  private dialog: DialogElement = null
  public title: string = null

  constructor(options: TodoElementOptions) {
    this.root = options.root
    this.element = this.createElement(options.todo)
    this.addEventListeners()
    this.root.appendChild(this.element)
    this.dialog = options.dialog
    this.title = options.todo.title
  }

  addEventListenerButtonEdit() {
    const buttonEdit: HTMLButtonElement = this.element.querySelector('.edit')
    buttonEdit.addEventListener('click', () => {
      const dialogOptionsEdit: DialogOptions = {
        title: 'Изменение задачи',
        bodyHTML: `
          <div class="dialog__text">Редактировать задачу</div>
          <input class='dialog__input' value='${
            this.element.querySelector('.todo__text').innerHTML
          }'/>
                  `,
        primaryButtonText: 'Редактировать',
        primaryButtonCallback: () => {
          const input: HTMLInputElement = document.querySelector('.dialog__input')
          this.title = input['value']
          this.element.querySelector('.todo__text').innerHTML = this.title
        },
        secondaryButtonText: 'Отмена',
        secondaryButtonCallback: () => {
          this.dialog.close()
        }
      }
      this.dialog.open(dialogOptionsEdit)
    })
  }

  addEventListenerButtonDelete() {
    const buttonDelete: HTMLButtonElement = this.element.querySelector('.delete')
    buttonDelete.addEventListener('click', () => {
      const dialogOptionsDelete = {
        title: 'Удаление задачи',
        bodyHTML: `
        <div class="dialog__text">Удалить задачу '${this.title}'</div>
      `,
        primaryButtonText: 'Удалить',
        primaryButtonCallback: () => {
          this.element.remove()
        },
        secondaryButtonText: 'Отмена',
        secondaryButtonCallback: () => {
          this.dialog.close()
        }
      }
      this.dialog.open(dialogOptionsDelete)
    })
  }

  private addEventListeners() {
    this.addEventListenerButtonEdit()
    this.addEventListenerButtonDelete()
  }

  createElement(todo: Todo) {
    const element = document.createElement('div')
    element.className = 'todo'
    element.insertAdjacentHTML(
      'afterbegin',
      `
            <label>    
              <input type="checkbox" class="todo__checkbox"  ${todo.completed ? 'checked' : ''}/>
              <div class='checkbox'></div>   
              <div class="todo__text">${todo.title}</div>    
            </label>
            <div class="todo__actions">
              <img src="assets/img/pen.svg" alt="edit" class="edit" />
              <img
                src="assets/img/pannier.svg"
                alt="delete"
                class="delete"
              />
            </div>
          `
    )
    return element
  }
}
