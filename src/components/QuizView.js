import { Icons } from '../utils/icons.js';
import { quizQuestions } from '../data/quizData.js';
import { complexityChallenges, complexityOptions } from '../data/complexityGameData.js';

export function renderQuizView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  // Mode state: 'flashcards' | 'complexity'
  let activeMode = 'flashcards';

  // Flashcards state
  let currentIdx = 0;
  let score = 0;
  let answered = false;

  // Complexity Challenge state
  let compIdx = 0;
  let compScore = 0;
  let compStreak = 0;
  let compMaxStreak = 0;
  let compAnswered = false;
  let compFilter = 'All'; // 'All' | 'Easy' | 'Medium' | 'Hard' | 'Tricky'

  function getFilteredChallenges() {
    if (compFilter === 'All') return complexityChallenges;
    return complexityChallenges.filter(c => c.difficulty === compFilter);
  }

  function getStreakMultiplier() {
    if (compStreak >= 5) return 3;
    if (compStreak >= 3) return 2;
    if (compStreak >= 2) return 1.5;
    return 1;
  }

  function renderView() {
    container.innerHTML = `
      <!-- Header -->
      <section class="hero-banner" style="padding-bottom: 20px;">
        <div class="hero-tag" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">
          ${Icons.brain} Active Recall & Big-O Speedrun Drills
        </div>
        <h1 class="hero-title">
          Mastery <span class="hero-gradient-text">Quiz & Complexity Arena</span>
        </h1>
        <p class="hero-desc">
          Sharpen your instant recall on Java Collection mechanics, Big-O time complexities, and subtle interview corner cases under pressure.
        </p>

        <!-- Mode Toggle Tabs -->
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 14px;">
          <button class="filter-btn ${activeMode === 'flashcards' ? 'active' : ''}" id="mode-flashcards-btn" style="padding: 8px 20px; font-weight: 700;">
            🧠 Java & Big-O Flashcards (${quizQuestions.length})
          </button>
          <button class="filter-btn ${activeMode === 'complexity' ? 'active' : ''}" id="mode-complexity-btn" style="padding: 8px 20px; font-weight: 700; color: #fbbf24;">
            ⚡ Big-O Guessing Game (${complexityChallenges.length})
          </button>
        </div>

        <!-- Dynamic Stats Row -->
        <div class="hero-stats-row" id="quiz-stats-row" style="margin-top: 20px;">
          ${renderStatsRowHTML()}
        </div>
      </section>

      <!-- Main Card Container -->
      <div style="max-width: 820px; margin: 20px auto 60px;">
        <div class="card" id="quiz-main-card" style="padding: 32px;">
          <!-- Populated dynamically -->
        </div>
      </div>
    `;

    // Event listeners for mode toggle
    container.querySelector('#mode-flashcards-btn').addEventListener('click', () => {
      activeMode = 'flashcards';
      renderView();
    });

    container.querySelector('#mode-complexity-btn').addEventListener('click', () => {
      activeMode = 'complexity';
      renderView();
    });

    if (activeMode === 'flashcards') {
      renderFlashcardQuestion();
    } else {
      renderComplexityQuestion();
    }
  }

  function renderStatsRowHTML() {
    if (activeMode === 'flashcards') {
      return `
        <div class="stat-item">
          <div class="stat-val" id="quiz-score-val" style="color: #34d399;">${score}</div>
          <div class="stat-label">Score</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" id="quiz-progress-val" style="color: var(--primary);">${currentIdx + 1} / ${quizQuestions.length}</div>
          <div class="stat-label">Progress</div>
        </div>
      `;
    } else {
      const challenges = getFilteredChallenges();
      const mult = getStreakMultiplier();
      return `
        <div class="stat-item">
          <div class="stat-val" id="comp-score-val" style="color: #fbbf24;">${compScore}</div>
          <div class="stat-label">Score</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" id="comp-streak-val" style="color: #f472b6;">
            🔥 ${compStreak} ${mult > 1 ? `<span style="font-size: 0.8rem; color: #34d399;">(${mult}x)</span>` : ''}
          </div>
          <div class="stat-label">Streak (Max: ${compMaxStreak})</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" id="comp-progress-val" style="color: var(--primary);">
            ${compIdx + 1} / ${challenges.length}
          </div>
          <div class="stat-label">Progress (${compFilter})</div>
        </div>
      `;
    }
  }

  // ==========================================
  // MODE 1: FLASHCARDS
  // ==========================================
  function renderFlashcardQuestion() {
    const mainCard = container.querySelector('#quiz-main-card');
    if (!mainCard) return;

    answered = false;
    const q = quizQuestions[currentIdx];

    // Update stats
    const scoreVal = container.querySelector('#quiz-score-val');
    const progressVal = container.querySelector('#quiz-progress-val');
    if (scoreVal) scoreVal.textContent = score;
    if (progressVal) progressVal.textContent = `${currentIdx + 1} / ${quizQuestions.length}`;

    mainCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <span class="badge badge-java">${q.category}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Question ${currentIdx + 1} of ${quizQuestions.length}</span>
      </div>

      <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); line-height: 1.4; margin-bottom: 24px;">
        ${q.question}
      </h3>

      <div style="display: flex; flex-direction: column; gap: 12px;" id="quiz-options-list">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option-btn" data-opt-idx="${idx}" style="
            text-align: left;
            padding: 14px 18px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            box-shadow: var(--card-inner-highlight);
            font-size: 0.95rem;
            transition: all var(--transition-fast);
            display: flex;
            align-items: center;
            gap: 12px;
          ">
            <span style="
              width: 28px;
              height: 28px;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.06);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-mono);
              font-size: 0.85rem;
              font-weight: 700;
              color: var(--text-secondary);
              flex-shrink: 0;
            ">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>

      <!-- Feedback container -->
      <div id="quiz-feedback-box" style="margin-top: 20px; display: none;"></div>

      <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
        <button class="btn-primary" id="quiz-next-btn" style="display: none; padding: 10px 24px;">
          ${currentIdx < quizQuestions.length - 1 ? 'Next Question →' : 'View Final Score 🏆'}
        </button>
      </div>
    `;

    const optionBtns = mainCard.querySelectorAll('.quiz-option-btn');
    const feedbackBox = mainCard.querySelector('#quiz-feedback-box');
    const nextBtn = mainCard.querySelector('#quiz-next-btn');

    optionBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (!answered) {
          btn.style.borderColor = 'var(--primary)';
          btn.style.background = 'rgba(56, 189, 248, 0.08)';
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (!answered) {
          btn.style.borderColor = 'var(--border-subtle)';
          btn.style.background = 'rgba(15, 23, 42, 0.7)';
        }
      });

      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const selectedIdx = parseInt(btn.dataset.optIdx, 10);
        const isCorrect = selectedIdx === q.correctAnswerIndex;

        if (isCorrect) score += 10;
        if (scoreVal) scoreVal.textContent = score;

        optionBtns.forEach((b, bIdx) => {
          if (bIdx === q.correctAnswerIndex) {
            b.style.background = 'rgba(16, 185, 129, 0.2)';
            b.style.borderColor = '#10b981';
            b.style.color = '#34d399';
          } else if (bIdx === selectedIdx && !isCorrect) {
            b.style.background = 'rgba(239, 68, 68, 0.2)';
            b.style.borderColor = '#ef4444';
            b.style.color = '#f87171';
          } else {
            b.style.opacity = '0.4';
          }
        });

        feedbackBox.style.display = 'block';
        feedbackBox.className = isCorrect ? 'callout callout-success' : 'callout callout-warning';
        feedbackBox.innerHTML = `
          <span>${isCorrect ? Icons.check : Icons.close}</span>
          <div>
            <strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong>
            <p style="margin-top: 4px; font-size: 0.88rem;">${q.explanation}</p>
          </div>
        `;

        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      if (currentIdx < quizQuestions.length - 1) {
        currentIdx++;
        renderFlashcardQuestion();
      } else {
        renderFlashcardResults();
      }
    });
  }

  function renderFlashcardResults() {
    const mainCard = container.querySelector('#quiz-main-card');
    const totalPossible = quizQuestions.length * 10;
    const pct = Math.round((score / totalPossible) * 100);

    mainCard.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
          Flashcard Quiz Completed!
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">
          You scored <strong style="color: var(--accent-emerald); font-size: 1.3rem;">${score}</strong> out of ${totalPossible} points (${pct}%).
        </p>

        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <button class="btn-primary" id="quiz-restart-btn">
            ${Icons.reset} Retake Flashcard Quiz
          </button>
          <button class="btn-secondary" id="try-complexity-btn" style="color: #fbbf24; border-color: rgba(251, 191, 36, 0.4);">
            ⚡ Try Big-O Complexity Arena →
          </button>
        </div>
      </div>
    `;

    mainCard.querySelector('#quiz-restart-btn').addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      renderFlashcardQuestion();
    });

    mainCard.querySelector('#try-complexity-btn').addEventListener('click', () => {
      activeMode = 'complexity';
      renderView();
    });
  }

  // ==========================================
  // MODE 2: COMPLEXITY CHALLENGE ARENA
  // ==========================================
  function renderComplexityQuestion() {
    const mainCard = container.querySelector('#quiz-main-card');
    if (!mainCard) return;

    compAnswered = false;
    const challenges = getFilteredChallenges();

    if (compIdx >= challenges.length) {
      renderComplexityResults();
      return;
    }

    const c = challenges[compIdx];

    // Refresh stats row
    const statsRow = container.querySelector('#quiz-stats-row');
    if (statsRow) statsRow.innerHTML = renderStatsRowHTML();

    const diffColors = {
      'Easy': '#34d399',
      'Medium': '#38bdf8',
      'Hard': '#fbbf24',
      'Tricky': '#f472b6'
    };
    const diffColor = diffColors[c.difficulty] || '#38bdf8';

    mainCard.innerHTML = `
      <!-- Top Bar: Filter & Meta -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: ${diffColor}18; color: ${diffColor}; border: 1px solid ${diffColor}44; font-weight: 700;">
            ${c.difficulty}
          </span>
          <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">
            Challenge ${compIdx + 1} of ${challenges.length}
          </span>
        </div>

        <!-- Filter Pill Buttons -->
        <div style="display: flex; gap: 6px;">
          ${['All', 'Easy', 'Medium', 'Hard', 'Tricky'].map(f => `
            <button class="comp-filter-btn ${compFilter === f ? 'active' : ''}" data-filter="${f}" style="
              font-size: 0.72rem; padding: 3px 8px; border-radius: 6px; cursor: pointer;
              background: ${compFilter === f ? 'var(--primary)' : 'rgba(255,255,255,0.06)'};
              color: ${compFilter === f ? '#fff' : 'var(--text-muted)'};
              border: 1px solid ${compFilter === f ? 'var(--primary)' : 'transparent'};
              font-weight: 600;
            ">${f}</button>
          `).join('')}
        </div>
      </div>

      <!-- Question Title -->
      <h3 style="font-size: 1.18rem; font-weight: 700; color: var(--text-primary); line-height: 1.4; margin-bottom: 14px;">
        What is the Worst-Case Time Complexity of this code snippet?
      </h3>

      <!-- Code Snippet Display -->
      <div style="position: relative; margin-bottom: 22px;">
        <pre style="
          background: #090d16;
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 10px;
          padding: 16px 20px;
          color: #e2e8f0;
          font-family: var(--font-mono);
          font-size: 0.92rem;
          line-height: 1.55;
          overflow-x: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        "><code>${escapeHTML(c.code)}</code></pre>
      </div>

      <!-- 7 Big-O Option Pills -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
          SELECT COMPLEXITY:
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px;" id="comp-options-grid">
          ${complexityOptions.map(opt => `
            <button class="comp-option-btn" data-val="${opt}" style="
              padding: 12px 14px;
              background: var(--bg-tertiary);
              border: 1px solid var(--border-subtle);
              border-radius: 8px;
              color: var(--text-primary);
              font-family: var(--font-mono);
              font-size: 0.95rem;
              font-weight: 700;
              cursor: pointer;
              transition: all var(--transition-fast);
              text-align: center;
              box-shadow: var(--card-inner-highlight);
            ">${opt}</button>
          `).join('')}
        </div>
      </div>

      <!-- Feedback Box -->
      <div id="comp-feedback-box" style="margin-top: 18px; display: none;"></div>

      <!-- Action Row -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
        <button class="btn-secondary" id="comp-skip-btn" style="padding: 8px 16px; font-size: 0.85rem;">
          Skip Snippet ⏭
        </button>
        <button class="btn-primary" id="comp-next-btn" style="display: none; padding: 10px 24px;">
          ${compIdx < challenges.length - 1 ? 'Next Challenge →' : 'View Final Score 🏆'}
        </button>
      </div>
    `;

    // Filter clicks
    mainCard.querySelectorAll('.comp-filter-btn').forEach(b => {
      b.addEventListener('click', () => {
        compFilter = b.dataset.filter;
        compIdx = 0;
        renderComplexityQuestion();
      });
    });

    const optionBtns = mainCard.querySelectorAll('.comp-option-btn');
    const feedbackBox = mainCard.querySelector('#comp-feedback-box');
    const nextBtn = mainCard.querySelector('#comp-next-btn');
    const skipBtn = mainCard.querySelector('#comp-skip-btn');

    optionBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (!compAnswered) {
          btn.style.borderColor = 'var(--primary)';
          btn.style.background = 'rgba(56, 189, 248, 0.15)';
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (!compAnswered) {
          btn.style.borderColor = 'var(--border-subtle)';
          btn.style.background = 'rgba(15, 23, 42, 0.8)';
        }
      });

      btn.addEventListener('click', () => {
        if (compAnswered) return;
        compAnswered = true;
        const selectedVal = btn.dataset.val;
        const isCorrect = selectedVal === c.answer;

        if (isCorrect) {
          compStreak++;
          if (compStreak > compMaxStreak) compMaxStreak = compStreak;
          const points = Math.round(10 * getStreakMultiplier());
          compScore += points;
        } else {
          compStreak = 0;
        }

        // Color buttons
        optionBtns.forEach(b => {
          if (b.dataset.val === c.answer) {
            b.style.background = 'rgba(16, 185, 129, 0.25)';
            b.style.borderColor = '#10b981';
            b.style.color = '#34d399';
            b.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.4)';
          } else if (b.dataset.val === selectedVal && !isCorrect) {
            b.style.background = 'rgba(239, 68, 68, 0.25)';
            b.style.borderColor = '#ef4444';
            b.style.color = '#f87171';
          } else {
            b.style.opacity = '0.35';
          }
        });

        // Feedback
        feedbackBox.style.display = 'block';
        feedbackBox.className = isCorrect ? 'callout callout-success' : 'callout callout-warning';
        feedbackBox.innerHTML = `
          <span>${isCorrect ? Icons.check : Icons.close}</span>
          <div>
            <strong>${isCorrect ? `Correct! Answer: ${c.answer} (+${Math.round(10 * getStreakMultiplier())} pts)` : `Incorrect. Correct Answer: ${c.answer}`}</strong>
            <p style="margin-top: 6px; font-size: 0.9rem; line-height: 1.5;">${c.explanation}</p>
          </div>
        `;

        // Update stats row
        const statsRow = container.querySelector('#quiz-stats-row');
        if (statsRow) statsRow.innerHTML = renderStatsRowHTML();

        nextBtn.style.display = 'inline-flex';
        skipBtn.style.display = 'none';
      });
    });

    nextBtn.addEventListener('click', () => {
      compIdx++;
      renderComplexityQuestion();
    });

    skipBtn.addEventListener('click', () => {
      compIdx++;
      compStreak = 0;
      renderComplexityQuestion();
    });
  }

  function renderComplexityResults() {
    const mainCard = container.querySelector('#quiz-main-card');
    const challenges = getFilteredChallenges();
    const totalPossible = challenges.length * 10;
    const pct = Math.round((compScore / Math.max(1, totalPossible)) * 100);

    mainCard.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 12px;">⚡</div>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
          Big-O Complexity Speedrun Finished!
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: 12px;">
          Final Score: <strong style="color: #fbbf24; font-size: 1.4rem;">${compScore}</strong> points!
        </p>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
          Max Streak: <strong style="color: #f472b6;">🔥 ${compMaxStreak}</strong> consecutive correct answers | Filter: ${compFilter}
        </p>

        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <button class="btn-primary" id="comp-restart-btn">
            ${Icons.reset} Replay Complexity Arena
          </button>
          <button class="btn-secondary" id="switch-flashcards-btn">
            🧠 Back to Flashcard Quiz
          </button>
        </div>
      </div>
    `;

    mainCard.querySelector('#comp-restart-btn').addEventListener('click', () => {
      compIdx = 0;
      compScore = 0;
      compStreak = 0;
      renderComplexityQuestion();
    });

    mainCard.querySelector('#switch-flashcards-btn').addEventListener('click', () => {
      activeMode = 'flashcards';
      renderView();
    });
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderView();
  return container;
}
