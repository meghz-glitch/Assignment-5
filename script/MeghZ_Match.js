const gameBoard = document.getElementById('gameBoard');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let cardValues = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🥝'];
cardValues = [...cardValues, ...cardValues];

let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
let isFlipping = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    isFlipping = false;
    statusMessage.textContent = 'Moves: 0';
    gameBoard.innerHTML = '';

    const shuffledValues = shuffleArray([...cardValues]);
    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="front">${value}</div>
        <div class="back"></div>
        `;
        card.addEventListener('click', () => flipCard(card, value));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, value) {
    if (isFlipping || card.classList.contains('flip') || flippedCards.length === 2) return;

    card.classList.add('flip');
    flippedCards.push({ card, value });

    if (flippedCards.length === 2) {
        isFlipping = true; 
        moves++;
        statusMessage.textContent = `Moves: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.value === secondCard.value) {
        matchedPairs++;
        flippedCards = [];
        isFlipping = false;

        if (matchedPairs === cardValues.length / 2) {
            statusMessage.textContent = `You won in ${moves} moves!`;
          }
        } else {  
            setTimeout(() => {
                firstCard.card.classList.remove('flip');
                secondCard.card.classList.remove('flip');
                flippedCards = [];
                isFlipping = false;
              }, 1000);
            }
        }

        restartButton.addEventListener('click', startGame);
        startGame();