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
  themePage.classList.remove("flex");
  themePage.classList.add("hidden");
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
  themePage.classList.remove("flex");
  themePage.classList.add("hidden");
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
  themePage.classList.remove("flex");
  themePage.classList.add("hidden");
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
  themePage.classList.remove("flex");
  themePage.classList.add("hidden");
});

// daypage
let dayBtn = document.querySelector("#dayBtn");
let dayPage = document.querySelector("#dayPage");
dayBtn.addEventListener("click", () => {
  dayPage.classList.remove("hidden");
  dayPage.classList.add("flex");
  profilePage.classList.remove("flex");
  profilePage.classList.add("hidden");
  themePage.classList.remove("flex");
  themePage.classList.add("hidden");
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
  themePage.classList.remove("flex");
  themePage.classList.add("hidden");
});

///////////////////////////////// theme pages

let themeBtn = document.querySelector("#themeBtn");
let themePage = document.querySelector("#themePage");

themeBtn.addEventListener("click", () => {
  themePage.classList.remove("hidden");
  themePage.classList.add("flex");
});

///////////////////////////////////// default color

let defaultColor = document.querySelector("#defaultColor");

let _body = document.querySelector("#body");
let _main = document.querySelector("#main");
let taskPannell = document.querySelector("#taskPannell");
let taskAllpage = document.querySelector("#taskAllpage");
let panell = document.querySelector("#panellBtn");
let searchTrash = document.querySelector("#searchTrash");
let searchComplete = document.querySelector("#searchComplete");
let todaySearch = document.querySelector("#todaySearch");
let profileBg = document.querySelector("#profileBg");

defaultColor.addEventListener("click", () => {
  // remove blue
  _body.classList.remove("bg-[#006bab]");
  _main.classList.remove("bg-[#006bab]");
  panell.classList.remove("bg-[#14b5ff]");
  taskPannell.classList.remove("bg-[#75d5ff]");
  taskAllpage.classList.remove("bg-[#75d5ff]");
  trashPage.classList.remove("bg-[#75d5ff]");
  completePage.classList.remove("bg-[#75d5ff]");
  dayPage.classList.remove("bg-[#75d5ff]");
  profilePage.classList.remove("bg-[#75d5ff]");
  themePage.classList.remove("bg-[#75d5ff]");
  searchInp.classList.remove("bg-[#14b5ff]");
  searchTrash.classList.remove("bg-[#14b5ff]");
  searchComplete.classList.remove("bg-[#14b5ff]");
  todaySearch.classList.remove("bg-[#14b5ff]");
  profileBg.classList.remove("bg-[#14b5ff]");
  // remove purple

  _body.classList.remove("bg-[#2401d6]");
  _main.classList.remove("bg-[#2401d6]");
  panell.classList.remove("bg-[#523bff]");
  taskPannell.classList.remove("bg-[#7c73ff]");
  taskAllpage.classList.remove("bg-[#7c73ff]");
  trashPage.classList.remove("bg-[#7c73ff]");
  completePage.classList.remove("bg-[#7c73ff]");
  dayPage.classList.remove("bg-[#7c73ff]");
  profilePage.classList.remove("bg-[#7c73ff]");
  themePage.classList.remove("bg-[#7c73ff]");
  searchInp.classList.remove("bg-[#3d14ff]");
  searchTrash.classList.remove("bg-[#3d14ff]");
  searchComplete.classList.remove("bg-[#3d14ff]");
  todaySearch.classList.remove("bg-[#3d14ff]");
  profileBg.classList.remove("bg-[#3d14ff]");

  ///////////////////// remove green

  _body.classList.remove("bg-[#078e1a]");
  _main.classList.remove("bg-[#078e1a]");
  panell.classList.remove("bg-[#0cdb28]");
  taskPannell.classList.remove("bg-[#78fd89]");
  taskAllpage.classList.remove("bg-[#78fd89]");
  trashPage.classList.remove("bg-[#78fd89]");
  completePage.classList.remove("bg-[#78fd89]");
  dayPage.classList.remove("bg-[#78fd89]");
  profilePage.classList.remove("bg-[#78fd89]");
  themePage.classList.remove("bg-[#78fd89]");
  searchInp.classList.remove("bg-[#0cdb28]");
  searchTrash.classList.remove("bg-[#0cdb28]");
  searchComplete.classList.remove("bg-[#0cdb28]");
  todaySearch.classList.remove("bg-[#0cdb28]");
  profileBg.classList.remove("bg-[#0cdb28]");

  //remove bg1

  _body.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  _main.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  panell.classList.remove("bg2theme1");
  taskPannell.classList.remove("bg2theme1");
  taskAllpage.classList.remove("bg2theme1");
  trashPage.classList.remove("bg2theme1");
  completePage.classList.remove("bg2theme1");
  dayPage.classList.remove("bg2theme1");
  profilePage.classList.remove("bg2theme1");
  themePage.classList.remove("bg2theme1");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove bg2

  _body.classList.remove("bg1theme2");
  _main.classList.remove("bg1theme2");
  panell.classList.remove("bg2theme2");
  taskPannell.classList.remove("bg2theme2");
  taskAllpage.classList.remove("bg2theme2");
  trashPage.classList.remove("bg2theme2");
  completePage.classList.remove("bg2theme2");
  dayPage.classList.remove("bg2theme2");
  profilePage.classList.remove("bg2theme2");
  themePage.classList.remove("bg2theme2");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove dark

  _body.classList.remove("bg-[#000000]");
  _body.classList.remove("text-gray-600");
  _main.classList.remove("bg-[#000000]");
  panell.classList.remove("bg-[#6d6d6d]");
  taskPannell.classList.remove("bg-[#6d6d6d]");
  taskAllpage.classList.remove("bg-[#6d6d6d]");
  trashPage.classList.remove("bg-[#6d6d6d]");
  completePage.classList.remove("bg-[#6d6d6d]");
  dayPage.classList.remove("bg-[#6d6d6d]");
  profilePage.classList.remove("bg-[#6d6d6d]");
  themePage.classList.remove("bg-[#6d6d6d]");
  searchInp.classList.remove("bg-[#4f4f4f]");
  searchInp.classList.remove("text-white");
  searchTrash.classList.remove("bg-[#4f4f4f]");
  searchTrash.classList.remove("text-white");
  searchComplete.classList.remove("bg-[#4f4f4f]");
  searchComplete.classList.remove("text-white");
  todaySearch.classList.remove("bg-[#4f4f4f]");
  todaySearch.classList.remove("text-white");
  profileBg.classList.remove("bg-[#4f4f4f]");

  // add
  _body.classList.add("bg-[#d1bf00]");
  _main.classList.add("bg-[#d1bf00]");
  panell.classList.add("bg-[#ffff00]");
  taskPannell.classList.add("bg-[#f4ffc1]");
  taskAllpage.classList.add("bg-[#f4ffc1]");
  trashPage.classList.add("bg-[#f4ffc1]");
  completePage.classList.add("bg-[#f4ffc1]");
  dayPage.classList.add("bg-[#f4ffc1]");
  profilePage.classList.add("bg-[#f4ffc1]");
  themePage.classList.add("bg-[#f4ffc1]");
  searchInp.classList.add("bg-[#ffff00]");
  searchTrash.classList.add("bg-[#ffff00]");
  searchComplete.classList.add("bg-[#ffff00]");
  todaySearch.classList.add("bg-[#ffff00]");
  profileBg.classList.add("bg-[#ffff00]");
});

/////////////////////////////// blue theme
let blueColor = document.querySelector("#blueColor");

blueColor.addEventListener("click", () => {
  // remove
  _body.classList.remove("bg-[#d1bf00]");
  _main.classList.remove("bg-[#d1bf00]");
  panell.classList.remove("bg-[#ffff00]");
  taskPannell.classList.remove("bg-[#f4ffc1]");
  taskAllpage.classList.remove("bg-[#f4ffc1]");
  trashPage.classList.remove("bg-[#f4ffc1]");
  completePage.classList.remove("bg-[#f4ffc1]");
  dayPage.classList.remove("bg-[#f4ffc1]");
  profilePage.classList.remove("bg-[#f4ffc1]");
  themePage.classList.remove("bg-[#f4ffc1]");
  searchInp.classList.remove("bg-[#ffff00]");
  searchTrash.classList.remove("bg-[#ffff00]");
  searchComplete.classList.remove("bg-[#ffff00]");
  todaySearch.classList.remove("bg-[#ffff00]");
  profileBg.classList.remove("bg-[#ffff00]");
  // remove purple

  _body.classList.remove("bg-[#2401d6]");
  _main.classList.remove("bg-[#2401d6]");
  panell.classList.remove("bg-[#523bff]");
  taskPannell.classList.remove("bg-[#7c73ff]");
  taskAllpage.classList.remove("bg-[#7c73ff]");
  trashPage.classList.remove("bg-[#7c73ff]");
  completePage.classList.remove("bg-[#7c73ff]");
  dayPage.classList.remove("bg-[#7c73ff]");
  profilePage.classList.remove("bg-[#7c73ff]");
  themePage.classList.remove("bg-[#7c73ff]");
  searchInp.classList.remove("bg-[#3d14ff]");
  searchTrash.classList.remove("bg-[#3d14ff]");
  searchComplete.classList.remove("bg-[#3d14ff]");
  todaySearch.classList.remove("bg-[#3d14ff]");
  profileBg.classList.remove("bg-[#3d14ff]");

  ///////////////////// remove green

  _body.classList.remove("bg-[#078e1a]");
  _main.classList.remove("bg-[#078e1a]");
  panell.classList.remove("bg-[#0cdb28]");
  taskPannell.classList.remove("bg-[#78fd89]");
  taskAllpage.classList.remove("bg-[#78fd89]");
  trashPage.classList.remove("bg-[#78fd89]");
  completePage.classList.remove("bg-[#78fd89]");
  dayPage.classList.remove("bg-[#78fd89]");
  profilePage.classList.remove("bg-[#78fd89]");
  themePage.classList.remove("bg-[#78fd89]");
  searchInp.classList.remove("bg-[#0cdb28]");
  searchTrash.classList.remove("bg-[#0cdb28]");
  searchComplete.classList.remove("bg-[#0cdb28]");
  todaySearch.classList.remove("bg-[#0cdb28]");
  profileBg.classList.remove("bg-[#0cdb28]");

  //remove bg1

  _body.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  _main.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  panell.classList.remove("bg2theme1");
  taskPannell.classList.remove("bg2theme1");
  taskAllpage.classList.remove("bg2theme1");
  trashPage.classList.remove("bg2theme1");
  completePage.classList.remove("bg2theme1");
  dayPage.classList.remove("bg2theme1");
  profilePage.classList.remove("bg2theme1");
  themePage.classList.remove("bg2theme1");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove bg2

  _body.classList.remove("bg1theme2");
  _main.classList.remove("bg1theme2");
  panell.classList.remove("bg2theme2");
  taskPannell.classList.remove("bg2theme2");
  taskAllpage.classList.remove("bg2theme2");
  trashPage.classList.remove("bg2theme2");
  completePage.classList.remove("bg2theme2");
  dayPage.classList.remove("bg2theme2");
  profilePage.classList.remove("bg2theme2");
  themePage.classList.remove("bg2theme2");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove dark

  _body.classList.remove("bg-[#000000]");
  _body.classList.remove("text-gray-600");
  _main.classList.remove("bg-[#000000]");
  panell.classList.remove("bg-[#6d6d6d]");
  taskPannell.classList.remove("bg-[#6d6d6d]");
  taskAllpage.classList.remove("bg-[#6d6d6d]");
  trashPage.classList.remove("bg-[#6d6d6d]");
  completePage.classList.remove("bg-[#6d6d6d]");
  dayPage.classList.remove("bg-[#6d6d6d]");
  profilePage.classList.remove("bg-[#6d6d6d]");
  themePage.classList.remove("bg-[#6d6d6d]");
  searchInp.classList.remove("bg-[#4f4f4f]");
  searchInp.classList.remove("text-white");
  searchTrash.classList.remove("bg-[#4f4f4f]");
  searchTrash.classList.remove("text-white");
  searchComplete.classList.remove("bg-[#4f4f4f]");
  searchComplete.classList.remove("text-white");
  todaySearch.classList.remove("bg-[#4f4f4f]");
  todaySearch.classList.remove("text-white");
  profileBg.classList.remove("bg-[#4f4f4f]");

  // add
  _body.classList.add("bg-[#006bab]");
  _main.classList.add("bg-[#006bab]");
  panell.classList.add("bg-[#14b5ff]");
  taskPannell.classList.add("bg-[#75d5ff]");
  taskAllpage.classList.add("bg-[#75d5ff]");
  trashPage.classList.add("bg-[#75d5ff]");
  completePage.classList.add("bg-[#75d5ff]");
  dayPage.classList.add("bg-[#75d5ff]");
  profilePage.classList.add("bg-[#75d5ff]");
  themePage.classList.add("bg-[#75d5ff]");
  searchInp.classList.add("bg-[#14b5ff]");
  searchTrash.classList.add("bg-[#14b5ff]");
  searchComplete.classList.add("bg-[#14b5ff]");
  todaySearch.classList.add("bg-[#14b5ff]");
  profileBg.classList.add("bg-[#14b5ff]");
});

///////////////////////////////// purple theme

let purpleColor = document.querySelector("#purpleColor");
purpleColor.addEventListener("click", () => {
  // remove
  _body.classList.remove("bg-[#d1bf00]");
  _main.classList.remove("bg-[#d1bf00]");
  panell.classList.remove("bg-[#ffff00]");
  taskPannell.classList.remove("bg-[#f4ffc1]");
  taskAllpage.classList.remove("bg-[#f4ffc1]");
  trashPage.classList.remove("bg-[#f4ffc1]");
  completePage.classList.remove("bg-[#f4ffc1]");
  dayPage.classList.remove("bg-[#f4ffc1]");
  profilePage.classList.remove("bg-[#f4ffc1]");
  themePage.classList.remove("bg-[#f4ffc1]");
  searchInp.classList.remove("bg-[#ffff00]");
  searchTrash.classList.remove("bg-[#ffff00]");
  searchComplete.classList.remove("bg-[#ffff00]");
  todaySearch.classList.remove("bg-[#ffff00]");
  profileBg.classList.remove("bg-[#ffff00]");
  // remove blue
  _body.classList.remove("bg-[#006bab]");
  _main.classList.remove("bg-[#006bab]");
  panell.classList.remove("bg-[#14b5ff]");
  taskPannell.classList.remove("bg-[#75d5ff]");
  taskAllpage.classList.remove("bg-[#75d5ff]");
  trashPage.classList.remove("bg-[#75d5ff]");
  completePage.classList.remove("bg-[#75d5ff]");
  dayPage.classList.remove("bg-[#75d5ff]");
  profilePage.classList.remove("bg-[#75d5ff]");
  themePage.classList.remove("bg-[#75d5ff]");
  searchInp.classList.remove("bg-[#14b5ff]");
  searchTrash.classList.remove("bg-[#14b5ff]");
  searchComplete.classList.remove("bg-[#14b5ff]");
  todaySearch.classList.remove("bg-[#14b5ff]");
  profileBg.classList.remove("bg-[#14b5ff]");

  ///////////////////// remove green

  _body.classList.remove("bg-[#078e1a]");
  _main.classList.remove("bg-[#078e1a]");
  panell.classList.remove("bg-[#0cdb28]");
  taskPannell.classList.remove("bg-[#78fd89]");
  taskAllpage.classList.remove("bg-[#78fd89]");
  trashPage.classList.remove("bg-[#78fd89]");
  completePage.classList.remove("bg-[#78fd89]");
  dayPage.classList.remove("bg-[#78fd89]");
  profilePage.classList.remove("bg-[#78fd89]");
  themePage.classList.remove("bg-[#78fd89]");
  searchInp.classList.remove("bg-[#0cdb28]");
  searchTrash.classList.remove("bg-[#0cdb28]");
  searchComplete.classList.remove("bg-[#0cdb28]");
  todaySearch.classList.remove("bg-[#0cdb28]");
  profileBg.classList.remove("bg-[#0cdb28]");

  //remove bg1

  _body.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  _main.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  panell.classList.remove("bg2theme1");
  taskPannell.classList.remove("bg2theme1");
  taskAllpage.classList.remove("bg2theme1");
  trashPage.classList.remove("bg2theme1");
  completePage.classList.remove("bg2theme1");
  dayPage.classList.remove("bg2theme1");
  profilePage.classList.remove("bg2theme1");
  themePage.classList.remove("bg2theme1");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove bg2

  _body.classList.remove("bg1theme2");
  _main.classList.remove("bg1theme2");
  panell.classList.remove("bg2theme2");
  taskPannell.classList.remove("bg2theme2");
  taskAllpage.classList.remove("bg2theme2");
  trashPage.classList.remove("bg2theme2");
  completePage.classList.remove("bg2theme2");
  dayPage.classList.remove("bg2theme2");
  profilePage.classList.remove("bg2theme2");
  themePage.classList.remove("bg2theme2");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove dark

  _body.classList.remove("bg-[#000000]");
  _body.classList.remove("text-gray-600");
  _main.classList.remove("bg-[#000000]");
  panell.classList.remove("bg-[#6d6d6d]");
  taskPannell.classList.remove("bg-[#6d6d6d]");
  taskAllpage.classList.remove("bg-[#6d6d6d]");
  trashPage.classList.remove("bg-[#6d6d6d]");
  completePage.classList.remove("bg-[#6d6d6d]");
  dayPage.classList.remove("bg-[#6d6d6d]");
  profilePage.classList.remove("bg-[#6d6d6d]");
  themePage.classList.remove("bg-[#6d6d6d]");
  searchInp.classList.remove("bg-[#4f4f4f]");
  searchInp.classList.remove("text-white");
  searchTrash.classList.remove("bg-[#4f4f4f]");
  searchTrash.classList.remove("text-white");
  searchComplete.classList.remove("bg-[#4f4f4f]");
  searchComplete.classList.remove("text-white");
  todaySearch.classList.remove("bg-[#4f4f4f]");
  todaySearch.classList.remove("text-white");
  profileBg.classList.remove("bg-[#4f4f4f]");

  // add purple

  _body.classList.add("bg-[#2401d6]");
  _main.classList.add("bg-[#2401d6]");
  panell.classList.add("bg-[#523bff]");
  taskPannell.classList.add("bg-[#7c73ff]");
  taskAllpage.classList.add("bg-[#7c73ff]");
  trashPage.classList.add("bg-[#7c73ff]");
  completePage.classList.add("bg-[#7c73ff]");
  dayPage.classList.add("bg-[#7c73ff]");
  profilePage.classList.add("bg-[#7c73ff]");
  themePage.classList.add("bg-[#7c73ff]");
  searchInp.classList.add("bg-[#3d14ff]");
  searchTrash.classList.add("bg-[#3d14ff]");
  searchComplete.classList.add("bg-[#3d14ff]");
  todaySearch.classList.add("bg-[#3d14ff]");
  profileBg.classList.add("bg-[#3d14ff]");
});

/////////////////////////////////////// green theme

let greenColor = document.querySelector("#greenColor");
greenColor.addEventListener("click", () => {
  // remove
  _body.classList.remove("bg-[#d1bf00]");
  _main.classList.remove("bg-[#d1bf00]");
  panell.classList.remove("bg-[#ffff00]");
  taskPannell.classList.remove("bg-[#f4ffc1]");
  taskAllpage.classList.remove("bg-[#f4ffc1]");
  trashPage.classList.remove("bg-[#f4ffc1]");
  completePage.classList.remove("bg-[#f4ffc1]");
  dayPage.classList.remove("bg-[#f4ffc1]");
  profilePage.classList.remove("bg-[#f4ffc1]");
  themePage.classList.remove("bg-[#f4ffc1]");
  searchInp.classList.remove("bg-[#ffff00]");
  searchTrash.classList.remove("bg-[#ffff00]");
  searchComplete.classList.remove("bg-[#ffff00]");
  todaySearch.classList.remove("bg-[#ffff00]");
  profileBg.classList.remove("bg-[#ffff00]");
  // remove blue
  _body.classList.remove("bg-[#006bab]");
  _main.classList.remove("bg-[#006bab]");
  panell.classList.remove("bg-[#14b5ff]");
  taskPannell.classList.remove("bg-[#75d5ff]");
  taskAllpage.classList.remove("bg-[#75d5ff]");
  trashPage.classList.remove("bg-[#75d5ff]");
  completePage.classList.remove("bg-[#75d5ff]");
  dayPage.classList.remove("bg-[#75d5ff]");
  profilePage.classList.remove("bg-[#75d5ff]");
  themePage.classList.remove("bg-[#75d5ff]");
  searchInp.classList.remove("bg-[#14b5ff]");
  searchTrash.classList.remove("bg-[#14b5ff]");
  searchComplete.classList.remove("bg-[#14b5ff]");
  todaySearch.classList.remove("bg-[#14b5ff]");
  profileBg.classList.remove("bg-[#14b5ff]");

  // remove purple

  _body.classList.remove("bg-[#2401d6]");
  _main.classList.remove("bg-[#2401d6]");
  panell.classList.remove("bg-[#523bff]");
  taskPannell.classList.remove("bg-[#7c73ff]");
  taskAllpage.classList.remove("bg-[#7c73ff]");
  trashPage.classList.remove("bg-[#7c73ff]");
  completePage.classList.remove("bg-[#7c73ff]");
  dayPage.classList.remove("bg-[#7c73ff]");
  profilePage.classList.remove("bg-[#7c73ff]");
  themePage.classList.remove("bg-[#7c73ff]");
  searchInp.classList.remove("bg-[#3d14ff]");
  searchTrash.classList.remove("bg-[#3d14ff]");
  searchComplete.classList.remove("bg-[#3d14ff]");
  todaySearch.classList.remove("bg-[#3d14ff]");
  profileBg.classList.remove("bg-[#3d14ff]");

  //remove bg1

  _body.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  _main.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  panell.classList.remove("bg2theme1");
  taskPannell.classList.remove("bg2theme1");
  taskAllpage.classList.remove("bg2theme1");
  trashPage.classList.remove("bg2theme1");
  completePage.classList.remove("bg2theme1");
  dayPage.classList.remove("bg2theme1");
  profilePage.classList.remove("bg2theme1");
  themePage.classList.remove("bg2theme1");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove bg2

  _body.classList.remove("bg1theme2");
  _main.classList.remove("bg1theme2");
  panell.classList.remove("bg2theme2");
  taskPannell.classList.remove("bg2theme2");
  taskAllpage.classList.remove("bg2theme2");
  trashPage.classList.remove("bg2theme2");
  completePage.classList.remove("bg2theme2");
  dayPage.classList.remove("bg2theme2");
  profilePage.classList.remove("bg2theme2");
  themePage.classList.remove("bg2theme2");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove dark

  _body.classList.remove("bg-[#000000]");
  _body.classList.remove("text-gray-600");
  _main.classList.remove("bg-[#000000]");
  panell.classList.remove("bg-[#6d6d6d]");
  taskPannell.classList.remove("bg-[#6d6d6d]");
  taskAllpage.classList.remove("bg-[#6d6d6d]");
  trashPage.classList.remove("bg-[#6d6d6d]");
  completePage.classList.remove("bg-[#6d6d6d]");
  dayPage.classList.remove("bg-[#6d6d6d]");
  profilePage.classList.remove("bg-[#6d6d6d]");
  themePage.classList.remove("bg-[#6d6d6d]");
  searchInp.classList.remove("bg-[#4f4f4f]");
  searchInp.classList.remove("text-white");
  searchTrash.classList.remove("bg-[#4f4f4f]");
  searchTrash.classList.remove("text-white");
  searchComplete.classList.remove("bg-[#4f4f4f]");
  searchComplete.classList.remove("text-white");
  todaySearch.classList.remove("bg-[#4f4f4f]");
  todaySearch.classList.remove("text-white");
  profileBg.classList.remove("bg-[#4f4f4f]");

  ///////////////////// add green

  _body.classList.add("bg-[#078e1a]");
  _main.classList.add("bg-[#078e1a]");
  panell.classList.add("bg-[#0cdb28]");
  taskPannell.classList.add("bg-[#78fd89]");
  taskAllpage.classList.add("bg-[#78fd89]");
  trashPage.classList.add("bg-[#78fd89]");
  completePage.classList.add("bg-[#78fd89]");
  dayPage.classList.add("bg-[#78fd89]");
  profilePage.classList.add("bg-[#78fd89]");
  themePage.classList.add("bg-[#78fd89]");
  searchInp.classList.add("bg-[#0cdb28]");
  searchTrash.classList.add("bg-[#0cdb28]");
  searchComplete.classList.add("bg-[#0cdb28]");
  todaySearch.classList.add("bg-[#0cdb28]");
  profileBg.classList.add("bg-[#0cdb28]");
});

//////////////////////////////////////// bg1 theme

let bg1 = document.querySelector("#bg1");
bg1.addEventListener("click", () => {
  // remove
  _body.classList.remove("bg-[#d1bf00]");
  _main.classList.remove("bg-[#d1bf00]");
  panell.classList.remove("bg-[#ffff00]");
  taskPannell.classList.remove("bg-[#f4ffc1]");
  taskAllpage.classList.remove("bg-[#f4ffc1]");
  trashPage.classList.remove("bg-[#f4ffc1]");
  completePage.classList.remove("bg-[#f4ffc1]");
  dayPage.classList.remove("bg-[#f4ffc1]");
  profilePage.classList.remove("bg-[#f4ffc1]");
  themePage.classList.remove("bg-[#f4ffc1]");
  searchInp.classList.remove("bg-[#ffff00]");
  searchTrash.classList.remove("bg-[#ffff00]");
  searchComplete.classList.remove("bg-[#ffff00]");
  todaySearch.classList.remove("bg-[#ffff00]");
  profileBg.classList.remove("bg-[#ffff00]");
  // remove blue
  _body.classList.remove("bg-[#006bab]");
  _main.classList.remove("bg-[#006bab]");
  panell.classList.remove("bg-[#14b5ff]");
  taskPannell.classList.remove("bg-[#75d5ff]");
  taskAllpage.classList.remove("bg-[#75d5ff]");
  trashPage.classList.remove("bg-[#75d5ff]");
  completePage.classList.remove("bg-[#75d5ff]");
  dayPage.classList.remove("bg-[#75d5ff]");
  profilePage.classList.remove("bg-[#75d5ff]");
  themePage.classList.remove("bg-[#75d5ff]");
  searchInp.classList.remove("bg-[#14b5ff]");
  searchTrash.classList.remove("bg-[#14b5ff]");
  searchComplete.classList.remove("bg-[#14b5ff]");
  todaySearch.classList.remove("bg-[#14b5ff]");
  profileBg.classList.remove("bg-[#14b5ff]");

  // remove purple

  _body.classList.remove("bg-[#2401d6]");
  _main.classList.remove("bg-[#2401d6]");
  panell.classList.remove("bg-[#523bff]");
  taskPannell.classList.remove("bg-[#7c73ff]");
  taskAllpage.classList.remove("bg-[#7c73ff]");
  trashPage.classList.remove("bg-[#7c73ff]");
  completePage.classList.remove("bg-[#7c73ff]");
  dayPage.classList.remove("bg-[#7c73ff]");
  profilePage.classList.remove("bg-[#7c73ff]");
  themePage.classList.remove("bg-[#7c73ff]");
  searchInp.classList.remove("bg-[#3d14ff]");
  searchTrash.classList.remove("bg-[#3d14ff]");
  searchComplete.classList.remove("bg-[#3d14ff]");
  todaySearch.classList.remove("bg-[#3d14ff]");
  profileBg.classList.remove("bg-[#3d14ff]");

  //add green

  _body.classList.remove("bg-[#078e1a]");
  _main.classList.remove("bg-[#078e1a]");
  panell.classList.remove("bg-[#0cdb28]");
  taskPannell.classList.remove("bg-[#78fd89]");
  taskAllpage.classList.remove("bg-[#78fd89]");
  trashPage.classList.remove("bg-[#78fd89]");
  completePage.classList.remove("bg-[#78fd89]");
  dayPage.classList.remove("bg-[#78fd89]");
  profilePage.classList.remove("bg-[#78fd89]");
  themePage.classList.remove("bg-[#78fd89]");
  searchInp.classList.remove("bg-[#0cdb28]");
  searchTrash.classList.remove("bg-[#0cdb28]");
  searchComplete.classList.remove("bg-[#0cdb28]");
  todaySearch.classList.remove("bg-[#0cdb28]");
  profileBg.classList.remove("bg-[#0cdb28]");

  //remove bg2

  _body.classList.remove("bg1theme2");
  _main.classList.remove("bg1theme2");
  panell.classList.remove("bg2theme2");
  taskPannell.classList.remove("bg2theme2");
  taskAllpage.classList.remove("bg2theme2");
  trashPage.classList.remove("bg2theme2");
  completePage.classList.remove("bg2theme2");
  dayPage.classList.remove("bg2theme2");
  profilePage.classList.remove("bg2theme2");
  themePage.classList.remove("bg2theme2");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove dark

  _body.classList.remove("bg-[#000000]");
  _body.classList.remove("text-gray-600");
  _main.classList.remove("bg-[#000000]");
  panell.classList.remove("bg-[#6d6d6d]");
  taskPannell.classList.remove("bg-[#6d6d6d]");
  taskAllpage.classList.remove("bg-[#6d6d6d]");
  trashPage.classList.remove("bg-[#6d6d6d]");
  completePage.classList.remove("bg-[#6d6d6d]");
  dayPage.classList.remove("bg-[#6d6d6d]");
  profilePage.classList.remove("bg-[#6d6d6d]");
  themePage.classList.remove("bg-[#6d6d6d]");
  searchInp.classList.remove("bg-[#4f4f4f]");
  searchInp.classList.remove("text-white");
  searchTrash.classList.remove("bg-[#4f4f4f]");
  searchTrash.classList.remove("text-white");
  searchComplete.classList.remove("bg-[#4f4f4f]");
  searchComplete.classList.remove("text-white");
  todaySearch.classList.remove("bg-[#4f4f4f]");
  todaySearch.classList.remove("text-white");
  profileBg.classList.remove("bg-[#4f4f4f]");

  //add bg1

  _body.classList.add("bg-[url(../images/bg1theme1.jpg)]");
  _body.classList.add("bg-cover");
  _body.classList.add("bg-no-repeat");
  // _main.classList.add("bg-[url(../images/bg1theme1.jpg)]");
  // _main.classList.add("bg-cover");
  // _main.classList.add("bg-no-repeat");
  panell.classList.add("bg2theme1");
  taskPannell.classList.add("bg2theme1");
  taskAllpage.classList.add("bg2theme1");
  trashPage.classList.add("bg2theme1");
  completePage.classList.add("bg2theme1");
  dayPage.classList.add("bg2theme1");
  profilePage.classList.add("bg2theme1");
  themePage.classList.add("bg2theme1");
  searchInp.classList.add("bg-white");
  searchTrash.classList.add("bg-white");
  searchComplete.classList.add("bg-white");
  todaySearch.classList.add("bg-white");
  profileBg.classList.add("bg-white");
});

//////////////////////////////////////// bg2 theme

let bg2 = document.querySelector("#bg2");
bg2.addEventListener("click", () => {
  // remove
  _body.classList.remove("bg-[#d1bf00]");
  _main.classList.remove("bg-[#d1bf00]");
  panell.classList.remove("bg-[#ffff00]");
  taskPannell.classList.remove("bg-[#f4ffc1]");
  taskAllpage.classList.remove("bg-[#f4ffc1]");
  trashPage.classList.remove("bg-[#f4ffc1]");
  completePage.classList.remove("bg-[#f4ffc1]");
  dayPage.classList.remove("bg-[#f4ffc1]");
  profilePage.classList.remove("bg-[#f4ffc1]");
  themePage.classList.remove("bg-[#f4ffc1]");
  searchInp.classList.remove("bg-[#ffff00]");
  searchTrash.classList.remove("bg-[#ffff00]");
  searchComplete.classList.remove("bg-[#ffff00]");
  todaySearch.classList.remove("bg-[#ffff00]");
  profileBg.classList.remove("bg-[#ffff00]");
  // remove blue
  _body.classList.remove("bg-[#006bab]");
  _main.classList.remove("bg-[#006bab]");
  panell.classList.remove("bg-[#14b5ff]");
  taskPannell.classList.remove("bg-[#75d5ff]");
  taskAllpage.classList.remove("bg-[#75d5ff]");
  trashPage.classList.remove("bg-[#75d5ff]");
  completePage.classList.remove("bg-[#75d5ff]");
  dayPage.classList.remove("bg-[#75d5ff]");
  profilePage.classList.remove("bg-[#75d5ff]");
  themePage.classList.remove("bg-[#75d5ff]");
  searchInp.classList.remove("bg-[#14b5ff]");
  searchTrash.classList.remove("bg-[#14b5ff]");
  searchComplete.classList.remove("bg-[#14b5ff]");
  todaySearch.classList.remove("bg-[#14b5ff]");
  profileBg.classList.remove("bg-[#14b5ff]");

  // remove purple

  _body.classList.remove("bg-[#2401d6]");
  _main.classList.remove("bg-[#2401d6]");
  panell.classList.remove("bg-[#523bff]");
  taskPannell.classList.remove("bg-[#7c73ff]");
  taskAllpage.classList.remove("bg-[#7c73ff]");
  trashPage.classList.remove("bg-[#7c73ff]");
  completePage.classList.remove("bg-[#7c73ff]");
  dayPage.classList.remove("bg-[#7c73ff]");
  profilePage.classList.remove("bg-[#7c73ff]");
  themePage.classList.remove("bg-[#7c73ff]");
  searchInp.classList.remove("bg-[#3d14ff]");
  searchTrash.classList.remove("bg-[#3d14ff]");
  searchComplete.classList.remove("bg-[#3d14ff]");
  todaySearch.classList.remove("bg-[#3d14ff]");
  profileBg.classList.remove("bg-[#3d14ff]");

  //add green

  _body.classList.remove("bg-[#078e1a]");
  _main.classList.remove("bg-[#078e1a]");
  panell.classList.remove("bg-[#0cdb28]");
  taskPannell.classList.remove("bg-[#78fd89]");
  taskAllpage.classList.remove("bg-[#78fd89]");
  trashPage.classList.remove("bg-[#78fd89]");
  completePage.classList.remove("bg-[#78fd89]");
  dayPage.classList.remove("bg-[#78fd89]");
  profilePage.classList.remove("bg-[#78fd89]");
  themePage.classList.remove("bg-[#78fd89]");
  searchInp.classList.remove("bg-[#0cdb28]");
  searchTrash.classList.remove("bg-[#0cdb28]");
  searchComplete.classList.remove("bg-[#0cdb28]");
  todaySearch.classList.remove("bg-[#0cdb28]");
  profileBg.classList.remove("bg-[#0cdb28]");

  //remove bg1

  _body.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  _main.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  panell.classList.remove("bg2theme1");
  taskPannell.classList.remove("bg2theme1");
  taskAllpage.classList.remove("bg2theme1");
  trashPage.classList.remove("bg2theme1");
  completePage.classList.remove("bg2theme1");
  dayPage.classList.remove("bg2theme1");
  profilePage.classList.remove("bg2theme1");
  themePage.classList.remove("bg2theme1");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove dark

  _body.classList.remove("bg-[#000000]");
  _body.classList.remove("text-gray-600");
  _main.classList.remove("bg-[#000000]");
  panell.classList.remove("bg-[#6d6d6d]");
  taskPannell.classList.remove("bg-[#6d6d6d]");
  taskAllpage.classList.remove("bg-[#6d6d6d]");
  trashPage.classList.remove("bg-[#6d6d6d]");
  completePage.classList.remove("bg-[#6d6d6d]");
  dayPage.classList.remove("bg-[#6d6d6d]");
  profilePage.classList.remove("bg-[#6d6d6d]");
  themePage.classList.remove("bg-[#6d6d6d]");
  searchInp.classList.remove("bg-[#4f4f4f]");
  searchInp.classList.remove("text-white");
  searchTrash.classList.remove("bg-[#4f4f4f]");
  searchTrash.classList.remove("text-white");
  searchComplete.classList.remove("bg-[#4f4f4f]");
  searchComplete.classList.remove("text-white");
  todaySearch.classList.remove("bg-[#4f4f4f]");
  todaySearch.classList.remove("text-white");
  profileBg.classList.remove("bg-[#4f4f4f]");

  //add bg2

  _body.classList.add("bg1theme2");
  _body.classList.add("text-gray-600");
  _body.classList.add("bg-no-repeat");
  // _main.classList.add("bg1theme2");
  panell.classList.add("bg2theme2");
  taskPannell.classList.add("bg2theme2");
  taskAllpage.classList.add("bg2theme2");
  trashPage.classList.add("bg2theme2");
  completePage.classList.add("bg2theme2");
  dayPage.classList.add("bg2theme2");
  profilePage.classList.add("bg2theme2");
  themePage.classList.add("bg2theme2");
  searchInp.classList.add("bg-white");
  searchInp.classList.add("text-black");
  searchTrash.classList.add("bg-white");
  searchTrash.classList.add("text-black");
  searchComplete.classList.add("bg-white");
  searchComplete.classList.add("text-black");
  todaySearch.classList.add("bg-white");
  todaySearch.classList.add("text-black");
  profileBg.classList.add("bg-white");
});

//////////////////////////////////////// dark theme

let dark = document.querySelector("#dark");
dark.addEventListener("click", () => {
  // remove
  _body.classList.remove("bg-[#d1bf00]");
  _main.classList.remove("bg-[#d1bf00]");
  panell.classList.remove("bg-[#ffff00]");
  taskPannell.classList.remove("bg-[#f4ffc1]");
  taskAllpage.classList.remove("bg-[#f4ffc1]");
  trashPage.classList.remove("bg-[#f4ffc1]");
  completePage.classList.remove("bg-[#f4ffc1]");
  dayPage.classList.remove("bg-[#f4ffc1]");
  profilePage.classList.remove("bg-[#f4ffc1]");
  themePage.classList.remove("bg-[#f4ffc1]");
  searchInp.classList.remove("bg-[#ffff00]");
  searchTrash.classList.remove("bg-[#ffff00]");
  searchComplete.classList.remove("bg-[#ffff00]");
  todaySearch.classList.remove("bg-[#ffff00]");
  profileBg.classList.remove("bg-[#ffff00]");
  // remove blue
  _body.classList.remove("bg-[#006bab]");
  _main.classList.remove("bg-[#006bab]");
  panell.classList.remove("bg-[#14b5ff]");
  taskPannell.classList.remove("bg-[#75d5ff]");
  taskAllpage.classList.remove("bg-[#75d5ff]");
  trashPage.classList.remove("bg-[#75d5ff]");
  completePage.classList.remove("bg-[#75d5ff]");
  dayPage.classList.remove("bg-[#75d5ff]");
  profilePage.classList.remove("bg-[#75d5ff]");
  themePage.classList.remove("bg-[#75d5ff]");
  searchInp.classList.remove("bg-[#14b5ff]");
  searchTrash.classList.remove("bg-[#14b5ff]");
  searchComplete.classList.remove("bg-[#14b5ff]");
  todaySearch.classList.remove("bg-[#14b5ff]");
  profileBg.classList.remove("bg-[#14b5ff]");

  // remove purple

  _body.classList.remove("bg-[#2401d6]");
  _main.classList.remove("bg-[#2401d6]");
  panell.classList.remove("bg-[#523bff]");
  taskPannell.classList.remove("bg-[#7c73ff]");
  taskAllpage.classList.remove("bg-[#7c73ff]");
  trashPage.classList.remove("bg-[#7c73ff]");
  completePage.classList.remove("bg-[#7c73ff]");
  dayPage.classList.remove("bg-[#7c73ff]");
  profilePage.classList.remove("bg-[#7c73ff]");
  themePage.classList.remove("bg-[#7c73ff]");
  searchInp.classList.remove("bg-[#3d14ff]");
  searchTrash.classList.remove("bg-[#3d14ff]");
  searchComplete.classList.remove("bg-[#3d14ff]");
  todaySearch.classList.remove("bg-[#3d14ff]");
  profileBg.classList.remove("bg-[#3d14ff]");

  //add green

  _body.classList.remove("bg-[#078e1a]");
  _main.classList.remove("bg-[#078e1a]");
  panell.classList.remove("bg-[#0cdb28]");
  taskPannell.classList.remove("bg-[#78fd89]");
  taskAllpage.classList.remove("bg-[#78fd89]");
  trashPage.classList.remove("bg-[#78fd89]");
  completePage.classList.remove("bg-[#78fd89]");
  dayPage.classList.remove("bg-[#78fd89]");
  profilePage.classList.remove("bg-[#78fd89]");
  themePage.classList.remove("bg-[#78fd89]");
  searchInp.classList.remove("bg-[#0cdb28]");
  searchTrash.classList.remove("bg-[#0cdb28]");
  searchComplete.classList.remove("bg-[#0cdb28]");
  todaySearch.classList.remove("bg-[#0cdb28]");
  profileBg.classList.remove("bg-[#0cdb28]");

  //remove bg1

  _body.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  _main.classList.remove("bg-[url(../images/bg1theme1.jpg)]");
  panell.classList.remove("bg2theme1");
  taskPannell.classList.remove("bg2theme1");
  taskAllpage.classList.remove("bg2theme1");
  trashPage.classList.remove("bg2theme1");
  completePage.classList.remove("bg2theme1");
  dayPage.classList.remove("bg2theme1");
  profilePage.classList.remove("bg2theme1");
  themePage.classList.remove("bg2theme1");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //remove bg2

  _body.classList.remove("bg1theme2");
  _main.classList.remove("bg1theme2");
  panell.classList.remove("bg2theme2");
  taskPannell.classList.remove("bg2theme2");
  taskAllpage.classList.remove("bg2theme2");
  trashPage.classList.remove("bg2theme2");
  completePage.classList.remove("bg2theme2");
  dayPage.classList.remove("bg2theme2");
  profilePage.classList.remove("bg2theme2");
  themePage.classList.remove("bg2theme2");
  searchInp.classList.remove("bg-white");
  searchTrash.classList.remove("bg-white");
  searchComplete.classList.remove("bg-white");
  todaySearch.classList.remove("bg-white");
  profileBg.classList.remove("bg-white");

  //add dark

  _body.classList.add("bg-[#000000]");
  _body.classList.add("text-gray-600");
  _main.classList.add("bg-[#000000]");
  panell.classList.add("bg-[#6d6d6d]");
  taskPannell.classList.add("bg-[#6d6d6d]");
  taskAllpage.classList.add("bg-[#6d6d6d]");
  trashPage.classList.add("bg-[#6d6d6d]");
  completePage.classList.add("bg-[#6d6d6d]");
  dayPage.classList.add("bg-[#6d6d6d]");
  profilePage.classList.add("bg-[#6d6d6d]");
  themePage.classList.add("bg-[#6d6d6d]");
  searchInp.classList.add("bg-[#4f4f4f]");
  searchInp.classList.add("text-white");
  searchTrash.classList.add("bg-[#4f4f4f]");
  searchTrash.classList.add("text-white");
  searchComplete.classList.add("bg-[#4f4f4f]");
  searchComplete.classList.add("text-white");
  todaySearch.classList.add("bg-[#4f4f4f]");
  todaySearch.classList.add("text-white");
  profileBg.classList.add("bg-[#4f4f4f]");
});

///////////////////////////////////////// search complete
searchComplete.addEventListener("keyup", (e) => {
  let searchValComp = e.target.value.toLowerCase();
  let allTaskscomp = document.querySelectorAll("#allTask h5");

  allTaskscomp.forEach((val) => {
    if (val.innerText.toLowerCase().startsWith(searchValComp)) {
      val.parentElement.parentElement.classList.remove("hidden");
      val.parentElement.parentElement.classList.add("flex");
    } else {
      val.parentElement.parentElement.classList.add("hidden");
      val.parentElement.parentElement.classList.remove("flex");
    }
  });
});

///////////////////////////////////////// search trash
searchTrash.addEventListener("keyup", (e) => {
  let searchValTrash = e.target.value.toLowerCase();
  let allTasksTrash = document.querySelectorAll("#allTask h5");

  allTasksTrash.forEach((val) => {
    if (val.innerText.toLowerCase().startsWith(searchValTrash)) {
      val.parentElement.parentElement.classList.remove("hidden");
      val.parentElement.parentElement.classList.add("flex");
    } else {
      val.parentElement.parentElement.classList.add("hidden");
      val.parentElement.parentElement.classList.remove("flex");
    }
  });
});

///////////////////////////////////////// search day
todaySearch.addEventListener("keyup", (e) => {
  let searchValDay = e.target.value.toLowerCase();
  let allTasksDay = document.querySelectorAll("#allTask h5");

  allTasksDay.forEach((val) => {
    if (val.innerText.toLowerCase().startsWith(searchValDay)) {
      val.parentElement.parentElement.classList.remove("hidden");
      val.parentElement.parentElement.classList.add("flex");
    } else {
      val.parentElement.parentElement.classList.add("hidden");
      val.parentElement.parentElement.classList.remove("flex");
    }
  });
});
