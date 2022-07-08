type ModalOptions = {
  title: string;
  bodyHTML: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
};

type Modal = {};

function createModalElement(options: ModalOptions): HTMLElement {
  const modalElement: HTMLElement = document.createElement("div");
  modalElement.classList.add("modal");
  modalElement.insertAdjacentHTML(
    "afterbegin",
    `    
      <div class="modal-overlay">
        <div class="modal-window">
          <div class="modal-window__header">
            <h2>Изменение задачи</h2>
            <span class="modal__close">&times;</span>   
          </div>
          <div class="modal-window__body">
          <div class="modal__text">Название задачи</div>
            <input class="modal__input">название задачи</input>
          </div>
          <div class="modal-window__footer">
            <button class="modal__button modal__button--yes">редактировать</button>
            <button class="modal__button modal__button--no">отменить</button>
          </div>
        </div>
      </div>`
  );
  document.body.appendChild(modalElement);
  return modalElement;
}

export function createModal(options: ModalOptions): Modal {
  const modalElement = createModalElement(options);
  let closing: boolean = false;
  return {
    open() {
      !closing && modalElement.classList.add("open");
    },
    close() {
      closing = true;
      modalElement.classList.remove("open");
      modalElement.classList.add("hide");
      setTimeout(() => {
        closing = false;
        modalElement.classList.remove("hide");
      }, 200);
    },
    destroy() {},
  };
}
