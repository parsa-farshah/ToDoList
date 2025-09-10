// click bg task change and other remove
let _inp = document.querySelectorAll("#taskPannell>a");

let flag = 1;
_inp.forEach((value, i) => {
  value.addEventListener("click", () => {
    // reseting..///
    _inp.forEach((item, index) => {
      if (index != i) {
        item.classList.remove("bg-[#f1f1f1]");
        item.classList.add("bg-[#c4c4c4ad]");
      }
    });
    // reseting..///

    if (flag == 1) {
      value.classList.toggle("bg-[#f1f1f1]");
      value.classList.toggle("bg-[#c4c4c4ad]");
    }
  });
});

// inp task
let inpTaskUser = document.querySelector("#inpTask");
let createTaskBtn = document.querySelector("#inpTask>button");
let taskdiv = document.getElementById("taskAdd");
let taskValue = "";

createTaskBtn.addEventListener("click", () => {
  if (inpTaskUser.children[0].value === "") {
    alert("enter task");
  } else {
    taskValue = inpTaskUser.children[0].value;
    makeTask();
  }

  // reset
  inpTaskUser.children[0].value = "";
  inpTaskUser.children[0].focus();
});

function makeTask() {
  taskdiv.innerHTML += `
    <div  class=" task w-full mt-4 flex justify-between border-b border-b-gray-300">
      <div class="w-full h-full flex items-center gap-2 pb-2">
        <input
        onclick="myTick(this)"
         id="checkBox"
          class="w-[20px] h-[20px] accent-[#c4c4c4ad]"
          type="checkbox"
        />
        <h5 class="text-xl font-bold capitalize">${taskValue}</h5>
      </div>
      <figure onclick="trash(this)" class="hover:scale-125 duration-500">
        <img
          class="w-[20px] h-[20px] cursor-pointer"
          src="src/images/trash.png"
          alt=""
        />
      </figure>
    </div> `;
}

// add in all in complete

let completeDiv = document.querySelector("#complete");

let taskChange;

function myTick(s) {
  let taskChange = s.closest(".task");
  let taskText = taskChange.querySelector("h5").innerText;

  if (s.checked) {
    // اضافه کردن به completeDiv

    taskChange.classList.add("opacity-50");
    completeDiv.classList.remove("hidden");
    completeDiv.classList.add("flex");
    let copy = taskChange.cloneNode(true); // true یعنی همراه فرزندها
    completePage.appendChild(copy);
    completeDiv.appendChild(taskChange);
  } else {
    // برگشت به taskdiv
    taskdiv.appendChild(taskChange);
    taskChange.classList.remove("opacity-50");
    taskChange.classList.add("opacity-100");
  }
}

// remove or trash

function trash(s) {
  let taskDelete = s.closest(".task");
  taskDelete.remove();
  taskDelete.classList.add("opacity-40");
  taskDelete.classList.add("select-none");
  trashPage.appendChild(taskDelete);
  console.log(trashAdd.appendChild(taskDelete));
}

// trash page
let trashPage = document.querySelector("#trashPage");
let btnTrashPage = document.querySelector("#btnTrashPage");
let btnAllTaskPage = document.querySelector("#btnAllTaskPage");

let completePage = document.querySelector("#completePage");
let completeBtnPage = document.querySelector("#completeBtnPage");

btnTrashPage.addEventListener("click", () => {
  trashPage.classList.remove("hidden");
  completePage.classList.add("hidden");
});

// all task page

btnAllTaskPage.addEventListener("click", () => {
  trashPage.classList.add("hidden");
  completePage.classList.add("hidden");
});

// compelte page task add in
completeBtnPage.addEventListener("click", () => {
  completePage.classList.remove("hidden");
});
