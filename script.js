document.addEventListener('DOMContentLoaded', () => {
  const friendName = 'Madan';
  const showWelcome = document.getElementById('welcomeOverlay');
  const mainPage = document.getElementById('mainPage');
  const audio = document.getElementById('birthdayAudio');

  const friendNameSlots = document.querySelectorAll('#friendName, #friendNameMain, #friendName2');
  friendNameSlots.forEach((slot) => { slot.textContent = friendName; });

  function openBirthdayPage() {
    if (showWelcome) {
      showWelcome.style.display = 'none';
      showWelcome.hidden = true;
    }
    if (mainPage) {
      mainPage.style.display = 'block';
      mainPage.hidden = false;
    }
    launchConfetti(90);
    if (audio) {
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay blocked, user can click Play Music.
        });
      }
    }
    setTimeout(() => {
      const message = 'Happy birthday, Madan! This page is made with love just for you 🎈💕';
      const giftText = document.getElementById('giftText');
      if (giftText) giftText.textContent = message;
      const giftCard = document.getElementById('giftCard');
      if (giftCard) giftCard.hidden = false;
    }, 1000);
  }

  const openButton = document.getElementById('openButton');

  if (openButton) {
    openButton.addEventListener('click', openBirthdayPage);
  }

  const forYouButton = document.getElementById('forYou');
  if (forYouButton) {
    forYouButton.addEventListener('click', () => {
      const giftText = document.getElementById('giftText');
      const giftCard = document.getElementById('giftCard');
      if (giftCard) {
        giftCard.hidden = false;
      }
      if (giftText) {
        giftText.textContent = 'For you, Madan: May this year bring endless laughter, success, and unforgettable memories.';
      }
      launchConfetti(50);
    });
  }

  document.getElementById('toggleTheme')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  document.getElementById('toggleMusic')?.addEventListener('click', (event) => {
    if (!audio) return;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocked autoplay, user already clicked so retry
          audio.play();
        });
      }
      event.target.textContent = 'Pause Music';
    } else {
      audio.pause();
      event.target.textContent = 'Play Music';
    }
  });

  const timelineCard = document.getElementById('timelineList');

  const quotes = [
    'Friends make every moment magical. 💫',
    'You are the reason every day feels brighter. 🌟',
    'Best friends are the best gifts. 🎁',
    'Laugh, live, love — together forever. ❤️',
    'A friend like you is my favorite adventure. 🧭',
    'You are sunshine on my rainy days. ☀️',
    'Life is better with you by my side. 💖'
  ];

  if (timelineCard) {
    const rotateClasses = {5: 'rotate-card', 8: 'rotate-card', 10: 'rotate-card', 13: 'rotate-card'};
    for (let i = 1; i <= 31; i++) {
      const side = i % 2 === 1 ? 'left' : 'right';
      const extraClass = rotateClasses[i] ? ` ${rotateClasses[i]}` : '';
      const item = document.createElement('div');
      item.className = `timeline-item ${side}${extraClass}`;
      item.innerHTML = `
        <div class="timeline-media"><img src="photos/photo${i}.jpg" alt="Memory ${i}" loading="lazy"></div>
        <div class="timeline-text">
          <h3>Memory ${i}</h3>
          <p>${quotes[(i - 1) % quotes.length]}</p>
        </div>
      `;
      timelineCard.appendChild(item);
    }
  }

  function spawnScrollHeart() {
    const heart = document.createElement('div');
    heart.className = 'scroll-heart';
    heart.style.left = `${20 + Math.random() * 60}%`;
    heart.style.top = `${window.scrollY + window.innerHeight - 80}px`;
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }
  window.addEventListener('scroll', () => {
    if (Math.random() < 0.26) spawnScrollHeart();
  });

  function updateCountdown() {
    const targetDate = new Date(2026, 2, 31, 0, 0, 0); // March 31, 2026

    const now = new Date();
    const diff = targetDate - now;
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    if (diff <= 0) {
      countdownEl.textContent = 'Happy Birthday! 🎉';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days);
    document.getElementById('hours').textContent = String(hours);
    document.getElementById('minutes').textContent = String(minutes);
    document.getElementById('seconds').textContent = String(seconds);
    countdownEl.textContent = `Next celebration in ${days} days ${hours}h ${minutes}m ${seconds}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});

function launchConfetti(count = 80) {
  const container = document.getElementById('confetti');
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 65%)`;
    piece.style.width = `${Math.random() * 8 + 6}px`;
    piece.style.height = `${Math.random() * 8 + 6}px`;
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.animationDuration = `${Math.random() * 1.4 + 1.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

