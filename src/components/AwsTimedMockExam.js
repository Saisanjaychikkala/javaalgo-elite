// ============================================================
// AWS CLF-C02 TIMED 65-QUESTION FULL MOCK EXAM ENGINE
// 90-minute live countdown timer, question navigator grid,
// bookmarking/flagging, and domain-by-domain diagnostic scorecard
// ============================================================

import { awsMockExam65 } from '../data/awsMockExamData.js';

export function renderAwsTimedMockExam() {
  const container = document.createElement('div');
  container.className = 'aws-timed-exam-container';
  container.style.cssText = 'min-height: 500px;';

  // Exam state
  let state = {
    status: 'idle', // 'idle' | 'running' | 'submitted'
    currentIndex: 0,
    answers: {}, // { [index]: selectedOptionIndex }
    flagged: new Set(),
    secondsLeft: 90 * 60, // 90 minutes
    timerInterval: null,
    reviewMode: false
  };

  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (state.secondsLeft > 0) {
        state.secondsLeft--;
        const timerEl = container.querySelector('#exam-timer-display');
        if (timerEl) {
          timerEl.textContent = formatTime(state.secondsLeft);
          if (state.secondsLeft < 300) {
            timerEl.style.color = '#f43f5e';
          } else if (state.secondsLeft < 900) {
            timerEl.style.color = '#fbbf24';
          }
        }
      } else {
        clearInterval(state.timerInterval);
        submitExam();
      }
    }, 1000);
  }

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function submitExam() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.status = 'submitted';
    renderView();
  }

  function calculateScore() {
    let correctCount = 0;
    const domainStats = {
      "Domain 1: Cloud Concepts": { total: 0, correct: 0 },
      "Domain 2: Security & Compliance": { total: 0, correct: 0 },
      "Domain 3: Cloud Technology & Services": { total: 0, correct: 0 },
      "Domain 4: Billing, Pricing & Support": { total: 0, correct: 0 }
    };

    awsMockExam65.forEach((q, idx) => {
      const chosen = state.answers[idx];
      const isCorrect = chosen === q.correct;
      if (isCorrect) correctCount++;

      const d = q.domain || "Domain 1: Cloud Concepts";
      if (!domainStats[d]) domainStats[d] = { total: 0, correct: 0 };
      domainStats[d].total++;
      if (isCorrect) domainStats[d].correct++;
    });

    const scaledScore = Math.round((correctCount / awsMockExam65.length) * 1000);
    const passed = scaledScore >= 700;

    return { correctCount, total: awsMockExam65.length, scaledScore, passed, domainStats };
  }

  function renderView() {
    container.innerHTML = '';

    if (state.status === 'idle') {
      renderIntro();
    } else if (state.status === 'running') {
      renderActiveExam();
    } else if (state.status === 'submitted') {
      renderScorecard();
    }
  }

  // ── 1. INTRO SCREEN ──────────────────────────────────────────
  function renderIntro() {
    container.innerHTML = `
      <div style="padding: 32px 28px; background: linear-gradient(135deg, rgba(251,191,36,0.12), rgba(15,23,42,0.85));
        border: 1px solid rgba(251,191,36,0.3); border-radius: 18px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
          <div style="font-size: 2.5rem;">⏱️</div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.1em;">
              Full Realistic Simulation
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 900; margin: 0; color: #f8fafc;">
              AWS Certified Cloud Practitioner (CLF-C02) Mock Exam
            </h2>
          </div>
        </div>

        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.92rem; margin-bottom: 24px; max-width: 750px;">
          This full-length mock exam mirrors the exact timing, question format, and domain weighting of the official AWS CLF-C02 exam. Test your real exam readiness under timed conditions!
        </p>

        <!-- Exam Details Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 28px;">
          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 1.4rem; font-weight: 900; color: #fbbf24;">65</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Questions</div>
          </div>
          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 1.4rem; font-weight: 900; color: #38bdf8;">90</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Minutes</div>
          </div>
          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 1.4rem; font-weight: 900; color: #34d399;">700</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Passing Score (out of 1000)</div>
          </div>
          <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: 12px; text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 1.4rem; font-weight: 900; color: #c084fc;">4</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Official Domains</div>
          </div>
        </div>

        <!-- Official Blueprint Weights -->
        <div style="margin-bottom: 28px; padding: 18px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">Official Blueprint Question Breakdown:</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.8rem;">
            <div style="display:flex; justify-content:space-between; padding: 6px 10px; background: rgba(56,189,248,0.08); border-radius: 6px; color:#38bdf8;">
              <span>1. Cloud Concepts</span><strong>16 Qs (24%)</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding: 6px 10px; background: rgba(244,63,94,0.08); border-radius: 6px; color:#f87171;">
              <span>2. Security & Compliance</span><strong>20 Qs (30%)</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding: 6px 10px; background: rgba(16,185,129,0.08); border-radius: 6px; color:#34d399;">
              <span>3. Technology & Services</span><strong>21 Qs (34%)</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding: 6px 10px; background: rgba(251,191,36,0.08); border-radius: 6px; color:#fbbf24;">
              <span>4. Billing & Support</span><strong>8 Qs (12%)</strong>
            </div>
          </div>
        </div>

        <button id="start-exam-btn" style="
          padding: 14px 28px; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000;
          font-weight: 800; font-size: 1rem; border: none; border-radius: 10px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(251,191,36,0.35); transition: transform 0.15s ease;">
          🚀 Start 90-Minute Timed Mock Exam
        </button>
      </div>
    `;

    container.querySelector('#start-exam-btn').addEventListener('click', () => {
      state.status = 'running';
      state.secondsLeft = 90 * 60;
      state.currentIndex = 0;
      state.answers = {};
      state.flagged.clear();
      startTimer();
      renderView();
    });
  }

  // ── 2. ACTIVE EXAM SCREEN ─────────────────────────────────────
  function renderActiveExam() {
    const q = awsMockExam65[state.currentIndex];
    const totalQ = awsMockExam65.length;
    const answeredCount = Object.keys(state.answers).length;
    const isFlagged = state.flagged.has(state.currentIndex);
    const selectedOpt = state.answers[state.currentIndex];

    container.innerHTML = `
      <!-- Top Sticky Header -->
      <div style="position: sticky; top: 70px; z-index: 10; background: rgba(11, 15, 25, 0.95);
        backdrop-filter: blur(12px); border: 1px solid var(--border-subtle); border-radius: 14px;
        padding: 12px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="padding: 6px 14px; background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.3); border-radius: 8px; font-weight: 900; font-size: 1.15rem; color: #fbbf24; font-family: var(--font-mono); display: flex; align-items: center; gap: 6px;">
            <span>⏱️</span>
            <span id="exam-timer-display">${formatTime(state.secondsLeft)}</span>
          </div>
          <div>
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-primary);">
              Question ${state.currentIndex + 1} of ${totalQ}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">
              ${answeredCount} answered • ${totalQ - answeredCount} remaining
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button id="flag-btn" style="
            padding: 8px 14px; background: ${isFlagged ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)'};
            border: 1px solid ${isFlagged ? '#fbbf24' : 'var(--border-subtle)'}; color: ${isFlagged ? '#fbbf24' : 'var(--text-secondary)'};
            border-radius: 8px; cursor: pointer; font-size: 0.82rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            ${isFlagged ? '🚩 Flagged' : '🏳️ Flag for Review'}
          </button>
          <button id="submit-exam-btn" style="
            padding: 8px 18px; background: #10b981; color: #000; border: none; border-radius: 8px;
            font-weight: 800; font-size: 0.85rem; cursor: pointer;">
            Finish & Submit
          </button>
        </div>
      </div>

      <!-- Main Layout: Question Left + Navigator Grid Right -->
      <div style="display: grid; grid-template-columns: 1fr 280px; gap: 20px; align-items: start;">
        
        <!-- Question Box -->
        <div style="padding: 24px; background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle); border-radius: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(56,189,248,0.1); padding: 3px 10px; border-radius: 99px;">
              ${q.domain}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Q#${state.currentIndex + 1}</span>
          </div>

          <h3 style="font-size: 1.05rem; font-weight: 700; color: #f8fafc; line-height: 1.6; margin-bottom: 20px;">
            ${q.question}
          </h3>

          <!-- Options -->
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px;">
            ${q.options.map((opt, i) => {
              const isSelected = selectedOpt === i;
              return `
                <div class="exam-opt-row" data-opt="${i}" style="
                  padding: 14px 16px; background: ${isSelected ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.02)'};
                  border: 1px solid ${isSelected ? '#38bdf8' : 'var(--border-subtle)'};
                  border-radius: 10px; cursor: pointer; display: flex; align-items: flex-start; gap: 12px; transition: all 0.15s ease;">
                  <div style="
                    width: 22px; height: 22px; border-radius: 50%; border: 2px solid ${isSelected ? '#38bdf8' : 'var(--text-muted)'};
                    display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: ${isSelected ? '#38bdf8' : 'var(--text-muted)'};
                    background: ${isSelected ? 'rgba(56,189,248,0.2)' : 'transparent'}; flex-shrink: 0; margin-top: 1px;">
                    ${String.fromCharCode(65 + i)}
                  </div>
                  <div style="color: ${isSelected ? '#f8fafc' : 'var(--text-secondary)'}; font-size: 0.88rem; line-height: 1.5;">
                    ${opt}
                  </div>
                </div>`;
            }).join('')}
          </div>

          <!-- Question Footer Navigation -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 18px;">
            <button id="prev-q-btn" style="
              padding: 9px 18px; background: rgba(255,255,255,0.04); color: var(--text-primary); border: 1px solid var(--border-subtle);
              border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; ${state.currentIndex === 0 ? 'opacity:0.4; cursor:not-allowed;' : ''}">
              ← Previous
            </button>
            <button id="next-q-btn" style="
              padding: 9px 22px; background: #38bdf8; color: #000; border: none;
              border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
              ${state.currentIndex === totalQ - 1 ? 'Review All →' : 'Next →'}
            </button>
          </div>
        </div>

        <!-- Right Side: Question Navigator Grid -->
        <div style="padding: 18px; background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle); border-radius: 16px;">
          <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">
            Question Navigator (65)
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; max-height: 380px; overflow-y: auto; padding-right: 4px;">
            ${awsMockExam65.map((_, i) => {
              const answered = state.answers[i] !== undefined;
              const flagged = state.flagged.has(i);
              const isCurrent = state.currentIndex === i;

              let bg = 'rgba(255,255,255,0.04)';
              let border = 'var(--border-subtle)';
              let color = 'var(--text-muted)';

              if (answered) {
                bg = 'rgba(16,185,129,0.2)';
                border = '#10b981';
                color = '#34d399';
              }
              if (flagged) {
                bg = 'rgba(251,191,36,0.25)';
                border = '#fbbf24';
                color = '#fbbf24';
              }
              if (isCurrent) {
                border = '#38bdf8';
                color = '#ffffff';
                bg = '#38bdf844';
              }

              return `
                <button class="q-grid-btn" data-qidx="${i}" style="
                  height: 32px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; font-family: var(--font-mono);
                  background: ${bg}; border: 1px solid ${border}; color: ${color}; cursor: pointer; transition: all 0.1s ease;
                  display: flex; align-items: center; justify-content: center; position: relative;">
                  ${i + 1}
                  ${flagged ? '<span style="position:absolute; top:-2px; right:1px; font-size:0.55rem;">🚩</span>' : ''}
                </button>`;
            }).join('')}
          </div>

          <!-- Legend -->
          <div style="margin-top: 14px; pt: 12px; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 6px; font-size: 0.72rem; color: var(--text-muted);">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width:10px;height:10px;border-radius:2px;background:rgba(16,185,129,0.5);"></span>
              <span>Answered (${answeredCount})</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width:10px;height:10px;border-radius:2px;background:rgba(251,191,36,0.5);"></span>
              <span>Flagged for Review (${state.flagged.size})</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width:10px;height:10px;border-radius:2px;background:rgba(255,255,255,0.08);"></span>
              <span>Unanswered (${totalQ - answeredCount})</span>
            </div>
          </div>
        </div>

      </div>
    `;

    // Event listeners
    container.querySelectorAll('.exam-opt-row').forEach(row => {
      row.addEventListener('click', () => {
        const opt = parseInt(row.dataset.opt, 10);
        state.answers[state.currentIndex] = opt;
        renderActiveExam();
      });
    });

    container.querySelector('#flag-btn').addEventListener('click', () => {
      if (state.flagged.has(state.currentIndex)) {
        state.flagged.delete(state.currentIndex);
      } else {
        state.flagged.add(state.currentIndex);
      }
      renderActiveExam();
    });

    container.querySelector('#prev-q-btn').addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderActiveExam();
      }
    });

    container.querySelector('#next-q-btn').addEventListener('click', () => {
      if (state.currentIndex < totalQ - 1) {
        state.currentIndex++;
        renderActiveExam();
      }
    });

    container.querySelectorAll('.q-grid-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentIndex = parseInt(btn.dataset.qidx, 10);
        renderActiveExam();
      });
    });

    container.querySelector('#submit-exam-btn').addEventListener('click', () => {
      const unanswered = totalQ - Object.keys(state.answers).length;
      let msg = "Are you sure you want to finish and submit your exam?";
      if (unanswered > 0) {
        msg = `You have ${unanswered} unanswered question(s). Are you sure you want to submit now?`;
      }
      if (confirm(msg)) {
        submitExam();
      }
    });
  }

  // ── 3. SCORECARD & REVIEW SCREEN ──────────────────────────────
  function renderScorecard() {
    const { correctCount, total, scaledScore, passed, domainStats } = calculateScore();

    container.innerHTML = `
      <div style="padding: 30px; background: linear-gradient(135deg, ${passed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}, rgba(15,23,42,0.9));
        border: 1px solid ${passed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; border-radius: 18px; margin-bottom: 24px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 800; color: ${passed ? '#34d399' : '#f87171'}; text-transform: uppercase; letter-spacing: 0.08em;">
              Exam Diagnostic Report
            </span>
            <h2 style="font-size: 1.8rem; font-weight: 900; color: #f8fafc; margin: 4px 0 0;">
              ${passed ? '🎉 CONGRATULATIONS! YOU PASSED!' : '⚠️ REVIEW REQUIRED BEFORE EXAM'}
            </h2>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 2.2rem; font-weight: 900; color: ${passed ? '#34d399' : '#f87171'}; font-family: var(--font-mono);">
              ${scaledScore} <span style="font-size: 1rem; color: var(--text-muted);">/ 1000</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700;">
              Passing Grade: 700 • Result: ${correctCount}/${total} (${Math.round((correctCount/total)*100)}%)
            </div>
          </div>
        </div>

        <!-- Domain Diagnostic Breakdown -->
        <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin-bottom: 14px;">Domain Performance Breakdown:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${Object.entries(domainStats).map(([domain, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            const isGood = pct >= 70;
            return `
              <div style="padding: 14px; background: rgba(0,0,0,0.3); border-radius: 10px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">${domain.split(':')[0]}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 1.1rem; font-weight: 800; color: ${isGood ? '#34d399' : '#f87171'};">${pct}%</span>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">${data.correct}/${data.total} correct</span>
                </div>
                <div style="height: 4px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
                  <div style="height: 100%; width: ${pct}%; background: ${isGood ? '#10b981' : '#ef4444'};"></div>
                </div>
              </div>`;
          }).join('')}
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="retake-btn" style="
            padding: 12px 20px; background: rgba(255,255,255,0.08); color: var(--text-primary); border: 1px solid var(--border-subtle);
            border-radius: 8px; font-weight: 700; font-size: 0.88rem; cursor: pointer;">
            🔄 Retake Full Exam
          </button>
        </div>
      </div>

      <!-- Comprehensive Review Mode: All 65 Questions -->
      <div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 18px;">
          📖 Full Question-by-Question Review (65 Questions)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${awsMockExam65.map((q, idx) => {
            const userChoice = state.answers[idx];
            const isCorrect = userChoice === q.correct;
            return `
              <div style="padding: 20px; background: rgba(15,23,42,0.6); border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; border-radius: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; text-transform: uppercase;">${q.domain}</span>
                  <span style="font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 99px; background: ${isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color: ${isCorrect ? '#34d399' : '#f87171'};">
                    ${isCorrect ? '✓ Correct' : '✕ Incorrect'}
                  </span>
                </div>
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.94rem; margin-bottom: 14px; line-height: 1.5;">
                  Q${idx + 1}. ${q.question}
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                  ${q.options.map((opt, optIdx) => {
                    let optStyle = "background: rgba(255,255,255,0.02); border-color: var(--border-subtle); color: var(--text-secondary);";
                    if (optIdx === q.correct) {
                      optStyle = "background: rgba(16,185,129,0.18); border-color: #34d399; color: #34d399; font-weight: 700;";
                    } else if (optIdx === userChoice && !isCorrect) {
                      optStyle = "background: rgba(239,68,68,0.15); border-color: #f87171; color: #f87171;";
                    }
                    return `
                      <div style="padding: 10px 14px; border-radius: 8px; border: 1px solid; font-size: 0.85rem; ${optStyle}">
                        <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
                        ${optIdx === q.correct ? ' <span style="font-size:0.75rem;">(Correct Answer)</span>' : ''}
                        ${optIdx === userChoice && !isCorrect ? ' <span style="font-size:0.75rem;">(Your Answer)</span>' : ''}
                      </div>`;
                  }).join('')}
                </div>
                <div style="padding: 12px 16px; background: rgba(56,189,248,0.06); border-left: 3px solid #38bdf8; border-radius: 0 8px 8px 0; font-size: 0.85rem; color: #bae6fd; line-height: 1.6;">
                  <strong>💡 Official Rationale: </strong>${q.explanation}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelector('#retake-btn').addEventListener('click', () => {
      state.status = 'idle';
      state.secondsLeft = 90 * 60;
      state.currentIndex = 0;
      state.answers = {};
      state.flagged.clear();
      renderView();
    });
  }

  renderView();
  return container;
}
