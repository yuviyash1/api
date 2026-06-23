// DISHA Recruitment — shared interactions
(function() {`
:root{
  --navy: #0c1f4d;
  --navy-light: #16275e;
  --orange: #f4631e;
  --orange-dark: #e0501a;
  --bg-grey: #f5f6f8;
  --line: #e7e9ee;
  --text-dark: #16275e;
  --text-body: #4b5468;
  --white: #ffffff;
  --radius: 10px;
  --shadow: 0 4px 18px rgba(12,31,77,0.08);
}

*{margin:0;padding:0;box-sizing:border-box;}

html{scroll-behavior:smooth;}

body{
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color:var(--text-body);
  background:var(--white);
  line-height:1.5;
}

img{max-width:100%;display:block;}
a{text-decoration:none;color:inherit;}
ul{list-style:none;}
section{width:100%;}

.container{
  width:100%;
  max-width:1500px;
  margin:0 auto;
  padding:0 40px;
}

h1,h2,h3,h4{
  color:var(--text-dark);
  font-weight:800;
  line-height:1.2;
}

/* ============ TOP BAR ============ */
.top-bar{
  background:var(--navy);
  color:#cfd6ea;
  font-size:13.5px;
}
.top-bar .container{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:8px 40px;
}
.top-bar-left{display:flex;gap:28px;align-items:center;}
.top-bar-left a{color:#e7eaf3;display:flex;align-items:center;gap:8px;}
.top-bar-left i{color:var(--orange);}
.top-bar-right{display:flex;align-items:center;gap:10px;}
.top-bar-right .social-icon{
  width:26px;height:26px;border-radius:4px;
  background:#1c3270;
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:13px;
}

/* ============ NAVBAR ============ */
.navbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:18px 40px;
  border-bottom:1px solid var(--line);
}
.logo{
  display:flex;
  flex-direction:column;
  line-height:1;
}
.logo .logo-main{
  font-size:30px;
  font-weight:800;
  color:var(--orange);
  letter-spacing:0.5px;
}
.logo .logo-sub{
  font-size:12px;
  font-weight:700;
  color:var(--navy);
  letter-spacing:3px;
  margin-top:2px;
}
.nav-links{
  display:flex;
  align-items:center;
  gap:34px;
}
.nav-links a{
  font-size:15px;
  font-weight:600;
  color:var(--navy);
  position:relative;
  padding-bottom:6px;
  white-space:nowrap;
}
.nav-links a.active{color:var(--orange);}
.nav-links a.active::after{
  content:"";
  position:absolute;
  left:0;bottom:0;
  width:100%;height:2px;
  background:var(--orange);
}
.btn{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:12px 22px;
  border-radius:6px;
  font-weight:700;
  font-size:14.5px;
  border:2px solid transparent;
  cursor:pointer;
  white-space:nowrap;
  transition:all .2s ease;
}
.btn-orange{background:var(--orange);color:#fff;}
.btn-orange:hover{background:var(--orange-dark);}
.btn-outline-navy{border-color:var(--navy);color:var(--navy);background:transparent;}
.btn-outline-navy:hover{background:var(--navy);color:#fff;}
.btn-outline-white{border-color:#fff;color:#fff;background:transparent;}
.btn-outline-white:hover{background:#fff;color:var(--navy);}

.nav-cta{display:flex;align-items:center;}

.hamburger{display:none;font-size:24px;color:var(--navy);background:none;border:none;cursor:pointer;}

/* ============ HERO ============ */
.hero{
  display:flex;
  align-items:center;
  gap:60px;
  padding:60px 40px 50px;
  max-width:1500px;
  margin:0 auto;
}
.home .hero{align-items:flex-start;}
.hero-text{flex:1;min-width:320px;}
.eyebrow{
  display:inline-flex;
  align-items:center;
  gap:8px;
  background:#fdeee6;
  color:var(--orange);
  font-size:12.5px;
  font-weight:700;
  letter-spacing:0.5px;
  padding:7px 16px;
  border-radius:30px;
  margin-bottom:18px;
  border:1px solid #fbd9c4;
}
.hero-text h1{
  font-size:46px;
  margin-bottom:18px;
}
.hero-text h1 span{color:var(--orange);}
.hero-text p.lead{
  font-size:17px;
  color:var(--text-body);
  margin-bottom:28px;
  max-width:520px;
}
.hero-ctas{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;}
.hero-image{flex:1;min-width:320px;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);position:relative;}
.hero-image::before{content:"";position:absolute;top:0;left:0;bottom:0;width:140px;background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);pointer-events:none;border-radius:var(--radius) 0 0 var(--radius);}
.home .hero-image{flex:0 0 900px;width:900px;max-width:900px;height:350px;}
.hero-image img{width:100%;height:100%;object-fit:cover;object-position:center;}

.hero-mini-list{
  display:flex;
  flex-direction:column;
  gap:14px;
  margin-top:14px;
}
.hero-mini-list .mini-item{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:14.5px;
  color:var(--text-body);
}
.hero-mini-list i{color:var(--orange);}

/* breadcrumb-style eyebrow with bar */
.eyebrow-bar{
  display:flex;align-items:center;gap:10px;
  color:var(--orange);font-weight:700;font-size:13.5px;letter-spacing:0.5px;
  margin-bottom:14px;
}
.eyebrow-bar::before{
  content:"";width:4px;height:18px;background:var(--orange);display:inline-block;
}

/* ============ SECTION TITLES ============ */
.section-title-row{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:16px;
  margin:8px 0 30px;
}
.section-title-row .line{
  flex:1;
  max-width:90px;
  height:1px;
  background:var(--line);
}
.section-title-row h2{
  font-size:14.5px;
  font-weight:800;
  letter-spacing:1px;
  color:var(--navy);
  text-align:center;
}

/* ============ CORE SERVICES (home) ============ */
.core-services{
  display:flex;
  gap:28px;
  max-width:1500px;
  margin:0 auto;
  padding:0 40px 40px;
  flex-wrap:wrap;
}
.service-card{
  flex:1;
  min-width:320px;
  display:flex;
  align-items:center;
  gap:20px;
  border-radius:var(--radius);
  padding:30px 30px;
}
.service-card.navy{background:var(--navy);color:#dbe1f2;}
.service-card.orange{background:var(--orange);color:#ffe7da;}
.service-icon{
  width:56px;height:56px;min-width:56px;
  border-radius:50%;
  background:#fff;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;
}
.service-icon i.navy-icon{color:var(--navy);}
.service-icon i.orange-icon{color:var(--orange);}
.service-card h3{color:#fff;font-size:21px;margin-bottom:8px;}
.service-card p{font-size:14.5px;margin-bottom:16px;color:inherit;}
.service-card .btn{background:#fff;color:var(--navy);font-size:13.5px;padding:9px 18px;}
.service-card .btn:hover{background:#eef0f6;}

/* ============ STATS STRIP ============ */
.stats-strip{
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:30px;
  max-width:1500px;
  margin:0 auto 10px;
  padding:30px 40px;
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);
}
.stat-item{
  display:flex;
  align-items:center;
  gap:14px;
}
.stat-icon{
  font-size:26px;
  color:var(--orange);
  min-width:32px;
  text-align:center;
}
.stat-number{
  font-size:20px;
  font-weight:800;
  color:var(--orange);
  line-height:1.1;
}
.stat-label{
  font-size:13.5px;
  color:var(--text-body);
  font-weight:600;
}

/* ============ WHY ROW ============ */
.why-row{
  display:flex;
  justify-content:center;
  gap:40px;
  flex-wrap:wrap;
  padding:0 40px 30px;
  max-width:1500px;
  margin:0 auto;
}
.why-item{
  display:flex;
  align-items:center;
  gap:8px;
  font-weight:600;
  font-size:14.5px;
  color:var(--navy);
}
.why-item i{color:var(--orange);font-size:17px;}

/* ============ CLIENT LOGOS ============ */
.logos-row{
  display:flex;
  justify-content:space-around;
  align-items:center;
  gap:30px;
  flex-wrap:wrap;
  padding:20px 40px 35px;
  max-width:1500px;
  margin:0 auto;
}
.logos-row img{height:36px;width:auto;object-fit:contain;filter:grayscale(0);}

/* ============ INDUSTRIES SERVED ============ */
.industries-row{
  display:flex;
  justify-content:center;
  gap:30px;
  flex-wrap:wrap;
  padding:0 40px 35px;
  max-width:1500px;
  margin:0 auto;
  font-weight:600;
  color:var(--navy);
  font-size:14.5px;
}
.industries-row span::before{
  content:"•";
  color:var(--orange);
  margin-right:8px;
}
.industries-row span:first-child::before{content:none;}

/* ============ ABOUT / COMMITMENT TWO COL ============ */
.two-col-info{
  display:flex;
  gap:28px;
  flex-wrap:wrap;
  max-width:1500px;
  margin:0 auto;
  padding:0 40px 35px;
}
.info-card{
  flex:1;
  min-width:320px;
  background:var(--bg-grey);
  border-radius:var(--radius);
  padding:28px;
  display:flex;
  gap:18px;
}
.info-card .icon-circle{
  width:46px;height:46px;min-width:46px;
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;
  color:#fff;
}
.icon-circle.navy-bg{background:var(--navy);}
.icon-circle.orange-bg{background:var(--orange);}
.info-card h4{font-size:16px;margin-bottom:8px;}
.info-card p{font-size:14px;color:var(--text-body);}

/* ============ CTA BANNER ============ */
.cta-banner{
  background:#fdeee6;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  flex-wrap:wrap;
  max-width:1500px;
  margin:0 auto 0;
  padding:26px 40px;
}
.cta-banner.dark{background:var(--navy);color:#fff;}
.cta-left{display:flex;align-items:center;gap:18px;flex:1;min-width:280px;}
.cta-left .icon-circle{width:48px;height:48px;min-width:48px;border-radius:50%;background:var(--orange);display:flex;align-items:center;justify-content:center;color:#fff;font-size:19px;}
.cta-left h4{font-size:17px;margin-bottom:4px;}
.cta-banner.dark .cta-left h4{color:#fff;}
.cta-left p{font-size:13.5px;color:var(--text-body);}
.cta-banner.dark .cta-left p{color:#c6cce3;}
.cta-mid{display:flex;gap:30px;flex-wrap:wrap;color:var(--navy);font-size:14px;font-weight:600;}
.cta-banner.dark .cta-mid{color:#e3e7f4;}
.cta-mid .cta-info-item{display:flex;align-items:center;gap:8px;}
.cta-mid i{color:var(--orange);}

/* ============ FOOTER ============ */
footer{background:var(--navy);color:#aab4d4;}
.footer-top{
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:30px;
  max-width:1500px;
  margin:0 auto;
  padding:30px 40px;
}
.footer-col h5{
  color:var(--orange);
  font-size:14px;
  font-weight:800;
  letter-spacing:0.5px;
  margin-bottom:14px;
}
.footer-col p, .footer-col a{
  font-size:13.5px;
  color:#c3c9e2;
  display:block;
  margin-bottom:8px;
}
.footer-col .contact-line{display:flex;align-items:center;gap:8px;}
.footer-col .contact-line i{color:var(--orange);}
.footer-bottom{
  text-align:center;
  font-size:12.5px;
  padding:16px 0;
  border-top:1px solid #1c3270;
  color:#9aa3c4;
}

/* ============ GENERIC 3-COL CARD BLOCK (used in inner pages) ============ */
.cards-row{
  display:flex;
  gap:24px;
  flex-wrap:wrap;
  max-width:1500px;
  margin:0 auto;
  padding:0 40px 40px;
}
.info-block{
  flex:1;
  min-width:300px;
  background:var(--white);
  border:1px solid var(--line);
  border-radius:var(--radius);
  padding:26px;
}
.info-block h3{
  font-size:17px;
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:18px;
}
.info-block h3 i{color:var(--orange);}
.info-block ul li{
  font-size:14px;
  color:var(--text-body);
  margin-bottom:11px;
  display:flex;
  align-items:center;
  gap:9px;
}
.info-block ul li i{color:var(--orange);font-size:8px;}

/* grid icon list (we hire for / roles we hire) */
.icon-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:22px;
}
.icon-grid-item{
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
}
.icon-grid-item .ig-icon{
  width:52px;height:52px;
  border-radius:50%;
  background:var(--bg-grey);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;
  color:var(--navy);
}
.icon-grid-item span{
  font-size:12.5px;
  font-weight:600;
  color:var(--navy);
  line-height:1.3;
}

/* recruitment process timeline */
.process-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:6px;
}
.process-step{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
  flex:1;
  min-width:70px;
}
.process-circle{
  width:54px;height:54px;
  border-radius:50%;
  background:var(--bg-grey);
  border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;
  color:var(--navy);
}
.process-step.active .process-circle{
  background:var(--orange);
  color:#fff;
  border-color:var(--orange);
}
.process-step span{
  font-size:11.5px;
  font-weight:700;
  text-align:center;
  color:var(--navy);
  line-height:1.25;
}
.process-arrow{color:var(--line);font-size:14px;margin:0 -2px;}

/* two col list block (industries/positions) */
.two-col-list{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px 18px;
}

/* hero badge stack (recruitment agency page) */
.badge-stack{
  position:absolute;
  background:var(--navy);
  color:#fff;
  border-radius:8px;
  padding:24px 28px;
  display:flex;
  flex-direction:column;
  gap:14px;
  font-weight:700;
  font-size:16px;
  box-shadow:var(--shadow);
}
.badge-stack .badge-item{display:flex;align-items:center;gap:10px;}
.badge-stack i{color:var(--orange);background:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:12px;}
.hero-image-wrap{position:relative;flex:1;min-width:320px;}
.hero-image-wrap .hero-image{width:100%;}
.hero-image-wrap .badge-stack{
  right:0;top:50%;
  transform:translateY(-50%);
}

/* contact page cards */
.contact-cards{
  display:flex;
  gap:24px;
  flex-wrap:wrap;
  margin-bottom:0;
}
.contact-card{
  flex:1;
  min-width:280px;
  border-radius:var(--radius);
  padding:26px;
  color:#fff;
}
.contact-card.navy{background:var(--navy);}
.contact-card.orange{background:var(--orange);}
.contact-card .cc-icon{
  width:44px;height:44px;
  border-radius:50%;
  background:#fff;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;
  margin-bottom:14px;
}
.contact-card.navy .cc-icon i{color:var(--navy);}
.contact-card.orange .cc-icon i{color:var(--orange);}
.contact-card .cc-label{
  font-size:12px;
  letter-spacing:1px;
  font-weight:700;
  opacity:0.85;
  margin-bottom:6px;
}
.contact-card h3{color:#fff;font-size:19px;margin-bottom:10px;}
.contact-card p{font-size:13.5px;color:rgba(255,255,255,0.85);
  border-top:1px solid rgba(255,255,255,0.25);
  padding-top:12px;margin-top:6px;
}

.why-choose-row{
  display:flex;
  align-items:center;
  background:#dde3f3;
  border-radius:var(--radius);
  padding:24px 30px;
  gap:20px;
  flex-wrap:wrap;
  max-width:1500px;
  margin:0 auto 30px;
}
.why-choose-row > div:first-child{flex:1;min-width:260px;}
.why-choose-row h3{font-size:19px;}
.why-choose-row .wc-items{
  display:flex;
  gap:30px;
  flex-wrap:wrap;
}
.wc-item{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
  text-align:center;
  min-width:90px;
}
.wc-item i{color:var(--orange);font-size:20px;}
.wc-item span{font-size:12.5px;font-weight:600;color:var(--navy);}

/* page section spacing helper */
.section-pad{padding:50px 0;}
.bg-grey{background:var(--bg-grey);}

/* ============ RESPONSIVE ============ */
@media (max-width: 1100px){
  .nav-links{display:none;}
  .hamburger{display:block;}
  .icon-grid{grid-template-columns:repeat(2,1fr);}
  .hero{flex-direction:column;}
  .hero-image-wrap .badge-stack{position:static;transform:none;margin-top:-30px;width:fit-content;}
}
@media (max-width: 700px){
  .top-bar-left span.sep{display:none;}
  .navbar{padding:14px 20px;}
  .container,.hero,.core-services,.stats-strip,.why-row,.logos-row,.industries-row,.two-col-info,.cta-banner,.footer-top,.cards-row{padding-left:20px;padding-right:20px;}
  .hero-text h1{font-size:32px;}
  .two-col-list{grid-template-columns:1fr;}
  .process-row{flex-direction:column;}
  .process-arrow{transform:rotate(90deg);margin:4px 0;}
}`
    const cssStyles = `
    :root {
        --navy: #0c1f4d;
        --navy-light: #16275e;
        --orange: #f4631e;
        --orange-dark: #e0501a;
        --bg-grey: #f5f6f8;
        --line: #e7e9ee;
        --text-dark: #16275e;
        --text-body: #4b5468;
        --white: #ffffff;
        --radius: 10px;
        --shadow: 0 4px 18px rgba(12,31,77,0.08);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { font-family: 'Inter', sans-serif; color:var(--text-body); background:var(--white); }
    /* ... Paste the rest of your style.css rules here ... */
    `;

    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

  
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      if (navLinks.classList.contains('open')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#fff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 8px 18px rgba(12,31,77,0.12)';
        navLinks.style.zIndex = '999';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }

  // Buttons that point to contact / hiring support scroll smoothly if anchor on same page
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
