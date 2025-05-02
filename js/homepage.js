const openBtn = document.getElementById("openBtn");
const addBtn = document.getElementById("addBtn");
const taskModal = document.getElementById("taskModal");
const taskModalOverlay = document.getElementById("taskModalOverlay");
const taskForm = document.getElementById("taskForm");
const main = document.getElementById("main");
const messageBtn = document.getElementById("messageBtn");
const messagePopup = document.getElementById("messagePopup");

// Sidebar elements
const menuToggleBtn = document.getElementById("menuToggleBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const darkModeToggle = document.getElementById("darkModeToggle");

// Message popup toggle
messageBtn.addEventListener("click", toggleMessagePopUp);

function toggleMessagePopUp() {
  messagePopup.classList.toggle("open");
  messagePopup.classList.toggle("active");
}

// Show Modal
[openBtn, addBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    taskModal.style.display = "block";
    taskModalOverlay.style.display = "block";
  });
});

// Hide Modal when clicking outside
taskModalOverlay.addEventListener("click", () => {
  taskModal.style.display = "none";
  taskModalOverlay.style.display = "none";
});

// Handle Form Submit
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("taskName").value;
  const priority = document.getElementById("taskPriority").value;
  const schedule = document.getElementById("taskSchedule").value;
  const desc = document.getElementById("taskDesc").value;
  const share = document.getElementById("shareTask").checked;
  const collaborate = document.getElementById("collaborateTask").checked;

  const task = document.createElement("div");
  task.classList.add("task-item");
  task.innerHTML = `
    <strong>${name}</strong><br>
    <span>Priority: ${priority}</span><br>
    <span>Schedule: ${schedule || "Not Scheduled"}</span><br>
    <span>Description: ${desc}</span><br>
    ${share ? "🔗 Shared" : ""} ${collaborate ? "🤝 Collaboration" : ""}
  `;

  const urgent = document.createElement("div");
  const priorityIcons = {
    low: "/image/green.png",
    medium: "/image/yellow.png",
    high: "/image/red.png",
    undetermined: "/image/black.png"
  };

  urgent.innerHTML = `<img src="${priorityIcons[priority]}" class="flames" alt="flame" />`;
  task.appendChild(urgent);

  main.appendChild(task);

  // Handle empty state visibility
  const emptyState = document.getElementById("emptyState");
  const tasks = document.querySelectorAll(".task-item");
  emptyState.style.display = tasks.length > 0 ? "none" : "flex";

  // Store task data in localStorage
  const taskData = {
    name,
    priority,
    schedule,
    description: desc,
    share,
    collab: collaborate
  };

  // Store it in localStorage by the task count
  let taskCount = localStorage.getItem('taskCount');
  taskCount = taskCount ? parseInt(taskCount) : 0; // Initialize task count if it's null
  localStorage.setItem(`task-${taskCount}`, JSON.stringify(taskData)); // Store the task data
  localStorage.setItem('taskCount', taskCount + 1); // Increment the task count

  // Close modal
  taskModal.style.display = "none";
  taskModalOverlay.style.display = "none";
  taskForm.reset();
});

// Side Menu Handlers
menuToggleBtn.addEventListener("click", toggleSideMenu);
overlay.addEventListener("click", toggleSideMenu);
closeBtn.addEventListener("click", toggleSideMenu);

function toggleSideMenu() {
  sideMenu.classList.toggle("open");
  overlay.classList.toggle("active");
}

// Sidebar Navigation
document.getElementById("ongoingTasksLink").addEventListener("click", () => {
  window.location.href = "/pages/user/homepage.html";
  toggleSideMenu();
});

document.getElementById("scheduledTasksLink").addEventListener("click", () => {
  window.location.href = "/pages/user/schedule.html";
  toggleSideMenu();
});

document.getElementById("previousTasksLink").addEventListener("click", () => {
  window.location.href = "/pages/user/previous.html";
  toggleSideMenu();
});

document.getElementById("ProfileLink").addEventListener("click", () => {
  window.location.href = "/pages/admin/admin.html";
  toggleSideMenu();
});

document.getElementById("SettingsLink").addEventListener("click", () => {
  window.location.href = "/pages/admin/settings.html";
  toggleSideMenu();
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  updateMode();
});

function updateMode() {
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌓 Dark Mode";
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateMode();

  // Load tasks from localStorage on page load
  const taskCount = localStorage.getItem('taskCount') || 0;
  for (let i = 0; i < taskCount; i++) {
    const taskData = JSON.parse(localStorage.getItem(`task-${i}`));
    if (taskData) {
      const task = document.createElement("div");
      task.classList.add("task-item");
      task.innerHTML = `
        <strong>${taskData.name}</strong><br>
        <span>Priority: ${taskData.priority}</span><br>
        <span>Schedule: ${taskData.schedule || "Not Scheduled"}</span><br>
        <span>Description: ${taskData.description}</span><br>
        ${taskData.share ? "🔗 Shared" : ""} ${taskData.collab ? "🤝 Collaboration" : ""}
      `;

      const urgent = document.createElement("div");
      const priorityIcons = {
        low: "/image/green.png",
        medium: "/image/yellow.png",
        high: "/image/red.png",
        undetermined: "/image/black.png"
      };

      urgent.innerHTML = `<img src="${priorityIcons[taskData.priority]}" class="flames" alt="flame" />`;
      task.appendChild(urgent);

      main.appendChild(task);
    }
  }

  // Hide the empty state if tasks are available
  const emptyState = document.getElementById("emptyState");
  const tasks = document.querySelectorAll(".task-item");
  emptyState.style.display = tasks.length > 0 ? "none" : "flex";
});

// Check tasks length to toggle empty state visibility
const emptyState = document.getElementById("emptyState");
const tasks = document.querySelectorAll(".task-item");
emptyState.style.display = tasks.length > 0 ? "none" : "flex";
