import { DialogElement, DialogOptions } from '../../plugins/dialog'

export type Todo = {
  title: string
  isDone: boolean
  id: number
  userId?: number
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
  public id: number = null
  public isDone: boolean = null

  constructor(options: TodoElementOptions) {
    this.root = options.root
    this.element = this.createElement(options.todo)
    this.addEventListeners()
    this.root.appendChild(this.element)
    this.dialog = options.dialog
    this.title = options.todo.title
    this.id = options.todo.id
    this.isDone = options.todo.isDone
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
          const body = JSON.stringify({
            title: this.title,
            isDone: this.isDone
          })
          fetch(`http://localhost:1000/api/todo/${this.id}`, {
            method: 'PUT',
            body: body,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => response.json())
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
          // async function request(method, id) {
          fetch(`http://localhost:1000/api/todo/${this.id}`, {
            method: 'DELETE'
          }).then(() => this.element.remove())
          //}
          // await request('DELETE', this.userId)
        },
        secondaryButtonText: 'Отмена',
        secondaryButtonCallback: () => {
          this.dialog.close()
        }
      }
      this.dialog.open(dialogOptionsDelete)
    })
  }

  addEventListenerButtonIsDone() {
    const buttonIsDone: HTMLInputElement = this.element.querySelector('.todo__checkbox')
    buttonIsDone.addEventListener('click', () => {
      if (buttonIsDone.checked) {
        this.isDone = true
      } else {
        this.isDone = false
      }

      console.log(this.isDone)
      const body = JSON.stringify({
        title: this.title,
        isDone: this.isDone
      })
      fetch(`http://localhost:1000/api/todo/${this.id}`, {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
    })
  }

  private addEventListeners() {
    this.addEventListenerButtonEdit()
    this.addEventListenerButtonDelete()
    this.addEventListenerButtonIsDone()
  }

  createElement(todo: Todo) {
    const element = document.createElement('div')
    element.className = 'todo'
    element.insertAdjacentHTML(
      'afterbegin',
      `
            <label>    
              <input type="checkbox" class="todo__checkbox"  ${todo.isDone ? 'checked' : ''}/>
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
