// Wrap the entire script in a self-executing function to avoid polluting the global scope
(function() {
    
    // ---- PART 1: Find HTML elements ----
    // We declare these first, but will assign them inside our main function
    let gameTitle, progressCounter, timerDisplay, surahsGridContainer, prophetsGridContainer,
        gameInput, submitButton, showAllBtn, feedbackMessage, surahsModeBtn, prophetsModeBtn,
        leaderboardHeader, leaderboardList, supabase;

    // ---- PART 2: Game Data & State Management ----
    const gameModesData = {
        surahs: {
            title: "المصحف الذهني - السور", placeholder: "أدخل اسم السورة هنا...", showAllText: "إظهار كل السور", total: 114, leaderboardTable: 'leaderboard',
            names: ["الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"],
            specialNames: ["النبأ", "الملك", "المجادلة", "الذاريات", "الأحقاف", "فصلت", "الزمر", "يس", "الأحزاب", "العنكبوت", "النمل", "الفرقان", "المؤمنون", "الأنبياء", "الكهف", "الإسراء", "الحجر", "يوسف", "هود", "التوبة", "الأنفال", "الأعراف", "الفاتحة", "المائدة", "الأنعام", "النساء", "آل عمران", "البقرة"]
        },
        prophets: {
            title: "المصحف الذهني - الأنبياء", placeholder: "أدخل اسم النبي هنا...", showAllText: "إظهار كل الأنبياء", total: 25, leaderboardTable: 'prophets_leaderboard',
            names: ["آدم", "إدريس", "نوح", "هود", "صالح", "إبراهيم", "لوط", "إسماعيل", "إسحاق", "يعقوب", "يوسف", "أيوب", "شعيب", "موسى", "هارون", "ذو الكفل", "داود", "سليمان", "إلياس", "اليسع", "يونس", "زكريا", "يحيى", "عيسى", "محمد"],
            specialNames: ["نوح", "إبراهيم", "موسى", "عيسى", "محمد"]
        }
    };
    
    let gameState = {
        currentMode: 'surahs', timerInterval: null,
        surahs: { correctAnswers: 0, startTime: null, revealedAnswers: [] },
        prophets: { correctAnswers: 0, startTime: null, revealedAnswers: [] }
    };

    // ---- HELPER & CORE FUNCTIONS ----
    function normalizeText(text) { text = text.replace(/أ|إ|آ/g, 'ا').replace(/ة/g, 'ه'); if (text.startsWith('ال')) { text = text.substring(2); } return text; }
    function displayFeedback(message, type) { feedbackMessage.textContent = message; feedbackMessage.className = `feedback-${type}`; setTimeout(() => { feedbackMessage.textContent = ''; }, 2500); }
    function formatTime(secs) { const mins = Math.floor(secs / 60); const remSecs = secs % 60; return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`; }

    async function fetchLeaderboard(mode) { /* ... same as before ... */ }
    async function submitScore(name, scoreInSeconds, mode) { /* ... same as before ... */ }
    function buildGridForMode(mode) { /* ... same as before ... */ }
    function checkAnswer() { /* ... same as before ... */ }
    function showAll() { /* ... same as before ... */ }
    function switchMode(newMode) { /* ... same as before ... */ }
    function startMasterTimer() { /* ... same as before ... */ }

    // Re-pasting the functions here for completeness, no changes inside them yet.
    async function fetchLeaderboard(mode) {
        const table = gameModesData[mode].leaderboardTable;
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
        const { error } = await supabase.from(table).insert({ player_name: name, time_seconds: scoreInSeconds });
        if (error) { console.error(`Error submitting score to ${mode}:`, error); } else { await fetchLeaderboard(mode); }
    }
    function buildGridForMode(mode) {
        const container = mode === 'surahs' ? surahsGridContainer : prophetsGridContainer;
        const data = gameModesData[mode];
        container.innerHTML = '';
        for (let i = 0; i < data.total; i++) {
            const item = document.createElement('div');
            item.classList.add('game-item');
            item.id = `${mode}-item-${i + 1}`;
            if (data.specialNames.includes(data.names[i])) {
                item.classList.add('is-special');
            }
            item.innerHTML = `<span class="item-number">${i + 1}</span><span class="item-name"></span>`;
            container.appendChild(item);
        }
    }
    function checkAnswer() {
        const userInput = gameInput.value.trim();
        if (!userInput) return;
        const mode = gameState.currentMode;
        const data = gameModesData[mode];
        const state = gameState[mode];
        if (userInput === "/done") {
            if (state.startTime === null) state.startTime = Date.now();
            for (let i = 0; i < data.names.length; i++) {
                if (!state.revealedAnswers.includes(data.names[i])) {
                    state.revealedAnswers.push(data.names[i]);
                    state.correctAnswers++;
                    document.querySelector(`#${mode}-item-${i + 1} .item-name`).textContent = data.names[i];
                }
            }
            progressCounter.textContent = `${state.correctAnswers} / ${data.total}`;
            const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
            const playerName = prompt(`DEV: Completed ${data.title} in ${formatTime(timeTaken)}\n\nEnter name:`);
            if (playerName) submitScore(playerName, timeTaken, mode);
            gameInput.value = "";
            return;
        }
        const normalizedUserInput = normalizeText(userInput);
        let matchFound = false;
        for (let i = 0; i < data.names.length; i++) {
            if (normalizeText(data.names[i]) === normalizedUserInput) {
                matchFound = true;
                if (!state.revealedAnswers.includes(data.names[i])) {
                    if (state.startTime === null) state.startTime = Date.now();
                    state.revealedAnswers.push(data.names[i]);
                    state.correctAnswers++;
                    document.querySelector(`#${mode}-item-${i + 1} .item-name`).textContent = data.names[i];
                    progressCounter.textContent = `${state.correctAnswers} / ${data.total}`;
                    displayFeedback('صحيح!', 'correct');
                    if (state.correctAnswers === data.total) {
                        const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
                        const playerName = prompt(`ما شاء الله! لقد أكملت ${data.title} في ${formatTime(timeTaken)}\n\nأدخل اسمك:`);
                        if (playerName) submitScore(playerName, timeTaken, mode);
                    }
                } else {
                    displayFeedback('هذا الاسم موجود بالفعل', 'warning');
                }
                break;
            }
        }
        if (!matchFound) displayFeedback('إجابة خاطئة، حاول مرة أخرى', 'error');
        gameInput.value = "";
        gameInput.focus();
    }
    function showAll() {
        const userConfirmed = confirm("هل أنت متأكد؟ لن تستطيع تسجيل رقم قياسي في هذه الجولة.");
        if (userConfirmed) {
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
    function switchMode(newMode) {
        gameState.currentMode = newMode;
        const data = gameModesData[newMode];
        const state = gameState[newMode];
        gameTitle.textContent = data.title;
        gameInput.placeholder = data.placeholder;
        showAllBtn.textContent = data.showAllText;
        progressCounter.textContent = `${state.correctAnswers} / ${data.total}`;
        surahsGridContainer.style.display = newMode === 'surahs' ? 'grid' : 'none';
        prophetsGridContainer.style.display = newMode === 'prophets' ? 'grid' : 'none';
        surahsModeBtn.classList.toggle('active', newMode === 'surahs');
        prophetsModeBtn.classList.toggle('active', newMode === 'prophets');
        fetchLeaderboard(newMode);
    }
    function startMasterTimer() {
        setInterval(() => {
            const state = gameState[gameState.currentMode];
            if (state.startTime && state.startTime !== "invalidated") {
                const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
                timerDisplay.textContent = formatTime(timeTaken);
            } else if (state.startTime === "invalidated") {
                timerDisplay.textContent = "N/A";
            } else {
                timerDisplay.textContent = "00:00";
            }
        }, 1000);
    }

    // ---- THE NEW, DEFENSIVE INITIALIZATION ----
    function main() {
        try {
            // 1. Assign all our HTML elements
            gameTitle = document.getElementById('game-title');
            progressCounter = document.getElementById('progress-counter');
            timerDisplay = document.getElementById('timer');
            surahsGridContainer = document.getElementById('surahs-grid-container');
            prophetsGridContainer = document.getElementById('prophets-grid-container');
            gameInput = document.getElementById('game-input');
            submitButton = document.getElementById('submit-button');
            showAllBtn = document.getElementById('show-all-btn');
            feedbackMessage = document.getElementById('feedback-message');
            surahsModeBtn = document.getElementById('surahs-mode-btn');
            prophetsModeBtn = document.getElementById('prophets-mode-btn');
            leaderboardHeader = document.getElementById('leaderboard-header');
            leaderboardList = document.getElementById('leaderboard-list');

            // 2. Defensively check for Supabase before initializing it
            if (window.supabase) {
                const SUPABASE_URL = 'https://woonpgbywiwbkeiexfem.supabase.co';
                const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb25wZ2J5d2l3YmtlaWV4ZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzE2OTksImV4cCI6MjA2ODEwNzY5OX0.-1zaAaP2FfCc80wlcwV7GcO7m-xOhHflake7s22FYD8';
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            } else {
                // If Supabase isn't ready, throw an error we can see.
                throw new Error("Supabase library not loaded.");
            }

            // 3. Set up the rest of the game
            buildGridForMode('surahs');
            buildGridForMode('prophets');
            switchMode('surahs');
            startMasterTimer();
            
            // 4. Attach event listeners
            submitButton.addEventListener('click', checkAnswer);
            gameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkAnswer(); });
            showAllBtn.addEventListener('click', showAll);
            leaderboardHeader.addEventListener('click', () => leaderboardHeader.parentElement.classList.toggle('is-collapsed'));
            surahsModeBtn.addEventListener('click', () => switchMode('surahs'));
            prophetsModeBtn.addEventListener('click', () => switchMode('prophets'));

        } catch (error) {
            // THIS IS THE CRITICAL PART
            // If anything goes wrong above, it will be caught here.
            console.error("A critical error occurred during initialization:", error);
            // We will display the error message directly on the page so you can see it on mobile.
            document.body.innerHTML = `<div style="color: red; padding: 20px; font-size: 24px; text-align: left; direction: ltr;">
                <h1>Fatal Error</h1>
                <p>The application could not start. Please take a screenshot of this error.</p>
                <pre>${error.stack}</pre>
            </div>`;
        }
    }

    // This waits for the entire page, including all scripts, to be ready before running our main function.
    window.addEventListener('load', main);

})(); // This is the end of the self-executing function wrapper