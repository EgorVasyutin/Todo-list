export type ModalOptions = {
  title: string
  bodyHTML: string
  primaryButtonText: string
  secondaryButtonText?: string
}
import { buttonListener } from '../modules/todos'

export class Dialog {
  // fields
  private element: HTMLElement
  public isClosing: boolean

  constructor(options: ModalOptions) {
    this.element = this.createElement(options)
    this.addEventListeners()
  }

  // methods
  createElement(options: ModalOptions): HTMLElement {
    const modalElement: HTMLElement = document.createElement('div')
    modalElement.classList.add('modal')

    // HTML
    modalElement.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="modal-overlay">
        <div class="modal-window">
          <div class="modal-window__header">
            <h2>${options.title}</h2>
            <span class="modal__close">&times;</span>   
          </div>
          <div class="modal-window__body">
               ${options.bodyHTML}
          </div>
          <div class="modal-window__footer">
            <button class="modal__button modal__button--yes">${options.primaryButtonText}</button>
            <button class="modal__button modal__button--no">${options.secondaryButtonText}</button>
          </div>
        </div>
      </div>
    `
    )
    document.body.appendChild(modalElement)

    return modalElement
  }

  addEventListeners() {
    const buttonClose: HTMLButtonElement = this.element.querySelector('.modal__close')
    buttonClose.addEventListener('click', this.close.bind(this))

    const buttonPrimary: HTMLButtonElement = this.element.querySelector('.modal__button--yes')
    buttonPrimary.addEventListener('click', () => {
      if (document.querySelector('.modal__text').innerHTML === 'Редактировать задачу') {
        buttonListener.Edit()
      } else {
        buttonListener.Delete()
      }
      this.close()
    })

    const buttonSecondary: HTMLButtonElement = this.element.querySelector('.modal__button--no')
    buttonSecondary.addEventListener('click', () => {
      this.close()
    })
  }

  open(): void {
    console.log('this', this)

    if (!this.isClosing) {
      this.element.classList.add('open')
    }
  }

  close(): void {
    this.isClosing = true

    console.log('this', this)
    this.element.classList.remove('open')
    this.element.classList.add('hide')

    setTimeout(() => {
      this.isClosing = false
      this.element.classList.remove('hide')
    }, 200)
  }

  destroy() {
    // Удаляет элемент диалогового окна из DOM, удаляет eventListeners
    this.element.remove()
  }
}
