const modal = $.modal();

const buttonYes = document.querySelector(".modal__button--yes");
const buttonNo = document.querySelector(".modal__button--no");
const buttonClose = document.querySelector(".modal__close");

const closeModalWindow = () => {
  modal.close();
};
buttonYes.onclick = closeModalWindow;
buttonNo.onclick = closeModalWindow;
buttonClose.onclick = closeModalWindow;
