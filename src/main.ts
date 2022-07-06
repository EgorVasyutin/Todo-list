const modal = $.modal();

const buttonYes: HTMLButtonElement = document.querySelector(
  ".modal__button--yes"
);
const buttonNo: HTMLButtonElement =
  document.querySelector(".modal__button--no");
const buttonClose: HTMLButtonElement = document.querySelector(".modal__close");

const closeModalWindow = () => {
  modal.close();
};
buttonYes.onclick = closeModalWindow;
buttonNo.onclick = closeModalWindow;
buttonClose.onclick = closeModalWindow;
