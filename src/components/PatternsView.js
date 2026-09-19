import { Icons } from '../utils/icons.js';
import { patternMatrix } from '../data/patternMatrix.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';
import { showToast } from '../utils/toast.js';

export function renderPatternsView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  container.innerHTML = `
    <!-- Header -->
    <section class="hero-banner" style="padding-bottom: 20px;">
      <div class="hero-tag" style="background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.3); color: #c084fc;">
        ${Icons.sparkles} Algorithmic Pattern Recognition
      </div>
      <h1 class="hero-title">
        The 14 Universal <span class="hero-gradient-text">Interview Patterns</span>
      </h1>
      <p class="hero-desc">
        Top-tier companies don't test your ability to memorize 2,000 LeetCode questions — they test whether you can map an unseen problem to one of these core algorithmic archetypes.
      </p>
    </section>

    <!-- Pattern Cards Grid -->
    <div id="patterns-grid" style="display: flex; flex-direction: column; gap: 32px; margin: 30px 0 60px;">
      <!-- Populated dynamically -->
    </div>
  `;

  const grid = container.querySelector('#patterns-grid');

  patternMatrix.forEach(pat => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = pat.id;

    card.innerHTML = `
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <span class="badge badge-company" style="font-size: 0.8rem; font-weight: 700;">PATTERN</span>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #fff;">${pat.name}</h3>
          </div>
          <p style="color: var(--primary); font-weight: 500; font-size: 0.95rem; margin-bottom: 12px;">
            ${pat.whenToUse}
          </p>
        </div>
        <button class="btn-primary copy-pattern-code-btn" data-id="${pat.id}" style="padding: 6px 14px; font-size: 0.8rem;">
          ${Icons.copy} Copy Java Template
        </button>
      </div>

      <div style="margin: 12px 0;">
        <h4 style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 8px;">
          Problem Statement Trigger Phrases:
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${pat.indicators.map(ind => `
            <span style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 6px; font-size: 0.82rem; color: #cbd5e1;">
              ✓ ${ind}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Java Code Template -->
      <div class="code-block-wrapper" style="margin: 16px 0;">
        <div class="code-header">
          <div class="code-header-left">
            <span class="code-lang-tag">${Icons.java} Template_${pat.id}.java</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted);">Skeleton to Memorize</span>
        </div>
        <pre class="code-content"><code>${highlightJava(pat.javaTemplate)}</code></pre>
      </div>

      <!-- Benchmark Problems -->
      <div style="margin-top: 14px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span style="font-size: 0.8rem; font-weight: 700; color: #fbbf24;">Benchmark Problems:</span>
        ${pat.topProblems.map(prob => `<span class="badge badge-java" style="text-transform: none;">${prob}</span>`).join('')}
      </div>
    `;

    const copyBtn = card.querySelector('.copy-pattern-code-btn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(pat.javaTemplate);
      showToast(`Copied template for "${pat.name}"!`, 'success');
    });

    grid.appendChild(card);
  });

  return container;
}
