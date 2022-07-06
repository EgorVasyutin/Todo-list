const buttonCreateTodo = document.querySelector(".body__input-button");
const task = `   <div class="task">
              <input type="checkbox" class="task__checkbox" />
            <label>
              <input class="input__task--text" readonly>
            </label>
            <div class="task__img">
              <img src="img/pen.svg" alt="pen" class="task__img--pen" />
              <img
                      src="img/pannier.svg"
                      alt="pannier"
                      class="task__img--pannier"
              />
            </div>
          </div>
`;

const tasks = document.querySelector(".tasks");
buttonCreateTodo.onclick = function () {
  if (document.querySelector(".body__input").value !== "") {
    tasks.innerHTML += task;
    document.querySelector(".input__task--text").value =
      document.querySelector(".body__input").value;
  }
};

const pannier = document.querySelector(".task__img--pannier");
pannier.onclick = function () {
  console.log(123);
};

const pen = document.querySelector(".task__img--pen");

pen.onclick = () => {
  console.log(123);
};
