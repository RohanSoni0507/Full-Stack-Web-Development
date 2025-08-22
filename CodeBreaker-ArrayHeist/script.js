let arr = new Array(8).fill(null);
let secretPattern = [];
let timeLeft = 60;
let timerId;

window.onload = () => {
  generateSecretPattern();
  renderArray();
  startTimer();
};

// Render array visually
function renderArray() {
  const display = document.getElementById("array-display");
  display.innerHTML = "";
  arr.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = val !== null ? val : "";
    display.appendChild(cell);
  });
}

// Insert operation
function insertAtIndex() {
  const idx = parseInt(document.getElementById("index-input").value);
  const val = parseInt(document.getElementById("value-input").value);

  if (isNaN(idx) || isNaN(val) || idx < 0 || idx >= arr.length) {
    showFeedback("⚠️ Index out of bounds or invalid input!");
    return;
  }

  for (let i = arr.length - 1; i > idx; i--) {
    arr[i] = arr[i - 1];
  }
  arr[idx] = val;

  showFeedback(`✅ Inserted ${val} at index ${idx}`);
  renderArray();
  checkPattern();
}

// Delete operation
function deleteAtIndex() {
  const idx = parseInt(document.getElementById("index-input").value);

  if (isNaN(idx) || idx < 0 || idx >= arr.length) {
    showFeedback("⚠️ Index out of bounds!");
    return;
  }

  for (let i = idx; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr[arr.length - 1] = null;

  showFeedback(`🗑️ Deleted element at index ${idx}`);
  renderArray();
}

// Search pattern
function searchPattern() {
  const patternInput = document.getElementById("pattern-input").value;
  if (!patternInput) {
    showFeedback("⚠️ Enter a valid pattern (e.g., 1,2,3)");
    return;
  }

  const pattern = patternInput.split(",").map(Number);

  for (let i = 0; i <= arr.length - pattern.length; i++) {
    const sub = arr.slice(i, i + pattern.length);
    if (JSON.stringify(sub) === JSON.stringify(pattern)) {
      highlightCells(i, pattern.length);
      showFeedback(`🎉 Pattern ${pattern} found at index ${i}!`);
      return;
    }
  }

  showFeedback("❌ Pattern not found!");
}

// Reset array
function resetArray() {
  arr = new Array(8).fill(null);
  renderArray();
  showFeedback("🔄 Array reset.");
}

// Highlight matching cells
function highlightCells(start, length) {
  const cells = document.querySelectorAll(".cell");
  for (let j = 0; j < length; j++) {
    cells[start + j].classList.add("highlight");
  }
  setTimeout(() => {
    cells.forEach(c => c.classList.remove("highlight"));
  }, 1500);
}

// Feedback
function showFeedback(msg) {
  document.getElementById("feedback").innerText = msg;
}

// Secret pattern
function generateSecretPattern() {
  secretPattern = [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ];
  document.getElementById("secret-pattern").innerText =
    `🔎 Secret Pattern to find: ${secretPattern.join(",")}`;
}

// Check if secret pattern is matched
function checkPattern() {
  for (let i = 0; i <= arr.length - secretPattern.length; i++) {
    const sub = arr.slice(i, i + secretPattern.length);
    if (JSON.stringify(sub) === JSON.stringify(secretPattern)) {
      clearInterval(timerId);
      showFeedback("🎉 Level Complete! You cracked the code!");
    }
  }
}

// Timer
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `⏳ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      showFeedback("⏰ Time's up! Mission Failed.");
    }
  }, 1000);
}
