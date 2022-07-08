// const $ = {};
//
// window.$ = $;

const modal = $.modal();

const task = `   <div class="task">
              <input type="checkbox" class="task__checkbox" />
            <label>
              <div class="task__text"></div>
            </label>
            <div class="task__img">
              <img src="assets/img/pen.svg" alt="pen" class="task__img--pen" />
              <img
                      src="assets/img/pannier.svg"
                      alt="pannier"
                      class="task__img--pannier"
              />
            </div>
          </div>
`;
const buttonCreateTodo = document.querySelector(".body__input-button");
const buttonYes: HTMLButtonElement = document.querySelector(
  ".modal__button--yes"
);
const buttonNo: HTMLButtonElement =
  document.querySelector(".modal__button--no");
const buttonClose: HTMLButtonElement = document.querySelector(".modal__close");

const closeModalWindow = () => {
  modal.close();
};

buttonYes.addEventListener("click", closeModalWindow);
buttonNo.addEventListener("click", closeModalWindow);
buttonClose.addEventListener("click", closeModalWindow);

// function getTaskHTML(task) {
//   return;
// }

// const tasks = document.querySelector(".tasks");
// buttonCreateTodo.onclick = getTaskHTML(task);

const allTaskIconEdit = document.getElementsByClassName("task__img--pen");
const allTaskIconDelete = document.getElementsByClassName("task__img--pannier");
const logEditTaskId = () => {
  for (let i = 0; i < allTaskIconEdit.length; i++) {
    allTaskIconEdit[i].addEventListener("click", function () {
      console.log(i);
    });
  }
};

const edit = document.querySelector(".task__img--pen");
edit.addEventListener("click", function () {
  logEditTaskId();
});

const logDeleteTaskId = () => {
  for (let i = 0; i < allTaskIconDelete.length; i++) {
    allTaskIconDelete[i].addEventListener("click", function () {
      console.log(i);
    });
  }
};

const Delete = document.querySelector(".task__img--pannier");
Delete.addEventListener("click", function () {
  logDeleteTaskId();
});
