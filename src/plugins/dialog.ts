export type ModalOptions = {
  title: string
  bodyHTML: string
  primaryButtonText: string
  primaryButtonCallback: () => void
  secondaryButtonText?: string
  secondaryButtonCallback?: () => void
}
import { buttonListener } from '../modules/todos'

export class Dialog {
  // fields
  private element: HTMLElement
  public isClosing: boolean

  constructor(options?: ModalOptions) {
    this.element = this.createElement(options)
  }

  // methods
  createElement(options: ModalOptions): HTMLElement {
    const modalElement: HTMLElement = document.createElement('div')
    modalElement.classList.add('modal')

    document.body.appendChild(modalElement)
    return modalElement
  }

  addEventListeners(options: ModalOptions) {
    const buttonClose: HTMLButtonElement = this.element.querySelector('.modal__close')
    buttonClose.addEventListener('click', this.close.bind(this))

    const buttonPrimary: HTMLButtonElement = this.element.querySelector('.primaryButtonText')
    buttonPrimary.addEventListener('click', () => {
      options.primaryButtonCallback()

      this.close()
    })

    const buttonSecondary: HTMLButtonElement = this.element.querySelector('.secondaryButtonText')
    buttonSecondary.addEventListener('click', () => {
      options.secondaryButtonCallback()
      this.close()
    })
  }

  open(options: ModalOptions): void {
    if (!this.isClosing) {
      this.element.innerHTML = `
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
                    <button class="modal__button primaryButtonText">${options.primaryButtonText}</button>
                    <button class="modal__button secondaryButtonText">${options.secondaryButtonText}</button>
                  </div>
                </div>
               </div>
             `
      this.addEventListeners(options)
      this.element.classList.add('open')
    }
  }

  close(): void {
    this.isClosing = true

    this.element.classList.remove('open')
    this.element.classList.add('hide')

    setTimeout(() => {
      this.isClosing = false
      this.element.classList.remove('hide')
    }, 200)
  }

  destroy() {
    this.element.remove()
  }
}
