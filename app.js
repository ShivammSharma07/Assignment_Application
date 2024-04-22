import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-73ab0-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "list");

const addBtn = document.querySelector("#add-button");
const input = document.querySelector("#input-field");
const lists = document.querySelector("#lists");

addBtn.addEventListener("click", () => {
  let inputValue = input.value;
  push(listInDB, inputValue);
  clearInputField();
});

onValue(listInDB, (snapshot) => {
  if (snapshot.exists()) {
    let array = Object.entries(snapshot.val());

    lists.innerHTML = "";
    array.forEach((item) => {
      addItemToList(item);
    });
  } else {
    lists.innerHTML = "";
  }
});

function clearInputField() {
  input.value = "";
}

function addItemToList(item) {
  let newEl = document.createElement("li");
  newEl.textContent = item[1];
  newEl.addEventListener("dblclick", () => {
    let locationOfItem = ref(database, `list/${item[0]}`);
    remove(locationOfItem);
  });
  lists.appendChild(newEl);
}

function clearListInDB() {
  set(listInDB, {});
}
