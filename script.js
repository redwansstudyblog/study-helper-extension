// ═══════════════════════════════════════════════
//  STUDY HELPER v3 — script.js
// ═══════════════════════════════════════════════

const DEEPSEEK_API_KEY = "sk-922c03c67a664b7aad0ebefc3254c798"; // ← তোমার DeepSeek key এখানে

// ─── Language System ──────────────────────────────────────
const TEXT = {
  en: {
    title:"📚 Study Helper", todayStats:"Today: {n} min",
    studyPhase:"📖 Study Phase", breakPhase:"☕ Break Time",
    allDone:"✅ All Rounds Done!",
    study:"Study", break:"Break", rounds:"Rounds",
    start:"▶ Start", skip:"⏭ Skip", reset:"↺ Reset", running:"Running...",
    blockOn:"Block: ON", blockOff:"Block: OFF", toggle:"Toggle",
    tasks:"📝 Tasks", taskPlaceholder:"Add task...",
    blocklist:"🌐 Block List", sitePlaceholder:"e.g. youtube.com",
    ai:"🤖 AI Tools", summarize:"Summarize", explain:"Explain", loading:"Loading...",
    round:"Round", of:"/",
    statsTodayLabel:"Today's minutes", streakLabel:"Day streak",
    statsTitle:"📈 Weekly Stats", historyTitle:"📋 Session History",
    waterLabel:"💧 Water Reminder", waterSub:"every 30 min",
    scheduleTitle:"⏰ Auto-Start", scheduleSet:"Set", scheduleClear:"Cancel",
    pinTitle:"🔒 Block List Lock", pinSet:"Set", pinRemove:"Remove",
    pinPlaceholder:"4-digit PIN", unlockPlaceholder:"Enter PIN", unlock:"Unlock 🔓",
    statusSessionDone:"✅ Session done! Block OFF.",
    statusReset:"↺ Reset done.", statusBlockLocked:"🔒 Locked! Enter PIN first.",
    statusWrongPin:"❌ Wrong PIN!", statusPinSet:"✅ PIN set!",
    statusPinRemoved:"🔓 PIN removed.", statusScheduleSet:"✅ Auto-start set for {t}",
    statusScheduleCleared:"Auto-start cleared.", statusAllDone:"🏆 All rounds complete!",
    notifStudyDone:"📖 Study Done!", notifStudyMsg:"Time for a break!",
    notifBreakDone:"☕ Break Over!", notifBreakMsg:"Next round starting. Focus!",
    notifWaterTitle:"💧 Drink Water!", notifWaterMsg:"Stay hydrated! Take a sip.",
    notifScheduleTitle:"⏰ Time to Study!", notifScheduleMsg:"Scheduled session starting.",
    days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    quotes:["Stay focused 💪","No pain, no gain 🔥","You can do it 🚀","One step at a time 📖","Today's effort = tomorrow's success ⭐"],
  },
  bn: {
    title:"📚 স্টাডি হেলপার", todayStats:"আজ: {n} মিনিট",
    studyPhase:"📖 পড়ার সময়", breakPhase:"☕ বিরতির সময়",
    allDone:"✅ সব Round শেষ!",
    study:"পড়া", break:"বিরতি", rounds:"Round",
    start:"▶ শুরু", skip:"⏭ Skip", reset:"↺ Reset", running:"চলছে...",
    blockOn:"Block: চালু", blockOff:"Block: বন্ধ", toggle:"Toggle",
    tasks:"📝 কাজের তালিকা", taskPlaceholder:"কাজ যোগ করো...",
    blocklist:"🌐 Block তালিকা", sitePlaceholder:"যেমন: youtube.com",
    ai:"🤖 AI সহায়তা", summarize:"সারসংক্ষেপ", explain:"বুঝিয়ে দাও", loading:"লোড হচ্ছে...",
    round:"Round", of:"/",
    statsTodayLabel:"আজকের মিনিট", streakLabel:"দিনের streak",
    statsTitle:"📈 সাপ্তাহিক পরিসংখ্যান", historyTitle:"📋 সেশনের ইতিহাস",
    waterLabel:"💧 পানির রিমাইন্ডার", waterSub:"প্রতি ৩০ মিনিটে",
    scheduleTitle:"⏰ অটো-স্টার্ট", scheduleSet:"সেট", scheduleClear:"বাতিল",
    pinTitle:"🔒 Block তালিকা লক", pinSet:"সেট", pinRemove:"মুছো",
    pinPlaceholder:"৪ সংখ্যার PIN", unlockPlaceholder:"PIN দাও", unlock:"Unlock 🔓",
    statusSessionDone:"✅ Session শেষ! Block বন্ধ হয়েছে।",
    statusReset:"↺ Reset হয়ে গেছে।", statusBlockLocked:"🔒 লক! আগে PIN দাও।",
    statusWrongPin:"❌ ভুল PIN!", statusPinSet:"✅ PIN সেট হয়েছে!",
    statusPinRemoved:"🔓 PIN মুছে গেছে।", statusScheduleSet:"✅ অটো-স্টার্ট সেট: {t}",
    statusScheduleCleared:"অটো-স্টার্ট বাতিল।", statusAllDone:"🏆 সব round শেষ! দারুণ!",
    notifStudyDone:"📖 পড়া শেষ!", notifStudyMsg:"বিরতির সময়!",
    notifBreakDone:"☕ বিরতি শেষ!", notifBreakMsg:"পরের round শুরু হচ্ছে।",
    notifWaterTitle:"💧 পানি পান করো!", notifWaterMsg:"শরীর সুস্থ রাখো! এক চুমুক পানি।",
    notifScheduleTitle:"⏰ পড়ার সময় হয়েছে!", notifScheduleMsg:"নির্ধারিত session শুরু হচ্ছে।",
    days:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"],
    quotes:["মনোযোগ দিয়ে পড়ো 💪","কষ্ট ছাড়া সাফল্য নেই 🔥","তুমি পারবে 🚀","এক পদক্ষেপ এক সময়ে 📖","আজকের পরিশ্রম কালকের সাফল্য ⭐"],
  }
};

let lang = "bn";
function t(key, vars = {}) {
  let str = TEXT[lang][key] || TEXT.en[key] || key;
  for (const [k,v] of Object.entries(vars)) str = str.replace(`{${k}}`, v);
  return str;
}

// ─── Elements ─────────────────────────────────────────────
const timeEl       = document.getElementById("time");
const phaseBadge   = document.getElementById("phaseBadge");
const roundInfo    = document.getElementById("roundInfo");
const startBtn     = document.getElementById("start");
const skipBtn      = document.getElementById("skipPhase");
const resetBtn     = document.getElementById("stopReset");
const toggleBtn    = document.getElementById("toggleBlock");
const blockDot     = document.getElementById("blockDot");
const blockLabel   = document.getElementById("blockLabel");
const statusMsg    = document.getElementById("statusMsg");
const statsMini    = document.getElementById("statsMini");
const resultBox    = document.getElementById("result");

// ─── Pomodoro State ───────────────────────────────────────
let studyMins = 25, breakMins = 5, totalRounds = 4;
let currentRound = 1, isStudyPhase = true;
let time = studyMins * 60, timer = null, running = false;
let studySecondsThisRound = 0;

function formatTime(s) { let m=Math.floor(s/60); let sec=s%60; return `${m}:${sec<10?"0":""}${sec}`; }
function getSettings() {
  studyMins   = parseInt(document.getElementById("studyMins").value)   || 25;
  breakMins   = parseInt(document.getElementById("breakMins").value)   || 5;
  totalRounds = parseInt(document.getElementById("totalRounds").value) || 4;
}
function updateTimerUI() {
  timeEl.innerText = formatTime(time);
  roundInfo.innerText = `${t("round")} ${currentRound} ${t("of")} ${totalRounds}`;
  if (isStudyPhase) { phaseBadge.innerText = t("studyPhase"); phaseBadge.className = "phase-badge study"; }
  else              { phaseBadge.innerText = t("breakPhase"); phaseBadge.className = "phase-badge break"; }
}
function showStatus(msg, dur = 3000) {
  statusMsg.innerText = msg;
  if (dur) setTimeout(() => { if (statusMsg.innerText === msg) statusMsg.innerText = ""; }, dur);
}

// ─── Sound ────────────────────────────────────────────────
function playBeep(type = "study") {
  try {
    const ctx = new AudioContext();
    const freqs = type === "study" ? [523,659,784] : [784,659,523];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      const t0 = ctx.currentTime + i * 0.2;
      gain.gain.setValueAtTime(0.35, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.3);
      osc.start(t0); osc.stop(t0 + 0.3);
    });
  } catch(e) {}
}

// ─── Notification ─────────────────────────────────────────
function notify(title, message) {
  chrome.notifications.create("n_" + Date.now(), {
    type:"basic", iconUrl:"icon48.png", title, message, priority:2
  });
}

// ─── Stats ────────────────────────────────────────────────
function todayKey() { return "stats_" + new Date().toISOString().slice(0,10); }

function addStudyMinutes(mins) {
  if (mins < 1) return;
  chrome.storage.local.get([todayKey(), "studyStats", "sessions"], (d) => {
    const stats = d.studyStats || {};
    const key = todayKey();
    stats[key] = (stats[key] || 0) + mins;
    const sessions = d.sessions || [];
    const now = new Date();
    sessions.unshift({ date: now.toLocaleDateString(), time: now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}), mins });
    if (sessions.length > 20) sessions.pop();
    chrome.storage.local.set({ studyStats: stats, sessions }, loadStats);
  });
}

function loadStats() {
  chrome.storage.local.get(["studyStats", "sessions"], (d) => {
    const stats = d.studyStats || {};
    const todayMins = stats[todayKey()] || 0;
    statsMini.innerText = t("todayStats", { n: todayMins });
    document.getElementById("statsTodayNum").innerText = todayMins;

    // Streak
    let streak = 0, check = new Date();
    while (true) {
      const k = "stats_" + check.toISOString().slice(0,10);
      if (stats[k] && stats[k] > 0) { streak++; check.setDate(check.getDate()-1); }
      else break;
    }
    document.getElementById("streakNum").innerText = streak + " 🔥";

    // Week Chart
    buildWeekChart(stats);

    // Session history
    const hist = document.getElementById("sessionHistory");
    hist.innerHTML = "";
    (d.sessions || []).slice(0,8).forEach(s => {
      const div = document.createElement("div");
      div.className = "session-item";
      div.innerHTML = `<span>${s.date} ${s.time}</span><span style="color:#38bdf8">${s.mins} min</span>`;
      hist.appendChild(div);
    });
    if (!(d.sessions || []).length) hist.innerHTML = `<div style="color:#475569;font-size:11px;padding:6px">কোনো session নেই এখনো</div>`;
  });
}

function buildWeekChart(stats) {
  const chart = document.getElementById("weekChart");
  const labels = document.getElementById("chartLabels");
  chart.innerHTML = ""; labels.innerHTML = "";
  const days = t("days");
  const today = new Date();
  const vals = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = "stats_" + d.toISOString().slice(0,10);
    vals.push({ mins: stats[k] || 0, dayName: days[d.getDay()], isToday: i === 0 });
  }
  const maxVal = Math.max(...vals.map(v => v.mins), 1);
  vals.forEach(v => {
    const wrap = document.createElement("div");
    wrap.className = "chart-bar-wrap";
    const bar = document.createElement("div");
    const heightPct = Math.max((v.mins / maxVal) * 100, v.mins > 0 ? 8 : 4);
    bar.className = "chart-bar" + (v.isToday ? " today" : "");
    bar.style.height = heightPct + "%";
    bar.setAttribute("data-min", v.mins);
    wrap.appendChild(bar);
    chart.appendChild(wrap);
    const lbl = document.createElement("div");
    lbl.innerText = v.dayName;
    labels.appendChild(lbl);
  });
}

// ─── Block Control ────────────────────────────────────────
function setBlock(state) {
  chrome.storage.sync.set({ block: state });
  blockLabel.innerText = state ? t("blockOn") : t("blockOff");
  if (state) { blockDot.classList.add("on"); toggleBtn.classList.add("block-on"); }
  else       { blockDot.classList.remove("on"); toggleBtn.classList.remove("block-on"); }
}
chrome.storage.sync.get("block", (d) => {
  blockLabel.innerText = d.block ? t("blockOn") : t("blockOff");
  if (d.block) { blockDot.classList.add("on"); toggleBtn.classList.add("block-on"); }
});
toggleBtn.addEventListener("click", () => {
  if (running && isStudyPhase) { showStatus("⛔ " + t("statusBlockLocked")); return; }
  chrome.storage.sync.get("block", (d) => setBlock(!d.block));
});

// ─── Pomodoro Logic ───────────────────────────────────────
function endStudyPhase() {
  addStudyMinutes(Math.round(studySecondsThisRound / 60));
  studySecondsThisRound = 0;
  playBeep("study");
  notify(t("notifStudyDone"), `${t("round")} ${currentRound} ${t("notifStudyMsg")}`);
  setBlock(false);
  if (currentRound >= totalRounds) {
    running = false; clearInterval(timer); timer = null;
    startBtn.innerText = t("start");
    timeEl.innerText = "🎉"; phaseBadge.innerText = t("allDone");
    showStatus(t("statusAllDone"), 0);
    return;
  }
  isStudyPhase = false; time = breakMins * 60; updateTimerUI();
  showStatus("☕ Break শুরু! Block বন্ধ।");
}

function endBreakPhase() {
  playBeep("break");
  notify(t("notifBreakDone"), t("notifBreakMsg"));
  currentRound++; isStudyPhase = true; time = studyMins * 60;
  setBlock(true); updateTimerUI();
  showStatus(`📖 ${t("round")} ${currentRound} শুরু! Block চালু।`);
}

startBtn.addEventListener("click", () => {
  if (running) return;
  getSettings();
  if (!timer) { currentRound=1; isStudyPhase=true; time=studyMins*60; studySecondsThisRound=0; updateTimerUI(); }
  running = true; startBtn.innerText = t("running");
  setBlock(true); showStatus("📖 পড়া শুরু! Block চালু।");
  timer = setInterval(() => {
    time--;
    if (isStudyPhase) studySecondsThisRound++;
    updateTimerUI();
    if (time <= 0) { if (isStudyPhase) endStudyPhase(); else endBreakPhase(); }
    if (!running) { clearInterval(timer); timer = null; startBtn.innerText = t("start"); }
  }, 1000);
});

skipBtn.addEventListener("click", () => {
  if (!running) return;
  if (isStudyPhase) endStudyPhase(); else endBreakPhase();
  if (!running) { clearInterval(timer); timer = null; startBtn.innerText = t("start"); }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer); timer = null; running = false;
  currentRound=1; isStudyPhase=true; studySecondsThisRound=0;
  getSettings(); time = studyMins * 60;
  startBtn.innerText = t("start"); setBlock(false); updateTimerUI();
  showStatus(t("statusReset"));
});

// ─── Auto-start from alarm ────────────────────────────────
chrome.storage.local.get("pendingAutoStart", (d) => {
  if (d.pendingAutoStart) {
    chrome.storage.local.set({ pendingAutoStart: false });
    setTimeout(() => startBtn.click(), 500);
  }
});

// ─── Task List ────────────────────────────────────────────
function loadTasks() {
  chrome.storage.local.get("tasks", (d) => {
    document.getElementById("taskList").innerHTML = "";
    (d.tasks || []).forEach(task => renderTask(task));
  });
}
function saveTasks() {
  const tasks = [...document.getElementById("taskList").querySelectorAll("li")].map(li => ({
    text: li.querySelector(".task-text").innerText, done: li.classList.contains("done")
  }));
  chrome.storage.local.set({ tasks });
}
function renderTask(task) {
  const li = document.createElement("li");
  if (task.done) li.classList.add("done");
  const tick = document.createElement("span");
  tick.className = "tick"; tick.innerText = task.done ? "✅" : "⬜";
  tick.addEventListener("click", () => { li.classList.toggle("done"); tick.innerText = li.classList.contains("done")?"✅":"⬜"; saveTasks(); });
  const span = document.createElement("span"); span.className="task-text"; span.innerText=task.text;
  const del = document.createElement("span"); del.className="del"; del.innerText="✕";
  del.addEventListener("click", () => { li.remove(); saveTasks(); });
  li.appendChild(tick); li.appendChild(span); li.appendChild(del);
  document.getElementById("taskList").appendChild(li);
}
document.getElementById("addTask").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", e => { if(e.key==="Enter") addTask(); });
function addTask() {
  const inp = document.getElementById("taskInput");
  const val = inp.value.trim(); if (!val) return;
  renderTask({ text: val, done: false }); saveTasks(); inp.value=""; inp.focus();
}
loadTasks();

// ─── Block List with PIN ──────────────────────────────────
const DEFAULT_SITES = ["facebook.com","tiktok.com"];
let blockListUnlocked = false;

function checkPinLock() {
  chrome.storage.local.get("blockPin", (d) => {
    const hasPin = !!d.blockPin;
    document.getElementById("pinUnlockRow").style.display = (hasPin && !blockListUnlocked) ? "flex" : "none";
    document.getElementById("blockListSection").style.display = (hasPin && !blockListUnlocked) ? "none" : "block";
  });
}

document.getElementById("pinUnlockBtn").addEventListener("click", () => {
  const entered = document.getElementById("pinUnlockInput").value;
  chrome.storage.local.get("blockPin", (d) => {
    if (entered === d.blockPin) {
      blockListUnlocked = true; checkPinLock(); document.getElementById("pinUnlockInput").value="";
    } else { showStatus(t("statusWrongPin")); }
  });
});

function loadSiteList() {
  checkPinLock();
  chrome.storage.sync.get("blockList", (d) => {
    const sites = d.blockList || DEFAULT_SITES;
    document.getElementById("siteList").innerHTML = "";
    sites.forEach(s => renderSite(s));
  });
}
function saveSiteList() {
  const sites = [...document.getElementById("siteList").querySelectorAll("li")].map(li => li.querySelector(".task-text").innerText);
  chrome.storage.sync.set({ blockList: sites });
}
function renderSite(site) {
  const li = document.createElement("li");
  const span = document.createElement("span"); span.className="task-text"; span.innerText=site;
  const del = document.createElement("span"); del.className="del"; del.innerText="✕";
  del.addEventListener("click", () => { li.remove(); saveSiteList(); });
  li.appendChild(span); li.appendChild(del);
  document.getElementById("siteList").appendChild(li);
}
document.getElementById("addSite").addEventListener("click", addSite);
document.getElementById("siteInput").addEventListener("keydown", e => { if(e.key==="Enter") addSite(); });
function addSite() {
  const inp = document.getElementById("siteInput");
  let val = inp.value.trim().toLowerCase().replace(/^https?:\/\//,"").split("/")[0];
  if (!val) return; renderSite(val); saveSiteList(); inp.value=""; inp.focus();
}
loadSiteList();

// ─── Settings: PIN ────────────────────────────────────────
document.getElementById("setPinBtn").addEventListener("click", () => {
  const pin = document.getElementById("pinInput").value;
  if (!/^\d{4}$/.test(pin)) { document.getElementById("pinStatus").innerText="⚠️ ৪ সংখ্যার PIN দাও"; return; }
  chrome.storage.local.set({ blockPin: pin }, () => {
    blockListUnlocked = false;
    document.getElementById("pinStatus").innerText = t("statusPinSet");
    document.getElementById("pinInput").value = "";
    checkPinLock();
  });
});
document.getElementById("removePinBtn").addEventListener("click", () => {
  chrome.storage.local.remove("blockPin", () => {
    blockListUnlocked = true;
    document.getElementById("pinStatus").innerText = t("statusPinRemoved");
    checkPinLock();
  });
});

// ─── Settings: Water Reminder ─────────────────────────────
chrome.storage.local.get("waterEnabled", (d) => {
  document.getElementById("waterToggle").checked = !!d.waterEnabled;
});
document.getElementById("waterToggle").addEventListener("change", (e) => {
  const enabled = e.target.checked;
  chrome.storage.local.set({ waterEnabled: enabled });
  if (enabled) chrome.alarms.create("waterReminder", { periodInMinutes: 30 });
  else chrome.alarms.clear("waterReminder");
});

// ─── Settings: Scheduled Auto-Start ──────────────────────
chrome.storage.local.get("scheduledTime", (d) => {
  if (d.scheduledTime) {
    document.getElementById("scheduleTime").value = d.scheduledTime;
    document.getElementById("scheduleStatus").innerText = t("statusScheduleSet", { t: d.scheduledTime });
  }
});
document.getElementById("setScheduleBtn").addEventListener("click", () => {
  const timeVal = document.getElementById("scheduleTime").value;
  if (!timeVal) return;
  const [hours, minutes] = timeVal.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  chrome.alarms.create("scheduledStart", { when: target.getTime(), periodInMinutes: 24*60 });
  chrome.storage.local.set({ scheduledTime: timeVal });
  document.getElementById("scheduleStatus").innerText = t("statusScheduleSet", { t: timeVal });
});
document.getElementById("clearScheduleBtn").addEventListener("click", () => {
  chrome.alarms.clear("scheduledStart");
  chrome.storage.local.remove("scheduledTime");
  document.getElementById("scheduleStatus").innerText = t("statusScheduleCleared");
  document.getElementById("scheduleTime").value = "";
});

// ─── Language Toggle ──────────────────────────────────────
chrome.storage.local.get("lang", (d) => {
  lang = d.lang || "bn"; applyLanguage();
});
document.getElementById("langEn").addEventListener("click", () => { lang="en"; chrome.storage.local.set({lang}); applyLanguage(); });
document.getElementById("langBn").addEventListener("click", () => { lang="bn"; chrome.storage.local.set({lang}); applyLanguage(); });

function applyLanguage() {
  document.getElementById("langEn").classList.toggle("active", lang==="en");
  document.getElementById("langBn").classList.toggle("active", lang==="bn");
  document.getElementById("appTitle").innerText = t("title");
  document.getElementById("lbl-study").innerText = t("study");
  document.getElementById("lbl-break").innerText = t("break");
  document.getElementById("lbl-rounds").innerText = t("rounds");
  startBtn.innerText = running ? t("running") : t("start");
  document.getElementById("skipPhase").innerText = t("skip");
  document.getElementById("stopReset").innerText = t("reset");
  blockLabel.innerText = blockDot.classList.contains("on") ? t("blockOn") : t("blockOff");
  document.getElementById("toggleBlock").innerText = t("toggle");
  document.getElementById("lbl-tasks").innerText = t("tasks");
  document.getElementById("taskInput").placeholder = t("taskPlaceholder");
  document.getElementById("lbl-blocklist").innerText = t("blocklist");
  document.getElementById("siteInput").placeholder = t("sitePlaceholder");
  document.getElementById("lbl-ai").innerText = t("ai");
  document.getElementById("summarize").innerText = t("summarize");
  document.getElementById("explain").innerText = t("explain");
  document.getElementById("lbl-today-card").innerText = t("statsTodayLabel");
  document.getElementById("lbl-streak").innerText = t("streakLabel");
  document.getElementById("lbl-stats").innerText = t("statsTitle");
  document.getElementById("lbl-water").innerText = t("waterLabel");
  document.getElementById("lbl-water-sub").innerText = t("waterSub");
  document.getElementById("lbl-schedule").innerText = t("scheduleTitle");
  document.getElementById("setScheduleBtn").innerText = t("scheduleSet");
  document.getElementById("clearScheduleBtn").innerText = t("scheduleClear");
  document.getElementById("lbl-pin").innerText = t("pinTitle");
  document.getElementById("setPinBtn").innerText = t("pinSet");
  document.getElementById("removePinBtn").innerText = t("pinRemove");
  document.getElementById("pinInput").placeholder = t("pinPlaceholder");
  document.getElementById("pinUnlockInput").placeholder = t("unlockPlaceholder");
  document.getElementById("pinUnlockBtn").innerText = t("unlock");
  updateTimerUI(); loadStats();
  // Random quote in correct language
  const q = t("quotes");
  document.getElementById("quote").innerText = q[Math.floor(Math.random()*q.length)];
}

// ─── Tabs ─────────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab === "stats") loadStats();
  });
});

// ─── AI Tools ─────────────────────────────────────────────
async function getPageText() {
  const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
  if (!tab?.url || tab.url.startsWith("chrome://")) throw new Error("এই পেজে কাজ করে না। একটা ওয়েবসাইটে try করো।");
  const res = await chrome.scripting.executeScript({ target:{tabId:tab.id}, func:()=>document.body.innerText });
  return res[0].result.slice(0,3000);
}
async function askAI(prompt) {
  if (DEEPSEEK_API_KEY==="YOUR_API_KEY") throw new Error("DeepSeek API key বসাও script.js-এ।");
  const r = await fetch("https://api.deepseek.com/chat/completions", {
    method:"POST",
    headers:{ Authorization:`Bearer ${DEEPSEEK_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify({ model:"deepseek-chat", messages:[{role:"user",content:prompt}] })
  });
  if (!r.ok) { const e=await r.json(); throw new Error(e.error?.message||"API error"); }
  return (await r.json()).choices[0].message.content;
}
document.getElementById("summarize").addEventListener("click", async () => {
  resultBox.style.display="block"; resultBox.innerText=t("loading");
  try { resultBox.innerText = await askAI("Summarize in simple bullet points:\n" + await getPageText()); }
  catch(e) { resultBox.innerText="Error: "+e.message; }
});
document.getElementById("explain").addEventListener("click", async () => {
  resultBox.style.display="block"; resultBox.innerText=t("loading");
  try { resultBox.innerText = await askAI("Explain simply, like I'm a student:\n" + await getPageText()); }
  catch(e) { resultBox.innerText="Error: "+e.message; }
});

// ─── Init ─────────────────────────────────────────────────
getSettings(); updateTimerUI(); loadStats(); applyLanguage();
