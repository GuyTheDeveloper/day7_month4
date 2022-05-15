//WARNING!! har doim bootsrap bilan jsni qo'shsang, bootsrapdan jsni kodini olib kel, bo'lmasam yana o'tir modal chiqmayapti deydi;
let database = window.localStorage;

export function render(data, list) {
  //DRY bo'lmasligi uchun lez go
  database.setItem("todos", JSON.stringify(data));

  //lets go fragment
  let fragment = document.createDocumentFragment();

  // dataga lets go
  data.forEach(({ id, isDone, text }) => {
    fragment.prepend(creator(id, isDone, text));
  });

  list.innerHTML = "";

  //va fragmentni htmlga
  list.append(fragment);
}

export function creator(id, isDone, text) {
  let LIST = document.createElement("li");
  LIST.dataset.id = id;
  LIST.dataset.isDone = isDone;
  //isDone true bo'lsa task done ni qo'sh bo'lmasam no
  LIST.className = `list-group-item d-flex align-items-center ${
    isDone ? "task-done" : ""
  }`;

  let INPUT = document.createElement("input");
  INPUT.dataset.type = "check";
  INPUT.type = "checkbox";
  INPUT.checked = isDone;
  INPUT.className = "form-check-input me-3";
  LIST.append(INPUT);

  let TEXT = document.createElement("div");
  TEXT.className = "text w-100";
  TEXT.textContent = text;
  LIST.append(TEXT);

  let BTN_WRAPPER = document.createElement("div");
  BTN_WRAPPER.className = "d-flex gap-1";

  if (!isDone) {
    let BTN_EDIT = document.createElement("button");
    BTN_EDIT.setAttribute("data-bs-toggle", "modal");
    BTN_EDIT.setAttribute("data-bs-target", "#firstModal");
    BTN_EDIT.dataset.type = "edit";
    BTN_EDIT.className = "btn btn-warning";
    BTN_EDIT.textContent = "Edit";
    BTN_WRAPPER.append(BTN_EDIT);
  }

  let BTN_DELETE = document.createElement("button");
  BTN_DELETE.dataset.type = "delete";
  BTN_DELETE.className = "btn btn-danger";
  BTN_DELETE.textContent = "Delete";
  BTN_WRAPPER.append(BTN_DELETE);

  LIST.append(BTN_WRAPPER);
  return LIST;
}

export function objCreator(text) {
  return {
    id: new Date().getTime(),
    text,
    isDone: false,
  };
}
//GuyTheDeveloper
