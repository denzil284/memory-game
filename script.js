const startBtn = document.getElementById('startButton');
const board = document.getElementById('game-board');
const message = document.getElementById('message');
const checkBtn = document.getElementById('checkButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

timerDisplay.hidden = true;
scoreDisplay.hidden = true
checkBtn.hidden = true;
let correctCards = [];
let selectedCards = [];
const allCards = ["🟥", "🟩", "🟦", "🔴", "🟢", "🔵", "❤️", "💚", "💙"];
let canClick = false;
let score = 0;

startBtn.onclick = gameStart;

function gameStart() {
    startGame();
    timerDisplay.hidden = false;
    startTimer();
    countdownTimer();
}


function startGame() {
    selectedCards = [];
    startBtn.hidden = true;
    scoreDisplay.hidden = false;
    message.textContent = 'Memory Game Started! Memorise the cards!';
    scoreDisplay.textContent = `Score: ${score}`;
    shuffleArray(allCards);
    correctCards = allCards.slice(0, 3);
    displayCards(correctCards);
    canClick = false;
    setTimeout(() => {
        displayCards(shuffleArray(allCards));
        message.textContent = 'Select the cards you saw earlier!';
        canClick = true;
        checkBtn.hidden = false;
        checkBtn.onclick = checkSelection;
    }, 4000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayCards(cards) {
    board.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.textContent = card;
        cardElement.className = 'card';
        board.appendChild(cardElement);
        cardElement.onclick = () => selectCard(cardElement, card);
    });
}

function selectCard(cardElement, cardValue) {
    if (!canClick) return;
    const index = selectedCards.indexOf(cardValue);
    if (index !== -1) {
        selectedCards.splice(index, 1);
        cardElement.classList.remove('shown');
        return;
    }
    cardElement.classList.add('shown');
    selectedCards.push(cardValue);
}

function checkSelection() {
    canClick = false;
    checkBtn.hidden = true;
    if (JSON.stringify(selectedCards.sort()) == JSON.stringify(correctCards.sort())) {
        message.textContent = 'Congratulations! You selected the correct cards!';
        score++;
        resetGame();
    } else {
        message.textContent = 'Sorry, that was incorrect. Try again! The correct cards were:';
        displayCards(correctCards);
        score = score - 1;
        resetGame();
    }
}

function countdownTimer() {
    let timeLeft = 60;
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        }
    }, 1000);
}

function resetGame() {
    setTimeout(() => {
        board.innerHTML = '';
        startGame();
    }, 1000);
}

function startTimer() {
    setTimeout(() => {
        exitGame();
    }, 60000);
}

function exitGame() {
    message.textContent = 'Game Over! Thanks for playing.';
    scoreDisplay.textContent = `Final Score: ${score}`;
    setTimeout(() => {
        board.innerHTML = '';
        startBtn.hidden = false;
        checkBtn.hidden = true;
        scoreDisplay.hidden = true;
        score = 0;
        timerDisplay.hidden = true;
    }, 4000);

}