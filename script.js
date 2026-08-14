(() => {
    if (document.getElementById("ardon-birthday-celebration")) return;

    const overlay = document.createElement("div");
    overlay.id = "ardon-birthday-celebration";

    overlay.innerHTML = `
    <style>
        #ardon-birthday-celebration {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    overflow: hidden;
    pointer-events: none;
    font-family: Arial, Helvetica, sans-serif;
}

#ardon-birthday-celebration * {
    box-sizing: border-box;
}

/* =========================================================
   FULL SCREEN WELCOME
========================================================= */

.ab-welcome {
    position: absolute;
    inset: 0;
    z-index: 1000;

    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 20px;

    text-align: center;

    color: #35145f;

    background:
        radial-gradient(
            circle at 50% 25%,
            rgba(255,255,255,.98),
            transparent 34%
        ),
        radial-gradient(
            circle at 10% 85%,
            rgba(216,180,254,.42),
            transparent 35%
        ),
        radial-gradient(
            circle at 90% 15%,
            rgba(125,211,252,.30),
            transparent 35%
        ),
        linear-gradient(
            135deg,
            #ffffff,
            #faf5ff,
            #f3e8ff,
            #eff6ff
        );

    overflow-y: auto;
    overflow-x: hidden;

    transition:
        opacity .8s ease,
        visibility .8s ease;
}

.ab-welcome.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

/* =========================================================
   BACKGROUND GLOW
========================================================= */

.ab-welcome::before {
    content: "";

    position: absolute;

    width: min(550px, 80vw);
    height: min(550px, 80vw);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(124,58,237,.10),
            transparent 68%
        );

    animation:
        abAmbientGlow 5s ease-in-out infinite alternate;

    pointer-events: none;
}

/* =========================================================
   CONTENT
========================================================= */

.ab-company,
.ab-logo,
.ab-cake,
.ab-title,
.ab-name,
.ab-message,
.ab-wish-line {
    position: relative;
    z-index: 2;
}

/* =========================================================
   LOGO
========================================================= */

.ab-logo {
    display: block;

    width: 120px;
    height: auto;

    max-width: 25vw;
    max-height: 95px;

    object-fit: contain;

    margin: 0 auto 10px;

    filter:
        drop-shadow(
            0 6px 15px rgba(53,20,95,.15)
        );

    opacity: 0;

    animation:
        abFadeUp 1s ease forwards .05s;
}

/* =========================================================
   COMPANY NAME
========================================================= */

.ab-company {
    font-size: clamp(11px, 1.7vw, 17px);

    font-weight: 700;

    letter-spacing: 1.8px;

    text-transform: uppercase;

    color: #5b21b6;

    margin-bottom: 8px;

    opacity: 0;

    animation:
        abFadeUp 1s ease forwards .2s;
}

/* =========================================================
   CAKE
========================================================= */

.ab-cake {
    font-size: clamp(52px, 7vw, 90px);

    line-height: 1;

    margin-bottom: 2px;

    filter:
        drop-shadow(
            0 8px 15px rgba(109,40,217,.18)
        );

    animation:
        abCakeBounce 1.4s ease-in-out infinite alternate,
        abFadeUp 1s ease forwards;
}

/* =========================================================
   TITLE
========================================================= */

.ab-title {
    font-size: clamp(32px, 6vw, 70px);

    font-weight: 950;

    line-height: 1.05;

    margin: 5px 0;

    letter-spacing: 1.5px;

    background:
        linear-gradient(
            90deg,
            #5b21b6,
            #7c3aed,
            #d97706,
            #7c3aed,
            #5b21b6
        );

    background-size: 400%;

    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;

    animation:
        abGradient 5s linear infinite,
        abTitlePop 1s ease forwards .4s;
}

/* =========================================================
   ROLAND SIR
========================================================= */

.ab-name {
    font-size: clamp(27px, 4vw, 52px);

    font-weight: 900;

    line-height: 1.1;

    margin: 5px 0 12px;

    color: #6d28d9;

    animation:
        abNameGlow 2.5s ease-in-out infinite alternate,
        abFadeUp 1s ease forwards .7s;
}

/* =========================================================
   MESSAGE
========================================================= */

.ab-message {
    max-width: 800px;

    font-size: clamp(15px, 2vw, 22px);

    line-height: 1.4;

    color: #3f3154;

    opacity: 0;

    animation:
        abFadeUp 1.2s ease forwards 1s;
}

.ab-message strong {
    color: #6d28d9;
}

/* =========================================================
   BOTTOM WISH LINE
========================================================= */

.ab-wish-line {
    max-width: 900px;

    margin-top: 14px;

    font-size: clamp(12px, 1.7vw, 18px);

    line-height: 1.8;

    color: #5b21b6;

    font-weight: 600;

    opacity: 0;

    animation:
        abFadeUp 1.2s ease forwards 1.3s;
}

/* =========================================================
   CLOSE BUTTON
========================================================= */

.ab-close {
    position: absolute;

    top: 20px;
    right: 22px;

    z-index: 2000;

    width: 46px;
    height: 46px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    border: 1px solid rgba(91,33,182,.20);

    background:
        rgba(255,255,255,.82);

    color: #5b21b6;

    font-size: 27px;

    line-height: 1;

    cursor: pointer;

    pointer-events: auto;

    box-shadow:
        0 5px 20px rgba(91,33,182,.12);

    backdrop-filter: blur(10px);

    transition:
        transform .3s ease,
        background .3s ease,
        box-shadow .3s ease;
}

.ab-close:hover {
    transform:
        rotate(90deg)
        scale(1.1);

    background:
        #ffffff;

    box-shadow:
        0 8px 25px rgba(91,33,182,.22);
}

/* =========================================================
   TRANSPARENT RAIN LAYER
========================================================= */

.ab-rain {
    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;

    pointer-events: none;
}

/* =========================================================
   WISH RAIN
========================================================= */

.ab-wish {
    position: absolute;

    top: -80px;

    white-space: nowrap;

    font-size: 17px;

    font-weight: 700;

    color: #4c1d95;

    text-shadow:
        0 1px 2px rgba(255,255,255,.98),
        0 2px 6px rgba(76,29,149,.16);

    animation:
        abRain linear forwards;

    user-select: none;

    pointer-events: none;
}

/* =========================================================
   BALLOONS
========================================================= */

.ab-balloon {
    position: absolute;

    bottom: -150px;

    font-size: 60px;

    animation:
        abBalloon linear forwards;

    user-select: none;

    pointer-events: none;

    filter:
        drop-shadow(
            0 5px 7px rgba(0,0,0,.18)
        );
}

/* =========================================================
   CONFETTI
========================================================= */

.ab-confetti {
    position: absolute;

    top: -30px;

    width: 8px;
    height: 15px;

    border-radius: 2px;

    animation:
        abConfetti linear forwards;

    pointer-events: none;
}

/* =========================================================
   SPARKLES
========================================================= */

.ab-spark {
    position: absolute;

    font-size: 23px;

    animation:
        abSpark 2s ease-in-out infinite;

    user-select: none;

    pointer-events: none;
}

/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes abFadeUp {

    from {
        opacity: 0;
        transform: translateY(25px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes abTitlePop {

    from {
        transform: scale(.75);
    }

    to {
        transform: scale(1);
    }
}

@keyframes abCakeBounce {

    from {
        transform:
            translateY(0)
            rotate(-2deg);
    }

    to {
        transform:
            translateY(-12px)
            rotate(2deg);
    }
}

@keyframes abGradient {

    to {
        background-position: 400%;
    }
}

@keyframes abNameGlow {

    from {
        text-shadow:
            0 2px 8px rgba(109,40,217,.15);
    }

    to {
        text-shadow:
            0 3px 15px rgba(109,40,217,.35),
            0 0 30px rgba(245,158,11,.18);
    }
}

@keyframes abAmbientGlow {

    from {
        transform: scale(.85);
        opacity: .6;
    }

    to {
        transform: scale(1.15);
        opacity: 1;
    }
}

@keyframes abRain {

    0% {
        transform:
            translateY(0)
            rotate(-5deg);

        opacity: 0;
    }

    10% {
        opacity: .88;
    }

    85% {
        opacity: .82;
    }

    100% {
        transform:
            translateY(115vh)
            rotate(5deg);

        opacity: 0;
    }
}

@keyframes abBalloon {

    0% {
        transform:
            translateY(0)
            translateX(0)
            rotate(-8deg);

        opacity: 0;
    }

    10% {
        opacity: .8;
    }

    50% {
        transform:
            translateY(-60vh)
            translateX(40px)
            rotate(8deg);
    }

    100% {
        transform:
            translateY(-125vh)
            translateX(-30px)
            rotate(-8deg);

        opacity: 0;
    }
}

@keyframes abConfetti {

    0% {
        transform:
            translateY(0)
            rotate(0deg);

        opacity: 1;
    }

    100% {
        transform:
            translateY(115vh)
            rotate(720deg);

        opacity: 0;
    }
}

@keyframes abSpark {

    0%,
    100% {
        transform: scale(.5);
        opacity: .15;
    }

    50% {
        transform: scale(1.4);
        opacity: .8;
    }
}

/* =========================================================
   TABLETS
========================================================= */

@media (max-width: 900px) {

    .ab-logo {
        width: 105px;
        max-height: 85px;
    }

    .ab-company {
        font-size: 13px;
    }

    .ab-message {
        max-width: 700px;
    }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

    .ab-welcome {
        justify-content: flex-start;

        padding:
            65px
            18px
            25px;
    }

    .ab-logo {
        width: 95px;
        max-width: 30vw;
        max-height: 75px;

        margin-bottom: 6px;
    }

    .ab-company {
        font-size: 10px;

        letter-spacing: 1px;

        margin-bottom: 5px;
    }

    .ab-cake {
        font-size: 55px;
    }

    .ab-title {
        font-size: 35px;

        letter-spacing: 1px;
    }

    .ab-name {
        font-size: 31px;

        margin-bottom: 12px;
    }

    .ab-message {
        font-size: 15px;

        line-height: 1.45;

        max-width: 95%;
    }

    .ab-wish-line {
        font-size: 12px;

        line-height: 1.8;

        margin-top: 10px;
    }

    .ab-close {
        top: 14px;
        right: 14px;

        width: 43px;
        height: 43px;

        font-size: 24px;
    }

    .ab-wish {
        font-size: 14px;
    }

    .ab-balloon {
        font-size: 45px;
    }
}

/* =========================================================
   SMALL HEIGHT LAPTOPS
========================================================= */

@media (max-height: 700px) and (min-width: 601px) {

    .ab-welcome {
        justify-content: flex-start;

        padding-top: 12px;
        padding-bottom: 15px;
    }

    .ab-logo {
        width: 80px;
        max-height: 60px;

        margin-bottom: 3px;
    }

    .ab-company {
        font-size: 11px;

        margin-bottom: 3px;
    }

    .ab-cake {
        font-size: 45px;
    }

    .ab-title {
        font-size: 35px;

        margin: 2px 0;
    }

    .ab-name {
        font-size: 30px;

        margin: 3px 0 8px;
    }

    .ab-message {
        font-size: 14px;

        line-height: 1.3;

        max-width: 700px;
    }

    .ab-wish-line {
        font-size: 12px;

        margin-top: 6px;
    }
}

/* =========================================================
   VERY SMALL HEIGHT SCREENS
========================================================= */

@media (max-height: 580px) {

    .ab-welcome {
        justify-content: flex-start;

        padding-top: 8px;
        padding-bottom: 8px;
    }

    .ab-logo {
        width: 65px;
        max-height: 48px;
    }

    .ab-company {
        font-size: 9px;
    }

    .ab-cake {
        font-size: 38px;
    }

    .ab-title {
        font-size: 28px;
    }

    .ab-name {
        font-size: 25px;
    }

    .ab-message {
        font-size: 12px;

        max-width: 650px;
    }

    .ab-wish-line {
        font-size: 10px;
    }
}

/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

    .ab-welcome *,
    .ab-rain * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
    }
}
    </style>

    <!-- ============================================
         FULL SCREEN BIRTHDAY SURPRISE
    ============================================= -->

    <div class="ab-welcome">

        <button
            class="ab-close"
            aria-label="Close birthday celebration">
            ×
        </button>

        <div class="ab-company">
            Ardon Technology Services Private Limited
        </div>

        <div class="ab-cake">
            🎂
        </div>

        <div class="ab-title">
            🎉 HAPPY BIRTHDAY 🎉
        </div>

        <div class="ab-name">
            Roland Sir ❤️
        </div>

        <div class="ab-message">

            Wishing you a wonderful birthday filled with
            <strong>
                happiness, success, good health
            </strong>
            and countless memorable moments! ✨

            <br><br>

            Thank you for inspiring and leading us.
            🙏

        </div>

        <div class="ab-wish-line">

            🎈 More Success
            &nbsp; • &nbsp;

            🌟 More Achievements
            &nbsp; • &nbsp;

            ❤️ Happiness
            &nbsp; • &nbsp;

            🚀 Bigger Dreams

        </div>

    </div>

    <!-- ============================================
         TRANSPARENT ALL-DAY CELEBRATION
    ============================================= -->

    <div class="ab-rain"></div>
    `;

    document.body.appendChild(overlay);

    const welcome =
        overlay.querySelector(".ab-welcome");

    const rain =
        overlay.querySelector(".ab-rain");

    /* =====================================================
       WISHES
    ===================================================== */

    const wishes = [
        "🎉 Happy Birthday Roland Sir!",
        "🎂 Wishing you endless happiness!",
        "🌟 Wishing you greater success!",
        "🚀 Keep inspiring us!",
        "❤️ Wishing you good health!",
        "🏆 More achievements ahead!",
        "🥳 Have an amazing year!",
        "✨ Keep shining!",
        "🎈 Cheers to another fantastic year!",
        "💫 May all your dreams come true!",
        "🌈 Wishing you happiness always!",
        "👏 Thank you for inspiring us!",
        "🎁 Have a wonderful birthday!",
        "🔥 Here's to bigger achievements!",
        "👑 Happy Birthday, Roland Sir!",
        "💯 Wishing you an incredible year!",
        "🌟 Keep leading, keep inspiring!",
        "🎊 Have a fantastic birthday!",
        "❤️ Lots of happiness and success!",
        "🥂 Cheers to another amazing year!",
        "🚀 Wishing you many more milestones!",
        "🌟 May this year be your best one yet!",
        "🎉 Celebrate big today!",
        "💎 Wishing you continued success!",
        "🙏 Thank you for your leadership!",
        "🎂 Many happy returns of the day!",
        "🥳 Enjoy your special day!",
        "✨ Wishing you endless possibilities!",
        "🏅 More milestones to celebrate!",
        "❤️ Happiness today and always!",
        "🌟 Happy Birthday Roland Sir!",
        "🎈 Keep achieving great things!",
        "💜 Wishing you a truly memorable birthday!"
    ];

    /* =====================================================
       BALLOONS
    ===================================================== */

    const balloons = [
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈"
    ];

    /* =====================================================
       WISH
    ===================================================== */

    function createWish() {

        const el =
            document.createElement("div");

        el.className =
            "ab-wish";

        el.textContent =
            wishes[
                Math.floor(
                    Math.random() *
                    wishes.length
                )
            ];

        el.style.left =
            Math.random() * 92 + "%";

        el.style.fontSize =
            14 +
            Math.random() * 9 +
            "px";

        el.style.animationDuration =
            7 +
            Math.random() * 7 +
            "s";

        rain.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 15000);
    }

    /* =====================================================
       BALLOON
    ===================================================== */

    function createBalloon() {

        const el =
            document.createElement("div");

        el.className =
            "ab-balloon";

        el.textContent =
            balloons[
                Math.floor(
                    Math.random() *
                    balloons.length
                )
            ];

        el.style.left =
            Math.random() * 95 + "%";

        el.style.fontSize =
            45 +
            Math.random() * 40 +
            "px";

        el.style.animationDuration =
            9 +
            Math.random() * 8 +
            "s";

        rain.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 18000);
    }

    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti() {

        const el =
            document.createElement("div");

        el.className =
            "ab-confetti";

        const colors = [
            "#7c3aed",
            "#8b5cf6",
            "#d97706",
            "#f59e0b",
            "#ec4899",
            "#06b6d4",
            "#10b981"
        ];

        el.style.left =
            Math.random() * 100 + "%";

        el.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        el.style.animationDuration =
            5 +
            Math.random() * 6 +
            "s";

        el.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        rain.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 12000);
    }

    /* =====================================================
       SPARKLE
    ===================================================== */

    function createSpark() {

        const el =
            document.createElement("div");

        el.className =
            "ab-spark";

        el.textContent =
            ["✨", "⭐", "💫", "🌟"][
                Math.floor(
                    Math.random() * 4
                )
            ];

        el.style.left =
            Math.random() * 100 + "%";

        el.style.top =
            Math.random() * 100 + "%";

        rain.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 5000);
    }

    /* =====================================================
       BIG OPENING BURST
    ===================================================== */

    for (let i = 0; i < 120; i++) {
        setTimeout(
            createConfetti,
            i * 12
        );
    }

    for (let i = 0; i < 18; i++) {
        setTimeout(
            createBalloon,
            i * 180
        );
    }

    for (let i = 0; i < 35; i++) {
        setTimeout(
            createWish,
            i * 100
        );
    }

    for (let i = 0; i < 25; i++) {
        createSpark();
    }

    /* =====================================================
       CONTINUOUS CELEBRATION

       Runs continuously until the page is refreshed.
    ===================================================== */

    const wishTimer =
        setInterval(
            createWish,
            700
        );

    const balloonTimer =
        setInterval(
            createBalloon,
            1700
        );

    const confettiTimer =
        setInterval(
            createConfetti,
            400
        );

    const sparkTimer =
        setInterval(
            createSpark,
            1800
        );

    /* =====================================================
       CLOSE FULL SCREEN

       IMPORTANT:
       We intentionally DON'T remove the overlay.

       Only the welcome screen disappears.

       The rain continues over the real website.
    ===================================================== */

    overlay
        .querySelector(".ab-close")
        .addEventListener(
            "click",
            () => {

                welcome.classList.add("hidden");

            }
        );

})();
