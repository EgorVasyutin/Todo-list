function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `    
      <div class="modal-overlay">
        <div class="modal-window">
          <div class="modal-window__header">
            <h2>This is a poll</h2>
            <span class="modal__close">&times;</span>
          </div>
          <div class="modal-window__body">
            <div class="modal__text">Hello, do you like our site</div>
          </div>
          <div class="modal-window__footer">
            <button class="modal__button modal__button--yes">Yes</button>
            <button class="modal__button modal__button--no">No</button>
          </div>
        </div>
      </div>`
  );
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  const $modal = _createModal(options);
  let closing = false;
  return {
    open() {
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        closing = false;
        $modal.classList.remove("hide");
      }, 200);
    },
    destroy() {},
  };
};
