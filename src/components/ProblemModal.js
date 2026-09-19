import { Icons } from '../utils/icons.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';
import { Storage } from '../utils/storage.js';
import { showToast } from '../utils/toast.js';

export function createProblemModal() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'problem-modal-backdrop';

  let currentProblem = null;
  let activeTab = 'code';

  backdrop.innerHTML = `
    <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="prob-modal-title">
      <div class="modal-header">
        <div class="modal-title-group">
          <div id="prob-badge-container"></div>
          <h2 class="section-title" id="prob-modal-title" style="font-size: 1.35rem;"></h2>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn-secondary" id="modal-complete-btn" style="padding: 6px 12px; font-size: 0.8rem;">
            ${Icons.check} <span id="modal-complete-text">Mark Done</span>
          </button>
          <button class="modal-close-btn" id="prob-modal-close" title="Close (Esc)">${Icons.close}</button>
        </div>
      </div>

      <div class="modal-tabs-bar">
        <button class="modal-tab-btn active" data-tab="code">Optimal Java Code</button>
        <button class="modal-tab-btn" data-tab="howToThink">🧠 How to Think About It</button>
        <button class="modal-tab-btn" data-tab="realLife">🌍 Real-Life & Transferable</button>
        <button class="modal-tab-btn" data-tab="complexity">Complexity & Gotchas</button>
      </div>

      <div class="modal-body" id="prob-modal-body">
        <!-- Rendered tab content -->
      </div>
    </div>
  `;

  const titleEl = backdrop.querySelector('#prob-modal-title');
  const badgeContainer = backdrop.querySelector('#prob-badge-container');
  const bodyEl = backdrop.querySelector('#prob-modal-body');
  const closeBtn = backdrop.querySelector('#prob-modal-close');
  const completeBtn = backdrop.querySelector('#modal-complete-btn');
  const completeText = backdrop.querySelector('#modal-complete-text');
  const tabBtns = backdrop.querySelectorAll('.modal-tab-btn');

  function updateCompleteBtnState() {
    if (!currentProblem) return;
    const isDone = Storage.isCompleted(currentProblem.id);
    if (isDone) {
      completeBtn.style.background = 'rgba(16, 185, 129, 0.2)';
      completeBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      completeBtn.style.color = '#34d399';
      completeText.textContent = 'Completed ✓';
    } else {
      completeBtn.style.background = 'var(--bg-tertiary)';
      completeBtn.style.borderColor = 'var(--border-subtle)';
      completeBtn.style.color = 'var(--text-primary)';
      completeText.textContent = 'Mark Done';
    }
  }

  function renderTabContent() {
    if (!currentProblem) return;

    if (activeTab === 'code') {
      bodyEl.innerHTML = `
        <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div style="font-size: 0.88rem; color: var(--text-secondary);">
            <strong>Pattern:</strong> <code class="inline-code">${currentProblem.pattern}</code>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            ${currentProblem.authorTag ? `
              <span class="badge" style="background: rgba(249,115,22,0.15); color: #fb923c; border: 1px solid rgba(249,115,22,0.3); font-weight: 700;">
                ⭐ ${currentProblem.authorTag}
              </span>
            ` : ''}
            ${currentProblem.leetcodeNumber > 0 ? `
              <a href="https://leetcode.com/problems/${currentProblem.id}/" target="_blank" rel="noopener noreferrer" class="badge badge-company" style="text-transform: none;">
                LeetCode #${currentProblem.leetcodeNumber} ${Icons.external}
              </a>
            ` : ''}
          </div>
        </div>

        <div class="code-block-wrapper">
          <div class="code-header">
            <div class="code-header-left">
              <span class="code-lang-tag">${Icons.java} Solution.java</span>
            </div>
            <button class="code-copy-btn" id="modal-code-copy-btn">
              ${Icons.copy} Copy Code
            </button>
          </div>
          <pre class="code-content"><code>${highlightJava(currentProblem.code)}</code></pre>
        </div>

        <div class="callout callout-info" style="margin-top: 14px;">
          <span>${Icons.sparkles}</span>
          <div>
            <strong>Java Engineering Idiom:</strong> ${currentProblem.javaTip}
          </div>
        </div>
      `;

      const copyBtn = bodyEl.querySelector('#modal-code-copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(currentProblem.code);
          showToast('Java code copied to clipboard!', 'success');
        });
      }
    } else if (activeTab === 'howToThink') {
      const thinkingSteps = currentProblem.howToThink || [
        {
          step: "1. Identify the Constraint & Signals",
          desc: "Look at input size N. If N <= 10^5, you need O(N) or O(N log N). Quadratic O(N^2) brute force will Time Out (TLE)."
        },
        {
          step: "2. State the Brute Force Immediately",
          desc: "In an interview, never stay silent. State the simplest solution: 'Brute force checks every combination in O(N^2)...'"
        },
        {
          step: "3. The Data Structure Breakthrough",
          desc: currentProblem.intuition
        },
        {
          step: "4. Coding Checklist & Invariants",
          desc: "Keep pointers within bounds, handle empty inputs and single-element inputs before writing main logic."
        }
      ];

      bodyEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h4 style="font-size: 1.05rem; margin-bottom: 6px; color: var(--primary);">Problem Overview</h4>
            <p style="color: var(--text-secondary); line-height: 1.6;">${currentProblem.summary}</p>
          </div>

          <div class="callout callout-success">
            <span>${Icons.sparkles}</span>
            <div>
              <strong style="display: block; margin-bottom: 4px; color: #10b981;">The Key Mental Model:</strong>
              <p style="color: #d1fae5; line-height: 1.6;">${currentProblem.intuition}</p>
            </div>
          </div>

          <div>
            <h4 style="font-size: 1.05rem; margin-bottom: 12px; color: #fbbf24;">How to Formulate & Think Through This Problem:</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${thinkingSteps.map((st, i) => `
                <div style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px 14px; border-left: 3px solid ${i === 2 ? '#10b981' : 'var(--primary)'};">
                  <div style="font-weight: 700; color: #fff; font-size: 0.92rem; margin-bottom: 4px;">${st.step}</div>
                  <div style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5;">${st.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: #a855f7;">Tested Frequently by:</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${currentProblem.companies.map(c => `<span class="badge badge-company">${c}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'realLife') {
      const realWorld = currentProblem.realWorldScenario || "Used in database query indexing, memory buffer caching, and streaming data aggregation across high-scale distributed systems.";
      const transferable = currentProblem.transferableProblems || [
        "Similar problems that reuse this exact same pattern and mental structure in technical interviews."
      ];

      bodyEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 18px;">
          <div class="card" style="background: linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.06)); border-color: rgba(56,189,248,0.3);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <span style="font-size: 1.4rem;">🌐</span>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: #38bdf8;">Real-World Production Analogy</h4>
            </div>
            <p style="color: #e0f2fe; line-height: 1.6; font-size: 0.92rem;">
              ${realWorld}
            </p>
          </div>

          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <span style="font-size: 1.3rem;">🔄</span>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: #34d399;">Where Else Can You Use This Exact Solution?</h4>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 12px;">
              Master this template once. You can solve all of these related questions with minor variable tweaks:
            </p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${transferable.map(tp => `
                <div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle); border-radius: 8px;">
                  <span style="color: #34d399; font-weight: bold;">✔</span>
                  <span style="font-size: 0.88rem; color: var(--text-primary);">${tp}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (activeTab === 'complexity') {
      bodyEl.innerHTML = `
        <div class="complexity-grid">
          <div class="complexity-card">
            <div class="complexity-card-title">Time Complexity</div>
            <div class="complexity-card-val">${currentProblem.timeComplexity}</div>
            <div class="complexity-card-desc">Optimal interview baseline</div>
          </div>
          <div class="complexity-card">
            <div class="complexity-card-title">Space Complexity</div>
            <div class="complexity-card-val">${currentProblem.spaceComplexity}</div>
            <div class="complexity-card-desc">Auxiliary memory overhead</div>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <h4 style="font-size: 1rem; color: #fbbf24; margin-bottom: 10px;">Critical Edge Cases to Mention in Interview:</h4>
          <ul style="padding-left: 20px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            ${currentProblem.edgeCases.map(ec => `<li>${ec}</li>`).join('')}
          </ul>
        </div>

        <div class="callout callout-warning" style="margin-top: 20px;">
          <span>${Icons.cpu}</span>
          <div>
            <strong>Java Gotcha:</strong> ${currentProblem.javaTip}
          </div>
        </div>
      `;
    }
  }

  function open(problem) {
    currentProblem = problem;
    activeTab = 'code';

    // Set title and difficulty badge
    titleEl.textContent = problem.title;
    const diffClass = problem.difficulty.toLowerCase();
    badgeContainer.innerHTML = `<span class="badge badge-${diffClass}">${problem.difficulty}</span>`;

    // Reset tabs
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });

    updateCompleteBtnState();
    renderTabContent();
    backdrop.classList.add('open');
  }

  function close() {
    backdrop.classList.remove('open');
  }

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      renderTabContent();
    });
  });

  completeBtn.addEventListener('click', () => {
    if (!currentProblem) return;
    const nowDone = Storage.toggleCompleted(currentProblem.id);
    updateCompleteBtnState();
    showToast(nowDone ? `Marked "${currentProblem.title}" as completed!` : `Marked "${currentProblem.title}" as incomplete`, 'info');
  });

  closeBtn.addEventListener('click', close);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      close();
    }
  });

  return {
    el: backdrop,
    open,
    close
  };
}
