// Select elements
const taskInput = document.getElementById("taskinput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("tasklist");

// Save tasks in an array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.classList.add("task-checkbox");

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        // Date
        const dateSpan = document.createElement("small");
        dateSpan.textContent = ` (Added: ${task.date})`;
        dateSpan.style.color = "#666";
        dateSpan.style.fontSize = "12px";
        dateSpan.style.marginLeft = "10px";

        // Mark completed when checkbox is checked
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const today = new Date();
    const newTask = {
        text: taskText,
        completed: false,
        date: `${today.toLocaleDateString()} ${today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
}

// Export tasks to Notepad (.txt)
function exportToTxt() {
    let textData = tasks.map(t => `${t.text} (Added: ${t.date}) [${t.completed ? "Completed" : "Pending"}]`).join("\n");

    const blob = new Blob([textData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tasks.txt";
    link.click();
}

// Event listeners
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Create Export button
const exportBtn = document.createElement("button");
exportBtn.textContent = "Export Tasks";
exportBtn.style.marginTop = "15px";
exportBtn.style.background = "#4CAF50";
exportBtn.style.color = "white";
exportBtn.style.padding = "10px";
exportBtn.style.border = "none";
exportBtn.style.borderRadius = "8px";
exportBtn.style.cursor = "pointer";
exportBtn.addEventListener("click", exportToTxt);
document.querySelector(".container").appendChild(exportBtn);

// Initial render
renderTasks();
