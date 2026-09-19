import { Icons } from '../utils/icons.js';
import { quizQuestions } from '../data/quizData.js';

export function renderQuizView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  container.innerHTML = `
    <!-- Header -->
    <section class="hero-banner" style="padding-bottom: 20px;">
      <div class="hero-tag" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">
        ${Icons.brain} Active Recall Drills
      </div>
      <h1 class="hero-title">
        Java Collections & <span class="hero-gradient-text">Big-O Flashcard Drills</span>
      </h1>
      <p class="hero-desc">
        Test your recall on syntax gotchas, Collection selection, time complexities, and corner-case nuances commonly asked in warm-up interview rounds.
      </p>

      <div class="hero-stats-row">
        <div class="stat-item">
          <div class="stat-val" id="quiz-score-val" style="color: #34d399;">0</div>
          <div class="stat-label">Score</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" id="quiz-progress-val" style="color: var(--primary);">1 / ${quizQuestions.length}</div>
          <div class="stat-label">Progress</div>
        </div>
      </div>
    </section>

    <!-- Quiz Card Container -->
    <div style="max-width: 760px; margin: 20px auto 60px;">
      <div class="card" id="quiz-question-card" style="padding: 32px;">
        <!-- Populated dynamically -->
      </div>
    </div>
  `;

  const questionCard = container.querySelector('#quiz-question-card');
  const scoreVal = container.querySelector('#quiz-score-val');
  const progressVal = container.querySelector('#quiz-progress-val');

  function renderQuestion() {
    answered = false;
    const q = quizQuestions[currentIdx];

    scoreVal.textContent = score;
    progressVal.textContent = `${currentIdx + 1} / ${quizQuestions.length}`;

    questionCard.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <span class="badge badge-java">${q.category}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Question ${currentIdx + 1} of ${quizQuestions.length}</span>
      </div>

      <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; line-height: 1.4; margin-bottom: 24px;">
        ${q.question}
      </h3>

      <div style="display: flex; flex-direction: column; gap: 12px;" id="quiz-options-list">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option-btn" data-opt-idx="${idx}" style="
            text-align: left;
            padding: 14px 18px;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-primary);
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

    const optionBtns = questionCard.querySelectorAll('.quiz-option-btn');
    const feedbackBox = questionCard.querySelector('#quiz-feedback-box');
    const nextBtn = questionCard.querySelector('#quiz-next-btn');

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
        scoreVal.textContent = score;

        // Color options
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

        // Show feedback
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
        renderQuestion();
      } else {
        renderResults();
      }
    });
  }

  function renderResults() {
    const totalPossible = quizQuestions.length * 10;
    const pct = Math.round((score / totalPossible) * 100);

    questionCard.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
          Quiz Completed!
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">
          You scored <strong style="color: var(--accent-emerald); font-size: 1.3rem;">${score}</strong> out of ${totalPossible} points (${pct}%).
        </p>

        <div style="display: flex; justify-content: center; gap: 14px;">
          <button class="btn-primary" id="quiz-restart-btn">
            ${Icons.reset} Retake Quiz
          </button>
        </div>
      </div>
    `;

    questionCard.querySelector('#quiz-restart-btn').addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
  return container;
}
