const startBtn = document.getElementById('startButton');
const board = document.getElementById('game-board');
const message = document.getElementById('message');
const checkBtn = document.getElementById('checkButton');

checkBtn.hidden = true;
let correctCards = [];
let selectedCards = [];
const allCards = ["🟥", "🟩", "🟦", "🔴", "🟢", "🔵", "❤️", "💚", "💙"];
let canClick = false;

startBtn.onclick = startGame;


function startGame() {
    selectedCards = [];
    startBtn.hidden = true;
    message.textContent = 'Memory Game Started! Memorise the cards!';
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
    }, 2000);
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
    if (JSON.stringify(selectedCards) == JSON.stringify(correctCards)) {
        message.textContent = 'Congratulations! You selected the correct cards!';
        resetGame();
    } else {
        message.textContent = 'Sorry, that was incorrect. Try again! The correct cards were:';
        displayCards(correctCards);
        resetGame();
    }
}

function resetGame() {
    setTimeout(() => {
        board.innerHTML = '';
        startGame();
    }, 2000);
}