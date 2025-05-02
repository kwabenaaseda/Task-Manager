const openBtn = document.getElementById("openBtn");
const addBtn = document.getElementById("addBtn"); // support floating add button
const taskModal = document.getElementById("taskModal");
const taskModalOverlay = document.getElementById("taskModalOverlay");
const taskForm = document.getElementById("taskForm");
const main = document.getElementById("main");
const messageBtn = document.getElementById("messageBtn")
const messagePopup= document.getElementById("messagePopup")

// Sidebar elements
const menuToggleBtn = document.getElementById("menuToggleBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const darkModeToggle = document.getElementById("darkModeToggle");


messageBtn.addEventListener("click",toggleMessagePopUp)

function toggleMessagePopUp(){
    messagePopup.classList.toggle("open");
    messagePopup.classList.toggle("active");
}


// Show Modal
[openBtn, addBtn].forEach(btn => {
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
    <span>Priority: ${priority}</span>
    <br>
    <span>Schedule: ${schedule || "Not Scheduled"}</span>
    <br>
   <span> Description: ${desc}</span>
    <br>
    ${share ? "🔗 Shared" : ""} ${collaborate ? "🤝 Collaboration" : ""}
  `;

  
  const urgent = document.createElement("div")
  if(priority=="low"){
    urgent.innerHTML='<img src="/image/green.png" class="flames"  alt="flame"/>'
    task.appendChild(urgent)
  }
  else if(priority=="medium"){
 urgent.innerHTML='<img src="/image/yellow.png" class="flames"  alt="flame"/>'
 task.appendChild(urgent)
  }
  else if(priority=="high"){
 urgent.innerHTML='<img src="/image/red.png" class="flames"  alt="flame"/>'
 task.appendChild(urgent)
  }
  else if(priority=="undetermined") {
    urgent.innerHTML='<img src="/image/black.png" class="flames"  alt="flame"/>'
    task.appendChild(urgent)
  }
  main.appendChild(task);

  const emptyState = document.getElementById("emptyState");
  const tasks = document.querySelectorAll(".task-item");
  
  
  
      if (tasks.length > 0) {
          emptyState.style.display = "none";
        } 
        else{
          emptyState.style.display = "flex";
        }
  

  // Close modal
  taskModal.style.display = "none";
  taskModalOverlay.style.display = "none";
  taskForm.reset();
  var reference = {
    "name":name,
    "priority":priority,
    "schedule":schedule,
    "description":desc,
    "share":share,
    "collab":collaborate
  }
  var store = main.children.length-1;
  console.log(store)
  console.log(reference)
  localStorage.setItem(store,`${reference.name} Priority:${reference.priority} Schedule:${reference.schedule||"Not Scheduled"} Description:${reference.description} ${`Share: ${reference.share}`||""} ${`Collab: ${reference.collab}`||""}`)
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
  window.location.href="/pages/user/homepage.html"
  toggleSideMenu();
});

document.getElementById("scheduledTasksLink").addEventListener("click", () => {
  window.location.href="/pages/user/schedule.html"
  toggleSideMenu();
});

document.getElementById("previousTasksLink").addEventListener("click", () => {
  window.location.href="/pages/user/previous.html"
  toggleSideMenu();
});
document.getElementById("ProfileLink").addEventListener("click", () => {
  window.location.href="/pages/admin/admin.html"
  toggleSideMenu();
});
document.getElementById("SettingsLink").addEventListener("click", () => {
  window.location.href="/pages/admin/settings.html"
  toggleSideMenu();
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
// Elements
// Elements
const userBtn = document.getElementById("userBtn");

// Function to set user status (Online or Offline)
function setUserStatus(isOnline) {
    if (isOnline) {
        userBtn.classList.add("online");
        userBtn.classList.remove("offline");
    } else {
        userBtn.classList.add("offline");
        userBtn.classList.remove("online");
    }
}

// Example usage: Toggle user status every 3 seconds
let isOnline = true;  // Start with user being online
setInterval(() => {
    isOnline = !isOnline;  // Toggle the status
    setUserStatus(isOnline);
}, 3000);  // Change every 3 seconds (you can adjust this timing)

const darkToggleBtn = document.getElementById("darkModeToggle");

function updateMode() {
  if (document.body.classList.contains("dark-mode")) {
    darkToggleBtn.textContent = "☀️ Light Mode"; // Light mode icon
  } else {
    darkToggleBtn.textContent = "🌓 Dark Mode"; // Dark mode icon
  }
}

darkToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateMode();
});

// Optional: Remember preference
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateMode();
});

darkToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateMode();
});

for (let i = 1; i < localStorage.length; i++) {
    var reciept=localStorage.getItem(i)
    let transmitter={
        "name":reciept.slice(0,reciept.indexOf("Priority")),
        "priority":reciept.slice(reciept.indexOf("Priority"),reciept.indexOf("Schedule")),
        "schedule":reciept.slice(reciept.indexOf("Schedule"),reciept.indexOf("Description")),
        "description":reciept.slice(reciept.indexOf("Description"),reciept.indexOf("Share")),
        "share":reciept.slice(reciept.indexOf("Share"),reciept.indexOf("Collab")),
        "collab":reciept.slice(reciept.indexOf("Collab"))
    }
    console.log(reciept)
    console.log(transmitter)
    const task = document.createElement("div");
  task.classList.add("task-item");
    task.innerHTML = `
    <strong id="name">${transmitter.name}</strong><br>
     <span>${transmitter.priority}</span>
     <br>
    <span>${transmitter.schedule}</span>
    <br>
    <span>${transmitter.description}</span>
    <br>
    🔗${transmitter.share}
    <br>
    🤝${transmitter.collab}
  `;
  const urgent = document.createElement("div")
  if(transmitter.priority=="Priority:low "){
    urgent.innerHTML='<img src="/image/green.png" class="flames"  alt="flame"/>'
    task.appendChild(urgent)
    console.log("low")
  }
  else if(transmitter.priority=="Priority:medium "){
 urgent.innerHTML='<img src="/image/yellow.png" class="flames"  alt="flame"/>'
 task.appendChild(urgent)
 console.log("med")
  }
  else if(transmitter.priority=="Priority:high "){
 urgent.innerHTML='<div class="flame-container"><img src="/image/red.png" class="flames"  alt="flame"/></div>'
 task.appendChild(urgent)
 console.log("high")
  }
  else if(transmitter.priority=="Priority:undertermined ") {
    urgent.innerHTML='<img src="/image/black.png" class="flames"  alt="flame" alt="flame"/>'
    task.appendChild(urgent)
    console.log("dunno")
  }
  else{
    urgent.innerHTML='<img src="/image/black.png" class="flames"  alt="flame" alt="flame"/>'
    task.appendChild(urgent)
  }

    console.log(task)
    main.append(task)
}

const emptyState = document.getElementById("emptyState");
const tasks = document.querySelectorAll(".task-item")

console.log(tasks)
console.log(tasks.length<1)

if (tasks.length>0){
  emptyState.style.display="none"
}

console.log(localStorage.length)

