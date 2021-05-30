const data = [
  {
    id: 1,
    question:
      "Кто из президентов США написал свой собственный рассказ про Шерлока Холмса?",
    a: "Джон Кеннеди",
    b: "Франклин Рузвельт",
    c: "Рональд Рейган",
    correct: "b",
  },
  {
    id: 2,
    question:
      "Какую пошлину ввели в XII  веке в Англии для того чтобы заставить мужчин пойти на войну?",
    a: "Налог на тунеядство",
    b: "Налог на трусость",
    c: "Налог на отсутствие сапог",
    correct: "b",
  },
  {
    id: 3,
    question: "Откуда пошло выражение «деньги не пахнут?",
    a: "От подателей за провоз парфюмерии",
    b: "От сборов за нестиранные носки",
    c: "От налога на туалеты",
    correct: "c",
  },
  {
    id: 4,
    question: "Туристы, приезжающие на Майорку, обязаны заплатить налог…",
    a: "На плавки",
    b: "На пальмы",
    c: "На солнце",
    correct: "c",
  },
  {
    id: 5,
    question: "Российский мультфильм, удостоенный «Оскара», — это…",
    a: "«Простоквашино»",
    b: "«Старик и море»",
    c: "«Ну, погоди!»",
    correct: "b",
  },
];

const quiz = document.querySelector(".quiz-wrapper");
const question = document.querySelector(".quiz-question");
const answers = document.querySelectorAll(".answer");
const aText = document.querySelector("#a-text");
const bText = document.querySelector("#b-text");
const cText = document.querySelector("#c-text");
const submitBtn = document.querySelector(".submit");
const progressBar = document.querySelector(".progress-bar");
const bar = document.querySelector(".bar");
const countProgress = document.querySelector(".progress-counter");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  progressBarHandler();
  const currentQuizData = data[currentQuiz];

  question.innerText = currentQuizData.question;
  aText.innerText = currentQuizData.a;
  bText.innerText = currentQuizData.b;
  cText.innerText = currentQuizData.c;
}

function getSelected() {
  let answer = null;

  answers.forEach((element) => {
    if (element.checked) {
      answer = element.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answers.forEach((element) => {
    element.checked = false;
  });
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const answer = getSelected();
  console.log(answer);
  if (answer) {
    if (answer === data[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < data.length) {
      loadQuiz();
    } else {
      let totalBarLength = (100 / data.length) * score;
      quiz.innerHTML = `<h2>Вы ответили правильно на ${score}/${data.length} вопросов</h2>
   
      <div class='total-bar-wrapper'>
      <div style="width:${totalBarLength}%; height: 100%; background-color: #4285F4"></div>
      </div>
      <button class="reload" onclick="location.reload()">Начать заново</button>
      `;
      if (document.querySelector("h2")) {
        countProgress.remove();
        bar.remove();
        progressBar.remove();
      }
    }
  }
});

function progressBarHandler() {
  if (currentQuiz === 0) {
    countProgress.innerHTML = `${currentQuiz + 1} / ${data.length}`;
  }
  if (currentQuiz > 0) {
    countProgress.innerHTML = `${currentQuiz + 1} / ${data.length}`;
  }
  counter = (100 / data.length) * (currentQuiz + 1);
  countProgress.style.width = `${counter}%`;
  bar.style.backgroundColor = "#34A853";
  bar.style.width = `${counter}%`;
  bar.style.height = "100%";
}
