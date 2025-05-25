// This file contains the interactive functionality for the EduFun website.

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle and navigation
    const startButtons = document.querySelectorAll('.start-game');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (startButtons) {
        startButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const gameType = event.target.dataset.gameType;
                button.classList.add('clicked');
                setTimeout(() => button.classList.remove('clicked'), 200);
                startGame(gameType);
            });
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
        });
    }

    // Konami Code (↑↑↓↓←→←→BA) triggers a hidden game
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let input = [];
    document.addEventListener('keydown', (e) => {
        input.push(e.key);
        if (input.join('').includes(konamiCode.join(''))) {
            window.location.href = 'pages/secret-game.html';
        }
    });

    // Game logic (only runs if elements exist)
    const startButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart-game');
    const gameArea = document.querySelector('.game-area');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const streakDisplay = document.getElementById('streak');
    const resultDisplay = document.getElementById('result');
    let timer;
    let timeLeft = 60;
    let score = 0;
    let streak = 0;

    function startGameLogic() {
        clearInterval(timer);
        timeLeft = 60;
        score = 0;
        streak = 0;
        timerDisplay && (timerDisplay.textContent = timeLeft);
        scoreDisplay && (scoreDisplay.textContent = score);
        streakDisplay && (streakDisplay.textContent = streak);
        if (resultDisplay) resultDisplay.innerText = "";

    // This ensures a new question is generated!
    if (typeof generateQuestion === "function") generateQuestion();
    if (typeof initGame === "function") initGame();

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(timer);
            if (resultDisplay) {
                resultDisplay.innerText = '⏰ Time is up! Try again or click Restart Game to play another round.';
            } else {
                alert('⏰ Time is up! Try again or click Restart Game to play another round.');
            }
        }
    }, 1000);
}

    function resetGame() {
        clearInterval(timer);
        timeLeft = 60;
        score = 0;
        streak = 0;
        timerDisplay && (timerDisplay.textContent = timeLeft);
        scoreDisplay && (scoreDisplay.textContent = score);
        streakDisplay && (streakDisplay.textContent = streak);
        if (resultDisplay) resultDisplay.innerText = "";
        gameArea && (gameArea.style.display = 'none');
        restartButton && (restartButton.style.display = 'none');
        startButton && (startButton.style.display = 'block');
    }

    if (startButton && restartButton && gameArea && timerDisplay && scoreDisplay && streakDisplay) {
        gameArea.style.display = 'none';
        restartButton.style.display = 'none';

        startButton.addEventListener('click', () => {
            gameArea.style.display = 'block';
            startButton.style.display = 'none';
            restartButton.style.display = 'block';
            startGameLogic();
        });

        restartButton.addEventListener('click', () => {
            gameArea.style.display = 'block';
            startButton.style.display = 'none';
            restartButton.style.display = 'block';
            startGameLogic();
        });
    }
});

function startGame(gameType) {
    switch (gameType) {
        case 'addition':
            window.location.href = '../games/addition-game.html';
            break;
        case 'subtraction':
            window.location.href = '../games/subtraction-game.html';
            break;
        case 'multiplication':
            window.location.href = '../games/multiplication-game.html';
            break;
        case 'division':
            window.location.href = '../games/division-game.html';
            break;
        default:
            console.error('Unknown game type:', gameType);
    }
}