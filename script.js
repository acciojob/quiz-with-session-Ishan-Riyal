const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Madrid", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1993"],
    answer: "1995",
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["&lt;h6&gt;", "&lt;heading&gt;", "&lt;h1&gt;", "&lt;head&gt;"],
    answer: "&lt;h1&gt;",
  },
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load saved progress
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
const savedScore = localStorage.getItem("score");

// Render questions
quizData.forEach((q, i) => {
  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = `<p><strong>${i + 1}. ${q.question}</strong></p>`;

  q.options.forEach((option) => {
    const isChecked = savedProgress[i] === option;

    questionDiv.innerHTML += `
      <label>
        <input 
          type="radio" 
          name="q${i}" 
          value="${option}" 
          ${isChecked ? "checked" : ""}>
        ${option}
      </label>
    `;
  });

  questionsContainer.appendChild(questionDiv);
});

// Save selection to session storage
questionsContainer.addEventListener("change", () => {
  const checkedInputs = questionsContainer.querySelectorAll(
    "input[type='radio']:checked"
  );
  const progress = {};
  checkedInputs.forEach((input) => {
    const index = parseInt(input.name.substring(1));
    progress[index] = input.value;
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
});

// Show previous score if exists
if (savedScore !== null) {
  scoreDisplay.textContent = `Your score is ${savedScore} out of ${quizData.length}.`;
}

// Submit handler
submitBtn.addEventListener("click", () => {
  const checkedInputs = questionsContainer.querySelectorAll(
    "input[type='radio']:checked"
  );
  let score = 0;

  checkedInputs.forEach((input) => {
    const index = parseInt(input.name.substring(1));
    if (quizData[index].answer === input.value) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of ${quizData.length}.`;
  localStorage.setItem("score", score);
});
