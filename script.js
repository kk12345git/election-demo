/* ═══════════════════════════════════════
   THE PEOPLE'S VOICE — Schemes Portal
   JavaScript
   ═══════════════════════════════════════ */

/* ── STATE ── */
let curLang = 'ta';
let isMuted = false;
let currentSchemeId = 1;
let autoTimer;

/* ── CONTENT TRANSLATIONS ── */
const TX = {
  en: {
    'sc-lbl': 'Welfare Schemes · Special Portal',
    'fcopy': "© 2025 The People's Voice. All Rights Reserved."
  },
  ta: {
    'sc-lbl': 'நலத் திட்டங்கள் · சிறப்பு தளம்',
    'fcopy': '© 2025 மக்கள் குரல். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
  }
};

/* ── SPEECH SYNTHESIS ── */
let speechPrimed = false;

function primeAudio() {
  if (speechPrimed) return;
  const u = new SpeechSynthesisUtterance('');
  window.speechSynthesis.speak(u);
  speechPrimed = true;
  console.log('Audio Primed');
  
  // Hide UI prompt
  const ap = document.getElementById('audioPrompt');
  if (ap) ap.classList.add('hide');

  // Trigger speech for current scheme now that audio is unlocked
  showScheme(currentSchemeId);
}

function getBestVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (curLang === 'ta') {
    return voices.find(v => v.lang.startsWith('ta') || v.name.toLowerCase().includes('tamil')) || 
           voices.find(v => v.lang.includes('IN') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('google')));
  }
  return voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || 
         voices.find(v => v.lang.startsWith('en'));
}

function speak(txt) {
  if (isMuted) return;
  window.speechSynthesis.cancel();
  
  const synth = window.speechSynthesis;
  const speakNow = () => {
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = curLang === 'ta' ? 'ta-IN' : 'en-IN';
    u.rate = 1.0; u.pitch = 1; u.volume = 1;
    
    const preferred = getBestVoice();
    if (preferred) u.voice = preferred;
    
    synth.speak(u);
  };

  // Ensure voices are loaded
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = speakNow;
  } else {
    setTimeout(speakNow, 50);
  }
}

function toggleAudio() {
  isMuted = !isMuted;
  document.getElementById('audBtn').textContent = isMuted ? '🔇' : '🔊';
  if (isMuted) window.speechSynthesis.cancel();
}

/* ── SCHEME DATA ── */
const SCHEME_DATA = {
  ta: {
    1: { ico: '💳', t: 'மகளிர் அவசர நிதி திட்டம்', amt: '₹24,000 – ₹48,000', img: 'scheme1.Jpg', p: ['மகளிர் ரூ.2000 & ரூ.2500 நிதிக்கான அங்கீகரிக்கப்பட்ட ஸ்மார்ட் கார்டை (Credit Card) போல பயன்படுத்தலாம்.', 'வங்கி மற்றும் நிதி நிறுவனங்களில் (Bonds and Binding) முறையில் அவசர கால நிதியாகப் பெறலாம்.', 'ஆயிரம் ரூபாய் நிதி பெறும் மாணவர்கள் மற்றும் பிற அரசு பயனாளர்களுக்கும் இது பொருந்தும்.'], h: 'பெண்களின் அவசரத் தேவைகளுக்காக வங்கிகளுடன் இணைந்து செயல்படுத்தப்படும் சிறப்பு நிதித் திட்டம்.' },
    2: { ico: '🚗', t: 'இலவச ஓட்டுனர் உரிம திட்டம்', amt: '2026 முதல் அமல்', img: 'scheme2.Jpg', p: ['10-ஆம் வகுப்பு முதல் 17+ வயது வரை 67% இளைஞர்களுக்கு வாகனம் ஓட்டத் தெரியும்; அவர்களுக்கு அரசு உரிமம் வழங்கும்.', '16+ வயதுடையவர்களுக்கு MCWOG-லிருந்து MCWG-க்கு சட்டதிருத்தம் செய்ய மத்திய அரசிற்கு பரிந்துரைக்கும் திட்டம்.', 'இத்திட்டத்தில் (Spot Fine) தவிர்க்கப்படுவதும், Fine free Tamil Nadu என அமைந்திட உதவும் ஓர் சிறப்பு திட்டம்.'], h: 'தலைவரின் பெயரைச் சொல்லி 20 ஆண்டுகாலம் பேசப்படும் வகையில் சரித்திரம் படைக்கப்போகும் எதிர்காலத் திட்டம்.' },
    3: { ico: '🌿', t: 'Emission Test Free Tag திட்டம்', amt: '100% இலவசம்', img: 'scheme3.Jpg', p: ['வாகன பராமரிப்பை உறுதி செய்து கரிமலவாயு வெளியேற்றத்தை கண்டறியும் தமிழகத்தின் முதல் முறையிலான ஏற்பாடு.', 'உலக வெப்பமயமாதலை எதிர்கொள்ளும் வகையில் சுற்றுச்சூழலைப் பாதுகாக்கும் உலகிற்கு ஒரு முன்னோடி பசுமைத் திட்டம்.', 'தில்லி போன்ற பாதிப்புகள் தமிழகத்தில் ஏற்படாமல் மக்களின் ஆரோக்கியம் காக்க உரிய மாசற்ற நகர ஏற்பாடு.'], h: 'சுற்றுப்புறத் தூய்மையை உறுதி செய்து, ஆரோக்கியமான தமிழகத்தை உருவாக்குவதே எமது நோக்கம்.' },
    4: { ico: '🍽️', t: 'மூத்த குடிமக்கள் உணவு திட்டம்', amt: 'தரமான உணவு உறுதி', p: ['மூத்த குடிமக்கள் தங்கள் ஊரிலே உள்ள அங்கீகரிக்கப்பட்ட உணவகங்களில் ஒருவேளை உணவை இலவசமாகப் பெற்றுக் கொள்ளலாம்.', 'உணவின் தரம் மற்றும் சுகாதாரம் அரசால் உறுதி செய்யப்பட்டு ஆரோக்கியம் மேம்படுத்தப்படும்.', 'முதியவர்கள் கண்ணியத்துடனும், சமூக பாதுகாப்புடனும் வாழ்வதை உறுதி செய்யும் மனிதாபிமான திட்டம்.'], h: 'முதியவர்களின் பசி போக்கி, அவர்களின் கண்ணியத்தைப் பாதுகாப்பது எமது தலையாய கடமை.' },
    5: { ico: '🏍️', t: 'இருசக்கர வாகன காப்பீடு திட்டம்', amt: '1.20 கோடி பயனாளர்கள்', img: 'scheme6.Jpg', p: ['டிஜிட்டல் தொழில்நுட்பத்துடன் கூடிய (Smart Keytag) மற்றும் (Smart Card) வழியாக 100% காப்பீடு உறுதி செய்யப்படும்.', '(Micro Level) கண்காணிப்பு மூலம் குற்றச் செயல்கள் கட்டுப்படுத்தப்பட்டு ஓட்டுனர்களின் பாதுகாப்பும் உறுதி செய்யப்படும்.', '(Fine Free Tamil Nadu) என்னும் புதிய மாற்றத்தை நோக்கி இலகுவான போக்குவரத்து அணுகுமுறைக்கான திட்டம்.'], h: 'இருசக்கர வாகன ஓட்டிகளின் பாதுகாப்பை உறுதி செய்து, விபத்து காலங்களில் உடனடி உதவி.' },
    6: { ico: '🛣️', t: 'Free Tag — சுங்க விலக்கு திட்டம்', amt: 'சுங்கவரி இல்லா பயணம்', p: ['மருத்துவ காரணங்கள் மற்றும் விவசாய பெருங்குடி மக்கள் விளைபொருட்களை எடுத்துச் செல்ல முழு சுங்க விலக்கு அளிக்கப்படும்.', 'விடுமுறை நாட்கள் மற்றும் முக்கிய திருவிழா காலங்களில் சொந்த ஊர் பயணிக்கும் பொதுமக்களுக்கு சுங்கவரி கிடையாது.', '(Fast Tag) ஐ மிஞ்சும் வகையில் மக்களின் பொருளாதாரப் பொருளாதாரச் சுமையைக் குறைக்கும் ஒரு வரப்பிரசாதத் திட்டம்.'], h: 'பயணத் தடைகளை நீக்கி, மக்களின் பொருளாதாரச் சுமையைக் குறைக்கும் புரட்சிகர முயற்சி.' }
  },
  en: {
    1: { ico: '💳', t: 'Womens Emergency Fund', amt: '₹24,000 – ₹48,000', img: 'scheme1.Jpg', p: ['Use your authorized ₹2,000 / ₹2,500 monthly benefit Smart Card like a standard Credit Card.', 'Get emergency funds up to ₹48,000 via the specialized Bonds and Binding system at banks.', 'Applicable to students on scholarships and all other government benefit recipients.'], h: 'A unique financial initiative to support women in emergency situations via banking partnerships.' },
    2: { ico: '🚗', t: 'Free Driving Licence Scheme', amt: 'Effective from 2026', img: 'scheme2.Jpg', p: ['Government-funded driving licences for youth from 10th standard up to 17+ years.', 'Advocacy for legal amendment to upgrade 16+ MCWOG to MCWG licences via Central Govt.', 'A move towards a Fine-free Tamil Nadu by building a law-abiding driving community.'], h: 'Securing the future of our youth while reducing the financial burden on parents.' },
    3: { ico: '🌿', t: 'Emission Test Free Tag', amt: '100% Free', img: 'scheme3.Jpg', p: ['Detecting carbon emissions to ensure proper vehicle maintenance and air quality.', 'A pioneering green initiative to combat global warming and prioritize natural resources.', 'Creating pollution-free cities to safeguard the health of our citizens and the environment.'], h: 'Our major effort to keep Tamil Nadus air clean and breathable for everyone.' },
    4: { ico: '🍽️', t: 'Elderly Nutrition Program', amt: 'Quality Assured', p: ['Senior citizens can get one nutritious meal per day for free at authorized local restaurants.', 'Food quality and hygiene are strictly monitored and certified by the government.', 'Ensuring an honorable livelihood where elders live with dignity and social security.'], h: 'Our primary duty is to eliminate hunger among elders and protect their dignity.' },
    5: { ico: '🏍️', t: 'Two-Wheeler Insurance Scheme', amt: '1.20 Crore Beneficiaries', img: 'scheme6.Jpg', p: ['Insurance details integrated into digital Smart Keytags and specialized Smart Cards.', 'Ensuring 100% insurance coverage and micro-level monitoring to control crime.', 'Fostering a free and easy relationship between the public and traffic police.'], h: 'Ensuring rider safety and legal compliance via the New Independence Scheme.' },
    6: { ico: '🛣️', t: 'Free Tag — Toll Exemption', amt: 'Zero Toll Travel', p: ['Full toll exemption for medical emergencies and transport of agricultural goods.', 'Toll-free travel for the public during holidays and major festival periods.', 'A superior alternative to Fast Tag aimed at reducing the public economic burden.'], h: 'A revolutionary move to remove travel barriers and assist our farming community.' }
  }
};

/* ── TRANSITION LOGIC ── */
function transitionToScheme(id) {
  const data = SCHEME_DATA[curLang][id];
  const container = document.getElementById('schemeDetail');
  if (!container) return;

  // 3s Interstitial State
  container.style.opacity = '0';
  setTimeout(() => {
    container.innerHTML = `
      <div class="sd-preview">
        <div class="preview-label">${curLang === 'ta' ? 'அடுத்த திட்டம்' : 'NEXT SCHEME'}</div>
        ${data.img ? `<img src="${data.img}" class="sd-banner preview-banner" alt="Next">` : ''}
        <h2 class="preview-title">${data.t}</h2>
        <div class="preview-loader"><div class="pl-fill"></div></div>
      </div>
    `;
    container.style.opacity = '1';
  }, 300);

  // After 3s, show full details
  setTimeout(() => {
    showScheme(id);
  }, 3000);
}

function showScheme(id, fromManual = false) {
  currentSchemeId = parseInt(id);
  const data = SCHEME_DATA[curLang][currentSchemeId];
  const container = document.getElementById('schemeDetail');
  if (!container) return;

  // UI Updates
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.getElementById('sbi-' + currentSchemeId);
  if (activeItem) activeItem.classList.add('active');

  const pointsHtml = data.p.map(txt => `<li>${txt}</li>`).join('');
  const bannerHtml = data.img ? `<img src="${data.img}" class="sd-banner" alt="Banner">` : '';
  
  container.style.opacity = '0';
  setTimeout(() => {
    container.innerHTML = `
      ${bannerHtml}
      <div class="sd-head">
        <div class="sd-icon">${data.ico}</div>
        <div class="sd-info">
          <div class="sd-num">${curLang === 'ta' ? 'திட்டம்' : 'SCHEME'} 0${currentSchemeId}</div>
          <h3 class="sd-title">${data.t}</h3>
          <div class="sd-sub">${curLang === 'ta' ? 'அதிகாரப்பூர்வ கொள்கை' : 'Official Governance Policy'}</div>
        </div>
      </div>
      <div class="sd-meta"><div class="sd-amt-box"><div class="sd-albl">${curLang === 'ta' ? 'திட்ட நிதி / மதிப்பு' : 'SCHEME FUND / VALUE'}</div><div class="sd-amt">${data.amt}</div></div><div class="sd-badge">${curLang === 'ta' ? '2026 தேர்தல் வாக்குறுதி' : '2026 ELECTION PLEDGE'}</div></div>
      <ul class="sd-points">${pointsHtml}</ul>
      <div class="sd-highlight"><div class="sd-hl-ico">⚡</div><div class="sd-hl-txt">${data.h}</div></div>
    `;
    container.style.opacity = '1';
    if (window.innerWidth < 900) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);

  speak(`${data.t}. ${data.p.join('. ')}`);
  resetAutoCycle();
}

/** Auto-Scroll Logic */
function initAutoCycle() {
  autoTimer = setInterval(() => {
    let nextId = (currentSchemeId % 6) + 1;
    transitionToScheme(nextId);
  }, 37000); // 37s + 3s transition = 40s Total
}

function resetAutoCycle() {
  clearInterval(autoTimer);
  initAutoCycle();
}

function setLang(lang) {
  curLang = lang;
  document.querySelectorAll('.lb').forEach(b => b.classList.toggle('act', b.textContent.trim() === (lang === 'en' ? 'EN' : 'தமிழ்')));
  for (let i = 1; i <= 6; i++) {
    const el = document.querySelector(`#sbi-${i} .sbi-txt`);
    if (el) el.textContent = SCHEME_DATA[lang][i].t;
  }
  showScheme(currentSchemeId);
}

/* ── INIT ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    l.style.opacity = '0';
    setTimeout(() => l.style.display = 'none', 700);
  }, 1200);

  setTimeout(() => {
    setLang('ta');
    initAutoCycle();
  }, 1500);
});

document.addEventListener('click', primeAudio, { once: true });
const ap = document.getElementById('audioPrompt');
if (ap) ap.addEventListener('click', primeAudio);

document.addEventListener('contextmenu', e => e.preventDefault());
