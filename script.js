// ---- PART 1: Find HTML elements ----
const surahGrid = document.getElementById('surah-grid');
const surahInput = document.getElementById('surah-input');
const submitButton = document.getElementById('submit-button');
const progressCounter = document.getElementById('progress-counter');
const timerDisplay = document.getElementById('timer');
const feedbackMessage = document.getElementById('feedback-message');
const leaderboardList = document.getElementById('leaderboard-list');

// ---- PART 2: Supabase Setup ----
// YOUR KEYS HAVE BEEN ADDED HERE
const SUPABASE_URL = 'https://woonpgbywiwbkeiexfem.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb25wZ2J5d2l3YmtlaWV4ZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzE2OTksImV4cCI6MjA2ODEwNzY5OX0.-1zaAaP2FfCc80wlcwV7GcO7m-xOhHflake7s22FYD8';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ---- PART 3: The Master Answer Key ----
const surahNames = [ "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس" ];

// ---- Game State Variables ----
let correctAnswers = 0;
let timerInterval;
let seconds = 0;
let feedbackTimeout;

// ---- HELPER FUNCTIONS ----
function normalizeText(text) { text = text.replace(/أ|إ|آ/g, 'ا').replace(/ة/g, 'ه'); if (text.startsWith('ال')) { text = text.substring(2); } return text; }
function displayFeedback(message, type) { clearTimeout(feedbackTimeout); feedbackMessage.textContent = message; feedbackMessage.className = `feedback-${type}`; feedbackTimeout = setTimeout(() => { feedbackMessage.textContent = ''; feedbackMessage.className = ''; }, 2500); }
function formatTime(totalSeconds) { let mins = Math.floor(totalSeconds / 60); let secs = totalSeconds % 60; if (mins < 10) { mins = '0' + mins; } if (secs < 10) { secs = '0' + secs; } return `${mins}:${secs}`; }

// ---- PART 4: Leaderboard Functions ----
async function fetchLeaderboard() { const { data, error } = await supabase.from('leaderboard').select('player_name, time_seconds').order('time_seconds', { ascending: true }).limit(10); if (error) { console.error('Error fetching leaderboard:', error); return; } leaderboardList.innerHTML = ''; data.forEach(score => { const li = document.createElement('li'); li.innerHTML = `<span class="player-name">${score.player_name}</span><span class="player-score">${formatTime(score.time_seconds)}</span>`; leaderboardList.appendChild(li); }); }
async function submitScore(name, scoreInSeconds) { const { error } = await supabase.from('leaderboard').insert({ player_name: name, time_seconds: scoreInSeconds }); if (error) { console.error('Error submitting score:', error); } else { await fetchLeaderboard(); } }

// ---- PART 5: Game Logic ----
function createGrid() { for (let i = 0; i < surahNames.length; i++) { const item = document.createElement('div'); item.classList.add('surah-item'); item.id = `surah-${i + 1}`; item.innerHTML = `<span class="surah-number">${i + 1}</span><span class="surah-name"></span>`; surahGrid.appendChild(item); } }
async function handleWin() { clearInterval(timerInterval); const playerName = prompt(`ما شاء الله! لقد أكملت المصحف الذهني في ${formatTime(seconds)}\n\nأدخل اسمك لتسجيله في لوحة الأوائل:`); if (playerName) { await submitScore(playerName, seconds); } }
function completeTheGame() { for (let i = 0; i < surahNames.length; i++) { const surahItem = document.getElementById(`surah-${i + 1}`); const nameSpan = surahItem.querySelector('.surah-name'); if (nameSpan.textContent === "") { nameSpan.textContent = surahNames[i]; } } correctAnswers = 114; progressCounter.textContent = `114 / 114`; handleWin(); }
async function checkAnswer() {
    const userInput = surahInput.value.trim();
    if (userInput === "") return;
    if (userInput === "/done") { completeTheGame(); surahInput.value = ""; return; }
    const normalizedUserInput = normalizeText(userInput);
    let matchFound = false;
    for (let i = 0; i < surahNames.length; i++) {
        const masterName = surahNames[i];
        const normalizedMasterName = normalizeText(masterName);
        if (normalizedMasterName === normalizedUserInput) {
            matchFound = true;
            const surahItem = document.getElementById(`surah-${i + 1}`);
            const nameSpan = surahItem.querySelector('.surah-name');
            if (nameSpan.textContent === "") {
                nameSpan.textContent = masterName;
                correctAnswers++;
                progressCounter.textContent = `${correctAnswers} / 114`;
                displayFeedback('صحيح!', 'correct');
                if (correctAnswers === 114) { await handleWin(); }
            } else {
                displayFeedback('هذه السورة موجودة بالفعل', 'warning');
            }
            break;
        }
    }
    if (!matchFound) { displayFeedback('إجابة خاطئة، حاول مرة أخرى', 'error'); }
    surahInput.value = "";
    surahInput.focus();
}
function startTimer() { timerInterval = setInterval(() => { seconds++; timerDisplay.textContent = formatTime(seconds); }, 1000); }

// ---- PART 6: Event Listeners & Initialization ----
submitButton.addEventListener('click', checkAnswer);
surahInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { checkAnswer(); } });
function initializeGame() { createGrid(); startTimer(); fetchLeaderboard(); }
initializeGame();