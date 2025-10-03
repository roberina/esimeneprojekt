const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

window.addEventListener('DOMContentLoaded', shuffleCards);

function shuffleCards() {
    const board = document.querySelector('.game-board');
    const cardsArray = Array.from(cards);
    
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        board.appendChild(cardsArray[j]);
    }
}

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

function flipCard() {
    if (!canFlip) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.card === card2.dataset.card;
    
    if (match) {
        setTimeout(() => {
            card1.classList.add('matched', 'celebrate');
            card2.classList.add('matched', 'celebrate');
            matchedPairs++;
            flippedCards = [];
            canFlip = true;
            
            setTimeout(() => {
                card1.classList.remove('celebrate');
                card2.classList.remove('celebrate');
            }, 600);
            
            if (matchedPairs === 8) {
                setTimeout(() => showWinScreen(), 800);
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1200);
    }
}

function showWinScreen() {
    createConfetti();
    
    setTimeout(() => createFireworks(), 500);
    
    setTimeout(() => {
        const modal = document.createElement('div');
        modal.className = 'win-modal show';
        modal.innerHTML = `
            <div class="win-content">
                <h2>VÕIT!</h2>
                <p>Sa leidsid kõik paarid!</p>
                <div class="win-buttons">
                    <button class="win-btn btn-play-again" onclick="location.reload()">Mängi uuesti</button>
                    <button class="win-btn btn-home" onclick="location.href='index.html'">Avalehele</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }, 1000);
}

function createConfetti() {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

function createFireworks() {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6;
            
            for (let j = 0; j < 25; j++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (Math.PI * 2 * j) / 25;
                const velocity = 80 + Math.random() * 120;
                firework.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
                firework.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
                
                document.body.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1500);
            }
        }, i * 300);
    }
}