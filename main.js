document.addEventListener("DOMContentLoaded", () => {
  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

  renderToDoList();

  function renderToDoList() {
    let todoListHTML = "";

    todoList.forEach((todoObject, index) => {
      const { taskName, completed } = todoObject; // Get task name and completed status
      const completedClass = completed ? "red-task" : ""; // Add class if completed

      const html = ` <div class="task">
            <img src="${
              completed ? "checked.png" : "unchecked.png"
            }" class="unchecked" />
            <p class="task ${completedClass}">miss u baby</p> <!-- Apply completed class -->
            <button class="delete-button"><i class="fa-solid fa-x"></i></button>
          </div>`;

      todoListHTML += html;
    });

    document.querySelector(".list-container").innerHTML = todoListHTML;

    document
      .querySelectorAll(".delete-button")
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener("click", () => {
          todoList.splice(index, 1);
          renderToDoList();
          saveToStorage();
        });
      });
  }

  document.querySelector(".add-button").addEventListener("click", () => {
    addToDo();
  });

  function addToDo() {
    let taskList = document.querySelector(".input-task");
    const taskName = taskList.value;

    todoList.push({ taskName, completed: false }); // New task, default as not completed

    taskList.value = "";

    renderToDoList();
    saveToStorage();
  }

  function saveToStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  // Use event delegation to handle the click on any 'unchecked' element
  document
    .querySelector(".list-container")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("unchecked")) {
        const imgElement = event.target; // The clicked <img> element
        const taskText = imgElement.nextElementSibling;

        // Find the index of the task and update its completed status
        const taskIndex = Array.from(
          imgElement.parentElement.parentElement.children
        ).indexOf(imgElement.parentElement);

        // Toggle the completed status and apply the class
        todoList[taskIndex].completed = !todoList[taskIndex].completed;
        taskText.classList.toggle("red-task");

        // Update image source based on the completion status
        imgElement.src = todoList[taskIndex].completed
          ? "checked.png"
          : "unchecked.png";

        saveToStorage();
      }
    });
});
