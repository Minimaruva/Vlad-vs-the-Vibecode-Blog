// bubble easter egg

let easterEggActive = false;
let bubbleInterval = null;
let bubbleContainer = null;
let animationFrame = null;

const bubbles = [];
const maxBubbles = 20;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function initBubbleGame() {
    if (bubbleContainer) return;

    bubbleContainer = document.createElement('div');
    bubbleContainer.id = 'bubble-container';
    document.body.appendChild(bubbleContainer);

    // Seed a few bubbles quickly
    for (let i = 0; i < 6; i += 1) {
        spawnBubble();
    }

    // Keep topping up to max
    bubbleInterval = window.setInterval(() => {
        if (bubbles.length < maxBubbles) {
            spawnBubble();
        }
    }, 700);

    animationFrame = requestAnimationFrame(stepBubbles);
}

function spawnBubble() {
    if (!bubbleContainer || bubbles.length >= maxBubbles) return;

    const bubble = document.createElement('div');
    bubble.classList.add('frutiger-bubble');

    const size = Math.random() * 70 + 40; 
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const x = Math.random() * (viewportWidth - size);
    const y = viewportHeight + size; // start off-screen below

    // Soft float upward with some sideways drift
    const vx = (Math.random() * 0.6 - 0.3) || 0.2;
    const vy = -(Math.random() * 0.8 + 0.8);

    bubble.style.setProperty('--tx', `${x}px`);
    bubble.style.setProperty('--ty', `${y}px`);
    bubbleContainer.appendChild(bubble);

    // Fade in after layout so transition runs
    requestAnimationFrame(() => bubble.classList.add('visible'));

    bubbles.push({ el: bubble, x, y, vx, vy, size, entered: false });

    bubble.addEventListener('mousedown', () => {
        bubble.classList.add('popped');
    });

    bubble.addEventListener('animationend', (event) => {
        if (event.animationName === 'pop') {
            removeBubble(bubble);
        }
    });

    // Safety cleanup after 20s
    setTimeout(() => removeBubble(bubble), 20000);
}

// Allow launching the minigame from UI triggers
function startBubbleGame() {
    if (easterEggActive) return;

    easterEggActive = true;
    initBubbleGame();
}

function removeBubble(el) {
    const idx = bubbles.findIndex((b) => b.el === el);
    if (idx !== -1) {
        bubbles.splice(idx, 1);
    }
    el.remove();
}

function stepBubbles() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    bubbles.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.y < height - b.size) {
            b.entered = true; // mark once inside viewport
        }

        if (b.x <= 0 || b.x + b.size >= width) {
            b.vx *= -1;
            b.x = clamp(b.x, 0, width - b.size);
        }

        if (b.entered && (b.y <= 0 || b.y + b.size >= height)) {
            b.vy *= -1;
            b.y = clamp(b.y, 0, height - b.size);
        }

        b.el.style.setProperty('--tx', `${b.x}px`);
        b.el.style.setProperty('--ty', `${b.y}px`);
    });

    animationFrame = requestAnimationFrame(stepBubbles);
}

// Expose a global launcher for clickable desktop icon
window.startBubbleGame = startBubbleGame;