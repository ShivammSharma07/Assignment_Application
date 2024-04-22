import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
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

addBtn.addEventListener("click", () => {
  let inputValue = input.value;
  // push(listInDB, inputValue);
  console.log(inputValue);
});
