localStorage.removeItem("completedTasks");

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
        <h5>${taskValue}</h5>
      </div>
      <figure onclick="trash(this)">
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
    completeDiv.appendChild(taskChange);
    taskChange.classList.add("opacity-50");
    completeDiv.classList.remove("hidden");

    completeDiv.classList.add("flex");
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
}
