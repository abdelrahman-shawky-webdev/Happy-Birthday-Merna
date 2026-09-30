
const passcodeOverlay = document.querySelector('.passcode');
const passwordInput = document.querySelector('.passcode input');
const sendBtn = document.querySelector('.passcode button');
const bgMusic = document.querySelector('audio'); 


const CORRECT_PASSWORD = "1709"; 


sendBtn.addEventListener('click', function(e) {
    e.preventDefault();


    const enteredPassword = passwordInput.value.trim();

    
    if (enteredPassword === CORRECT_PASSWORD) {
        
        passcodeOverlay.style.transition = 'opacity 0.6s ease';
        passcodeOverlay.style.opacity = '0';
        setTimeout(() => {
            passcodeOverlay.style.display = 'none';
        }, 600);

        if (bgMusic) {
            bgMusic.play().catch(error => {
                console.log("Audio dailed to play automatically due to browser policy:", error);
            });
        }

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

    } else {
        passwordInput.style.border = '2px solid #e74c3c';
        passwordInput.value = '';
        passwordInput.placeholder = 'Wrong Password!';
    }
});


// تاريخ الموعد المستهدف (17 سبتمبر)
const targetDate = new Date("September 17, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
        // لما الموعد يوصل
        document.querySelector(".countdown-container").innerHTML = "<h3 style='color: #2ec4b6;'>It's Time! 🎉</h3>";
    }
}

// تشغيل العداد كل ثانية
setInterval(updateCountdown, 1000);
updateCountdown(); // تشغيل فوري أول ما الصفحة تفتح


// 1. إنشاء وتطير البلونات والقلوب في الخلفية
function createFloatingElement() {
  const container = document.getElementById('floating-container');
  if (!container) return;

  const element = document.createElement('div');
  const isHeart = Math.random() > 0.5;
  
  element.classList.add(isHeart ? 'heart' : 'balloon');
  element.innerText = isHeart ? '❤️' : '🎈';

  // موقع عشوائي أفقي وزمن طيران عشوائي
  element.style.left = Math.random() * 100 + 'vw';
  element.style.animationDuration = Math.random() * 3 + 4 + 's'; // بين 4 لـ 7 ثوانٍ
  element.style.fontSize = Math.random() * 15 + 20 + 'px'; // أحجام مختلفة

  // فرقعة العنصر عند الضغط عليه
  element.addEventListener('click', () => {
    element.style.transform = 'scale(1.8)';
    element.style.opacity = '0';
    setTimeout(() => {
      element.remove();
    }, 200);
  });

  container.appendChild(element);

  // حذف العنصر بعد انتهاء الحركة لتخفيف العبء على المتصفح
  setTimeout(() => {
    if (element.parentNode) {
      element.remove();
    }
  }, 7000);
}

// توليد عنصر جديد كل 1.2 ثانية
setInterval(createFloatingElement, 1200);

// 2. دالة إطفاء الشمعة وإطلاق الـ Confetti
function extinguishCandle() {
  const flame = document.getElementById('flame');
  const status = document.getElementById('cake-status');

  if (flame && !flame.classList.contains('extinguished')) {
    // إخفاء اللهب
    flame.classList.add('extinguished');

    // تغيير نص التعليمات
    if (status) {
      status.innerHTML = '🎉 Happy Birthday Merna 🎂';
    }

    // إطلاق مفرقعات الـ Confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  }
}