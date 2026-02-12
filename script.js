const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionHeading = document.getElementById('question');
const mainGif = document.getElementById('main-gif');

const phrases = [
    "¿Estás segura? 🥺",
    "¿De verdad? 😭",
    "¡Piénselo bien! 🤔",
    "¡Amor que me pongo triste! 😢",
    "¡Voy a llorar! 😿",
    "💔 ¡No!",
    "¡No me haga eso! 🙏",
    "Amor, diga que sí! 🥹",
    "¡Por favoooor! 😩",
    "¡Te lo ruego! 🫠",
    "¿Segura segura? 🫣",
    "¡Última oportunidad! ⏳"
];

let noClickCount = 0;
let yesScale = 1;

// Create floating hearts background
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    document.body.appendChild(heartsContainer);

    const heartEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '🌹', '✨'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.animationDelay = (Math.random() * 8) + 's';
        heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
        heart.style.opacity = Math.random() * 0.6 + 0.2;
        heartsContainer.appendChild(heart);
    }
}

createFloatingHearts();

function moveNoButton() {
    noClickCount++;

    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries with a margin
    const margin = 50;
    const maxWidth = window.innerWidth - btnRect.width - margin;
    const maxHeight = window.innerHeight - btnRect.height - margin;

    // Ensure values are positive
    const randomX = Math.max(margin, Math.random() * maxWidth);
    const randomY = Math.max(margin, Math.random() * maxHeight);

    // Append to body so it escapes any transform context of parents
    if (noBtn.parentElement !== document.body) {
        document.body.appendChild(noBtn);
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';

    // Change text randomly
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    noBtn.innerText = randomPhrase;

    // Grow the Yes button slightly each time No is avoided
    yesScale += 0.08;
    yesBtn.style.transform = `scale(${Math.min(yesScale, 1.8)})`;

    // Make the No button shrink slightly
    const noScale = Math.max(0.6, 1 - noClickCount * 0.04);
    noBtn.style.transform = `scale(${noScale})`;

    // Shake the card briefly
    const card = document.querySelector('.card');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);
}

// Event listeners for desktop (hover) and mobile (touch/click attempt)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    // 1. Change the UI with a beautiful transition
    questionHeading.innerHTML = "¡Siiiiii! ¡Sabía que dirías que sí! ❤️🥰";
    questionHeading.classList.add('celebration-text');
    mainGif.src = "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif";

    // Hide the No button wherever it is
    noBtn.style.display = 'none';

    // Hide buttons container
    document.querySelector('.buttons').style.display = 'none';

    // Pulse the card
    const card = document.querySelector('.card');
    card.classList.add('celebration-card');

    // 2. Launch Confetti
    launchConfetti();

    // 3. Add extra love message after a delay
    setTimeout(() => {
        const loveMsg = document.createElement('p');
        loveMsg.className = 'love-message';
        loveMsg.innerHTML = '¡Te quiero muchísimo! 💕';
        card.appendChild(loveMsg);
    }, 1500);
});

function launchConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Initial big burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ff758f', '#ffccd5', '#fff0f3']
    });

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#ff8fa3', '#ff758f', '#ffccd5']
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#ff8fa3', '#ff758f', '#ffccd5']
        }));
    }, 250);
}
