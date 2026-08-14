/* ==========================================================================
   ARDON TECHNOLOGY SERVICES — UNIVERSAL BIRTHDAY CELEBRATION

   Behavior:
   - BEFORE celebrationDate:
       Shows countdown to 12:00 AM on that date.

   - ON celebrationDate at 12:00 AM:
       Full birthday celebration starts.

   - AFTER celebrationDate:
       Celebration starts immediately whenever the page is opened.

   - NO daily reset.
   - NO localStorage.
   - Celebration continues until you remove/change the script.
   - After closing the welcome screen, transparent celebration rain continues.
   ========================================================================== */

(() => {

    function initBirthdayCelebration() {

        /* ================================================================
           PREVENT DUPLICATE INJECTION
        ================================================================= */

        if (
            document.getElementById("bc-overlay-root") ||
            document.getElementById("bc-countdown-root")
        ) {
            return;
        }

        /* ================================================================
           CONFIGURATION
        ================================================================= */

        const CONFIG = {

            /* Birthday person */
            name: "Roland Sir",

            /* Company */
            company:
                "Ardon Technology Services Private Limited",

            /* Company logo */
            logoUrl:
                "https://npa.ardon.in/img/npaardon.png",

            /*
             * IMPORTANT:
             * Keep the date inside quotes.
             *
             * Example:
             * "2026-08-15"
             *
             * This means:
             * 15 August 2026, 12:00 AM
             */
            celebrationDate:
                "2026-08-15",

            /* Main birthday message */
            message:
                "Wishing you a wonderful birthday filled with " +
                "<strong>happiness, success, good health</strong> " +
                "and countless memorable moments! ✨" +
                "<br><br>" +
                "Thank you for inspiring and leading us. 🙏",

            /* Bottom tags */
            footerTags: [
                "🎈 More Success",
                "🌟 More Achievements",
                "❤️ Happiness",
                "🚀 Bigger Dreams"
            ],

            /*
             * Theme:
             *
             * "auto" = detect website accent color
             *
             * Or use:
             *
             * {
             *     primary: "#7c3aed",
             *     accent: "#d97706"
             * }
             */
            theme: "auto",

            /* Continuous effects */
            effects: [
                "confetti",
                "balloons",
                "fireworks",
                "hearts"
            ],

            /* Birthday sound */
            playSound: true,

            /*
             * 0 = never automatically close.
             *
             * Example:
             * 15000 = close welcome screen after 15 seconds.
             */
            autoCloseAfterMs: 0,

            /* Countdown label */
            countdownLabel:
                "🎂 Birthday celebration begins in"

        };


        /* ================================================================
           DATE LOGIC
        ================================================================= */

        function getTarget() {

            /*
             * Fixed birthday date.
             *
             * Example:
             * 2026-08-15 00:00:00
             */
            if (CONFIG.celebrationDate) {

                return new Date(
                    CONFIG.celebrationDate +
                    "T00:00:00"
                );

            }

            /*
             * If you ever set celebrationDate to null,
             * it will target the NEXT midnight.
             *
             * This is NOT used for the current birthday setup.
             */
            const t = new Date();

            t.setHours(
                24,
                0,
                0,
                0
            );

            return t;
        }


        const now = new Date();

        const target =
            getTarget();


        /* ================================================================
           BEFORE DATE = COUNTDOWN
           ON/AFTER DATE = CELEBRATION FOREVER
        ================================================================= */

        if (now < target) {

            showCountdown(target);

        } else {

            startCelebration();

        }


        /* ================================================================
           COUNTDOWN
        ================================================================= */

        function showCountdown(targetDate) {

            /*
             * Prevent duplicate countdown.
             */
            if (
                document.getElementById(
                    "bc-countdown-root"
                )
            ) {
                return;
            }


            const countdown =
                document.createElement("div");

            countdown.id =
                "bc-countdown-root";


            countdown.innerHTML = `

                <style>

                    #bc-countdown-root {

                        position: fixed;

                        right: 18px;
                        bottom: 18px;

                        z-index: 2147483646;

                        pointer-events: none;

                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;

                        text-align: right;

                        animation:
                            bcCdFade
                            1s ease;

                    }


                    #bc-countdown-root
                    .bc-cd-label {

                        font-size: 13px;

                        font-weight: 700;

                        letter-spacing: .5px;

                        color:
                            rgba(
                                91,
                                33,
                                182,
                                .65
                            );

                        text-shadow:
                            0 1px 2px
                            rgba(
                                255,
                                255,
                                255,
                                .9
                            );

                        margin-bottom: 2px;

                    }


                    #bc-countdown-root
                    .bc-cd-time {

                        font-size:
                            clamp(
                                28px,
                                4vw,
                                54px
                            );

                        font-weight: 900;

                        color:
                            rgba(
                                91,
                                33,
                                182,
                                .35
                            );

                        letter-spacing: 2px;

                        text-shadow:
                            0 2px 10px
                            rgba(
                                255,
                                255,
                                255,
                                .8
                            );

                        font-variant-numeric:
                            tabular-nums;

                    }


                    @keyframes bcCdFade {

                        from {

                            opacity: 0;

                            transform:
                                translateY(10px);

                        }

                        to {

                            opacity: 1;

                            transform:
                                translateY(0);

                        }

                    }


                    @media(max-width:600px) {

                        #bc-countdown-root {

                            right: 10px;

                            bottom: 10px;

                        }

                        #bc-countdown-root
                        .bc-cd-label {

                            font-size: 10px;

                        }

                    }

                </style>


                <div class="bc-cd-label">
                    ${CONFIG.countdownLabel}
                </div>

                <div class="bc-cd-time">
                    00:00:00
                </div>

            `;


            document.body.appendChild(
                countdown
            );


            const timeElement =
                countdown.querySelector(
                    ".bc-cd-time"
                );


            function tick() {

                const difference =
                    targetDate -
                    new Date();


                /*
                 * Countdown finished.
                 */
                if (difference <= 0) {

                    clearInterval(timer);

                    countdown.remove();

                    startCelebration();

                    return;

                }


                const hours =
                    Math.floor(
                        difference /
                        3600000
                    );


                const minutes =
                    Math.floor(
                        (
                            difference %
                            3600000
                        ) /
                        60000
                    );


                const seconds =
                    Math.floor(
                        (
                            difference %
                            60000
                        ) /
                        1000
                    );


                timeElement.textContent =

                    String(hours)
                        .padStart(2, "0")

                    + ":" +

                    String(minutes)
                        .padStart(2, "0")

                    + ":" +

                    String(seconds)
                        .padStart(2, "0");

            }


            tick();


            const timer =
                setInterval(
                    tick,
                    1000
                );

        }


        /* ================================================================
           START CELEBRATION
        ================================================================= */

        function startCelebration() {

            /*
             * No date reset.
             *
             * Once the date is reached,
             * celebration always starts.
             */

            runCelebration();

        }


        /* ================================================================
           THEME DETECTION
        ================================================================= */

        function detectTheme() {

            if (
                CONFIG.theme !==
                "auto"
            ) {

                return CONFIG.theme;

            }


            try {

                const bodyBackground =
                    getComputedStyle(
                        document.body
                    ).backgroundColor;


                const link =
                    document.querySelector(
                        "a"
                    );


                const linkColor =
                    getComputedStyle(
                        link ||
                        document.body
                    ).color;


                /*
                 * For white/light company pages,
                 * purple/gold remains readable.
                 */

                return {

                    primary:
                        linkColor ||
                        "#7c3aed",

                    accent:
                        "#d97706",

                    bg:
                        bodyBackground

                };

            } catch {

                return {

                    primary:
                        "#7c3aed",

                    accent:
                        "#d97706"

                };

            }

        }


        /* ================================================================
           RUN CELEBRATION
        ================================================================= */

        function runCelebration() {


            /*
             * Prevent duplicate celebration.
             */

            if (
                document.getElementById(
                    "bc-overlay-root"
                )
            ) {

                return;

            }


            const theme =
                detectTheme();


            const PRIMARY =
                typeof theme === "string"
                    ? "#7c3aed"
                    : theme.primary;


            const ACCENT =
                typeof theme === "string"
                    ? "#d97706"
                    : theme.accent;


            /* ============================================================
               ROOT
            ============================================================ */

            const root =
                document.createElement(
                    "div"
                );


            root.id =
                "bc-overlay-root";


            root.innerHTML = `

<style>

/* =========================================================
   ROOT
========================================================= */

#bc-overlay-root {

    position: fixed;

    inset: 0;

    z-index: 2147483647;

    overflow: hidden;

    pointer-events: none;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

}

#bc-overlay-root * {

    box-sizing:
        border-box;

}


/* =========================================================
   WELCOME SCREEN
========================================================= */

.bc-welcome {

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

    color:
        #35145f;

    background:

        radial-gradient(
            circle at 50% 25%,
            rgba(
                255,
                255,
                255,
                .98
            ),
            transparent 34%
        ),

        radial-gradient(
            circle at 10% 85%,
            rgba(
                216,
                180,
                254,
                .42
            ),
            transparent 35%
        ),

        radial-gradient(
            circle at 90% 15%,
            rgba(
                125,
                211,
                252,
                .30
            ),
            transparent 35%
        ),

        linear-gradient(
            135deg,
            #ffffff,
            #faf5ff,
            #f3e8ff,
            #eff6ff
        );

    overflow-y:
        auto;

    overflow-x:
        hidden;

    transition:

        opacity .8s ease,

        visibility .8s ease;

}


/* =========================================================
   HIDDEN WELCOME
========================================================= */

.bc-welcome.hidden {

    opacity: 0;

    visibility:
        hidden;

    pointer-events:
        none;

}


/* =========================================================
   LOGO
========================================================= */

.bc-logo {

    display:
        block;

    width:
        110px;

    max-width:
        25vw;

    max-height:
        90px;

    height:
        auto;

    object-fit:
        contain;

    margin:
        0 auto 10px;

    opacity:
        0;

    filter:
        drop-shadow(
            0 6px 15px
            rgba(
                53,
                20,
                95,
                .15
            )
        );

    animation:
        bcFadeUp
        1s ease
        forwards .05s;

}


/* =========================================================
   COMPANY
========================================================= */

.bc-company {

    font-size:
        clamp(
            11px,
            1.7vw,
            17px
        );

    font-weight:
        700;

    letter-spacing:
        1.8px;

    text-transform:
        uppercase;

    color:
        ${PRIMARY};

    margin-bottom:
        8px;

    opacity:
        0;

    animation:
        bcFadeUp
        1s ease
        forwards .2s;

}


/* =========================================================
   CAKE
========================================================= */

.bc-cake {

    font-size:
        clamp(
            52px,
            7vw,
            90px
        );

    line-height:
        1;

    margin-bottom:
        2px;

    cursor:
        pointer;

    animation:

        bcCakeBounce
        1.4s ease-in-out
        infinite alternate,

        bcFadeUp
        1s ease
        forwards;

}


/* =========================================================
   TITLE
========================================================= */

.bc-title {

    font-size:
        clamp(
            32px,
            6vw,
            70px
        );

    font-weight:
        950;

    line-height:
        1.05;

    margin:
        5px 0;

    letter-spacing:
        1.5px;

    background:

        linear-gradient(
            90deg,
            ${PRIMARY},
            #7c3aed,
            ${ACCENT},
            #7c3aed,
            ${PRIMARY}
        );

    background-size:
        400%;

    -webkit-background-clip:
        text;

    background-clip:
        text;

    color:
        transparent;

    animation:

        bcGradient
        5s linear
        infinite,

        bcTitlePop
        1s ease
        forwards .4s;

}


/* =========================================================
   NAME
========================================================= */

.bc-name {

    font-size:
        clamp(
            27px,
            4vw,
            52px
        );

    font-weight:
        900;

    line-height:
        1.1;

    margin:
        5px 0 12px;

    color:
        ${PRIMARY};

    animation:

        bcNameGlow
        2.5s ease-in-out
        infinite alternate,

        bcFadeUp
        1s ease
        forwards .7s;

}


/* =========================================================
   MESSAGE
========================================================= */

.bc-message {

    max-width:
        800px;

    font-size:
        clamp(
            15px,
            2vw,
            22px
        );

    line-height:
        1.4;

    color:
        #3f3154;

    opacity:
        0;

    animation:
        bcFadeUp
        1.2s ease
        forwards 1s;

}

.bc-message strong {

    color:
        ${PRIMARY};

}


/* =========================================================
   FOOTER WISHES
========================================================= */

.bc-wish-line {

    max-width:
        900px;

    margin-top:
        14px;

    font-size:
        clamp(
            12px,
            1.7vw,
            18px
        );

    line-height:
        1.8;

    color:
        ${PRIMARY};

    font-weight:
        600;

    opacity:
        0;

    animation:
        bcFadeUp
        1.2s ease
        forwards 1.3s;

}


/* =========================================================
   HINT
========================================================= */

.bc-hint {

    margin-top:
        16px;

    padding:
        8px 18px;

    border-radius:
        999px;

    background:
        rgba(
            124,
            58,
            237,
            .10
        );

    border:
        1px dashed
        rgba(
            124,
            58,
            237,
            .40
        );

    color:
        ${PRIMARY};

    font-weight:
        700;

    font-size:
        clamp(
            12px,
            1.6vw,
            16px
        );

    opacity:
        0;

    animation:

        bcFadeUp
        1.2s ease
        forwards 1.6s,

        bcHintPulse
        1.6s ease-in-out
        infinite 2.8s;

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

.bc-close {

    position:
        absolute;

    top:
        20px;

    right:
        22px;

    width:
        46px;

    height:
        46px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    border-radius:
        50%;

    border:
        1px solid
        rgba(
            91,
            33,
            182,
            .20
        );

    background:
        rgba(
            255,
            255,
            255,
            .82
        );

    color:
        ${PRIMARY};

    font-size:
        27px;

    cursor:
        pointer;

    pointer-events:
        auto;

    box-shadow:
        0 5px 20px
        rgba(
            91,
            33,
            182,
            .12
        );

    backdrop-filter:
        blur(10px);

    transition:

        transform .3s ease,

        background .3s ease;

}

.bc-close:hover {

    transform:
        rotate(90deg)
        scale(1.1);

    background:
        #ffffff;

}


/* =========================================================
   SOUND BUTTON
========================================================= */

.bc-mute {

    position:
        absolute;

    top:
        20px;

    left:
        22px;

    width:
        40px;

    height:
        40px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    border-radius:
        50%;

    border:
        1px solid
        rgba(
            91,
            33,
            182,
            .20
        );

    background:
        rgba(
            255,
            255,
            255,
            .82
        );

    cursor:
        pointer;

    pointer-events:
        auto;

    font-size:
        18px;

}


/* =========================================================
   RAIN
========================================================= */

.bc-rain {

    position:
        absolute;

    inset:
        0;

    overflow:
        hidden;

    pointer-events:
        none;

}


/* =========================================================
   FIREWORK CANVAS
========================================================= */

.bc-canvas {

    position:
        absolute;

    inset:
        0;

    pointer-events:
        none;

}


/* =========================================================
   WISH
========================================================= */

.bc-wish {

    position:
        absolute;

    top:
        -80px;

    white-space:
        nowrap;

    font-size:
        17px;

    font-weight:
        700;

    color:
        #4c1d95;

    text-shadow:

        0 1px 2px
        rgba(
            255,
            255,
            255,
            .98
        ),

        0 2px 6px
        rgba(
            76,
            29,
            149,
            .16
        );

    animation:
        bcRain
        linear
        forwards;

    user-select:
        none;

    pointer-events:
        none;

}


/* =========================================================
   BALLOON
========================================================= */

.bc-balloon {

    position:
        absolute;

    bottom:
        -150px;

    font-size:
        60px;

    animation:
        bcBalloon
        linear
        forwards;

    cursor:
        pointer;

    pointer-events:
        auto;

    filter:
        drop-shadow(
            0 5px 7px
            rgba(
                0,
                0,
                0,
                .18
            )
        );

}


/* =========================================================
   CONFETTI
========================================================= */

.bc-confetti {

    position:
        absolute;

    top:
        -30px;

    width:
        8px;

    height:
        15px;

    border-radius:
        2px;

    animation:
        bcConfetti
        linear
        forwards;

    pointer-events:
        none;

}


/* =========================================================
   HEARTS / STARS
========================================================= */

.bc-heart,
.bc-star {

    position:
        absolute;

    bottom:
        -40px;

    font-size:
        26px;

    animation:
        bcFloatUp
        linear
        forwards;

    pointer-events:
        none;

}


/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes bcFadeUp {

    from {

        opacity:
            0;

        transform:
            translateY(25px);

    }

    to {

        opacity:
            1;

        transform:
            translateY(0);

    }

}


@keyframes bcTitlePop {

    from {

        transform:
            scale(.75);

    }

    to {

        transform:
            scale(1);

    }

}


@keyframes bcCakeBounce {

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


@keyframes bcGradient {

    to {

        background-position:
            400%;

    }

}


@keyframes bcNameGlow {

    from {

        text-shadow:
            0 2px 8px
            rgba(
                109,
                40,
                217,
                .15
            );

    }

    to {

        text-shadow:

            0 3px 15px
            rgba(
                109,
                40,
                217,
                .35
            ),

            0 0 30px
            rgba(
                245,
                158,
                11,
                .18
            );

    }

}


@keyframes bcHintPulse {

    0%,
    100% {

        transform:
            scale(1);

    }

    50% {

        transform:
            scale(1.05);

    }

}


@keyframes bcRain {

    0% {

        transform:
            translateY(0)
            rotate(-5deg);

        opacity:
            0;

    }

    10% {

        opacity:
            .88;

    }

    85% {

        opacity:
            .82;

    }

    100% {

        transform:
            translateY(115vh)
            rotate(5deg);

        opacity:
            0;

    }

}


@keyframes bcBalloon {

    0% {

        transform:
            translateY(0)
            translateX(0)
            rotate(-8deg);

        opacity:
            0;

    }

    10% {

        opacity:
            .8;

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

        opacity:
            0;

    }

}


@keyframes bcConfetti {

    0% {

        transform:
            translateY(0)
            rotate(0);

        opacity:
            1;

    }

    100% {

        transform:
            translateY(115vh)
            rotate(720deg);

        opacity:
            0;

    }

}


@keyframes bcFloatUp {

    0% {

        transform:
            translateY(0)
            scale(.6);

        opacity:
            0;

    }

    15% {

        opacity:
            1;

    }

    100% {

        transform:
            translateY(-110vh)
            scale(1.3);

        opacity:
            0;

    }

}


@keyframes bcPop {

    0% {

        transform:
            scale(1);

    }

    50% {

        transform:
            scale(1.6);

    }

    100% {

        transform:
            scale(0);

        opacity:
            0;

    }

}


/* =========================================================
   MOBILE
========================================================= */

@media(max-width:600px) {

    .bc-welcome {

        justify-content:
            flex-start;

        padding:
            65px
            18px
            25px;

    }


    .bc-logo {

        width:
            95px;

        max-width:
            30vw;

        max-height:
            75px;

        margin-bottom:
            6px;

    }


    .bc-company {

        font-size:
            10px;

        letter-spacing:
            1px;

        margin-bottom:
            5px;

    }


    .bc-cake {

        font-size:
            55px;

    }


    .bc-title {

        font-size:
            35px;

    }


    .bc-name {

        font-size:
            31px;

    }


    .bc-message {

        font-size:
            15px;

        line-height:
            1.45;

        max-width:
            95%;

    }


    .bc-wish-line {

        font-size:
            12px;

        line-height:
            1.8;

        margin-top:
            10px;

    }


    .bc-hint {

        font-size:
            11px;

        padding:
            7px 14px;

    }


    .bc-close {

        top:
            14px;

        right:
            14px;

        width:
            43px;

        height:
            43px;

        font-size:
            24px;

    }


    .bc-wish {

        font-size:
            14px;

    }


    .bc-balloon {

        font-size:
            45px;

    }

}


/* =========================================================
   SMALL HEIGHT LAPTOP
========================================================= */

@media(
    max-height:700px
) and (
    min-width:601px
) {

    .bc-welcome {

        justify-content:
            flex-start;

        padding-top:
            12px;

        padding-bottom:
            15px;

    }


    .bc-logo {

        width:
            80px;

        max-height:
            60px;

        margin-bottom:
            3px;

    }


    .bc-company {

        font-size:
            11px;

        margin-bottom:
            3px;

    }


    .bc-cake {

        font-size:
            45px;

    }


    .bc-title {

        font-size:
            35px;

        margin:
            2px 0;

    }


    .bc-name {

        font-size:
            30px;

        margin:
            3px 0 8px;

    }


    .bc-message {

        font-size:
            14px;

        line-height:
            1.3;

        max-width:
            700px;

    }


    .bc-wish-line {

        font-size:
            12px;

        margin-top:
            6px;

    }

}


/* =========================================================
   VERY SMALL SCREEN
========================================================= */

@media(
    max-height:580px
) {

    .bc-welcome {

        justify-content:
            flex-start;

        padding-top:
            8px;

        padding-bottom:
            8px;

    }


    .bc-logo {

        width:
            65px;

        max-height:
            48px;

    }


    .bc-company {

        font-size:
            9px;

    }


    .bc-cake {

        font-size:
            38px;

    }


    .bc-title {

        font-size:
            28px;

    }


    .bc-name {

        font-size:
            25px;

    }


    .bc-message {

        font-size:
            12px;

        max-width:
            650px;

    }


    .bc-wish-line {

        font-size:
            10px;

    }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media(
    prefers-reduced-motion: reduce
) {

    .bc-welcome *,
    .bc-rain * {

        animation-duration:
            .01ms !important;

        animation-iteration-count:
            1 !important;

    }

}

</style>


<!-- ========================================================
     WELCOME SCREEN
========================================================= -->

<div class="bc-welcome">

    <button
        class="bc-mute"
        aria-label="Toggle sound">

        ${CONFIG.playSound ? "🔊" : "🔇"}

    </button>


    <button
        class="bc-close"
        aria-label="Close">

        ×

    </button>


    ${
        CONFIG.logoUrl
            ? `
                <img
                    class="bc-logo"
                    src="${CONFIG.logoUrl}"
                    alt="Ardon Technology Services"
                >
              `
            : ""
    }


    <div class="bc-company">

        ${CONFIG.company}

    </div>


    <div
        class="bc-cake"
        title="Click to blow out the candle!">

        🎂

    </div>


    <div class="bc-title">

        🎉 HAPPY BIRTHDAY 🎉

    </div>


    <div class="bc-name">

        ${CONFIG.name} ❤️

    </div>


    <div class="bc-message">

        ${CONFIG.message}

    </div>


    <div class="bc-wish-line">

        ${CONFIG.footerTags.join(
            " &nbsp;•&nbsp; "
        )}

    </div>


    <div class="bc-hint">

        🎈 Psst… tap the floating balloons to pop them! 🎉

    </div>

</div>


<!-- ========================================================
     TRANSPARENT RAIN
========================================================= -->

<div class="bc-rain"></div>


<!-- ========================================================
     FIREWORK CANVAS
========================================================= -->

<canvas class="bc-canvas"></canvas>

`;


            /* ============================================================
               ADD TO PAGE
            ============================================================ */

            document.body.appendChild(
                root
            );


            const welcome =
                root.querySelector(
                    ".bc-welcome"
                );


            const rain =
                root.querySelector(
                    ".bc-rain"
                );


            const canvas =
                root.querySelector(
                    ".bc-canvas"
                );


            const ctx =
                canvas.getContext(
                    "2d"
                );


            let soundOn =
                CONFIG.playSound;


            /* ============================================================
               CANVAS RESIZE
            ============================================================ */

            function resize() {

                canvas.width =
                    window.innerWidth;

                canvas.height =
                    window.innerHeight;

            }


            resize();


            window.addEventListener(
                "resize",
                resize
            );


            /* ============================================================
               SOUND
            ============================================================ */

            function playChime() {

                if (!soundOn) {
                    return;
                }


                try {

                    const AudioContext =
                        window.AudioContext ||
                        window.webkitAudioContext;


                    const audioContext =
                        new AudioContext();


                    const notes = [
                        523.25,
                        587.33,
                        523.25,
                        698.46,
                        659.25
                    ];


                    notes.forEach(
                        (
                            frequency,
                            index
                        ) => {

                            const oscillator =
                                audioContext
                                    .createOscillator();


                            const gain =
                                audioContext
                                    .createGain();


                            oscillator.type =
                                "sine";


                            oscillator.frequency.value =
                                frequency;


                            oscillator.connect(
                                gain
                            );


                            gain.connect(
                                audioContext.destination
                            );


                            const start =
                                audioContext
                                    .currentTime +
                                index * .22;


                            gain.gain
                                .setValueAtTime(
                                    .0001,
                                    start
                                );


                            gain.gain
                                .exponentialRampToValueAtTime(
                                    .2,
                                    start + .02
                                );


                            gain.gain
                                .exponentialRampToValueAtTime(
                                    .0001,
                                    start + .2
                                );


                            oscillator.start(
                                start
                            );


                            oscillator.stop(
                                start + .22
                            );

                        }
                    );

                } catch {}

            }


            /* ============================================================
               WISHES
            ============================================================ */

            const wishes = [

                `🎉 Happy Birthday ${CONFIG.name}!`,

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

                "🚀 Wishing you many more milestones!",

                "💎 Wishing you continued success!",

                "🙏 Thank you for your leadership!",

                "🎂 Many happy returns of the day!",

                "🥳 Enjoy your special day!",

                "✨ Wishing you endless possibilities!"

            ];


            /* ============================================================
               CREATE WISH
            ============================================================ */

            function createWish() {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "bc-wish";


                element.textContent =
                    wishes[
                        Math.floor(
                            Math.random() *
                            wishes.length
                        )
                    ];


                element.style.left =
                    Math.random() *
                    92 +
                    "%";


                element.style.fontSize =
                    14 +
                    Math.random() * 9 +
                    "px";


                element.style.animationDuration =
                    7 +
                    Math.random() * 7 +
                    "s";


                rain.appendChild(
                    element
                );


                setTimeout(
                    () => {
                        element.remove();
                    },
                    15000
                );

            }


            /* ============================================================
               CREATE BALLOON
            ============================================================ */

            function createBalloon() {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "bc-balloon";


                element.textContent =
                    "🎈";


                element.style.left =
                    Math.random() *
                    95 +
                    "%";


                element.style.fontSize =
                    45 +
                    Math.random() * 40 +
                    "px";


                element.style.animationDuration =
                    9 +
                    Math.random() * 8 +
                    "s";


                /*
                 * Balloon pop.
                 */

                element.addEventListener(
                    "click",
                    () => {

                        element.style.animation =
                            "bcPop .3s ease forwards";


                        for (
                            let i = 0;
                            i < 12;
                            i++
                        ) {

                            createConfettiAt(
                                element
                                    .getBoundingClientRect()
                            );

                        }


                        setTimeout(
                            () => {
                                element.remove();
                            },
                            300
                        );

                    }
                );


                rain.appendChild(
                    element
                );


                setTimeout(
                    () => {
                        element.remove();
                    },
                    18000
                );

            }


            /* ============================================================
               CONFETTI COLORS
            ============================================================ */

            const colors = [

                "#7c3aed",

                "#8b5cf6",

                ACCENT,

                "#f59e0b",

                "#ec4899",

                "#06b6d4",

                "#10b981"

            ];


            /* ============================================================
               CREATE CONFETTI
            ============================================================ */

            function createConfetti() {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "bc-confetti";


                element.style.left =
                    Math.random() *
                    100 +
                    "%";


                element.style.background =
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ];


                element.style.animationDuration =
                    5 +
                    Math.random() * 6 +
                    "s";


                rain.appendChild(
                    element
                );


                setTimeout(
                    () => {
                        element.remove();
                    },
                    12000
                );

            }


            /* ============================================================
               CONFETTI AT POSITION
            ============================================================ */

            function createConfettiAt(
                rectangle
            ) {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "bc-confetti";


                element.style.left =

                    (
                        (
                            rectangle.left +
                            rectangle.width / 2
                        ) /
                        window.innerWidth
                    ) *
                    100 +
                    "%";


                element.style.top =
                    rectangle.top +
                    "px";


                element.style.background =
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ];


                element.style.animationDuration =
                    2 +
                    Math.random() * 2 +
                    "s";


                rain.appendChild(
                    element
                );


                setTimeout(
                    () => {
                        element.remove();
                    },
                    4000
                );

            }


            /* ============================================================
               FLOATING HEARTS / STARS
            ============================================================ */

            function createFloatEmoji(
                type
            ) {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    type === "heart"
                        ? "bc-heart"
                        : "bc-star";


                element.textContent =

                    type === "heart"

                        ? "💜"

                        : [
                            "✨",
                            "⭐",
                            "💫"
                        ][
                            Math.floor(
                                Math.random() * 3
                            )
                        ];


                element.style.left =
                    Math.random() *
                    100 +
                    "%";


                element.style.animationDuration =
                    4 +
                    Math.random() * 4 +
                    "s";


                rain.appendChild(
                    element
                );


                setTimeout(
                    () => {
                        element.remove();
                    },
                    9000
                );

            }


            /* ============================================================
               FIREWORKS
            ============================================================ */

            let particles = [];


            function launchFirework() {

                const x =
                    Math.random() *
                    canvas.width;


                const y =
                    Math.random() *
                    canvas.height *
                    .5;


                const color =
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ];


                for (
                    let i = 0;
                    i < 40;
                    i++
                ) {

                    const angle =
                        (
                            Math.PI *
                            2 *
                            i
                        ) /
                        40;


                    const speed =
                        2 +
                        Math.random() * 3;


                    particles.push({

                        x: x,

                        y: y,

                        vx:
                            Math.cos(angle) *
                            speed,

                        vy:
                            Math.sin(angle) *
                            speed,

                        life:
                            60 +
                            Math.random() *
                            30,

                        color:
                            color

                    });

                }

            }


            function animateFireworks() {

                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                particles =
                    particles.filter(
                        particle =>
                            particle.life > 0
                    );


                particles.forEach(
                    particle => {

                        particle.x +=
                            particle.vx;


                        particle.y +=
                            particle.vy;


                        particle.vy +=
                            .03;


                        particle.life--;


                        ctx.globalAlpha =
                            Math.max(
                                particle.life /
                                90,
                                0
                            );


                        ctx.fillStyle =
                            particle.color;


                        ctx.beginPath();


                        ctx.arc(
                            particle.x,
                            particle.y,
                            2.5,
                            0,
                            Math.PI * 2
                        );


                        ctx.fill();

                    }
                );


                ctx.globalAlpha =
                    1;


                requestAnimationFrame(
                    animateFireworks
                );

            }


            animateFireworks();


            /* ============================================================
               OPENING BURST
            ============================================================ */

            for (
                let i = 0;
                i < 120;
                i++
            ) {

                setTimeout(
                    createConfetti,
                    i * 12
                );

            }


            for (
                let i = 0;
                i < 18;
                i++
            ) {

                setTimeout(
                    createBalloon,
                    i * 180
                );

            }


            for (
                let i = 0;
                i < 35;
                i++
            ) {

                setTimeout(
                    createWish,
                    i * 100
                );

            }


            for (
                let i = 0;
                i < 10;
                i++
            ) {

                setTimeout(
                    () => {
                        launchFirework();
                    },
                    i * 500
                );

            }


            /*
             * Browser may block audio until user interaction.
             * The mute button is available if needed.
             */

            playChime();


            /* ============================================================
               CONTINUOUS CELEBRATION
            ============================================================ */

            const effectPool =
                CONFIG.effects.length
                    ? CONFIG.effects
                    : ["confetti"];


            const timers = [

                /*
                 * Wishes
                 */
                setInterval(
                    createWish,
                    700
                ),


                /*
                 * Balloons
                 */
                setInterval(
                    createBalloon,
                    1700
                ),


                /*
                 * Confetti
                 */
                setInterval(
                    createConfetti,
                    400
                ),


                /*
                 * Random special effect
                 */
                setInterval(
                    () => {

                        const effect =
                            effectPool[
                                Math.floor(
                                    Math.random() *
                                    effectPool.length
                                )
                            ];


                        if (
                            effect ===
                            "fireworks"
                        ) {

                            launchFirework();

                        }


                        if (
                            effect ===
                            "hearts"
                        ) {

                            createFloatEmoji(
                                "heart"
                            );

                        }


                        if (
                            effect ===
                            "stars"
                        ) {

                            createFloatEmoji(
                                "star"
                            );

                        }

                    },
                    900
                )

            ];


            /* ============================================================
               CAKE INTERACTION
            ============================================================ */

            root
                .querySelector(
                    ".bc-cake"
                )
                .addEventListener(
                    "click",
                    event => {

                        event.target.textContent =
                            "🕯️💨";


                        for (
                            let i = 0;
                            i < 20;
                            i++
                        ) {

                            createConfettiAt(
                                event.target
                                    .getBoundingClientRect()
                            );

                        }


                        setTimeout(
                            () => {

                                event.target.textContent =
                                    "🎂";

                            },
                            1500
                        );

                    }
                );


            /* ============================================================
               SOUND BUTTON
            ============================================================ */

            root
                .querySelector(
                    ".bc-mute"
                )
                .addEventListener(
                    "click",
                    event => {

                        soundOn =
                            !soundOn;


                        event.target.textContent =
                            soundOn
                                ? "🔊"
                                : "🔇";

                    }
                );


            /* ============================================================
               CLOSE WELCOME SCREEN
            ============================================================ */

            root
                .querySelector(
                    ".bc-close"
                )
                .addEventListener(
                    "click",
                    () => {

                        /*
                         * IMPORTANT:
                         *
                         * We DO NOT remove root.
                         *
                         * Only hide the full-screen
                         * celebration.
                         *
                         * Wishes / balloons /
                         * confetti continue.
                         */

                        welcome.classList.add(
                            "hidden"
                        );

                    }
                );


            /* ============================================================
               OPTIONAL AUTO CLOSE
            ============================================================ */

            if (
                CONFIG.autoCloseAfterMs >
                0
            ) {

                setTimeout(
                    () => {

                        welcome.classList.add(
                            "hidden"
                        );

                    },
                    CONFIG.autoCloseAfterMs
                );

            }


            /* ============================================================
               MANUAL STOP FUNCTION
            =================================================================

               From browser console:

               window.stopBirthdayCelebration()

               This completely removes the celebration from the
               current page.
            ============================================================ */

            window.stopBirthdayCelebration =
                () => {

                    timers.forEach(
                        clearInterval
                    );


                    root.remove();


                    delete
                        window.stopBirthdayCelebration;

                };

        }

    }


    /* ================================================================
       DOM READY PROTECTION
    ================================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initBirthdayCelebration
        );

    } else {

        initBirthdayCelebration();

    }

})();
