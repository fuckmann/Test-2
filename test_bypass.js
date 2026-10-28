(function () {
  "use strict";

  if (document.getElementById("shortner-aincrad-root")) return;

  const APP_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&display=swap');

  #shortner-aincrad-root {
    position: fixed; inset: 0; z-index: 2147483647; overflow: hidden;
    background-color: #050b14;
    background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    font-family: 'Rajdhani', sans-serif;
    color: #e0f7fa;
    display: flex; justify-content: center; align-items: center;
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  
  /* Background Glows */
  .bg-glow { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; pointer-events: none; }
  .bg-glow.cyan { width: 300px; height: 300px; background: #00ffff; top: -100px; left: -100px; }
  .bg-glow.purple { width: 300px; height: 300px; background: #8a2be2; bottom: -100px; right: -100px; }

  /* Page Transitions */
  .page { position: absolute; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; opacity: 0; visibility: hidden; transform: scale(0.95); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 2; }
  .page.active { opacity: 1; visibility: visible; transform: scale(1); }

  /* Cyber Card Design */
  .cyber-card {
    width: min(400px, 100%);
    background: rgba(5, 15, 25, 0.85);
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 16px;
    padding: 35px 25px;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    display: flex; flex-direction: column; align-items: center;
    max-height: 85vh; /* Limits height for scrolling */
  }
  
  /* Card Scrollable Area */
  .card-scroll-area {
    width: 100%;
    overflow-y: auto;
    padding-right: 5px;
  }
  .card-scroll-area::-webkit-scrollbar { width: 6px; }
  .card-scroll-area::-webkit-scrollbar-thumb { background: #00ffff; border-radius: 10px; }

  /* Neon Corners */
  .corner { position: absolute; width: 20px; height: 20px; border-radius: 4px; pointer-events: none; }
  .c-tl { top: -2px; left: -2px; border-top: 3px solid #00ffff; border-left: 3px solid #00ffff; box-shadow: -4px -4px 10px rgba(0,255,255,0.5); }
  .c-tr { top: -2px; right: -2px; border-top: 3px solid #8a2be2; border-right: 3px solid #8a2be2; box-shadow: 4px -4px 10px rgba(138,43,226,0.5); }
  .c-bl { bottom: -2px; left: -2px; border-bottom: 3px solid #8a2be2; border-left: 3px solid #8a2be2; box-shadow: -4px 4px 10px rgba(138,43,226,0.5); }
  .c-br { bottom: -2px; right: -2px; border-bottom: 3px solid #00ffff; border-right: 3px solid #00ffff; box-shadow: 4px 4px 10px rgba(0,255,255,0.5); }

  /* Typography */
  h1 { font-family: 'Orbitron', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: 4px; margin: 15px 0 5px; color: #fff; text-shadow: 0 0 10px #00ffff; text-align: center; }
  .sub { font-size: 14px; letter-spacing: 2px; color: #00ffff; margin-bottom: 25px; text-align: center; text-transform: uppercase; font-weight: 700; }

  /* Logo */
  .logo-box { width: 90px; height: 90px; border-radius: 50%; border: 2px dashed #00ffff; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 20px rgba(0,255,255,0.3), inset 0 0 15px rgba(0,255,255,0.2); animation: pulseGlow 2s infinite alternate; margin: 0 auto; }
  .logo-box svg { width: 45px; height: 45px; fill: #00ffff; filter: drop-shadow(0 0 5px #00ffff); }
  @keyframes pulseGlow { from { box-shadow: 0 0 10px rgba(0,255,255,0.2), inset 0 0 10px rgba(0,255,255,0.1); } to { box-shadow: 0 0 25px rgba(0,255,255,0.5), inset 0 0 20px rgba(0,255,255,0.4); border-color: #8a2be2; } }

  /* Inputs */
  .cyber-input { width: 100%; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 8px; padding: 15px; color: #fff; font-family: 'Orbitron', sans-serif; font-size: 14px; text-align: center; letter-spacing: 2px; margin-bottom: 15px; outline: none; transition: all 0.3s; box-shadow: inset 0 0 10px rgba(0,0,0,0.8); }
  .cyber-input:focus { border-color: #00ffff; box-shadow: 0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.2); }
  .cyber-input::placeholder { color: rgba(255, 255, 255, 0.3); }

  /* Buttons */
  button { width: 100%; padding: 16px; border-radius: 8px; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 2px; cursor: pointer; border: none; outline: none; transition: all 0.2s; position: relative; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; gap: 10px; }
  button:active { transform: scale(0.96); }
  
  .btn-primary { background: linear-gradient(90deg, #00ffff, #0055ff, #8a2be2); background-size: 200% 200%; color: #fff; box-shadow: 0 5px 15px rgba(138,43,226,0.4); animation: gradMove 3s ease infinite; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
  .btn-secondary { background: rgba(255, 255, 255, 0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); backdrop-filter: blur(5px); }
  .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); border-color: #00ffff; box-shadow: 0 0 10px rgba(0,255,255,0.2); }
  
  @keyframes gradMove { 0% {background-position: 0% 50%} 50% {background-position: 100% 50%} 100% {background-position: 0% 50%} }

  /* Time Selection Grid */
  .time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
  .time-btn { background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff; color: #00ffff; padding: 12px 0; margin: 0; font-size: 20px; border-radius: 8px; box-shadow: inset 0 0 5px rgba(0,255,255,0.2); }
  .time-btn:hover, .time-btn.selected { background: #00ffff; color: #000; box-shadow: 0 0 15px #00ffff; }
  
  .divider { display: flex; align-items: center; text-align: center; color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0 20px; letter-spacing: 2px; }
  .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px dashed rgba(255,255,255,0.2); margin: 0 10px; }

  /* Unknown Style Reactor (Processing) */
  .reactor-container { position: relative; width: 160px; height: 160px; margin: 20px auto 40px; display: flex; justify-content: center; align-items: center; }
  .ring { position: absolute; border-radius: 50%; border: 2px solid transparent; }
  .ring-1 { width: 100%; height: 100%; border-top: 2px solid #00ffff; border-bottom: 2px solid #8a2be2; animation: spin 2s linear infinite; }
  .ring-2 { width: 80%; height: 80%; border-left: 2px dashed #ff00ff; border-right: 2px dashed #00ffff; animation: spin-reverse 3s linear infinite; }
  .ring-3 { width: 60%; height: 60%; border-top: 2px dotted #fff; border-bottom: 2px dotted #fff; animation: spin 1.5s linear infinite; }
  .core { font-family: 'Orbitron', sans-serif; font-size: 32px; font-weight: 900; color: #fff; text-shadow: 0 0 15px #00ffff; }
  
  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }

  /* Progress Bar */
  .progress-wrap { width: 100%; background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 20px; height: 24px; padding: 3px; position: relative; margin-bottom: 10px; box-shadow: inset 0 0 10px rgba(0,0,0,0.8); overflow: hidden; }
  .progress-fill { height: 100%; width: 0%; border-radius: 20px; background: linear-gradient(90deg, #00ffff, #0055ff, #8a2be2, #ff00ff); background-size: 300% 100%; animation: gradMove 2s linear infinite; transition: width 0.3s linear; box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
  .progress-text-label { text-align: center; font-size: 12px; letter-spacing: 2px; color: #00ffff; font-weight: 700; }

  /* Footer Stylish Text */
  .footer-box { margin-top: 25px; display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; }
  .footer-line { width: 80%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent); margin-bottom: 10px; }
  .arafat-text { 
    font-family: 'Orbitron', sans-serif; 
    font-size: 16px; 
    font-weight: 900; 
    letter-spacing: 3px;
    background: linear-gradient(90deg, #00ffff, #8a2be2, #ff00ff, #00ffff);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradMove 3s linear infinite, glowPulse 2s ease-in-out infinite;
    text-transform: uppercase;
  }
  @keyframes glowPulse { 0%, 100% { filter: drop-shadow(0 0 5px rgba(0,255,255,0.5)); } 50% { filter: drop-shadow(0 0 15px rgba(255,0,255,0.8)); } }

  /* Toast Notification */
  .cyber-toast-wrap { position: fixed; top: 20px; right: 20px; z-index: 9999; pointer-events: none; display: flex; flex-direction: column; gap: 10px; }
  .cyber-toast { width: 300px; background: rgba(5, 15, 25, 0.9); border-left: 4px solid #00ffff; padding: 15px; border-radius: 4px; box-shadow: 0 5px 15px rgba(0,0,0,0.5), 0 0 10px rgba(0,255,255,0.2); display: flex; align-items: center; gap: 15px; transform: translateX(120%); opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); backdrop-filter: blur(5px); }
  .cyber-toast.show { transform: translateX(0); opacity: 1; }
  .toast-icon { font-size: 20px; color: #00ffff; text-shadow: 0 0 5px #00ffff; }
  .cyber-toast.error { border-left-color: #ff003c; }
  .cyber-toast.error .toast-icon { color: #ff003c; text-shadow: 0 0 5px #ff003c; }
  .toast-title { font-size: 14px; font-weight: 900; color: #fff; letter-spacing: 1px; }
  .toast-msg { font-size: 12px; color: #aaa; margin-top: 3px; }
  
  /* Loading Spinner */
  .spinner { display: none; width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 10px; }
  .btn-primary.loading .spinner { display: inline-block; }
  .btn-primary.loading .btn-text { display: none; }
  `;

  const APP_MARKUP = \`
  <div class="bg-glow cyan"></div>
  <div class="bg-glow purple"></div>

  <div class="cyber-toast-wrap" id="toastWrap"></div>

  <!-- LOGIN PAGE -->
  <section id="loginPage" class="page active">
    <div class="cyber-card">
      <div class="corner c-tl"></div><div class="corner c-tr"></div><div class="corner c-bl"></div><div class="corner c-br"></div>
      
      <div class="logo-box">
        <svg viewBox="0 0 24 24"><path d="M12 2L3 7l9 5 9-5-9-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00ffff" stroke-width="2" fill="none" stroke-linejoin="round"/></svg>
      </div>
      
      <h1>SHORTNER</h1>
      <div class="sub">Access Gateway</div>

      <input id="accessKey" type="text" class="cyber-input" placeholder="ENTER ACCESS KEY" autocomplete="off" spellcheck="false">
      
      <button id="btnStart" class="btn-primary">
        <span class="spinner"></span>
        <span class="btn-text">START</span>
      </button>
      
      <button id="btnTelegram" class="btn-secondary">
        <svg style="width:18px;height:18px;fill:#fff;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.11.03-1.84 1.18-5.2 3.45-.49.34-.94.5-1.35.49-.45-.01-1.32-.26-1.96-.47-.79-.26-1.42-.39-1.37-.83.03-.22.35-.45.96-.69 3.76-1.64 6.27-2.72 7.53-3.24 3.58-1.49 4.33-1.75 4.82-1.76.11 0 .35.03.5.15.13.1.17.24.19.34.02.13.03.26.02.32z"/></svg>
        JOIN TELEGRAM
      </button>

      <div class="footer-box">
        <div class="footer-line"></div>
        <div class="arafat-text">SHORTNER BY ARAFAT</div>
      </div>
    </div>
  </section>

  <!-- TIME SELECTION PAGE -->
  <section id="timePage" class="page">
    <div class="cyber-card">
      <div class="corner c-tl"></div><div class="corner c-tr"></div><div class="corner c-bl"></div><div class="corner c-br"></div>
      
      <h1>SELECT TIME</h1>
      <div class="sub">Processing Duration</div>

      <div class="card-scroll-area">
        <div class="time-grid">
          <button class="time-btn" data-time="20">20s</button>
          <button class="time-btn" data-time="30">30s</button>
          <button class="time-btn" data-time="40">40s</button>
        </div>

        <div class="divider">INPUT MANUAL</div>
        
        <input id="manualTime" type="number" class="cyber-input" placeholder="ENTER SECONDS (e.g. 15)" min="1" max="999">
        
        <button id="btnStartProcess" class="btn-primary">START PROCESS</button>
        <button id="btnBackToLogin" class="btn-secondary" style="margin-top: 10px; padding: 10px; font-size: 14px;">BACK</button>
      </div>

      <div class="footer-box">
        <div class="footer-line"></div>
        <div class="arafat-text">SHORTNER BY ARAFAT</div>
      </div>
    </div>
  </section>

  <!-- PROCESSING PAGE -->
  <section id="processPage" class="page">
    <div class="cyber-card">
      <div class="corner c-tl"></div><div class="corner c-tr"></div><div class="corner c-bl"></div><div class="corner c-br"></div>
      
      <h1>PROCESSING</h1>
      <div class="sub">Establishing Connection</div>

      <div class="reactor-container">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
        <div class="core" id="countdownDisplay">0</div>
      </div>

      <div class="progress-wrap">
        <div class="progress-fill" id="progressBar"></div>
      </div>
      <div class="progress-text-label" id="progressText">0%</div>

      <div class="footer-box" style="margin-top: 40px;">
        <div class="footer-line"></div>
        <div class="arafat-text">SHORTNER BY ARAFAT</div>
      </div>
    </div>
  </section>
  \`;

  // Inject CSS and HTML
  const style = document.createElement("style");
  style.id = "shortner-aincrad-styles";
  style.textContent = APP_CSS;
  (document.head || document.documentElement).appendChild(style);

  const root = document.createElement("div");
  root.id = "shortner-aincrad-root";
  root.innerHTML = APP_MARKUP;
  (document.body || document.documentElement).appendChild(root);

  // --- LOGIC & FUNCTIONALITY ---
  
  const LICENSE_API_URL = "https://licensedevices.akhildotto338.workers.dev/api/trpc/license.validate";
  const SCRIPT_NAME = "AINCRAD";
  const DEVICE_STORAGE_KEY = "aincrad_device_id";
  const SAVED_KEY_STORAGE = "aincrad_saved_key";
  const SUPPORTED_DOMAINS = ["tarviral.com", "rodaemotor.com", "donpviral.xyz"];
  
  // UI Elements
  const pages = {
    login: document.getElementById('loginPage'),
    time: document.getElementById('timePage'),
    process: document.getElementById('processPage')
  };
  const keyInput = document.getElementById('accessKey');
  const btnStart = document.getElementById('btnStart');
  const manualTimeInput = document.getElementById('manualTime');
  const timeBtns = document.querySelectorAll('.time-btn');
  
  let selectedTime = 0;
  let finalDestination = null;
  let apiRequestDone = false;

  // Notification System
  function showToast(title, message, type = "success") {
    const wrap = document.getElementById('toastWrap');
    const toast = document.createElement('div');
    toast.className = \`cyber-toast \${type}\`;
    const icon = type === 'success' ? '✓' : '✗';
    
    toast.innerHTML = \`
      <div class="toast-icon">\${icon}</div>
      <div>
        <div class="toast-title">\${title}</div>
        <div class="toast-msg">\${message}</div>
      </div>
    \`;
    
    wrap.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400); // Wait for transition
    }, 3000);
  }

  function switchPage(pageName) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[pageName].classList.add('active');
  }

  // Device ID logic
  function getDeviceId(){
    let id = localStorage.getItem(DEVICE_STORAGE_KEY);
    if(!id){
      const seed = [screen.width+"x"+screen.height, navigator.userAgent, Date.now(), Math.random()].join("###");
      id = "WEB_" + Array.from(new TextEncoder().encode(seed)).map(b=>b.toString(16).padStart(2,"0")).join("").slice(0,32);
      localStorage.setItem(DEVICE_STORAGE_KEY, id);
    }
    return id;
  }

  // API Logic
  async function verifyLicense(licenseKey){
    try{
      const response = await fetch(LICENSE_API_URL, {
        method: "POST", 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({licenseKey, hwid: getDeviceId(), scriptName: SCRIPT_NAME})
      });
      const resJson = await response.json();
      const data = resJson?.result?.data;
      if(!data) return {allowed:false, message:"Invalid server response"};
      if(data.allowed) return {allowed:true, data};
      return {allowed:false, message: data.message || "License Access Denied"};
    }catch(error){
      return {allowed:false, message: "Network error: Unable to connect"};
    }
  }

  // Initial Load - Check for saved key
  const savedKey = localStorage.getItem(SAVED_KEY_STORAGE);
  if (savedKey) {
    keyInput.value = savedKey;
  }

  // Start/Login Button Click
  btnStart.addEventListener('click', async () => {
    const key = keyInput.value.trim();
    if (!key) {
      showToast("ERROR", "Please enter Access Key", "error");
      return;
    }

    btnStart.classList.add('loading');
    btnStart.disabled = true;

    const result = await verifyLicense(key);

    btnStart.classList.remove('loading');
    btnStart.disabled = false;

    if (result.allowed) {
      showToast("SUCCESS", "Key verified successfully");
      localStorage.setItem(SAVED_KEY_STORAGE, key); // Save key
      setTimeout(() => switchPage('time'), 500);
    } else {
      showToast("ACCESS DENIED", result.message, "error");
    }
  });

  // Telegram Button
  document.getElementById('btnTelegram').addEventListener('click', () => {
    location.href = "https://t.me/+Qjrl3DUTGVU2MWZl";
  });

  // Back Button in Time Page
  document.getElementById('btnBackToLogin').addEventListener('click', () => {
    switchPage('login');
  });

  // Time Selection Logic
  timeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      timeBtns.forEach(b => b.classList.remove('selected'));
      e.target.classList.add('selected');
      manualTimeInput.value = ''; // clear manual if preset is clicked
      selectedTime = parseInt(e.target.getAttribute('data-time'));
    });
  });

  manualTimeInput.addEventListener('input', (e) => {
    if (e.target.value) {
      timeBtns.forEach(b => b.classList.remove('selected'));
      selectedTime = parseInt(e.target.value);
    }
  });

  // Start Process Button
  document.getElementById('btnStartProcess').addEventListener('click', () => {
    if (!selectedTime || selectedTime <= 0) {
      showToast("INVALID TIME", "Please select or input valid time", "error");
      return;
    }
    startProcessing();
  });

  // Destination Fetching Logic (From original code)
  function getCurrentDomain(){
    const host = location.host.toLowerCase();
    return SUPPORTED_DOMAINS.find(d => host.includes(d)) || null;
  }
  
  function parseDestination(text){
    let dest = null;
    text.trim().split("\\n").forEach(line => {
      try{
        const j = JSON.parse(line);
        dest = j?.json?.[2]?.[0]?.[0]?.destinationLink || j?.json?.[2]?.[0]?.[0]?.url || dest;
      }catch(e){}
    });
    return dest;
  }

  async function fetchTargetUrl() {
    try {
      const domain = getCurrentDomain();
      if(!domain) throw new Error("Domain not supported");
      
      const proto = location.protocol;
      const sessionRes = await fetch(\`\${proto}//\${domain}/api/session-info\`, {credentials:"include"});
      if(!sessionRes.ok) throw new Error("Session failed");
      const sessionData = await sessionRes.json();
      if(!sessionData.sessionToken) throw new Error("No token");

      const input = encodeURIComponent(JSON.stringify({"0":{"json":{"token":sessionData.sessionToken,"progress":sessionData.totalStage+1,"stageId":sessionData.stageId}}}));
      const bypassRes = await fetch(\`\${proto}//\${domain}/api/trpc/linkSession.nextStage?batch=1&input=\${input}\`, {credentials:"include", headers:{"trpc-accept":"application/jsonl","x-trpc-source":"nextjs-react"}});
      
      const dest = parseDestination(await bypassRes.text());
      if(dest) {
        finalDestination = dest;
        apiRequestDone = true;
      } else {
        throw new Error("No destination found");
      }
    } catch (e) {
      showToast("PROCESS ERROR", e.message, "error");
      apiRequestDone = true; // Set to true so timer doesn't hang forever, but dest is null
    }
  }

  // Processing Timer Logic
  function startProcessing() {
    switchPage('process');
    finalDestination = null;
    apiRequestDone = false;
    
    // Start fetching url in background
    fetchTargetUrl();

    const startTime = performance.now();
    const durationMs = selectedTime * 1000;
    const progressFill = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const countdownDisplay = document.getElementById('countdownDisplay');

    function update() {
      const elapsed = performance.now() - startTime;
      let percent = Math.floor((elapsed / durationMs) * 100);
      let timeLeft = Math.ceil((durationMs - elapsed) / 1000);

      if (percent >= 100) percent = 100;
      if (timeLeft <= 0) timeLeft = 0;

      progressFill.style.width = \`\${percent}%\`;
      progressText.innerText = \`PROCESSING \${percent}%\`;
      countdownDisplay.innerText = timeLeft;

      if (elapsed < durationMs) {
        requestAnimationFrame(update);
      } else {
        // Timer done, wait for API if not finished
        checkAndRedirect();
      }
    }
    requestAnimationFrame(update);
  }

  function checkAndRedirect() {
    if (!apiRequestDone) {
      showToast("WAITING", "Finalizing connection...");
      setTimeout(checkAndRedirect, 1000);
      return;
    }
    if (finalDestination) {
      showToast("SUCCESS", "Redirecting now...");
      setTimeout(() => {
        location.href = finalDestination;
      }, 500);
    } else {
      showToast("FAILED", "Could not get destination link", "error");
      setTimeout(() => switchPage('time'), 2000);
    }
  }

})();