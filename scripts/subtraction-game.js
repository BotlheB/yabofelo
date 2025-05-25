let score = 0, streak = 0, timeLeft = 60, currentAnswer;

function generateQuestion() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * a); // Ensure non-negative result
    currentAnswer = a - b;
    document.getElementById('question').innerText = `What is ${a} - ${b}?`;
}
function updateScore(isCorrect) {
    if (isCorrect) {
        score++;
        streak++;
    } else {
        streak = 0;
    }
    document.getElementById('score').innerText = score;
    document.getElementById('streak').innerText = streak;
}

function startTimer() {
    const timer = document.getElementById('timer');
    const interval = setInterval(() => {
        timeLeft--;
        timer.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            document.getElementById('submit-answer').disabled = true;
            document.getElementById('result').innerText = `⏰ Time’s up! Final score: ${score}`;
        }
    }, 1000);
}

function initGame() {
    document.getElementById('submit-answer').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('answer').value);
        const isCorrect = userAnswer === currentAnswer;
        updateScore(isCorrect);
        document.getElementById('result').innerText = isCorrect
            ? '✅ Correct!' : `❌ Wrong! It was ${currentAnswer}`;
        document.getElementById('answer').value = '';
        generateQuestion();
    });
}
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