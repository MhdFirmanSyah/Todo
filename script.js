const todos = [];
// const todos = [
//   {
//     id: 381695,
//     task: "fdffdfdffd",
//     timestap: "0002-02-22",
//     isComplate: true,
//   },
//   {
//     id: 381695,
//     task: "fdffdfdffd",
//     timestap: "0002-02-22",
//     isComplate: false,
//   },
//   {
//     id: 381695,
//     task: "fdffdfdffd",
//     timestap: "0002-02-22",
//     isComplate: true,
//   },
// ];
const RENDER_EVENT = "render-todo";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.querySelector("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });
});

const generateTodoObject = (id, task, timestap, isComplate) => {
  return {
    id,
    task,
    timestap,
    isComplate,
  };
};

const generateId = () => {
  return Math.floor(Math.random() * 1000000) + 1;
};
console.log(generateId());

const addTodo = () => {
  const inputTodo = document.querySelector("#todo").value;
  const inputDate = document.querySelector("#date").value;
  if (inputTodo === "" || inputDate === "") {
    alert("Please fill in both fields");
  } else {
    const Todo = generateTodoObject(generateId(), inputTodo, inputDate, false);
    todos.push(Todo);
    console.log(todos);
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const makeTodoObject = (list) => {
  const container = document.createElement("div");
  container.id = list.id;
  container.classList.add("list-pr");
  const listCon = document.createElement("div");
  const title = document.createElement("h1");
  title.classList.add("node-list");
  title.innerText = list.task;
  listCon.appendChild(title);
  const date = document.createElement("p");
  date.classList.add("date");
  date.innerText = list.timestap;
  listCon.appendChild(date);
  container.appendChild(listCon);
  const img = document.createElement("img");
  img.src = "img//done.png";
  img.id = "done";
  container.appendChild(img);

  if (!list.isComplate) {
    img.addEventListener("click", () => {
      addTaskToCompleted(list.id);
    });
  } else {
    img.remove();
    const sideList = document.createElement("div");
    sideList.classList.add("side list");
    const trash = document.createElement("img");
    trash.src = "img/hapus.png";
    const undo = document.createElement("img");
    undo.src = "img/ulang.png";
    sideList.appendChild(trash);
    sideList.appendChild(undo);
    container.appendChild(sideList);
  }

  return container;

  function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);
    if (todoTarget === null) return; // Fix: Changed to ===
    todoTarget.isComplate = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        // Fix: Changed to todoItem.id === todoId
        return todoItem;
      }
    }
    return null;
  }
};

document.addEventListener(RENDER_EVENT, function () {
  const uncomplateTodo = document.querySelector(".list-proses");
  uncomplateTodo.innerHTML = "";

  const complateTodo = document.querySelector(".list-selesai");
  complateTodo.innerHTML = "";

  for (const listTodo of todos) {
    if (!listTodo.isComplate) {
      // Fix: Changed to !listTodo.isComplate
      const element = makeTodoObject(listTodo);
      uncomplateTodo.appendChild(element); // Fix: Appended the element to the DOM
    } else {
      const element = makeTodoObject(listTodo);
      complateTodo.appendChild(element); // Fix: Appended the element to the DOM
    }
  }
});
{
  /* <div class="list-ss">
<div class="list-main">
  <h1 class="node-list">ssdsdsdsdsd</h1>
  <!--todo yang selesai  -->
  <p class="date">3/3/3/</p>
  <!--date todo  -->
</div>
<div class="side-list">
  <img src="img/hapus.png" alt="" />
  <!-- delete todo -->
  <!--  hapus todolist -->
  <img src="img/ulang.png" alt="" />
  <!-- pindah ke pending section -->
  <!--  hapus daftar selesai todo -->
</div>
</div> */
}
