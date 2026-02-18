/* ------------------- GIFs (els teus) ------------------- */
const gifsOK = [
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGF1Zmg3d3B6cWRxcDA4dGd0cGV2Yjh1YXV3NWc1cXM4ajVnOTRndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m8crpzTJFRDPhqqhXJ/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY29iM3h4dWs2Z3kzdndka25tOGF3MnpoaTYwbDJnNmFlcWVpeXQybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KrZSPwIDxKrKYqmhBI/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGQ1OGQxdmsyYzExYWY5cjlrZGpiNHZoajhyNmtzajY2djhiZ3R4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/voMyf7YAM2GjSx0Yw9/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2YxbGExODJ4emd0bnRoajMyODRtOXhxdG9jYXNneDEwcTV5YmFwYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KYxruH6Oay8vfXJgjz/giphy.gif",
];

const gifsKO = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTJydnN0d201emhscTltbm4wbGk4NXhncmU4ZHlxcWhyOTljeXF5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CHHggrtrLWJD0qSbQd/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHgwN2xsb3ZjYjVvcDE4c3llOWczN3lhbGJ2aDJwOW9tODd1OXJzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gjs7t0bCR1eX3Ta7Wp/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTB4bjkwZzV4aWo1ejhtc2xtZ3hhazA3djJxYTh6czd5NG9jb256eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fQidaxeS43wNKiG0q0/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDB1M2UwNzJvYWxheXMzMXVwZ2EzcGtoaXd3eWJuNDg5cmJ5eW82ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JOEnREV2UXEyAMJ4BO/giphy.gif",
];



const sndHoverUI = new Audio("./clics_mouse.mp3");
const sndClickUI = new Audio("./clics_mouse.mp3");

sndHoverUI.preload = "auto";
sndClickUI.preload = "auto";

let hoverStopId = null;
let clickStopId = null;


function playHoverSound() {
  clearTimeout(hoverStopId);

  // NO pause abans: només reposiciona i play
  hoverAudio.currentTime = 9.3;
  hoverAudio.play().catch(() => {});

  hoverStopId = setTimeout(() => {
    hoverAudio.pause();
  }, 500);
}

function playClickSound() {
  clearTimeout(clickStopId);

  clickAudio.currentTime = 11.8; // <- el click
  clickAudio.play().catch(() => {});

  clickStopId = setTimeout(() => {
    clickAudio.pause();
  }, 300);
}



let lastHoverSound = 0;

function playHoverSafe(e) {
  if (e.currentTarget.disabled) return; // 👈 CLAVAT

  const now = Date.now();
  if (now - lastHoverSound < 10) return;

  lastHoverSound = now;
  playHoverSound();
}




function pickRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function preloadGifs(urls){
  urls.forEach(url => { const img = new Image(); img.src = url; });
}
preloadGifs(gifsOK);
preloadGifs(gifsKO);

/* ------------------- Sons MP3 (GitHub Raw) -------------------
const sndOK  = new Audio("https://raw.githubusercontent.com/JalbertGeyerall/coses_albert/main/ok.mp3");
const sndKO  = new Audio("https://raw.githubusercontent.com/JalbertGeyerall/coses_albert/main/ko.mp3");
const sndDau = new Audio("https://raw.githubusercontent.com/JalbertGeyerall/coses_albert/main/dau.mp3"); */


const sndOK  = new Audio("./ok.mp3");
const sndKO  = new Audio("./ko.mp3");
const sndDau = new Audio("./dau.mp3");

[sndOK, sndKO, sndDau].forEach(s => {
  s.preload = "auto";
  s.volume = 0.85;
});

function playSound(snd, start = 0, end = null) {
  try {
    // Cancel·la fades/stops previs d'aquest mateix so
    if (snd._fadeInterval) { clearInterval(snd._fadeInterval); snd._fadeInterval = null; }
    if (snd._stopTimeout)  { clearTimeout(snd._stopTimeout);  snd._stopTimeout  = null; }

    // Guarda el volum base (per restaurar després)
    const baseVol = (typeof snd._baseVol === "number") ? snd._baseVol : snd.volume;
    snd._baseVol = baseVol;

    snd.pause();
    snd.currentTime = start;
    snd.volume = baseVol;

    const p = snd.play();
    if (p && typeof p.catch === "function") p.catch(()=>{});

    // Si no hi ha "end", deixa'l sonar fins al final
    if (end === null || end === undefined) return;

    // Si end no és vàlid, no fem res
    if (typeof end !== "number" || end <= start) return;

    // Fade intern (fixe, ràpid)
    const fadeMs = 1000;     // <- aquí fixes el fade
    const steps  = 8;
    const stepMs = Math.max(10, Math.floor(fadeMs / steps));

    const durationMs = Math.max(0, (end - start) * 1000);
    const fadeStartMs = Math.max(0, durationMs - fadeMs);

    snd._stopTimeout = setTimeout(() => {
      let i = 0;
      snd._fadeInterval = setInterval(() => {
        i++;
        const t = i / steps;            // 0..1
        snd.volume = baseVol * (1 - t); // baixa a 0

        if (i >= steps) {
          clearInterval(snd._fadeInterval);
          snd._fadeInterval = null;

          snd.pause();
          try { snd.currentTime = end; } catch(e) {}
          snd.volume = baseVol; // restaura per la pròxima reproducció
        }
      }, stepMs);
    }, fadeStartMs);

  } catch(e) {}
}

function playHoverUI(){
  // 9.0 -> 9.5
  playSound(sndHoverUI, 9.3, 9.6);
}

function playClickUI(){
  // 11.8 -> 12.1 (ajusta el final si cal)
  playSound(sndClickUI, 12, 12.3);
}



/* ------------------- Preguntes (des de CSV) ------------------- */

// Enllaç que m'has passat (HTML). El normalitzarem a CSV.
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTh9RXxT5g5kJniXVZ6wgGj_aFoUcYcJmcYXub32eFmNw4bwjWEP7KhfnVJW3SKJqDNwUBVRgvqGqQ/pubhtml?gid=0&single=true";

// Preguntes que farà servir el joc (carregades del CSV)
let preguntes = [];
let bolsa = [];

/** Converteix un link "pubhtml" a un link CSV usable amb fetch() */
function toGoogleCsvUrl(url) {
  try {
    const u = new URL(url);
    // Canvia /pubhtml per /pub
    u.pathname = u.pathname.replace(/\/pubhtml$/, "/pub");
    // Assegura output=csv
    if (!u.searchParams.get("output")) u.searchParams.set("output", "csv");
    return u.toString();
  } catch (e) {
    // fallback simple
    if (url.includes("/pubhtml")) {
      const base = url.replace("/pubhtml", "/pub");
      return base.includes("output=csv") ? base : (base + (base.includes("?") ? "&" : "?") + "output=csv");
    }
    return url;
  }
}

/** Parser CSV amb cometes (per CSV de Google Sheets). Retorna array de files, cada fila array de columnes */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') { // cometa escapada
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === ",") {
      row.push(cur);
      cur = "";
      continue;
    }

    if (ch === "\n") {
      row.push(cur);
      cur = "";
      // evita línies completament buides
      if (row.some(cell => String(cell).trim() !== "")) rows.push(row);
      row = [];
      continue;
    }

    if (ch === "\r") continue;

    cur += ch;
  }

  // última cel·la
  row.push(cur);
  if (row.some(cell => String(cell).trim() !== "")) rows.push(row);

  return rows;
}

/** Carrega preguntes del CSV i les transforma al format del joc {q, a:[...], correct} */
async function loadPreguntesFromCSV() {
  const csvUrl = toGoogleCsvUrl(SHEET_URL);

  // Bloqueja GO mentre carrega
  try { btnJugar.disabled = true; } catch(e) {}
  try {
    // Missatge de càrrega
    const qText = document.getElementById("qText");
    if (qText) qText.textContent = "Carregant preguntes...";
  } catch(e) {}

  const res = await fetch(csvUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("No s'ha pogut descarregar el CSV: " + res.status);

  const text = await res.text();
  const rows = parseCSV(text);

  if (!rows.length) throw new Error("CSV buit");

  // Esperem capçalera: pregunta, opcio1..opcio4, correcta
  const header = rows[0].map(h => String(h).trim().toLowerCase());
  const idxPregunta = header.indexOf("pregunta");
  const idxO1 = header.indexOf("opcio1");
  const idxO2 = header.indexOf("opcio2");
  const idxO3 = header.indexOf("opcio3");
  const idxO4 = header.indexOf("opcio4");
  const idxCorrecta = header.indexOf("correcta");

  if ([idxPregunta, idxO1, idxO2, idxO3, idxO4, idxCorrecta].some(i => i === -1)) {
    throw new Error("Capçaleres incorrectes. Cal: pregunta, opcio1, opcio2, opcio3, opcio4, correcta");
  }

  const parsed = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const q = (row[idxPregunta] ?? "").trim();
    const a1 = (row[idxO1] ?? "").trim();
    const a2 = (row[idxO2] ?? "").trim();
    const a3 = (row[idxO3] ?? "").trim();
    const a4 = (row[idxO4] ?? "").trim();
    const corrRaw = (row[idxCorrecta] ?? "").trim();

    if (!q || !a1 || !a2 || !a3 || !a4) continue;

    const correct = Number(corrRaw);
    if (![1,2,3,4].includes(correct)) continue;

    parsed.push({ q, a: [a1, a2, a3, a4], correct });
  }

  if (!parsed.length) throw new Error("No hi ha preguntes vàlides al CSV");

  preguntes = parsed;
  bolsa = [...preguntes];

  // Reactiva GO
  try { btnJugar.disabled = false; } catch(e) {}
  try {
    const qText = document.getElementById("qText");
    if (qText) qText.textContent = "Prem GO per començar";
  } catch(e) {}
}


// Estat: "idle" | "running" | "row3" | "row4"
let state = "idle";

let timerId = null;
let tempsRestant = 0;

const scores = [0, 0, 0, 0];

/* ------------------- Persistència puntuacions ------------------- */
const SCORE_KEY = "donaCiencia_scores_v1";

function loadScores(){
  try{
    const raw = localStorage.getItem(SCORE_KEY);
    if (!raw) return;

    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length !== 4) return;

    for (let i = 0; i < 4; i++){
      const n = Number(arr[i]);
      scores[i] = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    }
  } catch(e) {}
}

function saveScores(){
  try{
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
  } catch(e) {}
}

// =========================
// BOTONS: Partida nova / Reset total
// =========================
const btnNewGame = document.getElementById("newGame");
const btnResetAll = document.getElementById("resetAll");

function resetScoresOnly(){
  // parar timers/estats si cal
  if (typeof stopTimer === "function") stopTimer();

  // reset puntuacions
  for (let i = 0; i < 4; i++) scores[i] = 0;

  // re-render + persistència
  if (typeof renderScores === "function") renderScores();
  if (typeof saveScores === "function") saveScores();

  // deixar controls en estat inicial (si ho tens)
  if (typeof setGoStopState === "function") setGoStopState({ goEnabled: true, stopEnabled: false });

  // opcional: desactivar fases de puntuació/respostes si tens helpers
  if (typeof setScoreButtonsEnabled === "function") setScoreButtonsEnabled(false, false);
  if (typeof setAnswerButtonsEnabled === "function") setAnswerButtonsEnabled(false);
  if (typeof btnHint !== "undefined" && btnHint) btnHint.disabled = true;

  // estat
  if (typeof state !== "undefined") state = "idle";

   location.reload();
}

function resetAll(){
  // parar timers/estats si cal
  if (typeof stopTimer === "function") stopTimer();

  // reset puntuacions
  for (let i = 0; i < 4; i++) scores[i] = 0;

  // reset noms
  const defaults = ["Equip 1", "Equip 2", "Equip 3", "Equip 4"];
  if (typeof teamNames !== "undefined") {
    for (let i = 0; i < 4; i++) teamNames[i] = defaults[i];
  }

  // netejar localStorage
  try{
    if (typeof SCORE_KEY !== "undefined") localStorage.removeItem(SCORE_KEY);
    if (typeof TEAM_KEY !== "undefined") localStorage.removeItem(TEAM_KEY);
  }catch(e){}

  // reload total de la pàgina (estat inicial net)
  location.reload();
}


btnNewGame.addEventListener("click", () => {
  resetScoresOnly();
});

btnResetAll.addEventListener("click", () => {
  // confirmació per evitar accidents
  const ok = confirm("Reset total: vols tornar puntuacions a 0 i noms a 'Equip 1..4'?");
  if (!ok) return;
  resetAll();
});



const dadoEl = document.getElementById("dado");
const preguntaEl = document.getElementById("pregunta");
const timerEl = document.getElementById("timer");
const btnJugar = document.getElementById("jugar");
const btnStop  = document.getElementById("stop");
const btnHint  = document.getElementById("hint");

const ansBtns  = Array.from(document.querySelectorAll(".ans"));
const row3Btns = Array.from(document.querySelectorAll(".scoreBtn.row3"));
const row4Btns = Array.from(document.querySelectorAll(".scoreBtn.row4"));

const questionRow = document.querySelector(".questionRow");
const respostes = document.querySelector(".respostes");
const btnGo = document.getElementById("jugar");

const abcdBtns = Array.from(document.querySelectorAll(".scoreBtn.abcd"));

function setABCDEnabled(enabled){
  abcdBtns.forEach(b => b.disabled = !enabled);
}

// Carrega preguntes al carregar la pàgina
loadPreguntesFromCSV().catch(err => {
  console.error(err);
  const qText = document.getElementById("qText");
  if (qText) qText.textContent = "Error carregant preguntes. Revisa la publicació del CSV.";
  // Manté GO desactivat si falla
  try { btnJugar.disabled = true; } catch(e) {}
});


// =========================
// CONTROLS: estat GO/STOP + tecla espai
// =========================
function setGoStopState({ goEnabled, stopEnabled }) {
  btnJugar.disabled = !goEnabled;
  btnStop.disabled  = !stopEnabled;
}

// Estat inicial: GO actiu, STOP inactiu
setGoStopState({ goEnabled: true, stopEnabled: false });

// Tecla espai: fa GO o STOP depenent del que estigui habilitat
document.addEventListener("keydown", (e) => {
  if (e.code !== "Space") return;

  // Evita scroll (molt important)
  e.preventDefault();

  // Prioritat: si STOP està habilitat -> STOP
  if (!btnStop.disabled) {
    btnStop.click();
    return;
  }

  // Si no, si GO està habilitat -> GO
  if (!btnJugar.disabled) {
    btnJugar.click();
  }
}, { passive: false });


btnGo.addEventListener("click", () => {
  questionRow.classList.remove("hidden");
  respostes.classList.remove("hidden");
});

let preguntaActual = null;

/* ------------------- Overlay GIF ------------------- */
const fxOverlay = document.getElementById("fxOverlay");
const fxGif = document.getElementById("fxGif");
let overlayTimeout = null;

function showOverlayGif(url, ms=1100){
  // amaga i força reflow
  fxOverlay.classList.add("hidden");
  fxOverlay.setAttribute("aria-hidden", "true");
  void fxOverlay.offsetHeight;

  // cache-bust perquè el GIF sempre reiniciï
  const sep = url.includes("?") ? "&" : "?";
  const bustedUrl = url + sep + "t=" + Date.now();

  fxGif.src = "";
  fxGif.src = bustedUrl;

  requestAnimationFrame(() => {
    fxOverlay.classList.remove("hidden");
    fxOverlay.setAttribute("aria-hidden", "false");
  });

  if (overlayTimeout) clearTimeout(overlayTimeout);
  overlayTimeout = setTimeout(() => {
    fxOverlay.classList.add("hidden");
    fxOverlay.setAttribute("aria-hidden", "true");
  }, ms);
}


fxOverlay.addEventListener("click", () => {
  fxOverlay.classList.add("hidden");
  fxOverlay.setAttribute("aria-hidden", "true");
});

/* ------------------- UI helpers ------------------- */
function renderScores(){
  scores.forEach((s,i)=> document.getElementById(`score-${i+1}`).textContent = s);
  saveScores();
}

/* ------------------- Edició manual de punts ------------------- */
function enableScoreEditing(){
  const scoreCells = Array.from(document.querySelectorAll(".cell.score"));

  scoreCells.forEach((cell, idx) => {
    cell.title = "Doble clic per editar punts";
    cell.style.cursor = "pointer";

    cell.addEventListener("dblclick", () => {
      const current = scores[idx];
      const input = prompt(`Punts Equip ${idx + 1}:`, String(current));
      if (input === null) return;

      const n = Math.floor(Number(input));
      if (!Number.isFinite(n) || n < 0) return;

      scores[idx] = n;
      renderScores();
    });
  });
}

/* ------------------- Edició noms d'equip (dblclick) ------------------- */
function enableTeamNameEditing(){
  const heads = document.querySelectorAll(".cell.head");

  heads.forEach((el, idx) => {
    el.title = "Doble clic per editar nom de l'equip";
    el.style.cursor = "pointer";

    el.addEventListener("dblclick", () => {
      const current = teamNames[idx];
      const input = prompt(`Nom de l'equip ${idx + 1}:`, current);
      if (input === null) return;

      const name = input.trim();
      if (!name) return;

      teamNames[idx] = name;
      saveTeamNames();
      renderTeamNames();
    });
  });
}



function setScoreButtonsEnabled(row3, row4){
  row3Btns.forEach(b => b.disabled = !row3);
  row4Btns.forEach(b => b.disabled = !row4);
}

function clearAnswerStates(){
  ansBtns.forEach(b => b.classList.remove("correct","wrong"));
}

function setAnswerButtonsEnabled(enabled){
  ansBtns.forEach(b => b.disabled = !enabled);
  clearAnswerStates();
}

function resetForNextRound(){
  setScoreButtonsEnabled(false, false);
  setAnswerButtonsEnabled(false);
  btnHint.disabled = true;
  state = "idle";
  preguntaActual = null;
    setABCDEnabled(false);
}

function novaPregunta(){
  if (!bolsa.length) bolsa = [...preguntes];
  return bolsa.splice(Math.floor(Math.random() * bolsa.length), 1)[0];
}

/* Dau: dura el doble (20 ticks) */
function tirarDau(){
  dadoEl.classList.add("girando");
  let c = 0;

  return new Promise(res => {
    const i = setInterval(() => {
      dadoEl.textContent = Math.floor(Math.random() * 5) + 1;
      if (++c >20){
        clearInterval(i);
        dadoEl.classList.remove("girando");
        res();
      }
    }, 100);
  });
}

function startTimer(t, onZero = null){
  if (timerId !== null) clearInterval(timerId);
  tempsRestant = t;
  timerEl.textContent = tempsRestant;

  timerId = setInterval(() => {
    tempsRestant--;
    if (tempsRestant < 0) tempsRestant = 0;
    timerEl.textContent = tempsRestant;

    if (tempsRestant <= 0){
      clearInterval(timerId);
      timerId = null;

      if (typeof onZero === "function") onZero();
    }
  }, 1000);
}


function stopTimer(){
  if (timerId !== null){
    clearInterval(timerId);
    timerId = null;
  }
}

function renderPregunta(p){
  preguntaEl.textContent = p.q;

  ansBtns.forEach((btn, idx) => {
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${p.a[idx]}`;
    btn.dataset.i = String(idx + 1);
  });

  setAnswerButtonsEnabled(false);
  btnHint.disabled = false;
}

/* Click resposta:
   - pinta només la clicada (verd o vermell)
   - GIF random OK/KO
   - so ok/ko
   - NO marca automàticament la correcta si falles
*/
ansBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!preguntaActual) return;

    clearAnswerStates();

    const chosen = Number(btn.dataset.i);
    const correct = preguntaActual.correct;

    if (chosen === correct){
      btn.classList.add("correct");
      showOverlayGif(pickRandom(gifsOK), 5000); // triple durada (abans 1200)
      playSound(sndOK,0.5,5.2);
    } else {
      btn.classList.add("wrong");
      showOverlayGif(pickRandom(gifsKO), 5000); // triple durada (abans 900)
      playSound(sndKO,0.2);
    }
  });
});

/* Botó ? : marca la correcta en verd (només revela) */
btnHint.addEventListener("click", () => {
  if (!preguntaActual) return;

  clearAnswerStates();
  const correct = preguntaActual.correct;
  const correctBtn = ansBtns.find(b => Number(b.dataset.i) === correct);
  if (correctBtn) correctBtn.classList.add("correct");
});

/* Controls principals */
btnJugar.addEventListener("click", async () => {
  // si hi havia una ronda pendent (row3/row4), començar una nova cancel·la aquell estat
  if (state !== "idle") {
    stopTimer();
    resetForNextRound();
  }

  // so dins un clic (per permisos del navegador)
  playSound(sndDau, 2.9);

  // evita doble start
  if (state === "running") return;

  // GO disabled, STOP enabled
  setGoStopState({ goEnabled: false, stopEnabled: true });

  state = "running";
  setABCDEnabled(false);


  preguntaActual = novaPregunta();
  renderPregunta(preguntaActual);

  await tirarDau();

  // quan el timer arribi a 0, re-habilita GO i deshabilita STOP
  startTimer(20, () => {
    // si s'ha acabat el temps en mode running
    if (state === "running") {
      state = "idle";
      setGoStopState({ goEnabled: true, stopEnabled: false });
      setScoreButtonsEnabled(false, false);
      setAnswerButtonsEnabled(false);
      btnHint.disabled = true;
    }
  });
});


btnStop.addEventListener("click", () => {
  if (state !== "running") return;

  stopTimer();

  // STOP deshabilitat, GO habilitat (com demanes)
  setGoStopState({ goEnabled: true, stopEnabled: false });
   setABCDEnabled(true);
 setAnswerButtonsEnabled(true);
  // entra en fase puntuació (row3)
  state = "row3";
  setScoreButtonsEnabled(true, false);
});

/* Puntuació */
function applyRow3(teamIdx, isOk){
  const add = tempsRestant;
  const sub = Math.floor(tempsRestant / 2);

  if (isOk) scores[teamIdx] += add;
  else scores[teamIdx] = Math.max(0, scores[teamIdx] - sub);
  renderScores();
}

function applyRow4(teamIdx, isOk){
  const addHalf = Math.floor(tempsRestant / 2);
  const subAll = tempsRestant;

  if (isOk) scores[teamIdx] += addHalf;
  else scores[teamIdx] = Math.max(0, scores[teamIdx] - subAll);
  renderScores();
}

/* fila 3 */
row3Btns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (state !== "row3") return;

    const teamIdx = Number(btn.dataset.team) - 1;
    const isOk = btn.classList.contains("ok");

    if (isOk) {
      applyRow3(teamIdx, true);
      resetForNextRound();
    } else {
      applyRow3(teamIdx, false);
      state = "row4";
      setScoreButtonsEnabled(false, true);
    }
  });
});

/* fila 4 */
row4Btns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (state !== "row4") return;

    const teamIdx = Number(btn.dataset.team) - 1;
    const isOk = btn.classList.contains("ok");

    applyRow4(teamIdx, isOk);
    resetForNextRound();
  });
});

/* Botons especials (row5/row6) */
abcdBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Només han de funcionar quan STOP ha activat fase puntuació
    if (state !== "row3" && state !== "row4") return;

    const teamIdx = Number(btn.dataset.team) - 1;
    if (teamIdx < 0 || teamIdx > 3) return;

    // A: x2 -> duplica tempsRestant i el que es veu al timer
    if (btn.classList.contains("a")) {
      tempsRestant = tempsRestant * 2;
      timerEl.textContent = String(tempsRestant);
      return;
    }

    // B: T=0 -> posa tempsRestant a 0 i el timer a 0
    if (btn.classList.contains("b")) {
      tempsRestant = 0;
      timerEl.textContent = "0";
      return;
    }

    // C: +25 punts directes
    if (btn.classList.contains("c")) {
      scores[teamIdx] += 25;
      renderScores();
      return;
    }

    // D: -25 punts directes (no baixa de 0)
    if (btn.classList.contains("d")) {
      scores[teamIdx] = Math.max(0, scores[teamIdx] - 25);
      renderScores();
      return;
    }
  });
});



/* ------------------- Persistència noms d'equip ------------------- */
const TEAM_KEY = "donaCiencia_teamNames_v1";
const defaultTeamNames = ["Equip 1", "Equip 2", "Equip 3", "Equip 4"];
let teamNames = [...defaultTeamNames];

function loadTeamNames(){
  try{
    const raw = localStorage.getItem(TEAM_KEY);
    if (!raw) return;

    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length !== 4) return;

    teamNames = arr.map((n,i) =>
      typeof n === "string" && n.trim() ? n.trim() : defaultTeamNames[i]
    );
  }catch(e){}
}

function saveTeamNames(){
  try{
    localStorage.setItem(TEAM_KEY, JSON.stringify(teamNames));
  }catch(e){}
}

function renderTeamNames(){
  const heads = document.querySelectorAll(".cell.head");
  heads.forEach((el, i) => {
    el.textContent = teamNames[i];
  });
}




/* Init */
loadScores();
renderScores();
loadTeamNames();
renderTeamNames();
setScoreButtonsEnabled(false, false);
setAnswerButtonsEnabled(false);
btnHint.disabled = true;
timerEl.textContent = "-";
enableScoreEditing();
enableTeamNameEditing();
setABCDEnabled(false); // inici: apagats

document.querySelectorAll(".scoreBtn, .ans, .btn").forEach(btn => {
  btn.addEventListener("mouseenter", (e) => {
    if (e.currentTarget.disabled) return;
    playHoverUI();
  });

  // capture=true perquè no se’l mengi cap altre handler/estat
  btn.addEventListener("click", (e) => {
    if (e.currentTarget.disabled) return;
    playClickUI();
  }, true);
});