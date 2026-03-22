document.addEventListener('DOMContentLoaded', () => {
  const friendName = 'Madan';
  const showWelcome = document.getElementById('welcomeOverlay');
  const mainPage = document.getElementById('mainPage');
  const audio = document.getElementById('birthdayAudio');
  const toggleMusicButton = document.getElementById('toggleMusic');
  const openButton = document.getElementById('openButton');
  const forYouButton = document.getElementById('forYou');
  const timelineCard = document.getElementById('timelineList');
  const countdownEl = document.getElementById('countdown');
  const giftCard = document.getElementById('giftCard');
  const giftText = document.getElementById('giftText');
  const pageSymbols = ['*', '+', 'o', 'x', '.'];

  const friendNameSlots = document.querySelectorAll('#friendName, #friendNameMain, #friendName2');
  friendNameSlots.forEach((slot) => {
    slot.textContent = friendName;
  });

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
          // If autoplay is blocked, the music button can be used instead.
        });
      }
    }

    if (toggleMusicButton) {
      toggleMusicButton.textContent = audio && !audio.paused ? 'Pause Music' : 'Play Music';
    }

    window.setTimeout(() => {
      if (giftText) {
        giftText.textContent = 'Happy birthday, Madan! This page is made with love just for you.';
      }
      if (giftCard) {
        giftCard.hidden = false;
      }
    }, 1000);
  }

  openButton?.addEventListener('click', openBirthdayPage);

  forYouButton?.addEventListener('click', () => {
    if (giftCard) {
      giftCard.hidden = false;
    }
    if (giftText) {
      giftText.textContent =
        'For you, Madan: May this year bring endless laughter, success, and unforgettable memories.';
    }
    launchConfetti(50);
  });

  document.getElementById('toggleTheme')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  toggleMusicButton?.addEventListener('click', (event) => {
    if (!audio) {
      return;
    }

    const button = event.currentTarget;
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          audio.play().catch(() => {
            button.textContent = 'Play Music';
          });
        });
      }
      button.textContent = 'Pause Music';
    } else {
      audio.pause();
      button.textContent = 'Play Music';
    }
  });

  audio?.addEventListener('error', () => {
    if (toggleMusicButton) {
      toggleMusicButton.disabled = true;
      toggleMusicButton.textContent = 'Music Unavailable';
    }
  });

  const quotes = [
    'Friends make every moment magical.',
    'You are the reason every day feels brighter.',
    'Best friends are the best gifts.',
    'Laugh, live, love, together forever.',
    'A friend like you is my favorite adventure.',
    'You are sunshine on my rainy days.',
    'Life is better with you by my side.'
  ];

  if (timelineCard) {
    const rotateClasses = {
      5: 'rotate-card',
      8: 'rotate-card',
      10: 'rotate-card',
      13: 'rotate-card'
    };

    for (let i = 1; i <= 31; i += 1) {
      const side = i % 2 === 1 ? 'left' : 'right';
      const extraClass = rotateClasses[i] ? ` ${rotateClasses[i]}` : '';
      const item = document.createElement('div');
      item.className = `timeline-item ${side}${extraClass}`;
      item.innerHTML = `
        <div class="timeline-media">
          <img src="photos/photo${i}.jpg" alt="Memory ${i}" loading="lazy">
        </div>
        <div class="timeline-text">
          <h3>Memory ${i}</h3>
          <p>${quotes[(i - 1) % quotes.length]}</p>
        </div>
      `;

      const image = item.querySelector('img');
      image?.addEventListener(
        'error',
        () => {
          image.alt = `Missing photo ${i}`;
          image.src =
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
                <rect width="640" height="360" fill="#f4edff"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#5b3aa8" font-family="Arial, sans-serif" font-size="28">
                  Photo ${i} is missing
                </text>
              </svg>`
            );
        },
        { once: true }
      );

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
    if (Math.random() < 0.26) {
      spawnScrollHeart();
    }
  });

  function spawnPageSymbol() {
    const symbol = document.createElement('div');
    symbol.className = 'page-symbol';
    symbol.textContent = pageSymbols[Math.floor(Math.random() * pageSymbols.length)];
    symbol.style.left = `${Math.random() * 92}%`;
    symbol.style.top = `${window.scrollY + 20 + Math.random() * Math.max(window.innerHeight - 120, 120)}px`;
    symbol.style.animationDuration = `${3.8 + Math.random() * 1.8}s`;
    symbol.style.fontSize = `${18 + Math.random() * 18}px`;
    document.body.appendChild(symbol);
    symbol.addEventListener('animationend', () => symbol.remove());
  }

  window.setInterval(spawnPageSymbol, 1000);
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(spawnPageSymbol, i * 350);
  }

  function setCountdownValues(days, hours, minutes, seconds) {
    document.getElementById('days').textContent = String(days);
    document.getElementById('hours').textContent = String(hours);
    document.getElementById('minutes').textContent = String(minutes);
    document.getElementById('seconds').textContent = String(seconds);
  }

  function updateCountdown() {
    if (!countdownEl) {
      return;
    }

    const now = new Date();
    let targetDate = new Date(now.getFullYear(), 2, 31, 0, 0, 0);

    if (now > targetDate) {
      targetDate = new Date(now.getFullYear() + 1, 2, 31, 0, 0, 0);
    }

    const diff = targetDate - now;

    if (diff <= 0) {
      setCountdownValues(0, 0, 0, 0);
      countdownEl.textContent = 'Happy Birthday!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setCountdownValues(days, hours, minutes, seconds);
    countdownEl.textContent = `Next celebration in ${days} days ${hours}h ${minutes}m ${seconds}s`;
  }

  window.setInterval(updateCountdown, 1000);
  updateCountdown();
});

function launchConfetti(count = 80) {
  const container = document.getElementById('confetti');
  if (!container) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
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
