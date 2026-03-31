/* ═══════════════════════════════════════
   THE PEOPLE'S VOICE — Political Website
   JavaScript
   ═══════════════════════════════════════ */

/* ── STATE ── */
let curSlide = 0;
const TOTAL = 6;
let isAnim = false;
let isMuted = false;
let curLang = 'en';
const itemIdx = [0, 0, 0, 0, 0, 0];
const itemCounts = [2, 2, 2, 2, 1, 1];
const ITEM_DUR = 5500; // ms per item
let rafId = null, timerStart = 0;

/* ── CONTENT TRANSLATIONS ── */
const TX = {
  en: {
    'h-badge': 'Founded for the People · 2025',
    'h-l1': 'FOR THE', 'h-l2': 'PEOPLE,', 'h-l3': 'BY THE PEOPLE',
    'h-sub': 'A movement built on truth, justice, and equality. Together we shape the future of our nation.',
    'h-cta1': 'JOIN THE MOVEMENT', 'h-cta2': 'Our Vision →',
    'h1-lbl': 'Our Mission', 'h1-h': 'A NATION BUILT<br>ON JUSTICE',
    'h1-p': 'We stand for transparent governance, equal rights, and inclusive growth. This is not just politics — this is a movement.',
    'h1-btn': 'Explore Our Party →',
    'ab-lbl': 'Our Story', 'ab-h': 'VISION FOR<br>TOMORROW',
    'ab-p': 'We are a party born from the voices of ordinary citizens. Our mission: a transparent, equitable nation where every right is protected.',
    'p1': 'DEMOCRACY', 'p1d': "People's voices shape every decision.",
    'p2': 'EQUALITY', 'p2d': 'Justice for all, regardless of background.',
    'p3': 'PROGRESS', 'p3d': 'Modern solutions for real challenges.',
    'p4': 'INTEGRITY', 'p4d': 'Honest leadership, always accountable.',
    'lname': 'PARTY PRESIDENT', 'lrole': 'National Leadership',
    'ab1-lbl': 'Leadership Message', 'ab1-h': 'POWER BELONGS<br>TO THE PEOPLE',
    'ab1-p': 'Our leaders come from among you. Every policy, every vote is done in your name and for your future.',
    'ab1-btn': 'See Our Work →',
    'ac-lbl': "What We've Done", 'ac-h': 'OUR ACHIEVEMENTS',
    'a1': 'Infrastructure Projects', 'a1d': 'Roads, bridges and facilities across all districts.',
    'a2': 'Students Supported', 'a2d': 'Scholarships and free education for youth.',
    'a3': 'Health Camps', 'a3d': 'Free medical services for rural communities.',
    'a4': 'Jobs Created', 'a4d': 'Employment across agriculture and tech.',
    'a5': 'Trees Planted', 'a5d': 'Green initiative for a clean environment.',
    'a6': 'Village Electrification', 'a6d': 'Every household connected to power.',
    'ac1-lbl': 'Real Impact', 'ac1-h': 'CHANGE YOU<br>CAN SEE',
    'ac1-p': 'Every number represents a real life transformed. A child educated. A family with clean water. Our promise kept.',
    'ac1-btn': 'Hear the People →',
    'pv-lbl': 'Citizens Speak', 'pv-h': "THE PEOPLE'S VOICE",
    't1': '"This party gave my village clean water and proper roads. Our voices were truly heard."',
    't1n': 'Rajendran K.', 't1p': 'Farmer, Madurai',
    't2': '"My daughter received a scholarship. Now she is studying engineering in a top college."',
    't2n': 'Meenakshi S.', 't2p': 'Teacher, Coimbatore',
    't3': '"They built a hospital in our area. My mother got treated for free."',
    't3n': 'Suresh M.', 't3p': 'Business Owner, Chennai',
    'pv1-lbl': 'Your Voice Matters', 'pv1-h': 'EVERY VOTE<br>TELLS A STORY',
    'pv1-p': 'Thousands of citizens have stood with us. Their trust is our strength. Their dreams are our direction.',
    'pv1-btn': 'Become a Member →',
    'j-lbl': 'Be Part of the Change', 'j-h': 'JOIN THE<br>MOVEMENT',
    'j-p': 'Your participation makes the difference. Register as a member, volunteer, or supporter.',
    'js1': 'Active Members', 'js2': 'Districts', 'js3': 'Years of Service', 'js4': 'Transparency',
    'ft': 'REGISTER NOW', 'fs': 'Fill in your details to join us',
    'fl1': 'First Name', 'fl2': 'Last Name', 'fl3': 'Mobile Number', 'fl4': 'District', 'fl5': 'Role',
    'fbtn': 'SUBMIT & JOIN ✓',
    'c-lbl': 'Get In Touch', 'c-h': 'CONTACT US',
    'cl1': 'Headquarters', 'cl2': 'Phone', 'cl3': 'Email',
    'cv1': "People's Voice House, 14 Republic Road,<br>Chennai – 600 001, Tamil Nadu",
    'sl-t': 'Follow Us', 'ol': 'Office Hours',
    'oh': 'Mon – Fri: 9:00 AM – 6:00 PM<br>Saturday: 9:00 AM – 1:00 PM<br>Sunday: Closed',
    'fcopy': "© 2025 The People's Voice. All Rights Reserved."
  },
  ta: {
    'h-badge': 'மக்களுக்காக நிறுவப்பட்டது · 2025',
    'h-l1': 'மக்களால்', 'h-l2': 'மக்களுக்காக,', 'h-l3': 'மக்கள் குரல்',
    'h-sub': 'உண்மை, நீதி, சமத்துவம் என்ற அடிப்படையில் கட்டமைக்கப்பட்ட இயக்கம். நாடின் எதிர்காலத்தை நாம் ஒன்றாக வடிவமைப்போம்.',
    'h-cta1': 'இயக்கத்தில் சேருங்கள்', 'h-cta2': 'எங்கள் நோக்கம் →',
    'h1-lbl': 'எங்கள் நோக்கம்', 'h1-h': 'நீதியில் கட்டமைக்கப்பட்ட<br>நாடு',
    'h1-p': 'வெளிப்படையான ஆட்சி, சம உரிமை, அனைவரையும் உள்ளடக்கிய வளர்ச்சி. இது வெறும் அரசியல் அல்ல.',
    'h1-btn': 'கட்சியை அறிந்து கொள்ளுங்கள் →',
    'ab-lbl': 'நம் கதை', 'ab-h': 'நாளைய<br>கனவு',
    'ab-p': 'நாங்கள் சாதாரண குடிமக்களின் குரல்களிலிருந்து பிறந்த கட்சி. ஒவ்வொரு உரிமையும் பாதுகாக்கப்படும் நாடு கட்டமைப்பதே நோக்கம்.',
    'p1': 'ஜனநாயகம்', 'p1d': 'மக்கள் குரல் ஒவ்வொரு முடிவையும் தீர்மானிக்கிறது.',
    'p2': 'சமத்துவம்', 'p2d': 'அனைவருக்கும் நீதி, வேற்றுமையின்றி.',
    'p3': 'முன்னேற்றம்', 'p3d': 'நவீன தீர்வுகள், உண்மையான சவால்களுக்கு.',
    'p4': 'நேர்மை', 'p4d': 'நேர்மையான தலைமை, எப்போதும் பொறுப்பான.',
    'lname': 'கட்சி தலைவர்', 'lrole': 'தேசிய தலைமை',
    'ab1-lbl': 'தலைமை செய்தி', 'ab1-h': 'அதிகாரம்<br>மக்களுக்கே',
    'ab1-p': 'எங்கள் தலைவர்கள் உங்களில் இருந்தே வருகிறார்கள். ஒவ்வொரு கொள்கையும் உங்கள் பெயரில், உங்கள் எதிர்காலத்திற்காக.',
    'ab1-btn': 'எங்கள் பணிகளை பாருங்கள் →',
    'ac-lbl': 'நாம் செய்தது', 'ac-h': 'நம் சாதனைகள்',
    'a1': 'உள்கட்டமைப்பு திட்டங்கள்', 'a1d': 'அனைத்து மாவட்டங்களிலும் சாலைகள், பாலங்கள்.',
    'a2': 'மாணவர்கள் ஆதரவு', 'a2d': 'தகுதியான இளைஞர்களுக்கு உதவித்தொகை.',
    'a3': 'சுகாதார முகாம்கள்', 'a3d': 'கிராமப்புற சமூகங்களுக்கு இலவச மருத்துவம்.',
    'a4': 'வேலை வாய்ப்புகள்', 'a4d': 'விவசாயம், தொழில்நுட்பம் துறைகளில் வேலை.',
    'a5': 'நடப்பட்ட மரங்கள்', 'a5d': 'சுற்றுச்சூழல் பாதுகாப்பு முயற்சி.',
    'a6': 'மின்சாரம் 100%', 'a6d': 'ஒவ்வொரு வீடும் மின்சாரத்துடன் இணைக்கப்பட்டது.',
    'ac1-lbl': 'உண்மையான தாக்கம்', 'ac1-h': 'நீங்கள் காணும்<br>மாற்றம்',
    'ac1-p': 'ஒவ்வொரு எண்ணும் மாற்றப்பட்ட உயிர்களை குறிக்கிறது. நாங்கள் கொடுத்த வாக்கை காத்தோம்.',
    'ac1-btn': 'மக்களைக் கேளுங்கள் →',
    'pv-lbl': 'மக்கள் பேசுகிறார்கள்', 'pv-h': 'மக்கள் குரல்',
    't1': '"இந்த கட்சி எங்கள் கிராமத்திற்கு சுத்தமான தண்ணீரும் சரியான சாலைகளும் கொடுத்தது."',
    't1n': 'ராஜேந்திரன் க.', 't1p': 'விவசாயி, மதுரை',
    't2': '"என் மகளுக்கு உதவித்தொகை கிடைத்தது. இப்போது அவள் சிறந்த கல்லூரியில் படிக்கிறாள்."',
    't2n': 'மீனாக்ஷி ச.', 't2p': 'ஆசிரியர், கோயம்புத்தூர்',
    't3': '"அவர்கள் மருத்துவமனை கட்டினார்கள். என் அம்மா இலவசமாக சிகிச்சை பெற்றார்."',
    't3n': 'சுரேஷ் ம.', 't3p': 'சிறு வணிகர், சென்னை',
    'pv1-lbl': 'உங்கள் குரல் முக்கியம்', 'pv1-h': 'ஒவ்வொரு வாக்கும்<br>ஒரு கதை',
    'pv1-p': 'ஆயிரக்கணக்கான குடிமக்கள் எங்களுடன் நிற்கிறார்கள். அவர்களின் நம்பிக்கை எங்கள் வலிமை.',
    'pv1-btn': 'உறுப்பினராகுங்கள் →',
    'j-lbl': 'மாற்றத்தின் பகுதியாக இருங்கள்', 'j-h': 'இயக்கத்தில்<br>சேருங்கள்',
    'j-p': 'உங்கள் பங்கு மாற்றத்தை ஏற்படுத்தும். உறுப்பினராக அல்லது தன்னார்வலராக பதிவு செய்யுங்கள்.',
    'js1': 'செயலில் உறுப்பினர்கள்', 'js2': 'மாவட்டங்கள்', 'js3': 'சேவை ஆண்டுகள்', 'js4': 'வெளிப்படைத்தன்மை',
    'ft': 'இப்போதே பதிவு செய்யுங்கள்', 'fs': 'சேர உங்கள் விவரங்களை நிரப்புங்கள்',
    'fl1': 'முதல் பெயர்', 'fl2': 'கடைசி பெயர்', 'fl3': 'மொபைல் எண்', 'fl4': 'மாவட்டம்', 'fl5': 'பங்கு',
    'fbtn': 'சமர்ப்பி & சேர ✓',
    'c-lbl': 'தொடர்பு கொள்ளுங்கள்', 'c-h': 'தொடர்பு',
    'cl1': 'தலைமையகம்', 'cl2': 'தொலைபேசி', 'cl3': 'மின்னஞ்சல்',
    'cv1': 'மக்கள் குரல் மனை, 14 குடியரசு சாலை,<br>சென்னை – 600 001, தமிழ்நாடு',
    'sl-t': 'எங்களை பின்தொடருங்கள்', 'ol': 'அலுவலக நேரம்',
    'oh': 'திங்கள் – வெள்ளி: காலை 9 – மாலை 6<br>சனி: காலை 9 – பகல் 1<br>ஞாயிறு: மூடப்பட்டது',
    'fcopy': '© 2025 மக்கள் குரல். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
  }
};

/* ── NARRATIONS (for speech synthesis) ── */
const NARR = {
  en: [
    ["Welcome to The People's Voice. A movement built on truth, justice, and equality. Together we shape the future of our nation.", "Our mission is to build a nation on justice. We stand for transparent governance, equal rights, and inclusive growth for every citizen."],
    ["Our party was founded from the voices of ordinary citizens. We believe in democracy, equality, progress, and integrity.", "Power belongs to the people. Our leaders serve from within the communities, not from above them."],
    ["From five hundred infrastructure projects to over three hundred thousand jobs, our achievements speak for themselves.", "Every number represents a real life transformed. A child educated. A family with clean water. Our promise kept."],
    ["The people of this nation have spoken. Their voices reflect real change and real hope in every community.", "Thousands of citizens have stood with us. Their trust is our strength. Their dreams are our direction."],
    ["Join the movement. Fifty thousand members strong. Register now and be part of the change our nation deserves."],
    ["Contact us at our headquarters in Chennai. Follow us on social media and stay connected with the voice of the people."]
  ],
  ta: [
    ["மக்கள் குரலுக்கு வரவேற்கிறோம். உண்மை, நீதி, சமத்துவம் என்ற அடிப்படையில் கட்டமைக்கப்பட்ட இயக்கம்.", "நீதியில் நாடை கட்டமைப்பதே எங்கள் நோக்கம். வெளிப்படையான ஆட்சி, சம உரிமை, அனைவரையும் உள்ளடக்கிய வளர்ச்சி."],
    ["ஜனநாயகம், சமத்துவம், முன்னேற்றம், நேர்மை என்ற நான்கு தூண்களில் நாங்கள் நம்பிக்கை கொள்கிறோம்.", "அதிகாரம் மக்களுக்கே சொந்தம். எங்கள் தலைவர்கள் சமூகங்களுக்கு சேவை செய்கிறார்கள்."],
    ["ஐந்நூறு உள்கட்டமைப்பு திட்டங்கள் முதல் மூன்று லட்சம் வேலை வாய்ப்புகள் வரை எங்கள் சாதனைகள் பேசுகின்றன.", "ஒவ்வொரு எண்ணும் ஒரு உயிரை குறிக்கிறது. படித்த குழந்தை. தண்ணீர் பெற்ற குடும்பம். நாங்கள் வாக்கை காத்தோம்."],
    ["இந்த நாட்டின் மக்கள் பேசியுள்ளனர். அவர்களின் குரல் உண்மையான மாற்றத்தை பிரதிபலிக்கிறது.", "ஆயிரக்கணக்கான குடிமக்கள் எங்களுடன் நிற்கிறார்கள். அவர்களின் நம்பிக்கை எங்கள் வலிமை."],
    ["இயக்கத்தில் சேருங்கள். ஐம்பதாயிரம் உறுப்பினர்கள் உள்ளனர். இப்போதே பதிவு செய்யுங்கள்."],
    ["சென்னையில் உள்ள எங்கள் தலைமையகத்தில் தொடர்பு கொள்ளுங்கள். சமூக ஊடகங்களில் பின்தொடருங்கள்."]
  ]
};

/* ── SPEECH SYNTHESIS ── */
function speak(txt) {
  if (isMuted) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = curLang === 'ta' ? 'ta-IN' : 'en-IN';
  u.rate = 0.88; u.pitch = 1; u.volume = 0.9;
  const vv = window.speechSynthesis.getVoices();
  const preferred = vv.find(v =>
    curLang === 'ta'
      ? v.lang.startsWith('ta')
      : (v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
  );
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

function speakCurrent() {
  const arr = NARR[curLang][curSlide];
  const i = itemIdx[curSlide];
  speak(arr[Math.min(i, arr.length - 1)]);
}

function toggleAudio() {
  isMuted = !isMuted;
  document.getElementById('audBtn').textContent = isMuted ? '🔇' : '🔊';
  if (isMuted) {
    window.speechSynthesis.cancel();
  } else {
    speakCurrent();
  }
}

/* ── TIMER ── */
function startTimer() {
  stopTimer();
  const fill = document.getElementById('timer-fill');
  fill.style.transition = 'none';
  fill.style.width = '0%';
  timerStart = performance.now();

  function tick(now) {
    const pct = Math.min(((now - timerStart) / ITEM_DUR) * 100, 100);
    fill.style.width = pct + '%';
    if (pct < 100) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
      autoAdvance();
    }
  }
  rafId = requestAnimationFrame(tick);
}

function stopTimer() {
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  document.getElementById('timer-fill').style.width = '0%';
}

function autoAdvance() {
  const cnt = itemCounts[curSlide];
  const cur = itemIdx[curSlide];
  if (cur < cnt - 1) {
    showItem(curSlide, cur + 1);
  } else if (curSlide < TOTAL - 1) {
    goSlide(curSlide + 1);
  }
  // Last slide, last item: stop (don't loop)
}

/* ── ITEM DISPLAY ── */
function showItem(sIdx, iIdx) {
  const track = document.getElementById('it' + sIdx);
  const h = window.innerHeight - 70;
  track.style.transform = `translateY(-${iIdx * h}px)`;
  itemIdx[sIdx] = iIdx;
  // Mark visible item
  document.querySelectorAll('#s' + sIdx + ' .item').forEach((el, i) =>
    el.classList.toggle('visible', i === iIdx)
  );
  buildDots(sIdx);
  speakCurrent();
  startTimer();
}

/* ── SLIDE NAVIGATION ── */
function goSlide(idx) {
  if (isAnim || idx === curSlide || idx < 0 || idx >= TOTAL) return;
  isAnim = true;
  stopTimer();
  curSlide = idx;
  itemIdx[idx] = 0;
  document.getElementById('sc').style.transform = `translateX(-${curSlide * 100}vw)`;
  updateNav();
  setTimeout(() => { showItem(curSlide, 0); isAnim = false; }, 950);
}

function manualNext() {
  const cnt = itemCounts[curSlide];
  const cur = itemIdx[curSlide];
  if (cur < cnt - 1) { showItem(curSlide, cur + 1); } else { goSlide(curSlide + 1); }
}

function manualPrev() {
  const cur = itemIdx[curSlide];
  if (cur > 0) { showItem(curSlide, cur - 1); } else { goSlide(curSlide - 1); }
}

function updateNav() {
  document.querySelectorAll('.nl').forEach((l, i) => l.classList.toggle('act', i === curSlide));
  // FIX: itemIdx[curSlide] may be 0 on slide change before showItem runs — safe because we reset it above
  document.getElementById('prevBtn').disabled = curSlide === 0 && itemIdx[curSlide] === 0;
  document.getElementById('nextBtn').disabled = curSlide === TOTAL - 1 && itemIdx[curSlide] === itemCounts[curSlide] - 1;
  document.getElementById('curNum').textContent = String(curSlide + 1).padStart(2, '0');
  document.getElementById('prog').style.width = `${((curSlide + 1) / TOTAL) * 100}%`;
}

/* ── DOTS ── */
function buildDots(sIdx) {
  const c = document.getElementById('idots');
  c.innerHTML = '';
  for (let i = 0; i < itemCounts[sIdx]; i++) {
    const d = document.createElement('div');
    d.className = 'idot' + (i === itemIdx[sIdx] ? ' act' : '');
    d.onclick = () => showItem(sIdx, i);
    c.appendChild(d);
  }
}

/* ── LANGUAGE SWITCHER ── */
function setLang(lang) {
  curLang = lang;
  document.querySelectorAll('.lb').forEach(b =>
    b.classList.toggle('act', b.textContent.trim() === (lang === 'en' ? 'EN' : 'தமிழ்'))
  );
  const d = TX[lang];
  Object.entries(d).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  });
  document.querySelectorAll('.nl').forEach(el =>
    el.textContent = el.getAttribute(lang === 'en' ? 'data-en' : 'data-ta')
  );
  speakCurrent();
}

/* ── KEYBOARD NAVIGATION ── */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') manualNext();
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') manualPrev();
});

/* ── TOUCH / SWIPE NAVIGATION ── */
let tx0 = 0, ty0 = 0;
document.addEventListener('touchstart', e => {
  tx0 = e.changedTouches[0].screenX;
  ty0 = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const dx = tx0 - e.changedTouches[0].screenX;
  const dy = ty0 - e.changedTouches[0].screenY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    dx > 0 ? manualNext() : manualPrev();
  } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 40) {
    dy > 0 ? manualNext() : manualPrev();
  }
});

/* ── CUSTOM CURSOR ── */
// FIX: Use direct style property assignment instead of cssText += to avoid
// continuously growing inline style strings on each animation frame.
const CUR_DOT = document.getElementById('cur');
const CUR_RING = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function loop() {
  CUR_DOT.style.left = (mx - 5) + 'px';
  CUR_DOT.style.top  = (my - 5) + 'px';
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  CUR_RING.style.left = (rx - 18) + 'px';
  CUR_RING.style.top  = (ry - 18) + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('button, .nl, .idot, .pillar, .ach-card, .tcard, .sbtn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    CUR_DOT.style.transform = 'scale(2)';
    CUR_RING.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    CUR_DOT.style.transform = '';
    CUR_RING.style.transform = '';
  });
});

/* ── FORM HANDLER ── */
function handleForm() {
  const msg = curLang === 'ta'
    ? 'நன்றி! நீங்கள் வெற்றிகரமாக பதிவு செய்யப்பட்டீர்கள் 🎉'
    : 'Thank you! You have been registered successfully 🎉';
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── INIT ── */
window.addEventListener('load', () => {
  // Hide loader after 1.8s
  setTimeout(() => {
    const l = document.getElementById('loader');
    l.style.transition = 'opacity .7s';
    l.style.opacity = '0';
    setTimeout(() => l.style.display = 'none', 700);
  }, 1800);

  // Start after loader animation
  setTimeout(() => {
    updateNav();
    showItem(0, 0);
    buildDots(0);
    // Wait for voices to be loaded before speaking
    const go = () => setTimeout(speakCurrent, 400);
    if (window.speechSynthesis.getVoices().length > 0) {
      go();
    } else {
      window.speechSynthesis.onvoiceschanged = go;
    }
  }, 2000);
});

// Disable right-click context menu
document.addEventListener('contextmenu', e => e.preventDefault());
