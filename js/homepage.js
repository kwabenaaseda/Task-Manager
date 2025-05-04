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
    const headerTask = document.getElementById("HeaderTask")
    const SubmitTask = document.getElementById("Submit Task")
  
    headerTask.textContent="ADD TASK"
  SubmitTask.textContent="ADD"
  
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

  const deleteBtn = document.createElement("button");
  deleteBtn.value="delete";
  deleteBtn.id="deleteBtn";
  deleteBtn.addEventListener("click",Delete)
  const UpdateBtn = document.createElement("button");
  UpdateBtn.value="update";
  UpdateBtn.id="updateBtn";
  UpdateBtn.addEventListener("click",Update)
  const CompletedBtn = document.createElement("button");
  CompletedBtn.value="complete";
  CompletedBtn.id="completeBtn";
  CompletedBtn.addEventListener("click",Complete)

  deleteBtn.textContent="🗑"
  UpdateBtn.textContent="🖋"
  CompletedBtn.textContent="✅"
  //Function Calls
  CompletedBtn.addEventListener("click",()=>{
    if (CompletedBtn.textContent="✅"){
      CompletedBtn.textContent="✔"
    }else{
      CompletedBtn.textContent="✅"
    }
  })
 
  //Functions

  const ContainerFunction=document.createElement("div");
  ContainerFunction.className="function"
  ContainerFunction.appendChild(CompletedBtn)
  ContainerFunction.appendChild(UpdateBtn)
  ContainerFunction.appendChild(deleteBtn)
  ContainerFunction.style.border="none"

  task.appendChild(ContainerFunction)

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
  deleteBtn.className= UpdateBtn.className= CompletedBtn.className=`task-${taskCount}`

  // Close modal
  taskModal.style.display = "none";
  taskModalOverlay.style.display = "none";
  taskForm.reset();
});

       //Call Objects
 const Container = document.getElementById("CONFIRMDELETE")
       /* const Return = document.getElementById("return");
       const Confirm = document.getElementById("confirm"); */
function Delete(event) {
  const taskDiv = event.target.closest('.task-item');
  const taskClass = event.target.className;

  // Remove from DOM
  taskDiv.remove();

  // Remove from localStorage
  localStorage.removeItem(taskClass);

  // Update empty state visibility
  const tasks = document.querySelectorAll(".task-item");
  const emptyState = document.getElementById("emptyState");
  emptyState.style.display = tasks.length > 0 ? "none" : "flex";
}

function Update(event) {
  const taskDiv = event.target.closest('.task-item');
  const taskClass = event.target.className;
  const taskData = JSON.parse(localStorage.getItem(taskClass));

  if (!taskData) return;

  // Prefill form with existing task data
  document.getElementById("taskName").value = taskData.name;
  document.getElementById("taskPriority").value = taskData.priority;
  document.getElementById("taskSchedule").value = taskData.schedule;
  document.getElementById("taskDesc").value = taskData.description;
  document.getElementById("shareTask").checked = taskData.share;
  document.getElementById("collaborateTask").checked = taskData.collab;
  
  const headerTask = document.getElementById("HeaderTask")
  const SubmitTask = document.getElementById("Submit Task")

  // Show modal
  taskModal.style.display = "block";
  taskModalOverlay.style.display = "block";
  headerTask.textContent="UPDATE TASK"
  SubmitTask.textContent="UPDATE"
  
  // Update task on submit
  taskForm.onsubmit = (e) => {
    e.preventDefault();
    Delete(event)

    // Get new values
    const updatedData = {
      name: document.getElementById("taskName").value,
      priority: document.getElementById("taskPriority").value,
      schedule: document.getElementById("taskSchedule").value,
      description: document.getElementById("taskDesc").value,
      share: document.getElementById("shareTask").checked,
      collab: document.getElementById("collaborateTask").checked
    };

    // Save to localStorage    
    localStorage.setItem(taskClass, JSON.stringify(updatedData));

    // Re-render the task
    taskDiv.innerHTML = `
      <strong>${updatedData.name}</strong><br>
      <span>Priority: ${updatedData.priority}</span><br>
      <span>Schedule: ${updatedData.schedule || "Not Scheduled"}</span><br>
      <span>Description: ${updatedData.description}</span><br>
      ${updatedData.share ? "🔗 Shared" : ""} ${updatedData.collab ? "🤝 Collaboration" : ""}
    `;

    const urgent = document.createElement("div");
    const priorityIcons = {
      low: "/image/green.png",
      medium: "/image/yellow.png",
      high: "/image/red.png",
      undetermined: "/image/black.png"
    };
    urgent.innerHTML = `<img src="${priorityIcons[updatedData.priority]}" class="flames" alt="flame" />`;
    taskDiv.appendChild(urgent);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = taskClass;
    deleteBtn.addEventListener("click", Delete);

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "🖋";
    updateBtn.className = taskClass;
    updateBtn.addEventListener("click", Update);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.className = taskClass;
    completeBtn.addEventListener("click", () => {
      completeBtn.textContent = completeBtn.textContent === "✅" ? "✔" : "✅";
    });

    const funcContainer = document.createElement("div");
    funcContainer.className = "function";
    funcContainer.style.border = "none";
    funcContainer.appendChild(completeBtn);
    funcContainer.appendChild(updateBtn);
    funcContainer.appendChild(deleteBtn);

    taskDiv.appendChild(funcContainer);

    // Close modal
    taskModal.style.display = "none";
    taskModalOverlay.style.display = "none";
    taskForm.reset();

    // Restore default submit behavior
    taskForm.onsubmit = null;
    localStorage.setItem("reloadAgain", "true");
    location.reload(); // First reload
    
  };
}

 function Complete(event){
  const taskClass = event.target.className;
  const Body =document.getElementById(taskClass)
  Body.style.borderLeftColor="red";
       }  
      
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
      console.log(taskData.name)
      if (taskData.name === "") {
        localStorage.removeItem(`task-${i}`);
        taskDiv.remove(); // Make sure this refers to the actual task DOM element
        location.reload(); // This alone reloads the page
        return;
      }
      
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
      // Delete, update and Completed buttons
      const deleteBtn = document.createElement("button");
      deleteBtn.value="delete";
      deleteBtn.id="deleteBtn";
      deleteBtn.addEventListener("click",Delete)
      const UpdateBtn = document.createElement("button");
      UpdateBtn.value="update";
      UpdateBtn.id="updateBtn";
      UpdateBtn.addEventListener("click",Update)
      const CompletedBtn = document.createElement("button");
      CompletedBtn.value="complete";
      CompletedBtn.id="completeBtn";
      CompletedBtn.addEventListener("click",Complete)
      deleteBtn.className= UpdateBtn.className= CompletedBtn.className=`task-${i}`
      deleteBtn.textContent="🗑"
      UpdateBtn.textContent="🖋"
      CompletedBtn.textContent="✅"
      //Function Calls
      CompletedBtn.addEventListener("click",()=>{
        if (CompletedBtn.textContent==="✅"){
          CompletedBtn.textContent="✔"
        }else if (CompletedBtn.textContent==="✔"){
          CompletedBtn.textContent="✅"
        }
      })
     
      //Functions

      const ContainerFunction=document.createElement("div");
      ContainerFunction.className="function"
      ContainerFunction.appendChild(CompletedBtn)
      ContainerFunction.appendChild(UpdateBtn)
      ContainerFunction.appendChild(deleteBtn)
      ContainerFunction.style.border="none"

      task.appendChild(ContainerFunction)


      main.appendChild(task);
      console.log(deleteBtn.className)
      
  
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

setTimeout(() => {
  if (localStorage.getItem("reloadAgain") === "true") {
    localStorage.removeItem("reloadAgain");
    location.reload(); // Second reload
  }
}, 1); // delay in milliseconds (500ms = 0.5s, you can adjust as needed)


// Toggle visibility of share buttons based on checkbox
const shareToggle = document.getElementById('shareTask');
const shareButtons = document.getElementById('shareButtons');

shareToggle?.addEventListener('change', () => {
  if (shareToggle.checked) {
    shareButtons.style.display = 'flex'; // or 'block' if you want vertical
  } else {
    shareButtons.style.display = 'none';
  }
});

// SHARE FUNCTIONALITY

const shareMailBtn = document.getElementById('shareMail');
const shareWhatsAppBtn = document.getElementById('shareWhatsApp');
const shareFacebookBtn = document.getElementById('shareFacebook');

// Helper: Get current form values
function getTaskDataFromForm() {
  return {
    name: document.getElementById("taskName").value,
    priority: document.getElementById("taskPriority").value,
    schedule: document.getElementById("taskSchedule").value,
    description: document.getElementById("taskDesc").value,
  };
}

// Helper: Format message
function generateShareableText(taskData) {
  return `Check out this task!\n\nName: ${taskData.name}\nPriority: ${taskData.priority}\nSchedule: ${taskData.schedule || "Not Scheduled"}\nDescription: ${taskData.description}`;
}

// Email share
shareMailBtn?.addEventListener('click', () => {
  const task = getTaskDataFromForm();
  const subject = `Task: ${task.name}`;
  const body = generateShareableText(task);
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// WhatsApp share
shareWhatsAppBtn?.addEventListener('click', () => {
  const task = getTaskDataFromForm();
  const text = generateShareableText(task);
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
});

// Facebook share
shareFacebookBtn?.addEventListener('click', () => {
  const task = getTaskDataFromForm();
  const text = generateShareableText(task);
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://yourwebsite.com')}&quote=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service Worker registered:', reg))
    .catch(err => console.error('Service Worker registration failed:', err));
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version ready
          showUpdateBanner();
        }
      });
    });
  });
}

// Simple update banner
function showUpdateBanner() {
  const banner = document.createElement('div');
  banner.innerText = 'New version available. Click to refresh!';
  banner.style.position = 'fixed';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.right = '0';
  banner.style.background = '#222';
  banner.style.color = '#fff';
  banner.style.padding = '15px';
  banner.style.textAlign = 'center';
  banner.style.zIndex = '10000';
  banner.style.cursor = 'pointer';
  banner.onclick = () => window.location.reload(true);
  document.body.appendChild(banner);
}
