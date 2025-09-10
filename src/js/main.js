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
    }
  });
});

// inp task
let inpTask = document.querySelectorAll("#inpTask>input");

let taskValue = inpTask.value;
