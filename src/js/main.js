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
let inpTask = document.querySelector("#inpTask");
let inpButton = document.querySelector("#inpTask>button");
let taskAdd = document.getElementById("taskAdd");
let taskValue = "";

inpButton.addEventListener("click", () => {
  taskValue = inpTask.children[0].value;
  makeTask();

  // reset
  inpTask.children[0].value = "";
});

function makeTask() {
  taskAdd.innerHTML += `
    <div class="mt-4 flex justify-between border-b border-b-gray-300">
      <div class="w-full h-full flex items-center gap-2 pb-2">
        <input
          class="w-[20px] h-[20px] accent-[#c4c4c4ad]"
          type="checkbox"
        />
        <h5>${taskValue}</h5>
      </div>
      <figure>
        <img
          class="w-[20px] h-[20px] cursor-pointer"
          src="src/images/trash.png"
          alt=""
        />
      </figure>
    </div> `;
}
