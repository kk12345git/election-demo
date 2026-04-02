/* ═══════════════════════════════════════
   THE PEOPLE'S VOICE — Schemes Portal
   JavaScript
   ═══════════════════════════════════════ */

/* ── STATE ── */
let curLang = 'ta';
let isMuted = false;
let currentSchemeId = 1;
let autoTimer;
let curAudio = null;

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

function speak(txt, audioPath) {
  if (isMuted) return;
  window.speechSynthesis.cancel();
  if (curAudio) {
    curAudio.pause();
    curAudio.onended = null;
    curAudio = null;
  }
  
  const onDone = () => {
    // If branding slide (ID 7), wait a bit longer (10s) before cycling back to 1
    const delay = currentSchemeId === 7 ? 10000 : 5000;
    setTimeout(transitionToNextAuto, delay);
  };

  if (curLang === 'ta' && audioPath) {
    curAudio = new Audio(audioPath);
    curAudio.onended = onDone;
    curAudio.play().catch(e => console.warn('Audio play blocked:', e));
    return;
  }

  const synth = window.speechSynthesis;
  const speakNow = () => {
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = curLang === 'ta' ? 'ta-IN' : 'en-IN';
    u.rate = 1.1; u.pitch = 1; u.volume = 1;
    u.onend = onDone;
    
    const preferred = getBestVoice();
    if (preferred) u.voice = preferred;
    
    synth.speak(u);
  };

  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = speakNow;
  } else {
    setTimeout(speakNow, 50);
  }
}

function toggleAudio() {
  isMuted = !isMuted;
  const audBtn = document.getElementById('audBtn');
  if (audBtn) audBtn.textContent = isMuted ? '🔇' : '🔊';
  if (isMuted) {
    window.speechSynthesis.cancel();
    if (curAudio) {
      curAudio.pause();
      curAudio = null;
    }
  }
}

/* ── SCHEME DATA ── */
const SCHEME_DATA = {
  ta: {
    1: { ico: '💳', t: 'மகளிர் அவசர நிதி திட்டம்', amt: '₹24,000 – ₹48,000', img: 'scheme1.Jpg', aud: 'woman credit card scheme.mpeg', p: 'மகளிர் ரூ.2000 மற்றும் ரூ.2500 நிதிக்கான அங்கீகரிக்கப்பட்ட ஸ்மார்ட் கார்டை வழக்கமான கிரெடிட் கார்டு (Credit Card) போலவே பயன்படுத்த முடியும். இதை வங்கி மற்றும் நிதி நிறுவனங்களில் "Bonds and Binding" முறையில் சமர்ப்பித்து, உங்களின் அவசர காலத் தேவைகளுக்கான நிதியாகப் பெற்றுக்கொள்ளலாம். இச்சலுகையானது மாதம் ஆயிரம் ரூபாய் நிதி பெறும் மாணவர்கள் மற்றும் பிற அரசு நலத்திட்டப் பயனாளர்களுக்கும் முழுமையாகப் பொருந்தும்.', h: 'பெண்களின் அவசரத் தேவைகளுக்காக வங்கிகளுடன் இணைந்து செயல்படுத்தப்படும் சிறப்பு நிதித் திட்டம்.' },
    2: { ico: '🚗', t: 'இலவச ஓட்டுனர் உரிம திட்டம்', amt: '2026 முதல் அமல்', img: 'scheme2.Jpg', aud: 'free driving license scheme.mpeg', p: 'தமிழகத்தில் 10-ஆம் வகுப்பு முதல் 17+ வயது வரையிலான சுமார் 67% இளைஞர்களுக்கு வாகனம் ஓட்டத் தெரியும். அவர்களின் நலன் கருதி அரசு தரப்பிலிருந்து கட்டணமின்றி ஓட்டுனர் உரிமம் (Driving Licence) வழங்கப்படும். அத்துடன் 16+ வயதுடையவர்களுக்கு MCWOG பிரிவில் இருந்து MCWG பிரிவிற்கு உரிமம் வழங்க மத்திய அரசிற்கு பரிந்துரை செய்யப்படும். இது "Fine Free Tamil Nadu" என்ற இலக்கை நோக்கிய ஒரு முக்கியமான நகர்வாகும்.', h: 'தலைவரின் பெயரைச் சொல்லி 20 ஆண்டுகாலம் பேசப்படும் வகையில் சரித்திரம் படைக்கப்போகும் எதிர்காலத் திட்டம்.' },
    3: { ico: '🌱', t: 'இலவச மாசுக்கட்டுப்பாட்டு திட்டம்', amt: 'சுற்றுச்சூழல் பாதுகாப்பு', img: 'scheme3.Jpg', aud: 'free emisson test.mpeg', p: 'இத்திட்டத்தின் மூலம், வாகனங்களில் இருந்து வெளியேறும் கரிமிலவாயு வை கண்டறிந்து வாகன பராமரித்தலை உறுதி செய்திடும் வகையிலான சிறந்த திட்டம். உலக வெப்பமயமாதலை எதிர்கொள்ளும் வகையில் சுற்றுச்சூழல் பாதுகாக்கும் வகையில் இது நாட்டிற்கே ஏன் உலகிற்கு ஒரு முன்னோடி திட்டமாக அமையும். சுற்றுச்சூழல் பாதுகாத்து மாசற்ற நகரத்தினை உருவாக்கி மக்களின் ஆரோக்கியம் காக்க ஏற்பாடு செய்யப்பட்டுள்ளது. இது மிகச்சிறந்த மற்றும் அவசியமான ஒரு திட்டமாகும்.', h: 'சுற்றுச்சூழல் பாதுகாப்பிற்கான தமிழகத்தின் முதல்முறையாக உலகளாவிய தேவைக்கு ஒரு உன்னத திட்டம்.' },
    4: { ico: '🍽️', t: 'மூத்த குடிமக்கள் உணவு திட்டம்', amt: 'தரமான உணவு உறுதி', img: 'scheme4.jpeg', aud: 'senior citizen free food scheme.mpeg', p: 'மூத்த குடிமக்கள் தங்கள் ஊரிலே உள்ள அங்கீகரிக்கப்பட்ட உணவகங்களில் ஒருவேளை உணவை முற்றிலும் இலவசமாகப் பெற்றுக் கொள்ளலாம். உணவின் தரம் மற்றும் சுகாதாரம் அரசால் நேரடியாக உறுதி செய்யப்படுவதால் முதியவர்களின் ஆரோக்கியம் மேம்படும். நம் சமூகத்தின் சொத்தான முதியவர்கள் கண்ணியத்துடனும், முழு பாதுகாப்புடனும் வாழ்வதை இத்திட்டம் உறுதி செய்கிறது.', h: 'முதியவர்களின் பசி போக்கி, அவர்களின் கண்ணியத்தைப் பாதுகாப்பது எமது தலையாய கடமை.' },
    5: { ico: '摩托', t: 'இருசக்கர வாகன காப்பீடு திட்டம்', amt: '1.20 கோடி பயனாளர்கள்', img: 'scheme6.Jpg', p: 'டிஜிட்டல் தொழில்நுட்பத்துடன் கூடிய (Smart Keytag) and சிறப்பு (Smart Card) மூலம் சுமார் 1.20 கோடி இருசக்கர வாகனங்களுக்கு 100% காப்பீடு உறுதி செய்யப்படும். "Micro Level" கண்காணிப்பு முறை மூலம் குற்றச் செயல்கள் கட்டுப்படுத்தப்பட்டு ஓட்டுனர்களின் பாதுகாப்பும் பேணப்படும். "Fine Free Tamil Nadu" என்ற புதிய மாற்றத்தின் மூலம் பொதுமக்களுக்கும் போக்குவரத்து காவல்துறைக்கும் இடையிலான உறவு சுமூகமாக்கப்படும்.', h: 'இருசக்கர வாகன ஓட்டிகளின் பாதுகாப்பை உறுதி செய்து, விபத்து காலங்களில் உடனடி உதவி.' },
    6: { ico: '🛣️', t: 'Free Tag — சுங்க விலக்கு திட்டம்', amt: 'சுங்கவரி இல்லா பயணம்', img: 'scheme5.jpeg', aud: 'free tag scheme.mpeg', p: 'மருத்துவ அவசர காலத் தேவைகள் மற்றும் விவசாயப் பெருங்குடி மக்கள் தங்களின் விளைபொருட்களை ஏற்றிச் செல்லும் போது சுங்கவரி செலுத்தத் தேவையில்லை. மேலும் விடுமுறை நாட்கள் மற்றும் முக்கிய திருவிழாக்களின் போது சொந்த ஊர் செல்லும் பொதுமக்களுக்கும் சுங்கவரி விலக்கு அளிக்கப்படும். இது "Fast Tag" முறையை விட மேலான, மக்களின் பொருளாதாரச் சுமையைக் குறைக்கும் ஒரு வரப்பிரசாதமாகும்.', h: 'பயணத் தடைகளை நீக்கி, மக்களின் பொருளாதாரச் சுமையைக் குறைக்கும் புரட்சிகர முயற்சி.' },
    7: { ico: '✨', t: 'மக்கள் குரல் — புதிய சுதந்திரம் 2026', amt: 'புதிய எதிர்காலம்', img: 'logo.png', p: 'புதிய தமிழகம் நோக்கிய பயணம் இப்போது தொடங்குகிறது. உங்களின் தேவைகள், உங்களின் உரிமை, எங்களின் இலக்கு. 2026-இல் நாம் இணைந்து ஒரு புதிய சரித்திரத்தை உருவாக்குவோம். மக்கள் குரல் எப்போதும் உங்களுடன். இது வெறும் வாக்குறுதி அல்ல, இது எமது லட்சியம். ஒரு புதிய சுதந்திரம் நோக்கி நாம் கைகோர்ப்போம்.', h: 'எப்போதும் மக்களுக்காக, எப்போதும் உங்களுக்காக — மக்கள் குரல்.' }
  },
  en: {
    1: { ico: '💳', t: 'Womens Emergency Fund', amt: '₹24,000 – ₹48,000', img: 'scheme1.Jpg', p: 'Use your authorized ₹2,000 / ₹2,500 monthly benefit Smart Card like a standard Credit Card for your daily and urgent needs. You can access emergency funds up to ₹48,000 via the specialized Bonds and Binding system at participating banks. This feature is also available for students receiving scholarships and all other government welfare beneficiaries.', h: 'A unique financial initiative to support women in emergency situations via banking partnerships.' },
    2: { ico: '🚗', t: 'Free Driving Licence Scheme', amt: 'Effective from 2026', img: 'scheme2.Jpg', p: 'We will provide government-funded driving licences for youth aged 17+ who have completed their 10th standard. As part of this initiative, we will advocate for a legal amendment with the Central Government to upgrade 16+ MCWOG licenses to MCWG. This program aims to create a law-abiding community and build a "Fine-free Tamil Nadu" for the next generation.', h: 'Securing the future of our youth while reducing the financial burden on parents.' },
    3: { ico: '🌱', t: 'Emission Test Free Tag Scheme', amt: 'Eco Protection', img: 'scheme3.Jpg', p: 'A pioneering project for the world to tackle global warming by identifying carbon emissions from vehicles and ensuring maintenance. This scheme aims to create a pollution-free environment and safeguard public health through systematic monitoring. It is a world-class initiative designed to keep our cities clean and our citizens healthy.', h: 'A noble vision for global climate needs, implemented first in Tamil Nadu for a greener future.' },
    4: { ico: '🍽️', t: 'Elderly Nutrition Program', amt: 'Quality Assured', img: 'scheme4.jpeg', p: 'Senior citizens can now enjoy one nutritious meal per day for free at authorized local restaurants in their neighborhood. The government will strictly monitor food quality and hygiene to ensure the health and well-being of our elders. This program guarantees an honorable livelihood where senior citizens can live with dignity and social security.', h: 'Our primary duty is to eliminate hunger among elders and protect their dignity.' },
    5: { ico: '🏍️', t: 'Two-Wheeler Insurance Scheme', amt: '1.20 Crore Beneficiaries', img: 'scheme6.Jpg', p: 'Nearly 1.20 crore two-wheeler riders will receive 100% insurance coverage integrated into digital Smart Keytags and specialized Smart Cards. Through micro-level monitoring, we will effectively control crime and ensure the safety of all riders on the road. This initiative fosters a free and easy relationship between the public and traffic authorities.', h: 'Ensuring rider safety and legal compliance via the New Independence Scheme.' },
    6: { ico: '🛣️', t: 'Free Tag — Toll Exemption', amt: 'Zero Toll Travel', img: 'scheme5.jpeg', p: 'We are providing full toll exemption for medical emergencies and the transportation of agricultural goods to support our farming community. Furthermore, toll-free travel will be extended to the general public during major holidays and festival periods. This system is designed as a superior alternative to Fast Tag, focused entirely on reducing the economic burden on citizens.', h: 'A revolutionary move to remove travel barriers and assist our farming community.' },
    7: { ico: '✨', t: "The People's Voice — New Era 2026", amt: 'Foundation for Future', img: 'logo.png', p: 'A journey towards a better future begins here. Your needs, your rights, our goal. In 2026, together we will write a new chapter of prosperity. Our voice is your voice. This is not just a promise; it is our mission to build a state that cares for every citizen. Join us for a new era of progress.', h: 'Always for the people, always with you — The People\'s Voice.' }
  }
};

/* ── TRANSITION LOGIC ── */
function transitionToNextAuto() {
  // Cycle 1-7 back to 1
  const nextId = (currentSchemeId % 7) + 1;
  transitionToScheme(nextId);
}

function transitionToScheme(id) {
  const data = SCHEME_DATA[curLang][id];
  const container = document.getElementById('schemeDetail');
  if (!container) return;

  const isBrand = id === 7;

  // Interstitial State
  container.style.opacity = '0';
  setTimeout(() => {
    container.innerHTML = `
      <div class="sd-preview ${isBrand ? 'brand-preview' : ''}">
        <div class="preview-label">${isBrand ? (curLang === 'ta' ? 'அறிமுகம்' : 'SHOWCASE') : (curLang === 'ta' ? 'அடுத்த திட்டம்' : 'NEXT SCHEME')}</div>
        ${data.img ? `<img src="${data.img}" class="sd-banner preview-banner ${isBrand ? 'brand-logo-preview' : ''}" alt="Preview">` : ''}
        <h2 class="preview-title">${data.t}</h2>
        <div class="preview-loader"><div class="pl-fill"></div></div>
      </div>
    `;
    container.style.opacity = '1';
  }, 300);

  setTimeout(() => {
    showScheme(id);
  }, 3000);
}

function showScheme(id, fromManual = false) {
  currentSchemeId = parseInt(id);
  const data = SCHEME_DATA[curLang][currentSchemeId];
  const container = document.getElementById('schemeDetail');
  if (!container) return;

  const isBrand = id === 7;

  // Sidebar highlight cleanup
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.getElementById('sbi-' + currentSchemeId);
  if (activeItem) activeItem.classList.add('active');

  const bannerHtml = data.img ? `<img src="${data.img}" class="${isBrand ? 'brand-main-logo' : 'sd-banner'}" alt="Banner">` : '';
  
  container.style.opacity = '0';
  setTimeout(() => {
    if (isBrand) {
      container.innerHTML = `
        <div class="sd-brand-view">
          ${bannerHtml}
          <div class="sd-info brand-info">
             <div class="sd-num brand-tagline">${curLang === 'ta' ? 'புதிய சுதந்திரம்' : 'A NEW FREEDOM'}</div>
             <h3 class="sd-title brand-main-title">${data.t}</h3>
          </div>
          <div class="sd-content brand-text">
            <p>${data.p}</p>
          </div>
          <div class="sd-highlight brand-highlight">
            <div class="sd-hl-txt">${data.h}</div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        ${bannerHtml}
        <div class="sd-head">
          <div class="sd-icon">${data.ico || '📜'}</div>
          <div class="sd-info">
            <div class="sd-num">${curLang === 'ta' ? 'திட்டம்' : 'SCHEME'} 0${currentSchemeId}</div>
            <h3 class="sd-title">${data.t}</h3>
            <div class="sd-sub">${curLang === 'ta' ? 'அதிகாரப்பூர்வ கொள்கை' : 'Official Governance Policy'}</div>
          </div>
        </div>
        <div class="sd-meta"><div class="sd-amt-box"><div class="sd-albl">${curLang === 'ta' ? 'திட்ட நிதி / மதிப்பு' : 'SCHEME FUND / VALUE'}</div><div class="sd-amt">${data.amt}</div></div><div class="sd-badge">${curLang === 'ta' ? '2026 தேர்தல் வாக்குறுதி' : '2026 ELECTION PLEDGE'}</div></div>
        <div class="sd-content">
          <p>${data.p}</p>
        </div>
        <div class="sd-highlight"><div class="sd-hl-ico">⚡</div><div class="sd-hl-txt">${data.h}</div></div>
      `;
    }
    container.style.opacity = '1';
    if (window.innerWidth < 900) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);

  speak(`${data.t}. ${data.p}`, data.aud);
  resetAutoCycle();
}

/** Auto-Scroll Logic */
function initAutoCycle() {
  if (autoTimer) clearTimeout(autoTimer);
  // Fail-safe fallback: 60s
  autoTimer = setTimeout(() => {
    transitionToNextAuto();
  }, 60000);
}

function resetAutoCycle() {
  if (autoTimer) clearTimeout(autoTimer);
  initAutoCycle();
}

function setLang(lang) {
  curLang = lang;
  document.querySelectorAll('.lb').forEach(b => b.classList.toggle('act', b.textContent.trim() === (lang === 'en' ? 'EN' : 'தமிழ்')));
  // Sidebar items re-label
  for (let i = 1; i <= 6; i++) {
    const el = document.querySelector(`#sbi-${i} .sbi-txt`);
    if (el) {
       const keyData = SCHEME_DATA[lang][i];
       if (keyData) el.textContent = keyData.t;
    }
  }
  showScheme(currentSchemeId);
}

/* ── INIT ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) {
      l.style.opacity = '0';
      setTimeout(() => l.style.display = 'none', 700);
    }
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
