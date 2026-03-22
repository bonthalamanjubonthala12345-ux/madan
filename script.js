document.addEventListener('DOMContentLoaded', () => {
  const friendName = 'Madan';
  const showWelcome = document.getElementById('welcomeOverlay');
  const mainPage = document.getElementById('mainPage');
  const photoPage = document.getElementById('photoPage');
  const letterPage = document.getElementById('letterPage');
  const audio = document.getElementById('birthdayAudio');
  const toggleMusicButton = document.getElementById('toggleMusic');
  const openButton = document.getElementById('openButton');
  const forYouButton = document.getElementById('forYou');
  const timelineCard = document.getElementById('timelineList');
  const countdownEl = document.getElementById('countdown');
  const giftCard = document.getElementById('giftCard');
  const giftText = document.getElementById('giftText');
  const letterTrigger = document.getElementById('letterTrigger');
  const letterBack = document.getElementById('letterBack');
  const pageSymbols = ['❤', '💗', '💖', '💞', '💕', '🫶'];

  const friendNameSlots = document.querySelectorAll('#friendName, #friendNameMain, #friendName2');
  friendNameSlots.forEach((slot) => {
    slot.textContent = friendName;
  });

  function showPhotoPage() {
    if (photoPage) {
      photoPage.hidden = false;
      photoPage.style.display = 'block';
    }
    if (letterPage) {
      letterPage.hidden = true;
      letterPage.style.display = 'none';
    }
    if (letterTrigger) {
      letterTrigger.hidden = false;
      letterTrigger.style.display = 'block';
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function showLetterPage() {
    if (photoPage) {
      photoPage.hidden = true;
      photoPage.style.display = 'none';
    }
    if (letterPage) {
      letterPage.hidden = false;
      letterPage.style.display = 'block';
    }
    if (letterTrigger) {
      letterTrigger.hidden = true;
      letterTrigger.style.display = 'none';
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function openBirthdayPage() {
    if (showWelcome) {
      showWelcome.style.display = 'none';
      showWelcome.hidden = true;
    }
    if (mainPage) {
      mainPage.style.display = 'block';
      mainPage.hidden = false;
    }

    showPhotoPage();
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
        giftText.textContent =
          'For you, Madan: May this year bring endless laughter, success, and unforgettable memories.';
      }
      if (giftCard) {
        giftCard.hidden = false;
      }
    }, 1000);
  }

  openButton?.addEventListener('click', openBirthdayPage);
  letterTrigger?.addEventListener('click', showLetterPage);
  letterBack?.addEventListener('click', showPhotoPage);

  forYouButton?.addEventListener('click', () => {
    if (giftCard) {
      giftCard.hidden = false;
    }
    if (giftText) {
      giftText.textContent =
        'For you, Madan: May this year bring endless laughter, success, and unforgettable memories.';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && letterPage && !letterPage.hidden) {
      showPhotoPage();
    }
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

  const memories = [
    {
      title: 'Memory 1',
      lines: [
        'It felt like the beginning of something truly special.',
        'Even in one frame, I can see how naturally we became each other\'s people.',
        'You brought comfort, laughter, and a kind of peace I did not know I needed.',
        'Moments like this remind me how lucky I am to have you in my life.',
        'No matter how much time passes, this bond will always stay close to my heart.'
      ]
    },
    {
      title: 'Memory 2',
      lines: [
        'Everything feels effortless when I am with you.',
        'You make ordinary days feel beautiful just by being there beside me.',
        'Our connection is not loud, but it is real, deep, and full of love.',
        'Our friendship holds a warmth that means the world to me.',
        'You are truly one of the best parts of my life, Madan.'
      ]
    },
    {
      title: 'Memory 3',
      lines: [
        'Some feelings between us are bigger than words.',
        'It reminds me of how happy I am whenever life gives me time with you.',
        'You have a way of making every moment softer, lighter, and more meaningful.',
        'Being with you always feels like home in the middle of everything.',
        'That is why memories like this will always stay precious to me.'
      ]
    },
    {
      title: 'Memory 4',
      lines: [
        'Some memories are beautiful because of the place, but this one is beautiful because of you.',
        'The joy in this moment says everything about what we are to each other.',
        'We have built a bond full of trust, laughter, and unspoken understanding.',
        'I cherish the way you stay constant through every phase of life.',
        'You have a very big place in my heart.'
      ]
    },
    {
      title: 'Memory 5',
      lines: [
        'One thought of us is enough to make me smile instantly.',
        'It reminds me how easy it is to be completely myself when I am with you.',
        'You never just stand beside me, you always stand for me too.',
        'That kind of love, loyalty, and care is something I treasure deeply.',
        'I will always be grateful for a friendship as rare as ours.'
      ]
    },
    {
      title: 'Memory 6',
      lines: [
        'Looking at this feels like reliving a gentle and happy piece of life.',
        'You make memories feel richer simply because your heart is in them.',
        'There is so much comfort in knowing we have each other no matter what.',
        'Our bond is one of the purest and strongest things I know.',
        'I hope you always remember how deeply loved and valued you are.'
      ]
    },
    {
      title: 'Memory 7',
      lines: [
        'The feeling of us still lives with me even after time passes.',
        'You have given me so many reasons to smile without even trying.',
        'The best thing about us is how real everything feels.',
        'No pretending, no forcing, just a connection that keeps growing stronger.',
        'That is why this memory means much more than just a photo.'
      ]
    },
    {
      title: 'Memory 8',
      lines: [
        'Only your presence can bring this kind of warmth into my life.',
        'Whenever I think of the happiest parts of life, you are always there in them.',
        'You have been my support, my safe place, and one of my greatest blessings.',
        'What we share is not temporary, it is something truly lasting.',
        'I carry that truth in my heart every single day.'
      ]
    },
    {
      title: 'Memory 9',
      lines: [
        'There is something so honest and beautiful about this moment.',
        'It reflects the calm, happiness, and trust that exist between us.',
        'You understand me in ways very few people ever could.',
        'That is why your presence means more to me than I can fully say.',
        'A piece of us will always stay special to me.'
      ]
    },
    {
      title: 'Memory 10',
      lines: [
        'We have come so far together, and I cherish that deeply.',
        'Every memory with you becomes important because you make it meaningful.',
        'I love how we can turn simple moments into unforgettable ones.',
        'That is the beauty of having someone like you in life.',
        'You make everything brighter just by being yourself.'
      ]
    },
    {
      title: 'Memory 11',
      lines: [
        'Your energy makes everything around you shine.',
        'You bring so much life, laughter, and heart wherever you go.',
        'Being close to you has taught me what genuine care really feels like.',
        'You are not just part of my memories, you are part of who I am.',
        'That is why this moment will always matter so much to me.'
      ]
    },
    {
      title: 'Memory 12',
      lines: [
        'I feel nothing but gratitude when I think of you.',
        'Gratitude for your friendship, your patience, and your endless support.',
        'You have stood by me in ways I will never forget.',
        'Our bond is filled with love that does not need grand words to be real.',
        'My heart says all of this quietly and deeply.'
      ]
    },
    {
      title: 'Memory 13',
      lines: [
        'Some days with you feel soft, sweet, and unforgettable.',
        'It reminds me how lucky I am that life gave me you.',
        'You make even the smallest moments feel full of meaning.',
        'There is a kind of peace in our friendship that I never want to lose.',
        'That peace is one of the most precious things in my world.'
      ]
    },
    {
      title: 'Memory 14',
      lines: [
        'There is more than a moment here, there is a whole emotion.',
        'It carries the joy of being understood without having to explain everything.',
        'With you, I always feel seen, accepted, and deeply cared for.',
        'That kind of connection is something I will protect forever.',
        'You truly mean more to me than words can ever cover.'
      ]
    },
    {
      title: 'Memory 15',
      lines: [
        'My heart pauses for a second and smiles when I think of us.',
        'There is so much love and sincerity in the way we share life.',
        'You are one of the few people who make everything feel lighter.',
        'No matter what changes around us, I know what we have is real.',
        'That certainty makes this memory even more beautiful.'
      ]
    },
    {
      title: 'Memory 16',
      lines: [
        'Some moments stay forever, and this is definitely one of them.',
        'It reminds me of the comfort and happiness your presence always brings.',
        'You have a beautiful way of making people feel loved, especially me.',
        'Our friendship has become one of my favorite parts of life.',
        'I will always hold memories like this very close to my heart.'
      ]
    },
    {
      title: 'Memory 17',
      lines: [
        'Everything about you feels full of heart.',
        'You have given me countless reasons to trust life a little more.',
        'Your friendship is not just meaningful, it is healing in many ways.',
        'I am stronger, happier, and more myself because you are in my life.',
        'That is why this photo means more than it may seem.'
      ]
    },
    {
      title: 'Memory 18',
      lines: [
        'Sharing life with you feels so beautiful to me.',
        'Not every bond is this genuine, this steady, or this full of care.',
        'You have loved me through laughter, silence, and difficult days.',
        'That kind of presence is rare, and I never take it for granted.',
        'We are part of a very special story.'
      ]
    },
    {
      title: 'Memory 19',
      lines: [
        'There is a softness in this memory that means a lot to me.',
        'It reminds me that the best moments are usually the ones shared with you.',
        'You bring your whole heart into every bond, and that shows in everything.',
        'What we have is built on honesty, loyalty, and so much affection.',
        'That is why I treasure this moment so deeply.'
      ]
    },
    {
      title: 'Memory 20',
      lines: [
        'Some feelings never fade, no matter how much time passes.',
        'I can still feel the happiness of that moment just by looking at it.',
        'You make life gentler, fuller, and so much more beautiful.',
        'Having you beside me is one of the greatest gifts life gave me.',
        'I hope you always know how much you are loved.'
      ]
    },
    {
      title: 'Memory 21',
      lines: [
        'The happiness you bring stays in my heart for a long time.',
        'Every chapter of life feels better because you are part of mine.',
        'You have given me friendship in its most honest and loving form.',
        'That is something I will always respect, value, and protect.',
        'Moments like this remind me just how special you are to me.'
      ]
    },
    {
      title: 'Memory 22',
      lines: [
        'I love this memory because it feels so simple and so meaningful at the same time.',
        'That is exactly how our bond is, easy to hold and impossible to replace.',
        'You make me feel supported without ever needing to be asked.',
        'Your presence has become one of the most comforting parts of my world.',
        'Anything that holds you in it becomes one of my favorites.'
      ]
    },
    {
      title: 'Memory 23',
      lines: [
        'Some people become home for the heart without even trying.',
        'You are that kind of person for me, steady, warm, and irreplaceable.',
        'With you, every memory feels full of laughter, affection, and peace.',
        'I truly love the bond we have created over time.',
        'It is one of the most beautiful things life has given me.'
      ]
    },
    {
      title: 'Memory 24',
      lines: [
        'Being with you always feels like a little celebration of us.',
        'Of everything we have shared, survived, laughed through, and grown through.',
        'You have been there in more ways than I can ever fully explain.',
        'That kind of love and loyalty deserves to be cherished forever.',
        'My heart keeps saying thank you for you.'
      ]
    },
    {
      title: 'Memory 25',
      lines: [
        'Our connection is truly something special.',
        'You are not just someone I know, you are someone I deeply hold close.',
        'There is comfort in you, strength in you, and so much goodness in you.',
        'Being loved by a friend like you is a blessing I never ignore.',
        'That is why this memory means so much to me.'
      ]
    },
    {
      title: 'Memory 26',
      lines: [
        'There is a quiet beauty in us that touches my heart every time.',
        'It reminds me of how naturally love and care flow between us.',
        'You have always made me feel less alone in this world.',
        'That is a gift bigger than words and deeper than most people understand.',
        'I will always be thankful for the space you hold in my life.'
      ]
    },
    {
      title: 'Memory 27',
      lines: [
        'Some bonds only grow more beautiful with time, and ours is one of them.',
        'Every memory with you adds another layer to what we are.',
        'We are comfort, chaos, laughter, support, and love all at once.',
        'That is what makes our friendship feel so alive and unforgettable.',
        'I would choose this bond again in every lifetime.'
      ]
    },
    {
      title: 'Memory 28',
      lines: [
        'There is so much heart in this one little memory.',
        'It brings back the feeling of being truly happy just because you were there.',
        'You make moments feel safe, joyful, and worth remembering forever.',
        'That is one of the many reasons you are so important to me.',
        'What we share will always stay wrapped in love.'
      ]
    },
    {
      title: 'Memory 29',
      lines: [
        'You are part of the most beautiful chapter of my life.',
        'You have added so much meaning to my days without ever asking for anything.',
        'Your heart, your care, and your presence have changed my world for the better.',
        'What we share is rare, and I know how precious it is.',
        'That is why this moment will always be unforgettable.'
      ]
    },
    {
      title: 'Memory 30',
      lines: [
        'The best relationships are built in little moments.',
        'A smile here, a laugh there, a memory that suddenly becomes priceless.',
        'You are woven into so many of my happiest thoughts.',
        'And with every passing day, I only value this bond more.',
        'You will always be someone deeply loved in my life.'
      ]
    },
    {
      title: 'Memory 31',
      lines: [
        'Everything I feel somehow leads back to you.',
        'Love, gratitude, friendship, and the comfort of knowing you are mine to keep in life.',
        'You are one of the most genuine and beautiful souls I know.',
        'No matter where life takes us, my care for you will never change.',
        'Like you, it will always remain special to me.'
      ]
    }
  ];

  if (timelineCard) {
    const rotateClasses = { 5: 'rotate-card', 8: 'rotate-card', 10: 'rotate-card', 13: 'rotate-card' };

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
          <h3>${memories[i - 1].title}</h3>
          <p>${memories[i - 1].lines.join('<br>')}</p>
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
    if (Math.random() < 0.26 && photoPage && !photoPage.hidden) {
      spawnScrollHeart();
    }
  });

  function spawnPageSymbol() {
    if (letterPage && !letterPage.hidden) {
      return;
    }

    const symbol = document.createElement('div');
    symbol.className = 'page-symbol';
    symbol.textContent = pageSymbols[Math.floor(Math.random() * pageSymbols.length)];
    symbol.style.left = `${Math.random() * 92}%`;
    symbol.style.top = `${window.scrollY + 20 + Math.random() * Math.max(window.innerHeight - 120, 120)}px`;
    symbol.style.animationDuration = `${3.8 + Math.random() * 1.8}s`;
    symbol.style.fontSize = `${18 + Math.random() * 18}px`;
    symbol.style.color = Math.random() > 0.5 ? '#ff4f8b' : '#ff2d55';
    document.body.appendChild(symbol);
    symbol.addEventListener('animationend', () => symbol.remove());
  }

  window.setInterval(spawnPageSymbol, 1000);
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(spawnPageSymbol, i * 350);
  }

  window.setInterval(() => {
    if (photoPage && !photoPage.hidden) {
      launchConfetti(12);
    }
  }, 5000);

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
