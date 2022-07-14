export type ModalOptions = {
  title?: string
  bodyHTML?: string
  primaryButtonText?: string
  secondaryButtonText?: string
}

export type Modal = {
  open: () => void
  close: () => void
  // destroy: () => void
}

function createModalElement(options: ModalOptions): HTMLElement {
  const modalElement: HTMLElement = document.createElement('div')
  modalElement.classList.add('modal')

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

export function createModal(options: ModalOptions): Modal {
  const modalElement = createModalElement(options)
  let closing = false

  return {
    open() {
      !closing && modalElement.classList.add('open')
    },
    close() {
      closing = true
      modalElement.classList.remove('open')
      modalElement.classList.add('hide')
      setTimeout(() => {
        closing = false
        modalElement.classList.remove('hide')
      }, 200)
    }
    // destroy() {}
  }
}
