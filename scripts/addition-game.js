let score = 0;
let streak = 0;
let currentAnswer;
let timeLeft = 60;
let difficultyLevel = 10;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * difficultyLevel);
    const num2 = Math.floor(Math.random() * difficultyLevel);
    currentAnswer = num1 + num2;
    document.getElementById('question').innerText = `What is ${num1} + ${num2}?`;
}

function updateScore(isCorrect) {
    if (isCorrect) {
        score++;
        streak++;
        if (streak % 5 === 0) difficultyLevel += 5;
    } else {
        streak = 0;
    }

    document.getElementById('score').innerText = score;
    document.getElementById('streak').innerText = streak;
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('submit-answer').disabled = true;
            document.getElementById('result').innerText = `Time’s up! Final score: ${score}`;
        }
    }, 1000);
}

document.getElementById('submit-answer').addEventListener('click', () => {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const isCorrect = userAnswer === currentAnswer;
    updateScore(isCorrect);
    document.getElementById('result').innerText = isCorrect ? '✅ Correct!' : `❌ Wrong! It was ${currentAnswer}`;
    document.getElementById('answer').value = '';
    generateQuestion();
});
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit-answer');
if (answerInput && submitButton) {
    answerInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitButton.click();
        }
    });
}
