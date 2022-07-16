export type DialogOptions = {
  title: string
  bodyHTML: string
  primaryButtonText: string
  primaryButtonCallback: () => void
  secondaryButtonText?: string
  secondaryButtonCallback?: () => void
}

export class DialogElement {
  // fields
  private element: HTMLElement
  public isClosing: boolean

  constructor() {
    this.element = this.createElement()
  }

  // methods
  createElement(): HTMLElement {
    const dialogElement: HTMLElement = document.createElement('div')
    dialogElement.classList.add('dialog')
    document.body.appendChild(dialogElement)

    return dialogElement
  }

  addEventListeners(options: DialogOptions): void {
    const buttonClose: HTMLButtonElement = this.element.querySelector('.dialog__close')
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

  open(options: DialogOptions): void {
    if (!this.isClosing) {
      this.element.innerHTML = `
              <div class="dialog-overlay">
                <div class="dialog-window">
                  <div class="dialog-window__header">
                    <h2>${options.title}</h2>
                    <span class="dialog__close">&times;</span>   
                  </div>
                  <div class="dialog-window__body">
                       ${options.bodyHTML}
                  </div>
                  <div class="dialog-window__footer">
                    <button class="dialog__button primaryButtonText">${options.primaryButtonText}</button>
                    <button class="dialog__button secondaryButtonText">${options.secondaryButtonText}</button>
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
