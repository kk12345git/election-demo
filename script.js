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
    1: { ico: '💳', t: 'மகளிர் அவசர நிதி திட்டம்', amt: '₹24,000 – ₹48,000', img: 'scheme1.Jpg', p: ['குடும்பத் தலைவிகள், மாணவர்கள் மற்றும் அரசு நிதி பெறும் பயனாளர்களுக்கு பொருந்தும்.', 'அங்கீகரிக்கப்பட்ட Smart Card மூலம் அவசரகால நிதித் தேவைகளுக்கு கிரெடிட் கார்டு போல பயன்படுத்தலாம்.', 'Bonds & Binding முறையில் 100% பாதுகாப்பான நிதி வழங்கும் திட்டம்.'], h: 'நிர்வாகக் குழு மற்றும் வங்கிகளுடன் இணைந்து செயல்படுத்தப்படும் உலகத் தரம் வாய்ந்த நிதித் திட்டம்.' },
    2: { ico: '🚗', t: 'இலவச ஓட்டுனர் உரிம திட்டம்', amt: '2026 முதல் அமல்', img: 'scheme2.Jpg', p: ['தமிழக இளைஞர்களுக்கு அரசு செலவிலேயே அடிப்படை ஓட்டுனர் உரிமம் வழங்கப்படும்.', '16 வயது முடிந்தவுடன் MCWOG இலிருந்து MCWG ஆக சட்டத் திருத்தம் செய்து உரிமம் வழங்கப்படும்.', 'சாலை விதிகளைப் பின்பற்றும் இளைஞர்களுக்கு Spot fine முறையிலிருந்து விலக்கு அளிக்கப்படும்.'], h: 'ஒழுக்கமான மற்றும் பாதுகாப்பான ஓட்டுனர் சமூகத்தை உருவாக்குவதே எமது நோக்கம்.' },
    3: { ico: '🌿', t: 'இலவச Emission Test திட்டம்', amt: '100% இலவசம்', img: 'scheme3.Jpg', p: ['அனைத்து ரக வாகனங்களுக்கும் மாசு கட்டுப்பாட்டு சோதனை அரசு செலவிலேயே இலவசம்.', 'சுற்றுச்சூழலை மாசுபடுத்தும் கரிம வாயு வெளியேற்றத்தை கண்டறிந்து சரிசெய்யும் நவீன தொழில்நுட்பம்.', 'மக்களின் ஆரோக்கியம் மற்றும் இயற்கை வளத்தை காக்கும் முன்னோடி பசுமைத் திட்டம்.'], h: 'நமது சுற்றுப்புறத்தை தூய்மையாக வைத்திருக்க நாம் எடுக்கும் ஒரு பெரும் முயற்சி.' },
    4: { ico: '🍽️', t: 'மூத்த குடிமக்கள் உணவு திட்டம்', amt: 'தரமான உணவு உறுதி', p: ['மூத்த குடிமக்களுக்கு அவர்கள் வசிப்பிடத்திற்கு அருகிலுள்ள அங்கீகரிக்கப்பட்ட உணவகங்களில் உணவு.', 'Smart Card மூலம் ஒரு வேளை தரமான மற்றும் சத்தான உணவு இலவசமாக வழங்கப்படும்.', 'முதியவர்கள் யாரையும் சார்ந்து இருக்கத் தேவையில்லாத கௌரவமான வாழ்வாதாரம்.'], h: 'முதியவர்களின் பசி போக்கி, அவர்களின் கண்ணியத்தைப் பாதுகாப்பது எமது கடமை.' },
    5: { ico: '🛣️', t: 'Free Tag — சுங்க விலக்கு திட்டம்', amt: 'சுங்கவரி இல்லா பயணம்', p: ['மருத்துவ அவசரத் தேவைகள், விவசாயப் பொருட்கள் ஏற்றிச் செல்லும் வாகனங்களுக்கு முழு சுங்க விலக்கு.', 'விடுமுறை நாட்கள் மற்றும் முக்கிய திருவிழா காலங்களில் பொதுமக்களுக்கு சுங்கவரி கிடையாது.', 'FASTag முறையையும் தாண்டி தொழில்நுட்ப ரீதியாக செயல்படுத்தப்படும் சிறப்புத் திட்டம்.'], h: 'பயணத் தடைகளை நீக்கி, மக்களின் பொருளாதாரச் சுமையைக் குறைக்கும் புரட்சிகர முயற்சி.' },
    6: { ico: '🏍️', t: 'இருசக்கர வாகன காப்பீடு திட்டம்', amt: '1.20 கோடி பயனாளர்கள்', img: 'scheme6.Jpg', p: ['தமிழகத்தில் உள்ள 1.20 கோடி இருசக்கர வாகன உரிமையாளர்களுக்கும் 100% கட்டாயக் காப்பீடு.', 'Smart Keytag மற்றும் Smart Card மூலம் ஒரு சிப் நுட்பத்தில் காப்பீடு விவரங்கள் இணைக்கப்படும்.', 'Fine Free Tamil Nadu என்னும் இலக்கை அடைய வாகன பாதுகாப்பு மற்றும் சட்டத்தை உறுதி செய்தல்.'], h: 'இருசக்கர வாகன ஓட்டிகளின் பாதுகாப்பை உறுதி செய்து, விபத்து காலங்களில் உடனடி உதவி.' }
  },
  en: {
    1: { ico: '💳', t: 'Emergency Fund for Women', amt: '₹24,000 – ₹48,000', img: 'scheme1.Jpg', p: ['Applicable to housewives, students, and other government fund beneficiaries.', 'Use your authorized Smart Card like a credit card for immediate emergency financial needs.', 'A 100% secure fund delivery system implemented via the Bonds & Binding method.'], h: 'A world-class financial initiative executed in partnership with bank governing boards.' },
    2: { ico: '🚗', t: 'Free Driving Licence Scheme', amt: 'Effective from 2026', img: 'scheme2.Jpg', p: ['Government-funded basic driving licences for all Tamil Nadu youth.', 'Legal amendment to grant MCWG licences to youth straight after age 16.', 'Exemption from spot fines for youth who strictly follow traffic regulations.'], h: 'Building a disciplined and safe driving community for the next generation.' },
    3: { ico: '🌿', t: 'Free Emission Test Scheme', amt: '100% Free', img: 'scheme3.Jpg', p: ['Free vehicle emission testing for all vehicle types at government expense.', 'Modern technology to detect carbon emissions and protect our environment.', 'A pioneering green initiative prioritizing public health and natural resources.'], h: 'A major effort to keep our environment clean and breathable for everyone.' },
    4: { ico: '🍽️', t: 'Senior Citizens Food Scheme', amt: 'Quality Assured', p: ['Senior citizens can dine at government-approved restaurants near their homes.', 'One nutritious and quality meal per day provided free via Smart Card.', 'Ensuring an honorable livelihood where elders do not have to depend on others.'], h: 'Our duty is to eliminate hunger among elders and protect their dignity.' },
    5: { ico: '🛣️', t: 'Free Tag — Toll Exemption', amt: 'Zero Toll Travel', p: ['Full toll exemption for medical emergencies and transport of agricultural goods.', 'Toll-free travel for the general public during holidays and major festivals.', 'A specialized tech-driven system that goes beyond standard FASTag protocols.'], h: 'A revolutionary move to remove travel barriers and reduce economic burdens.' },
    6: { ico: '🏍️', t: 'Two-Wheeler Insurance Scheme', amt: '1.20 Crore Beneficiaries', img: 'scheme6.Jpg', p: ['100% mandatory insurance coverage for all 1.20 crore two-wheeler owners in TN.', 'Insurance details integrated into a Smart Keytag and Smart Card chip.', 'Ensuring vehicle safety and legal compliance to achieve a "Fine Free Tamil Nadu".'], h: 'Securing the safety of two-wheeler riders with immediate assistance during accidents.' }
  }
};

/* ── LOGIC ── */
function showScheme(id) {
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
  }, 100);

  speak(`${data.t}. ${data.p.join('. ')}`);
  resetAutoCycle();
}

/** Auto-Scroll Logic */
function initAutoCycle() {
  autoTimer = setInterval(() => {
    let nextId = (currentSchemeId % 6) + 1;
    showScheme(nextId);
  }, 25000); // 25 Seconds
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
