/* ==========================================================================
   UNIVERSAL BIRTHDAY CELEBRATION — Browser Injection Script
   Works on ANY website. Paste into DevTools console, a bookmarklet,
   a Tampermonkey/Greasemonkey userscript, or a browser extension content script.

   HOW TO USE
   1. Edit the CONFIG block below (name, company, message, theme).
   2. Paste the whole script into the browser console on any page, OR
   3. Wrap it as a bookmarklet: javascript:(function(){ ...minified... })();
   4. Or save as a Tampermonkey userscript with @match set to all sites
   ========================================================================== */

(() => {
  if (document.getElementById("bc-overlay-root")) return;

  /* ============================ CONFIG ================================ */
  const CONFIG = {
    name: "Roland Sir",
    company: "Ardon Technology Services Private Limited",
    logoUrl: "https://npa.ardon.in/img/npaardon.png", // set "" to hide
    message:
      "Wishing you a wonderful birthday filled with <strong>happiness, success, good health</strong> and countless memorable moments! ✨<br><br>Thank you for inspiring and leading us. 🙏",
    footerTags: ["🎈 More Success", "🌟 More Achievements", "❤️ Happiness", "🚀 Bigger Dreams"],
    // "auto" reads the host page's accent color; or force e.g. { primary:"#7c3aed", accent:"#d97706" }
    theme: "auto",
    // celebration modes to cycle: confetti | balloons | fireworks | hearts | stars
    effects: ["confetti", "balloons", "fireworks", "hearts"],
    playSound: true,
    onceADay: false, // don't re-run the celebration burst twice on the same calendar day
    autoCloseAfterMs: 0, // e.g. 15000 to auto-dismiss the welcome screen; 0 = never

    // ---- Countdown-to-midnight settings ----
    // Set a fixed "YYYY-MM-DD" activation date. The script will count down to this date,
    // and once it is reached, the celebration will stay active indefinitely.
    celebrationDate: "2026-08-15",
    countdownLabel: "🎂 Birthday celebration begins in"
  };
  /* ====================================================================== */

  const STORAGE_KEY = "bc_last_shown_" + location.hostname;

  function hasCelebratedToday() {
    if (!CONFIG.onceADay) return false;
    return localStorage.getItem(STORAGE_KEY) === new Date().toDateString();
  }
  function markCelebrated() {
    if (CONFIG.onceADay) localStorage.setItem(STORAGE_KEY, new Date().toDateString());
  }

  // Resolve the target midnight we're counting down to.
  function getTarget() {
    if (CONFIG.celebrationDate) {
      return new Date(CONFIG.celebrationDate + "T00:00:00");
    }
    const t = new Date();
    t.setHours(24, 0, 0, 0); // rolls forward to the *next* midnight
    return t;
  }
   // function getTarget() {
   //     const t = new Date();
   
   //     // TEST: celebrate 30 seconds after script loads
   //     t.setSeconds(t.getSeconds() + 30);
   
   //     return t;
   // }

  const now0 = new Date();
  const target = getTarget();

  // Already celebrated today — nothing more to do on this page load.
  if (hasCelebratedToday()) return;

  if (now0 >= target) {
    startCelebration();
  } else {
    showCountdown(target);
  }

  /* ========================================================================
     PHASE 1 — Lightweight countdown overlay (shown on every page until 12:00)
     ======================================================================== */
  function showCountdown(target) {
    const cd = document.createElement("div");
    cd.id = "bc-countdown-root";
    cd.innerHTML = `
      <style>
        #bc-countdown-root{position:fixed;right:18px;bottom:18px;z-index:2147483646;
          pointer-events:none;font-family:Arial,Helvetica,sans-serif;text-align:right;
          animation:bcCdFade 1s ease}
        #bc-countdown-root .bc-cd-label{font-size:13px;font-weight:700;letter-spacing:.5px;
          color:rgba(91,33,182,.55);text-shadow:0 1px 2px rgba(255,255,255,.8);margin-bottom:2px}
        #bc-countdown-root .bc-cd-time{font-size:clamp(28px,4vw,54px);font-weight:900;
          color:rgba(91,33,182,.28);letter-spacing:2px;text-shadow:0 2px 10px rgba(255,255,255,.6);
          font-variant-numeric:tabular-nums}
        @keyframes bcCdFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @media (max-width:600px){#bc-countdown-root{right:10px;bottom:10px}
          #bc-countdown-root .bc-cd-label{font-size:10px}}
      </style>
      <div class="bc-cd-label">${CONFIG.countdownLabel}</div>
      <div class="bc-cd-time">00:00:00</div>
    `;
    document.body.appendChild(cd);
    const timeEl = cd.querySelector(".bc-cd-time");

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        cd.remove();
        startCelebration();
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      timeEl.textContent =
        String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ========================================================================
     PHASE 2 — Full celebration burst (runs once the countdown hits zero)
     ======================================================================== */
  function startCelebration() {
    markCelebrated();
    runCelebration();
  }

  /* --------------------- Adaptive theme detection ---------------------- */
  function detectTheme() {
    if (CONFIG.theme !== "auto") return CONFIG.theme;
    try {
      const bodyBg = getComputedStyle(document.body).backgroundColor;
      const linkColor = getComputedStyle(
        document.querySelector("a") || document.body
      ).color;
      return { primary: linkColor || "#7c3aed", accent: "#d97706", bg: bodyBg };
    } catch {
      return { primary: "#7c3aed", accent: "#d97706" };
    }
  }
  /* ======================================================================
     Everything below only ever runs once startCelebration() is called —
     either immediately (if we're already past the target) or when the
     countdown above reaches zero.
     ====================================================================== */
  function runCelebration() {
  const theme = detectTheme();
  const PRIMARY = typeof theme === "string" ? "#7c3aed" : theme.primary;
  const ACCENT = typeof theme === "string" ? "#d97706" : theme.accent;

  /* ------------------------------ Root ---------------------------------- */
  const root = document.createElement("div");
  root.id = "bc-overlay-root";
  root.innerHTML = `
  <style>
    #bc-overlay-root{position:fixed;inset:0;z-index:2147483647;overflow:hidden;pointer-events:none;font-family:Arial,Helvetica,sans-serif}
    #bc-overlay-root *{box-sizing:border-box}
    .bc-welcome{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
      padding:20px;text-align:center;color:#35145f;overflow-y:auto;
      background:radial-gradient(circle at 50% 25%,rgba(255,255,255,.98),transparent 34%),
                 radial-gradient(circle at 10% 85%,rgba(216,180,254,.42),transparent 35%),
                 radial-gradient(circle at 90% 15%,rgba(125,211,252,.3),transparent 35%),
                 linear-gradient(135deg,#fff,#faf5ff,#f3e8ff,#eff6ff);
      transition:opacity .8s ease,visibility .8s ease}
    .bc-welcome.hidden{opacity:0;visibility:hidden;pointer-events:none}
    .bc-logo{width:110px;max-width:25vw;max-height:90px;object-fit:contain;margin:0 auto 10px;opacity:0;
      animation:bcFadeUp 1s ease forwards .05s;filter:drop-shadow(0 6px 15px rgba(53,20,95,.15))}
    .bc-company{font-size:clamp(11px,1.7vw,17px);font-weight:700;letter-spacing:1.8px;text-transform:uppercase;
      color:${PRIMARY};margin-bottom:8px;opacity:0;animation:bcFadeUp 1s ease forwards .2s}
    .bc-cake{font-size:clamp(52px,7vw,90px);margin-bottom:2px;cursor:pointer;
      animation:bcCakeBounce 1.4s ease-in-out infinite alternate,bcFadeUp 1s ease forwards}
    .bc-title{font-size:clamp(32px,6vw,70px);font-weight:950;margin:5px 0;letter-spacing:1.5px;
      background:linear-gradient(90deg,${PRIMARY},#7c3aed,${ACCENT},#7c3aed,${PRIMARY});
      background-size:400%;-webkit-background-clip:text;background-clip:text;color:transparent;
      animation:bcGradient 5s linear infinite,bcTitlePop 1s ease forwards .4s}
    .bc-name{font-size:clamp(27px,4vw,52px);font-weight:900;margin:5px 0 12px;color:${PRIMARY};
      animation:bcNameGlow 2.5s ease-in-out infinite alternate,bcFadeUp 1s ease forwards .7s}
    .bc-message{max-width:800px;font-size:clamp(15px,2vw,22px);line-height:1.4;color:#3f3154;opacity:0;
      animation:bcFadeUp 1.2s ease forwards 1s}
    .bc-message strong{color:${PRIMARY}}
    .bc-wish-line{max-width:900px;margin-top:14px;font-size:clamp(12px,1.7vw,18px);line-height:1.8;
      color:${PRIMARY};font-weight:600;opacity:0;animation:bcFadeUp 1.2s ease forwards 1.3s}
    .bc-hint{margin-top:16px;padding:8px 18px;border-radius:999px;background:rgba(124,58,237,.1);
      border:1px dashed rgba(124,58,237,.4);color:${PRIMARY};font-weight:700;font-size:clamp(12px,1.6vw,16px);
      opacity:0;animation:bcFadeUp 1.2s ease forwards 1.6s,bcHintPulse 1.6s ease-in-out infinite 2.8s}
    @keyframes bcHintPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
    .bc-close{position:absolute;top:20px;right:22px;width:46px;height:46px;display:flex;align-items:center;
      justify-content:center;border-radius:50%;border:1px solid rgba(91,33,182,.2);background:rgba(255,255,255,.82);
      color:${PRIMARY};font-size:27px;cursor:pointer;pointer-events:auto;box-shadow:0 5px 20px rgba(91,33,182,.12);
      backdrop-filter:blur(10px);transition:transform .3s ease,background .3s ease}
    .bc-close:hover{transform:rotate(90deg) scale(1.1);background:#fff}
    .bc-mute{position:absolute;top:20px;left:22px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;
      border-radius:50%;border:1px solid rgba(91,33,182,.2);background:rgba(255,255,255,.82);cursor:pointer;
      pointer-events:auto;font-size:18px}
    .bc-rain{position:absolute;inset:0;overflow:hidden;pointer-events:none}
    .bc-canvas{position:absolute;inset:0;pointer-events:none}
    .bc-wish{position:absolute;top:-80px;white-space:nowrap;font-size:17px;font-weight:700;color:#4c1d95;
      text-shadow:0 1px 2px rgba(255,255,255,.98),0 2px 6px rgba(76,29,149,.16);animation:bcRain linear forwards}
    .bc-balloon{position:absolute;bottom:-150px;font-size:60px;animation:bcBalloon linear forwards;cursor:pointer;
      pointer-events:auto;filter:drop-shadow(0 5px 7px rgba(0,0,0,.18))}
    .bc-confetti{position:absolute;top:-30px;width:8px;height:15px;border-radius:2px;animation:bcConfetti linear forwards}
    .bc-heart,.bc-star{position:absolute;bottom:-40px;font-size:26px;animation:bcFloatUp linear forwards;pointer-events:none}
    @keyframes bcFadeUp{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bcTitlePop{from{transform:scale(.75)}to{transform:scale(1)}}
    @keyframes bcCakeBounce{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-12px) rotate(2deg)}}
    @keyframes bcGradient{to{background-position:400%}}
    @keyframes bcNameGlow{from{text-shadow:0 2px 8px rgba(109,40,217,.15)}to{text-shadow:0 3px 15px rgba(109,40,217,.35),0 0 30px rgba(245,158,11,.18)}}
    @keyframes bcRain{0%{transform:translateY(0) rotate(-5deg);opacity:0}10%{opacity:.88}85%{opacity:.82}100%{transform:translateY(115vh) rotate(5deg);opacity:0}}
    @keyframes bcBalloon{0%{transform:translateY(0) translateX(0) rotate(-8deg);opacity:0}10%{opacity:.8}50%{transform:translateY(-60vh) translateX(40px) rotate(8deg)}100%{transform:translateY(-125vh) translateX(-30px) rotate(-8deg);opacity:0}}
    @keyframes bcConfetti{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(115vh) rotate(720deg);opacity:0}}
    @keyframes bcFloatUp{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1}100%{transform:translateY(-110vh) scale(1.3);opacity:0}}
    @keyframes bcPop{0%{transform:scale(1)}50%{transform:scale(1.6)}100%{transform:scale(0);opacity:0}}
    @media (max-width:600px){.bc-title{font-size:35px}.bc-name{font-size:28px}.bc-message{font-size:15px}}
    @media (prefers-reduced-motion:reduce){.bc-welcome *,.bc-rain *{animation-duration:.01ms!important;animation-iteration-count:1!important}}
  </style>

  <div class="bc-welcome">
    <button class="bc-mute" aria-label="Toggle sound">${CONFIG.playSound ? "🔊" : "🔇"}</button>
    <button class="bc-close" aria-label="Close">×</button>
    ${CONFIG.logoUrl ? `<img class="bc-logo" src="${CONFIG.logoUrl}" alt="logo">` : ""}
    <div class="bc-company">${CONFIG.company}</div>
    <div class="bc-cake" title="Click to blow out the candle!">🎂</div>
    <div class="bc-title">🎉 HAPPY BIRTHDAY 🎉</div>
    <div class="bc-name">${CONFIG.name} ❤️</div>
    <div class="bc-message">${CONFIG.message}</div>
    <div class="bc-wish-line">${CONFIG.footerTags.join(" &nbsp;•&nbsp; ")}</div>
    <div class="bc-hint">🎈 Psst… tap the floating balloons to pop them! 🎉</div>
  </div>
  <div class="bc-rain"></div>
  <canvas class="bc-canvas"></canvas>
  `;
  document.body.appendChild(root);

  const welcome = root.querySelector(".bc-welcome");
  const rain = root.querySelector(".bc-rain");
  const canvas = root.querySelector(".bc-canvas");
  const ctx = canvas.getContext("2d");
  let soundOn = CONFIG.playSound;

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  /* --------------------------- Web Audio chime -------------------------- */
  function playChime() {
    if (!soundOn) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctxA = new AC();
      const notes = [523.25, 587.33, 523.25, 698.46, 659.25]; // simple happy jingle
      notes.forEach((freq, i) => {
        const osc = ctxA.createOscillator();
        const gain = ctxA.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctxA.destination);
        const start = ctxA.currentTime + i * 0.22;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
        osc.start(start);
        osc.stop(start + 0.22);
      });
    } catch {}
  }

  /* ------------------------------ Wishes --------------------------------- */
  const wishes = [
    `🎉 Happy Birthday ${CONFIG.name}!`, "🎂 Wishing you endless happiness!",
    "🌟 Wishing you greater success!", "🚀 Keep inspiring us!",
    "❤️ Wishing you good health!", "🏆 More achievements ahead!",
    "🥳 Have an amazing year!", "✨ Keep shining!",
    "🎈 Cheers to another fantastic year!", "💫 May all your dreams come true!"
  ];

  function createWish() {
    const el = document.createElement("div");
    el.className = "bc-wish";
    el.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    el.style.left = Math.random() * 92 + "%";
    el.style.fontSize = 14 + Math.random() * 9 + "px";
    el.style.animationDuration = 7 + Math.random() * 7 + "s";
    rain.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }

  function createBalloon() {
    const el = document.createElement("div");
    el.className = "bc-balloon";
    el.textContent = "🎈";
    el.style.left = Math.random() * 95 + "%";
    el.style.fontSize = 45 + Math.random() * 40 + "px";
    el.style.animationDuration = 9 + Math.random() * 8 + "s";
    // pop on click, releasing a burst
    el.addEventListener("click", () => {
      el.style.animation = "bcPop .3s ease forwards";
      for (let i = 0; i < 12; i++) createConfettiAt(el.getBoundingClientRect());
      setTimeout(() => el.remove(), 300);
    });
    rain.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  }

  const colors = ["#7c3aed", "#8b5cf6", ACCENT, "#f59e0b", "#ec4899", "#06b6d4", "#10b981"];

  function createConfetti() {
    const el = document.createElement("div");
    el.className = "bc-confetti";
    el.style.left = Math.random() * 100 + "%";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = 5 + Math.random() * 6 + "s";
    rain.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }

  function createConfettiAt(rect) {
    const el = document.createElement("div");
    el.className = "bc-confetti";
    el.style.left = ((rect.left + rect.width / 2) / innerWidth) * 100 + "%";
    el.style.top = rect.top + "px";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = 2 + Math.random() * 2 + "s";
    rain.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  function createFloatEmoji(kind) {
    const el = document.createElement("div");
    el.className = kind === "heart" ? "bc-heart" : "bc-star";
    el.textContent = kind === "heart" ? "💜" : ["✨", "⭐", "💫"][Math.floor(Math.random() * 3)];
    el.style.left = Math.random() * 100 + "%";
    el.style.animationDuration = 4 + Math.random() * 4 + "s";
    rain.appendChild(el);
    setTimeout(() => el.remove(), 9000);
  }

  /* ---------------------------- Fireworks (canvas) ------------------------ */
  let particles = [];
  function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 2 + Math.random() * 3;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 60 + Math.random() * 30, color
      });
    }
  }
  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life--;
      ctx.globalAlpha = Math.max(p.life / 90, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateFireworks);
  }
  animateFireworks();

  /* --------------------------- Opening burst ------------------------------ */
  for (let i = 0; i < 120; i++) setTimeout(createConfetti, i * 12);
  for (let i = 0; i < 18; i++) setTimeout(createBalloon, i * 180);
  for (let i = 0; i < 35; i++) setTimeout(createWish, i * 100);
  for (let i = 0; i < 10; i++) setTimeout(() => launchFirework(), i * 500);
  playChime();

  /* --------------------------- Continuous loop ---------------------------- */
  const effectPool = CONFIG.effects.length ? CONFIG.effects : ["confetti"];
  const timers = [
    setInterval(createWish, 700),
    setInterval(createBalloon, 1700),
    setInterval(createConfetti, 400),
    setInterval(() => {
      const fx = effectPool[Math.floor(Math.random() * effectPool.length)];
      if (fx === "fireworks") launchFirework();
      if (fx === "hearts") createFloatEmoji("heart");
      if (fx === "stars") createFloatEmoji("star");
    }, 900)
  ];

  /* ------------------------------ Interactions ----------------------------- */
  root.querySelector(".bc-cake").addEventListener("click", (e) => {
    e.target.textContent = "🕯️💨";
    for (let i = 0; i < 20; i++) createConfettiAt(e.target.getBoundingClientRect());
    setTimeout(() => (e.target.textContent = "🎂"), 1500);
  });

  root.querySelector(".bc-mute").addEventListener("click", (e) => {
    soundOn = !soundOn;
    e.target.textContent = soundOn ? "🔊" : "🔇";
  });

  root.querySelector(".bc-close").addEventListener("click", () => {
    welcome.classList.add("hidden");
  });

  if (CONFIG.autoCloseAfterMs > 0) {
    setTimeout(() => welcome.classList.add("hidden"), CONFIG.autoCloseAfterMs);
  }

  /* Optional cleanup helper, exposed globally so it can be stopped manually
     from console: window.stopBirthdayCelebration() */
  window.stopBirthdayCelebration = () => {
    timers.forEach(clearInterval);
    root.remove();
    delete window.stopBirthdayCelebration;
  };
  } // end runCelebration()
})();
