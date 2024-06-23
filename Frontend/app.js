const addBtn = document.querySelector("#add-button");
const input = document.querySelector("#input-field");
const lists = document.querySelector("#lists");

async function fetchTasks() {
  try {
    const response = await fetch("http://localhost:5000/tasks");
    const tasks = await response.json();
    tasks.forEach((task) => addTaskToList(task));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

function addTaskToList(task) {
  let createli = document.createElement("li");
  createli.innerText = task.text;
  createli.dataset.id = task.id;
  lists.appendChild(createli);

  createli.addEventListener("dblclick", async () => {
    try {
      await deleteTask(task.id);
      createli.remove();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  });

  createli.addEventListener("click", () => {
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = createli.innerText;
    createli.innerText = "";
    createli.appendChild(editInput);

    editInput.addEventListener("blur", () => {
      if (editInput.value.trim() !== "") {
        createli.innerText = editInput.value.trim();
        updateTask(task.id, editInput.value.trim());
      } else {
        createli.remove();
      }
    });

    editInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        editInput.blur();
      }
    });

    editInput.focus();
  });
}

async function createTask(text) {
  try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const task = await response.json();
    addTaskToList(task);
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

async function updateTask(id, text) {
  try {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

addBtn.addEventListener("click", () => {
  let inputValue = input.value.trim();
  if (inputValue !== "") {
    createTask(inputValue);
    input.value = "";
  } else {
    alert("Please enter a task.");
  }
});

fetchTasks();
