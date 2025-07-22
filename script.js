// ---- PART 1: Find HTML elements ----
const gameTitle = document.getElementById('game-title');
const progressCounter = document.getElementById('progress-counter');
const timerDisplay = document.getElementById('timer');
const mainContent = document.querySelector('main');
const surahsGridContainer = document.getElementById('surahs-grid-container');
const prophetsGridContainer = document.getElementById('prophets-grid-container');
const questionArea = document.getElementById('question-area');
const questionText = document.getElementById('question-text');
const gameInput = document.getElementById('game-input');
const submitButton = document.getElementById('submit-button');
const showAllBtn = document.getElementById('show-all-btn');
const huroofBtn = document.getElementById('huroof-btn');
const makkiMadaniBtn = document.getElementById('makki-madani-btn');
const colorKey = document.getElementById('color-key');
const gameActionsContainer = document.getElementById('game-actions-container');
const skipBtn = document.getElementById('skip-btn');
const showAnswerBtn = document.getElementById('show-answer-btn');
const makkiBtn = document.getElementById('makki-btn');
const madaniBtn = document.getElementById('madani-btn');
const feedbackMessage = document.getElementById('feedback-message');
const surahsModeBtn = document.getElementById('surahs-mode-btn');
const prophetsModeBtn = document.getElementById('prophets-mode-btn');
const otherModeBtn = document.getElementById('other-mode-btn');
const leaderboardContainer = document.querySelector('.leaderboard-container');
const leaderboardHeader = document.getElementById('leaderboard-header');
const leaderboardList = document.getElementById('leaderboard-list');
const otherMenuModal = document.getElementById('other-menu-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const surahNumbersBtn = document.getElementById('surah-numbers-btn');
const classificationBtn = document.getElementById('classification-btn');

// ---- PART 2: Supabase Setup ----
const SUPABASE_URL = 'https://woonpgbywiwbkeiexfem.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb25wZ2J5d2l3YmtlaWV4ZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzE2OTksImV4cCI6MjA2ODEwNzY5OX0.-1zaAaP2FfCc80wlcwV7GcO7m-xOhHflake7s22FYD8';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- PART 3: Game Data ----
const surahMasterList = ["الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"];
const huroofSurahNames = ["البقرة", "آل عمران", "العنكبوت", "الروم", "لقمان", "السجدة", "الأعراف", "يونس", "هود", "يوسف", "إبراهيم", "الحجر", "الرعد", "مريم", "طه", "الشعراء", "القصص", "النمل", "يس", "ص", "غافر", "فصلت", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "الشورى", "ق", "القلم"];
const madaniSurahNames = ["البقرة", "آل عمران", "النساء", "المائدة", "الأنفال", "التوبة", "الرعد", "الحج", "النور", "الأحزاب", "محمد", "الفتح", "الحجرات", "الرحمن", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الإنسان", "البينة", "الزلزلة", "النصر"];
const gameModesData = {
    surahs: { title: "المصحف الذهني - السور", placeholder: "أدخل اسم السورة هنا...", total: 114, leaderboardTable: 'leaderboard', names: surahMasterList, specialNames: ["النبأ", "الملك", "المجادلة", "الذاريات", "الأحقاف", "فصلت", "الزمر", "يس", "الأحزاب", "العنكبوت", "النمل", "الفرقان", "المؤمنون", "الأنبياء", "الكهف", "الإسراء", "الحجر", "يوسف", "هود", "التوبة", "الأنفال", "الأعراف", "الفاتحة", "المائدة", "الأنعام", "النساء", "آل عمران", "البقرة"] },
    prophets: { title: "المصحف الذهني - الأنبياء", placeholder: "أدخل اسم النبي هنا...", total: 25, leaderboardTable: 'prophets_leaderboard', names: ["آدم", "إدريس", "نوح", "هود", "صالح", "إبراهيم", "لوط", "إسماعيل", "إسحاق", "يعقوب", "يوسف", "أيوب", "شعيب", "موسى", "هارون", "ذو الكفل", "داود", "سليمان", "إلياس", "اليسع", "يونس", "زكريا", "يحيى", "عيسى", "محمد"], specialNames: ["نوح", "إبراهيم", "موسى", "عيسى", "محمد"] },
    surahNumbers: { title: "المصحف الذهني - أرقام السور", placeholder: "أدخل رقم السورة...", total: 114, leaderboardTable: null, names: surahMasterList },
    classification: { title: "المصحف الذهني - مكية أم مدنية", placeholder: "", total: 114, leaderboardTable: null, names: surahMasterList }
};

let gameState = {
    currentMode: 'surahs',
    timerInterval: null,
    surahs: { correctAnswers: 0, startTime: null, revealedAnswers: [] },
    prophets: { correctAnswers: 0, startTime: null, revealedAnswers: [] },
    surahNumbers: { correctAnswers: 0, startTime: null, remaining: [...surahMasterList], currentQuestion: null },
    classification: { correctAnswers: 0, startTime: null, remaining: [...surahMasterList], currentQuestion: null }
};

// ---- Helper Functions ----
function normalizeText(text) { text = text.replace(/أ|إ|آ/g, 'ا').replace(/ة/g, 'ه'); if (text.startsWith('ال')) { text = text.substring(2); } return text; }
function displayFeedback(message, type) { feedbackMessage.textContent = message; feedbackMessage.className = `feedback-${type}`; setTimeout(() => { feedbackMessage.textContent = ''; }, 2500); }
function formatTime(secs) { const mins = Math.floor(secs / 60); const remSecs = secs % 60; return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`; }

// ---- Leaderboard Functions ----
async function fetchLeaderboard() {
    const mode = gameState.currentMode;
    const table = gameModesData[mode].leaderboardTable;
    if (!table) { leaderboardList.innerHTML = ''; return; }
    const { data, error } = await supabase.from(table).select('player_name, time_seconds').order('time_seconds', { ascending: true }).limit(10);
    leaderboardList.innerHTML = '';
    if (error) { console.error(`Error fetching leaderboard for ${mode}:`, error); return; }
    data.forEach((score, index) => {
        const li = document.createElement('li');
        if (index < 3) li.classList.add(`rank-${index + 1}`);
        li.innerHTML = `<span class="player-name">${score.player_name}</span><span class="player-score">${formatTime(score.time_seconds)}</span>`;
        leaderboardList.appendChild(li);
    });
}
async function submitScore(name, scoreInSeconds, mode) {
    const table = gameModesData[mode].leaderboardTable;
    if (!table) return;
    const { error } = await supabase.from(table).insert({ player_name: name, time_seconds: scoreInSeconds });
    if (error) { console.error(`Error submitting score to ${mode}:`, error); } else { await fetchLeaderboard(); }
}

// ---- Timer Logic ----
function stopTimer() { clearInterval(gameState.timerInterval); gameState.timerInterval = null; }
function startTimerForCurrentMode() {
    stopTimer();
    const state = gameState[gameState.currentMode];
    if (state.startTime && state.startTime !== "invalidated" && state.correctAnswers < gameModesData[gameState.currentMode].total) {
        gameState.timerInterval = setInterval(() => {
            const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
            timerDisplay.textContent = formatTime(timeTaken);
        }, 1000);
    }
}

// ---- Game Logic ----
function buildGrid(mode) {
    const container = mode === 'surahs' ? surahsGridContainer : prophetsGridContainer;
    const data = gameModesData[mode];
    container.innerHTML = '';
    for (let i = 0; i < data.total; i++) {
        const item = document.createElement('div');
        item.classList.add('game-item');
        item.id = `${mode}-item-${i + 1}`;
        if (data.specialNames && data.specialNames.includes(data.names[i])) item.classList.add('is-special');
        if (mode === 'surahs') {
            if (huroofSurahNames.includes(data.names[i])) item.classList.add('is-huroof');
            if (madaniSurahNames.includes(data.names[i])) item.classList.add('is-madani');
            else item.classList.add('is-makki');
        }
        item.innerHTML = `<span class="item-number">${i + 1}</span><span class="item-name"></span>`;
        container.appendChild(item);
    }
}

function nextQuestion(mode) {
    const state = gameState[mode];
    if (state.remaining.length === 0) {
        stopTimer();
        const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
        if (gameModesData[mode].leaderboardTable) {
            const playerName = prompt(`ما شاء الله! لقد أكملت التحدي في ${formatTime(timeTaken)}\n\nأدخل اسمك:`);
            if (playerName) submitScore(playerName, timeTaken, mode);
        } else {
            alert("ما شاء الله! لقد أجبت على كل الأسئلة.");
        }
        switchMode('surahs');
        return;
    }
    const randomIndex = Math.floor(Math.random() * state.remaining.length);
    state.currentQuestion = state.remaining.splice(randomIndex, 1)[0];
    questionText.textContent = state.currentQuestion;
    progressCounter.textContent = `${state.correctAnswers} / ${gameModesData[mode].total}`;
    gameInput.value = '';
    gameInput.focus();
}

function checkAnswer() {
    const mode = gameState.currentMode;
    const data = gameModesData[mode];
    const state = gameState[mode];
    if (mode === 'surahNumbers') {
        if (state.startTime === null) { state.startTime = Date.now(); startTimerForCurrentMode(); }
        const correctAnswer = data.names.indexOf(state.currentQuestion) + 1;
        if (parseInt(gameInput.value) === correctAnswer) {
            state.correctAnswers++;
            displayFeedback('صحيح!', 'correct');
            nextQuestion(mode);
        } else {
            displayFeedback('إجابة خاطئة، حاول مرة أخرى', 'error');
            gameInput.value = '';
        }
    } else {
        const userInput = gameInput.value.trim();
        if (!userInput) return;
        if (userInput === "/done") { /* dev tool logic */ }
        const normalizedUserInput = normalizeText(userInput);
        let matchFound = false;
        for (let i = 0; i < data.names.length; i++) {
            if (normalizeText(data.names[i]) === normalizedUserInput) {
                matchFound = true;
                if (!state.revealedAnswers.includes(data.names[i])) {
                    if (state.startTime === null) { state.startTime = Date.now(); startTimerForCurrentMode(); }
                    state.revealedAnswers.push(data.names[i]);
                    state.correctAnswers++;
                    document.querySelector(`#${mode}-item-${i + 1} .item-name`).textContent = data.names[i];
                    progressCounter.textContent = `${state.correctAnswers} / ${data.total}`;
                    displayFeedback('صحيح!', 'correct');
                    if (state.correctAnswers === data.total) {
                        stopTimer();
                        const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
                        const playerName = prompt(`ما شاء الله! لقد أكملت ${data.title} في ${formatTime(timeTaken)}\n\nأدخل اسمك:`);
                        if (playerName) submitScore(playerName, timeTaken, mode);
                    }
                } else { displayFeedback('هذا الاسم موجود بالفعل', 'warning'); }
                break;
            }
        }
        if (!matchFound) displayFeedback('إجابة خاطئة، حاول مرة أخرى', 'error');
        gameInput.value = "";
        gameInput.focus();
    }
}

function checkClassificationAnswer(choice) {
    const mode = 'classification';
    const state = gameState[mode];
    if (state.startTime === null) { state.startTime = Date.now(); startTimerForCurrentMode(); }
    const currentSurah = state.currentQuestion;
    const isMadani = madaniSurahNames.includes(currentSurah);
    const correctAnswer = isMadani ? 'madani' : 'makki';
    if (choice === correctAnswer) {
        state.correctAnswers++;
        displayFeedback('صحيح!', 'correct');
    } else {
        displayFeedback(`إجابة خاطئة، سورة ${currentSurah} هي سورة ${isMadani ? 'مدنية' : 'مكية'}`, 'error');
    }
    nextQuestion(mode);
}

function showAll() {
    const userConfirmed = confirm("هل أنت متأكد؟ لن تستطيع تسجيل رقم قياسي في هذه الجولة.");
    if (userConfirmed) {
        stopTimer();
        const mode = gameState.currentMode;
        const data = gameModesData[mode];
        const state = gameState[mode];
        for (let i = 0; i < data.names.length; i++) {
            document.querySelector(`#${mode}-item-${i + 1} .item-name`).textContent = data.names[i];
        }
        timerDisplay.textContent = "N/A";
        state.startTime = "invalidated";
        displayFeedback("تم إظهار الكل للمراجعة", "warning");
    }
}

// ---- UI and Mode Switching ----
function updateUiForMode(mode) {
    const data = gameModesData[mode];
    const state = gameState[mode];
    gameTitle.textContent = data.title;
    progressCounter.textContent = `${state.correctAnswers} / ${data.total}`;
    if (state.startTime && state.startTime !== "invalidated") {
        const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
        timerDisplay.textContent = formatTime(timeTaken);
    } else if (state.startTime === "invalidated") {
        timerDisplay.textContent = "N/A";
    } else {
        timerDisplay.textContent = "00:00";
    }
    const isGridMode = mode === 'surahs' || mode === 'prophets';
    const isQuestionMode = mode === 'surahNumbers' || mode === 'classification';
    mainContent.style.display = isGridMode ? 'block' : 'none';
    questionArea.style.display = isQuestionMode ? 'block' : 'none';
    surahsGridContainer.style.display = mode === 'surahs' ? 'grid' : 'none';
    prophetsGridContainer.style.display = mode === 'prophets' ? 'grid' : 'none';
    const inputArea = document.querySelector('.input-area');
    inputArea.style.display = (mode === 'surahs' || mode === 'prophets' || mode === 'surahNumbers') ? 'flex' : 'none';
    gameActionsContainer.style.display = isQuestionMode ? 'flex' : 'none';
    showAllBtn.style.display = isGridMode ? 'block' : 'none';
    huroofBtn.style.display = mode === 'surahs' ? 'block' : 'none';
    makkiMadaniBtn.style.display = mode === 'surahs' ? 'block' : 'none';
    skipBtn.style.display = mode === 'surahNumbers' ? 'block' : 'none';
    showAnswerBtn.style.display = mode === 'surahNumbers' ? 'block' : 'none';
    makkiBtn.style.display = mode === 'classification' ? 'block' : 'none';
    madaniBtn.style.display = mode === 'classification' ? 'block' : 'none';
    gameInput.type = mode === 'surahNumbers' ? 'number' : 'text';
    gameInput.placeholder = data.placeholder;
    [surahsModeBtn, prophetsModeBtn, otherModeBtn].forEach(btn => btn.classList.remove('active'));
    if(mode === 'surahs') surahsModeBtn.classList.add('active');
    if(mode === 'prophets') prophetsModeBtn.classList.add('active');
    if(isQuestionMode) otherModeBtn.classList.add('active');
    leaderboardContainer.style.display = data.leaderboardTable ? 'block' : 'none';
    if(data.leaderboardTable) fetchLeaderboard();
    const isClassificationModeActive = surahsGridContainer.classList.contains('classification-mode-active');
    colorKey.style.display = (mode === 'surahs' && isClassificationModeActive) ? 'flex' : 'none';
}

function switchMode(newMode) {
    stopTimer();
    surahsGridContainer.classList.remove('huroof-mode-active', 'classification-mode-active');
    gameState.currentMode = newMode;
    if ((newMode === 'surahNumbers' || newMode === 'classification') && gameState[newMode].remaining.length === gameModesData[newMode].total) {
        nextQuestion(newMode);
    }
    updateUiForMode(newMode);
    startTimerForCurrentMode();
}

// ---- Initialization ----
function initialize() {
    buildGrid('surahs');
    buildGrid('prophets');
    updateUiForMode('surahs');

    submitButton.addEventListener('click', checkAnswer);
    gameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkAnswer(); });
    leaderboardHeader.addEventListener('click', () => leaderboardContainer.classList.toggle('is-collapsed'));
    showAllBtn.addEventListener('click', showAll);
    
    surahsModeBtn.addEventListener('click', () => switchMode('surahs'));
    prophetsModeBtn.addEventListener('click', () => switchMode('prophets'));
    otherModeBtn.addEventListener('click', () => otherMenuModal.style.display = 'flex');
    closeModalBtn.addEventListener('click', () => otherMenuModal.style.display = 'none');
    
    surahNumbersBtn.addEventListener('click', () => { otherMenuModal.style.display = 'none'; switchMode('surahNumbers'); });
    classificationBtn.addEventListener('click', () => { otherMenuModal.style.display = 'none'; switchMode('classification'); });
    
    skipBtn.addEventListener('click', () => nextQuestion(gameState.currentMode));
    showAnswerBtn.addEventListener('click', () => {
        const state = gameState.surahNumbers;
        const correctAnswer = gameModesData.surahs.names.indexOf(state.currentQuestion) + 1;
        alert(`رقم سورة ${state.currentQuestion} هو ${correctAnswer}`);
    });
    
    makkiBtn.addEventListener('click', () => checkClassificationAnswer('makki'));
    madaniBtn.addEventListener('click', () => checkClassificationAnswer('madani'));
    
    huroofBtn.addEventListener('click', () => {
        surahsGridContainer.classList.remove('classification-mode-active');
        colorKey.style.display = 'none';
        surahsGridContainer.classList.toggle('huroof-mode-active');
    });
    
    makkiMadaniBtn.addEventListener('click', () => {
        surahsGridContainer.classList.remove('huroof-mode-active');
        surahsGridContainer.classList.toggle('classification-mode-active');
        const isClassificationMode = surahsGridContainer.classList.contains('classification-mode-active');
        colorKey.style.display = isClassificationMode ? 'flex' : 'none';
    });
}

initialize();