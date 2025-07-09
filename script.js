const bgMusic = document.getElementById('background-music');
const messageAudio = document.getElementById('message-audio');
const playMessageBtn = document.getElementById('play-message');

// ✅ 1️⃣ Unlock autoplay on first user interaction only once
function unlockAudio() {
  if (bgMusic.paused) {
    bgMusic.play().catch(err => console.log('Autoplay blocked:', err));
  }
  window.removeEventListener('click', unlockAudio);
}
window.addEventListener('click', unlockAudio);

// ✅ 2️⃣ Toggle Play/Pause for message audio with button text/icon change
playMessageBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  if (messageAudio.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;

    messageAudio.play().catch(err => console.log('Autoplay blocked for message:', err));
    playMessageBtn.textContent = '⏸️ Pause Voice Note';
  } else {
    messageAudio.pause();
    playMessageBtn.textContent = '▶️ Play Voice Note';
  }
});

// ✅ 3️⃣ Resume bg music ONLY after message ends
messageAudio.addEventListener('ended', () => {
  bgMusic.play().catch(err => console.log('Autoplay blocked on resume:', err));
  playMessageBtn.textContent = '▶️ Play Voice Note';
});

// ✅ Candle lighting + wish text display
const lightCandleBtn = document.getElementById('light-candle');
const candleFlame = document.getElementById('candle-flame');
const wishText = document.getElementById('wish-text');

lightCandleBtn.addEventListener('click', () => {
  candleFlame.style.display = 'block';
  if (wishText) {
    wishText.style.display = 'block';
  }
});

// ✅ Confetti on surprise button
const surpriseBtn = document.getElementById('surprise-btn');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let confetti = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 5
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.ellipse(c.x, c.y, c.r, c.r / 2, c.tilt, 0, 2 * Math.PI);
    ctx.fill();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += c.d * 0.5;
    c.x += Math.sin(c.y * 0.02);
    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  });
}

surpriseBtn.addEventListener('click', () => {
  createConfetti();
  drawConfetti();
});

// ✨ Simple sparkle trail effect on cursor
document.addEventListener('mousemove', (e) => {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 600);
});

// ✅ Typewriting Letter after 24s of voice message
function typeLetter(text, elementId, speed = 50) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.innerHTML = "";
  const interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

let hasTyped = false;
messageAudio.addEventListener('timeupdate', () => {
  if (messageAudio.currentTime >= 24 && !hasTyped) {
    hasTyped = true;
    const letter = `Hello Likki,\n\nOnce again wish you many many more happy returns of the day ☺️💗✨🤞\n 
May be this is your 2nd bday manam frnds ayina tharvatha.\n
But this 1 and half or 2 years inbetween gap lo ne you become one among closest people for me.\n
May be manam maatladukundhi thakkuve avvachu kaani share cheskunna vishyaalu chaala vunnai 😄\n
\n
This was all a coincidence or something that nuvvu insta create cheyyadam nen text cheyyadam close avvadam but anyway it meant to a good bond between us.\n
\n
One last thing I wanna say is that I hope our friendship lasts till the end and thanks for being a good part of my life 🙃🙃\n
– by [Chavanoprash 🚶]`;
    typeLetter(letter, 'letter-text');
  }
});

// ✅ PAGE TRANSITION HANDLER
window.addEventListener('DOMContentLoaded', () => {
  const transitionEl = document.querySelector('.page-transition');
  if (transitionEl) {
    transitionEl.classList.add('active');
    setTimeout(() => {
      transitionEl.classList.remove('active');
    }, 800);
  }
});

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const transitionEl = document.querySelector('.page-transition');
    if (!transitionEl) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    transitionEl.classList.add('active');
    setTimeout(() => {
      window.location.href = href;
    }, 800);
  });
});

// ✅ Typed Heading on load
function typeText(element, text, speed = 100) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const heading = document.getElementById("typed-heading");
  if (heading) {
    const message = "🎉 Happy Birthday Likitha 🎂";
    typeText(heading, message, 120);
  }
});
