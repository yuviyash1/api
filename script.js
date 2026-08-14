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

        /* =====================================================
           PREMIUM LIGHT OPENING SCREEN
        ===================================================== */

        .ab-welcome {
            position: absolute;
            inset: 0;
            z-index: 1000;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            padding: 30px;
            text-align: center;

            color: #35145f;

            background:
                radial-gradient(
                    circle at 50% 30%,
                    rgba(255,255,255,.98),
                    transparent 34%
                ),
                radial-gradient(
                    circle at 12% 85%,
                    rgba(216,180,254,.45),
                    transparent 35%
                ),
                radial-gradient(
                    circle at 88% 18%,
                    rgba(125,211,252,.32),
                    transparent 35%
                ),
                linear-gradient(
                    135deg,
                    #ffffff,
                    #faf5ff,
                    #f3e8ff,
                    #eff6ff
                );

            transition:
                opacity .8s ease,
                visibility .8s ease;
        }

        .ab-welcome.hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        /* =====================================================
           DECORATIVE GLOW
        ===================================================== */

        .ab-welcome::before {
            content: "";
            position: absolute;

            width: 550px;
            height: 550px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(124,58,237,.12),
                    transparent 68%
                );

            animation:
                abAmbientGlow 5s ease-in-out infinite alternate;

            pointer-events: none;
        }

        /* =====================================================
           COMPANY NAME
        ===================================================== */

        .ab-company {
            position: relative;
            z-index: 2;

            font-size: clamp(12px, 2vw, 18px);
            font-weight: 700;

            letter-spacing: 2px;
            text-transform: uppercase;

            color: #5b21b6;

            margin-bottom: 18px;

            opacity: 0;

            animation:
                abFadeUp 1s ease forwards .2s;
        }

        /* =====================================================
           CAKE
        ===================================================== */

        .ab-cake {
            position: relative;
            z-index: 2;

            font-size: clamp(70px, 10vw, 125px);

            margin-bottom: 5px;

            filter:
                drop-shadow(0 8px 15px rgba(109,40,217,.18))
                drop-shadow(0 0 25px rgba(245,158,11,.18));

            animation:
                abCakeBounce 1.4s ease-in-out infinite alternate,
                abFadeUp 1s ease forwards;
        }

        /* =====================================================
           MAIN TITLE
        ===================================================== */

        .ab-title {
            position: relative;
            z-index: 2;

            font-size: clamp(38px, 7vw, 85px);
            font-weight: 950;

            line-height: 1.05;

            margin: 10px 0;

            letter-spacing: 2px;

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

        /* =====================================================
           NAME
        ===================================================== */

        .ab-name {
            position: relative;
            z-index: 2;

            font-size: clamp(32px, 5vw, 65px);
            font-weight: 900;

            margin: 8px 0 22px;

            color: #6d28d9;

            animation:
                abNameGlow 2.5s ease-in-out infinite alternate,
                abFadeUp 1s ease forwards .7s;
        }

        /* =====================================================
           MESSAGE
        ===================================================== */

        .ab-message {
            position: relative;
            z-index: 2;

            max-width: 900px;

            font-size: clamp(17px, 2.4vw, 27px);
            line-height: 1.55;

            color: #3f3154;

            opacity: 0;

            animation:
                abFadeUp 1.2s ease forwards 1s;
        }

        .ab-message strong {
            color: #6d28d9;
        }

        /* =====================================================
           WISH LINE
        ===================================================== */

        .ab-wish-line {
            position: relative;
            z-index: 2;

            margin-top: 25px;

            font-size: clamp(14px, 2vw, 20px);

            color: #5b21b6;

            font-weight: 600;

            opacity: 0;

            animation:
                abFadeUp 1.2s ease forwards 1.3s;
        }

        /* =====================================================
           CLOSE BUTTON
        ===================================================== */

        .ab-close {
            position: absolute;

            top: 22px;
            right: 25px;

            width: 48px;
            height: 48px;

            border-radius: 50%;

            border: 1px solid rgba(91,33,182,.2);

            background:
                rgba(255,255,255,.75);

            color: #5b21b6;

            font-size: 28px;
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
                scale(1.12);

            background:
                #ffffff;

            box-shadow:
                0 8px 25px rgba(91,33,182,.22);
        }

        /* =====================================================
           RAIN LAYER
        ===================================================== */

        .ab-rain {
            position: absolute;
            inset: 0;

            overflow: hidden;

            pointer-events: none;
        }

        /* =====================================================
           WISH RAIN
        ===================================================== */

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
        }

        .ab-logo {
            position: relative;
            z-index: 2;
        
            width: 150px;
            max-width: 35vw;
            height: auto;
        
            margin-bottom: 18px;
        
            border-radius: 12px;
        
            filter:
                drop-shadow(0 8px 18px rgba(53,20,95,.15));
        
            opacity: 0;
        
            animation:
                abFadeUp 1s ease forwards .05s;
        }

        /* =====================================================
           BALLOONS
        ===================================================== */

        .ab-balloon {
            position: absolute;

            bottom: -150px;

            font-size: 60px;

            animation:
                abBalloon linear forwards;

            user-select: none;

            filter:
                drop-shadow(
                    0 5px 7px rgba(0,0,0,.18)
                );
        }

        /* =====================================================
           CONFETTI
        ===================================================== */

        .ab-confetti {
            position: absolute;

            top: -30px;

            width: 8px;
            height: 15px;

            border-radius: 2px;

            animation:
                abConfetti linear forwards;
        }

        /* =====================================================
           SPARKLES
        ===================================================== */

        .ab-spark {
            position: absolute;

            font-size: 23px;

            animation:
                abSpark 2s ease-in-out infinite;

            user-select: none;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

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
                    translateY(-15px)
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

            0%, 100% {
                transform: scale(.5);
                opacity: .15;
            }

            50% {
                transform: scale(1.4);
                opacity: .8;
            }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

            .ab-welcome {
                padding: 20px;
            }

            .ab-company {
                letter-spacing: 1px;
            }

            .ab-message {
                font-size: 16px;
            }

            .ab-wish-line {
                font-size: 13px;
                line-height: 1.8;
            }

            .ab-close {
                top: 15px;
                right: 15px;
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
        <img
            class="ab-logo"
            src="https://npa.ardon.in/img/npaardon.png"
            alt="Ardon by Roljobs"
        >

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
