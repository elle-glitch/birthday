const birthdayDate = new Date('2026-01-14T00:00:00'); 
const text = "Happy Birthday! 🎉";
let index = 0;
let isDeleting = false;
const typingSpeed = 150;
const deletingSpeed = 100;
const pauseBeforeDelete = 2000;
const pauseBeforeType = 500;

window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 10000);
});

function typeWriter() {
    const typingElement = document.getElementById('typingText');
    
    if (!isDeleting && index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
    } else if (!isDeleting && index === text.length) {
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, pauseBeforeDelete);
    } else if (isDeleting && index > 0) {
        typingElement.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(typeWriter, deletingSpeed);
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        setTimeout(typeWriter, pauseBeforeType);
    }
}

typeWriter();

function createConfetti() {
    const colors = ['#ff6b9d', '#4facfe', '#c77dff', '#ffd700', '#ff69b4'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

let confettiTriggered = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance < 0) {
        document.querySelector('.countdown-title').textContent = "🎉 It's Your Birthday! 🎉";
        document.getElementById('days').textContent = "00";
        document.getElementById('hours').textContent = "00";
        document.getElementById('minutes').textContent = "00";
        document.getElementById('seconds').textContent = "00";
        
        if (!confettiTriggered) {
            createConfetti();
            confettiTriggered = true;
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

let musicPlaying = false;
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const button = document.querySelector('.music-toggle');
    
    if (musicPlaying) {
        music.pause();
        button.textContent = '🎵 Music';
        musicPlaying = false;
    } else {
        music.play();
        button.textContent = '⏸️ Pause';
        musicPlaying = true;
    }
}

function openGalaxy() {
    window.location.href = 'galaxy.html';
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .story-text, .cat-illustration, .fact-card, .gallery-card, .profile-image-container, .about-title, .about-age, .about-description, .letter-container').forEach(el => {
    observer.observe(el);
});

function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const img = element.querySelector('img');
    
    if (img) {
        modalImg.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function playBubbleSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function createHeartParticle(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

let cursorTrailTimeout;

document.addEventListener('mousemove', (e) => {
    clearTimeout(cursorTrailTimeout);
    
    cursorTrailTimeout = setTimeout(() => {
        if (Math.random() > 0.7) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 1000);
        }
    }, 50);
});

let catClickCount = 0;
const catContainer = document.querySelector('.cat-illustration');

if (catContainer) {
    catContainer.addEventListener('click', () => {
        catClickCount++;
        
        if (catClickCount === 5) {
            const secretMsg = document.createElement('div');
            secretMsg.className = 'secret-message';
            secretMsg.innerHTML = `
                <div class="secret-content">
                    <span class="secret-close" onclick="this.parentElement.parentElement.remove()">×</span>
                    <h2>🐱 You Found Me! 🐱</h2>
                    <p>Just like this cat, you're always curious and full of surprises. 
                    That's one of the many things I love about you. 💝</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                        P.S. Click the star ⭐ at the bottom right for another surprise! 😉
                    </p>
                </div>
            `;
            document.body.appendChild(secretMsg);
            catClickCount = 0;
        }
    });
}

document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createHeartParticle(
                    x + (Math.random() - 0.5) * 50,
                    y + (Math.random() - 0.5) * 50
                );
            }, i * 100);
        }
    });
    
    card.addEventListener('click', (e) => {
        playBubbleSound();
        openModal(card);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

function animateNumber(element) {

    if (element.classList.contains('infinity-number')) {

        const duration = 2000;
        const step = 999 / (duration / 16);
        let current = 0;

        const infinityTimer = setInterval(() => {
            current += step;
            if (current >= 999) {

                element.textContent = '∞';
                element.classList.add('infinity-symbol');
                clearInterval(infinityTimer);
                
                setTimeout(() => {
                    element.style.animation = 'infinityGlow 2s ease-in-out infinite alternate';
                }, 100);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
        return; 
    }
    
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const numberTimer = setInterval(() => {
        current += step;
        
        if (current >= target) {
            clearInterval(numberTimer);
            
            const isFirstCard = element.closest('.number-card') === 
                               document.querySelector('.numbers-grid .number-card:first-child');
            
            if (target === 90 && isFirstCard) {
                element.textContent = '90+';
            } else {
                element.textContent = target;
            }
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

document.querySelectorAll('.number-card').forEach(card => {
    observer.observe(card);
    
    const numberValue = card.querySelector('.number-value');
    const observerNumbers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && numberValue.textContent === '0') {
                animateNumber(numberValue);
            }
        });
    }, { threshold: 0.5 });
    
    observerNumbers.observe(card);
});