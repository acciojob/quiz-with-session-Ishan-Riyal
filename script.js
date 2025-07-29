// your JS code here.

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const container = document.createElement("div");

    const questionTitle = document.createElement("p");
    questionTitle.innerHTML = `<strong>${q.question}</strong>`;
    container.appendChild(questionTitle);

    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      if (userAnswers[i] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // For Cypress
      }

      // Save to sessionStorage when clicked
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      container.appendChild(label);
    }

    questionsElement.appendChild(container);
  }
}

// Submit & score calculation
submitButton.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = scoreText;

  localStorage.setItem("score", score.toString());
});

renderQuestions();

// Display score on reload if it exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
