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

// error task empty
let errorEmpty = document.querySelector("#errorEmpty");

createTaskBtn.addEventListener("click", () => {
  if (inpTaskUser.children[0].value === "") {
    errorEmpty.classList.remove("right-full");
    errorEmpty.classList.add("right-0");
    setTimeout(() => {
      errorEmpty.classList.remove("right-0");
      errorEmpty.classList.add("right-full");
    }, 5000);
  } else {
    taskValue = inpTaskUser.children[0].value;
    makeTask();
    saveTasks();
  }

  // reset
  inpTaskUser.children[0].value = "";
  inpTaskUser.children[0].focus();
});

function makeTask() {
  taskdiv.innerHTML += `
    <div  class="task w-full h-fit mt-4 flex justify-between items-center border-b border-b-gray-300">
      <div id="allTask" class="w-full h-full flex items-center gap-2 pb-2">
        <input
        onclick="myTick(this)"
         id="checkBox"
          class="w-[20px] h-[20px] accent-[#c4c4c4ad]"
          type="checkbox"
        />
        <h5 class="text-xl font-bold capitalize">${taskValue}</h5>
      </div>
      <div class="flex gap-2">
        <figure onclick="day(this)" class="hover:scale-125 duration-500">
          <img class="w-[20px] h-[20px] cursor-pointer" src="src/images/day.png" alt="dat" />
        </figure>
        <figure onclick="trash(this)" class="hover:scale-125 duration-500">
          <img
            class="w-[20px] h-[20px] cursor-pointer"
            src="src/images/trash.png"
            alt=""
          />
        </figure>
      </div>
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
  const task = s.closest(".task");

  if (task.parentElement === trashPage) {
    task.remove();
    saveTasks();
    return;
  }

  // اگر هنوز داخل trash نیست => منتقل کن به trashPage (قابل بازیابی)
  // اگه چک‌باکس زده بود غیر فعالش کن
  const cb = task.querySelector('input[type="checkbox"]');
  if (cb) cb.checked = false;

  task.classList.add("opacity-40", "select-none");
  // appendChild خودش عنصر رو از parent قبلی جدا میکنه و به trashPage اضافه میکنه
  trashPage.appendChild(task);

  saveTasks();
}

// trash page
let trashPage = document.querySelector("#trashPage");
let btnTrashPage = document.querySelector("#btnTrashPage");
let btnAllTaskPage = document.querySelector("#btnAllTaskPage");

let completePage = document.querySelector("#completePage");
let completeBtnPage = document.querySelector("#completeBtnPage");

let allTaskPageDiv = document.getElementById("allTaskPage");

btnTrashPage.addEventListener("click", () => {
  trashPage.classList.remove("hidden");
  completePage.classList.add("hidden");
  allTaskPageDiv.classList.add("hidden");
  taskdiv.classList.add("hidden");
  dayPage.classList.remove("flex");
  dayPage.classList.add("hidden");
  profilePage.classList.remove("flex");
  profilePage.classList.add("hidden");
});

// all task page

btnAllTaskPage.addEventListener("click", () => {
  trashPage.classList.add("hidden");
  completePage.classList.add("hidden");
  allTaskPageDiv.classList.remove("hidden");
  allTaskPageDiv.classList.add("flex");
  taskdiv.classList.remove("hidden");
  taskdiv.classList.add("block");
  dayPage.classList.remove("flex");
  dayPage.classList.add("hidden");
  profilePage.classList.remove("flex");
  profilePage.classList.add("hidden");
});

// compelte page task add in
completeBtnPage.addEventListener("click", () => {
  completePage.classList.remove("hidden");
  allTaskPageDiv.classList.add("hidden");
  allTaskPageDiv.classList.remove("flex");
  taskdiv.classList.add("hidden");
  dayPage.classList.remove("flex");
  dayPage.classList.add("hidden");
  profilePage.classList.remove("flex");
  profilePage.classList.add("hidden");
});

// add search
let searchInp = document.querySelector("#search");
searchInp.addEventListener("keyup", (e) => {
  let allTasks = document.querySelectorAll("#allTask>h5");
  let searchVal = e.target.value.toLowerCase().trim();
  allTasks.forEach((val) => {
    // بعد شرط بگذاریم
    let text = val.innerText.toLowerCase().trim();
    if (text.startsWith(searchVal)) {
      val.parentElement.parentElement.classList.remove("hidden");
      val.parentElement.parentElement.classList.add("flex");
    } else {
      val.parentElement.parentElement.classList.add("hidden");
      val.parentElement.parentElement.classList.remove("flex");
    }
  });
});

// pannel click

let panellBtn = document.querySelectorAll("#panellBtn>figure");

panellBtn.forEach((value, index) => {
  value.addEventListener("click", () => {
    panellBtn.forEach((item, i) => {
      if (index != i) {
        item.classList.add("bg-white");
        item.classList.remove("bg-gray-200");
      } else {
        item.classList.remove("bg-white");
        item.classList.add("bg-gray-200");
      }
    });
  });
});

// for day task and tasks

// taskPage
let taskBtn = document.querySelector("#taskBtn");
taskBtn.addEventListener("click", () => {
  dayPage.classList.remove("flex");
  dayPage.classList.add("hidden");
  profilePage.classList.remove("flex");
  profilePage.classList.add("hidden");
});

// daypage
let dayBtn = document.querySelector("#dayBtn");
let dayPage = document.querySelector("#dayPage");
dayBtn.addEventListener("click", () => {
  dayPage.classList.remove("hidden");
  dayPage.classList.add("flex");
  profilePage.classList.remove("flex");
  profilePage.classList.add("hidden");
});

function day(s) {
  let dayTask = s.closest(".task");
  dayPage.appendChild(dayTask);
}

function saveTasks() {
  let allTasks = [];

  document.querySelectorAll(".task").forEach((task) => {
    let text = task.querySelector("h5").innerText;
    let status = "active";

    if (task.parentElement.id === "completePage") {
      status = "complete";
    } else if (task.parentElement.id === "trashPage") {
      status = "trash";
    } else if (task.parentElement.id === "dayPage") {
      status = "day";
    }

    allTasks.push({ text, status });
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

window.addEventListener("DOMContentLoaded", () => {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((t) => {
    taskValue = t.text;
    makeTask();

    // آخرین تسک ساخته شده
    let lastTask = taskdiv.querySelector(".task:last-child");

    // بر اساس status جابجا کن
    if (t.status === "complete") {
      completePage.appendChild(lastTask);
      lastTask.classList.add("opacity-50");
    } else if (t.status === "trash") {
      trashPage.appendChild(lastTask);
      lastTask.classList.add("opacity-40", "select-none");
    } else if (t.status === "day") {
      dayPage.appendChild(lastTask);
    }
  });
});

// click profile front end developer

// profilepage
let profileBtn = document.querySelector("#profile");
let profilePage = document.querySelector("#profilePage");
profileBtn.addEventListener("click", () => {
  profilePage.classList.remove("hidden");
  profilePage.classList.add("flex");
});
