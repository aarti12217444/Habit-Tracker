const habitForm = document.getElementById("habitForm");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

// Get today's date as key
const todayKey = new Date().toISOString().split("T")[0];

let habits = JSON.parse(localStorage.getItem("habits_" + todayKey)) || [];

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = habit.done ? "done" : "";

    li.innerHTML = `
      ${habit.name}
      <button class="toggle-btn" onclick="toggleDone(${index})">
        ${habit.done ? "Undo" : "Done"}
      </button>
    `;
    habitList.appendChild(li);
  });
}

habitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const habitName = habitInput.value.trim();
  if (habitName === "") return;

  habits.push({ name: habitName, done: false });
  localStorage.setItem("habits_" + todayKey, JSON.stringify(habits));
  habitInput.value = "";
  renderHabits();
});

function toggleDone(index) {
  habits[index].done = !habits[index].done;
  localStorage.setItem("habits_" + todayKey, JSON.stringify(habits));
  renderHabits();
}

// Initial load
renderHabits();
