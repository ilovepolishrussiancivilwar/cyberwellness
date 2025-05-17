// Quiz data
const quizData = [
  {
    question: "What makes a password strong?",
    options: [
      "Short and easy to remember",
      "At least 12 characters with symbols",
      "Using your name and birthday"
    ],
    answer: 1
  },
  {
    question: "What should you never do with passwords?",
    options: [
      "Reuse the same password",
      "Store them in a password manager",
      "Change them every few months"
    ],
    answer: 0
  },
  {
    question: "What does 2FA stand for?",
    options: [
      "Two-Factor Authentication",
      "Two-Faced Access",
      "Fast Access"
    ],
    answer: 0
  }
];

// Generate the quiz
const quizContainer = document.getElementById("quiz-container");

quizData.forEach((q, index) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `<p>${q.question}</p>` + q.options.map((opt, i) => `
    <label><input type="radio" name="q${index}" value="${i}"> ${opt}</label><br>
  `).join("");
  quizContainer.appendChild(div);
});

function submitQuiz() {
  let score = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  document.getElementById("result").textContent = `You got ${score}/${quizData.length} correct!`;
}

// Toggle password checker visibility
function togglePasswordChecker() {
  const checker = document.getElementById("password-checker");
  checker.classList.toggle("hidden");
}

// Check password strength
function checkStrength() {
  const password = document.getElementById("password-input").value;
  const result = document.getElementById("strength-result");

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (password.length === 0) {
    result.textContent = "";
  } else if (strength <= 1) {
    result.textContent = "Strength: Weak ❌";
    result.style.color = "red";
  } else if (strength === 2 || strength === 3) {
    result.textContent = "Strength: Medium ⚠️";
    result.style.color = "orange";
  } else {
    result.textContent = "Strength: Strong ✅";
    result.style.color = "green";
  }
}
