import { Icons } from '../utils/icons.js';
import { patternMatrix } from '../data/patternMatrix.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';
import { showToast } from '../utils/toast.js';

export function renderPatternsView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  let searchQuery = '';
  let activeFilter = 'all';

  const filterCategories = [
    { id: 'all', label: 'All 14 Patterns' },
    { id: 'pointers', label: 'Pointers & Windows', match: ['two-pointers', 'sliding-window', 'fast-slow-pointers'] },
    { id: 'intervals', label: 'Intervals & Sorting', match: ['merge-intervals', 'cyclic-sort', 'in-place-reversal-linkedlist'] },
    { id: 'trees-graphs', label: 'Trees & Graphs', match: ['tree-bfs', 'tree-dfs', 'topological-sort'] },
    { id: 'heaps', label: 'Heaps & Selection', match: ['two-heaps', 'subsets', 'modified-binary-search', 'top-k-elements', 'k-way-merge'] },
    { id: 'dp', label: 'Dynamic Programming', match: ['0-1-knapsack'] },
  ];

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

      <!-- Search & Filters -->
      <div style="max-width: 680px; margin: 24px auto 16px; position: relative;">
        <input 
          type="text" 
          id="pattern-search-input" 
          placeholder="🔍 Search patterns (e.g. palindrome, sliding window, cycle, top k, intervals)..."
          style="
            width: 100%; padding: 12px 18px 12px 42px; background: var(--bg-tertiary);
            border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
            color: var(--text-primary); font-size: 0.95rem; outline: none; transition: border-color var(--transition-fast);
            box-shadow: var(--card-inner-highlight);
          "
        />
        <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; opacity: 0.6;">⚡</span>
      </div>

      <div id="pattern-filter-pills" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 12px;">
        ${filterCategories.map(cat => `
          <button class="pattern-filter-btn ${activeFilter === cat.id ? 'active' : ''}" data-cat="${cat.id}" style="
            padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 600;
            background: ${activeFilter === cat.id ? 'var(--primary)' : 'var(--bg-tertiary)'};
            color: ${activeFilter === cat.id ? 'var(--text-invert)' : 'var(--text-secondary)'};
            border: 1px solid ${activeFilter === cat.id ? 'var(--primary)' : 'var(--border-subtle)'};
            cursor: pointer; transition: all var(--transition-fast);
          ">
            ${cat.label}
          </button>
        `).join('')}
      </div>
      <div id="pattern-match-count" style="text-align: center; margin-top: 10px; font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
        Showing 14 patterns
      </div>
    </section>

    <!-- Pattern Cards Grid -->
    <div id="patterns-grid" style="display: flex; flex-direction: column; gap: 28px; margin: 20px 0 60px;">
      <!-- Populated dynamically -->
    </div>
  `;

  const grid = container.querySelector('#patterns-grid');
  const searchInput = container.querySelector('#pattern-search-input');
  const matchCountEl = container.querySelector('#pattern-match-count');
  const filterBtns = container.querySelectorAll('.pattern-filter-btn');

  function renderGrid() {
    grid.innerHTML = '';

    const filtered = patternMatrix.filter(pat => {
      // Category filter
      if (activeFilter !== 'all') {
        const cat = filterCategories.find(c => c.id === activeFilter);
        if (cat && cat.match && !cat.match.includes(pat.id)) return false;
      }

      // Search query
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const matchName = pat.name.toLowerCase().includes(q);
      const matchWhen = pat.whenToUse.toLowerCase().includes(q);
      const matchIndicators = pat.indicators.some(i => i.toLowerCase().includes(q));
      const matchProblems = pat.topProblems.some(p => p.toLowerCase().includes(q));
      return matchName || matchWhen || matchIndicators || matchProblems;
    });

    matchCountEl.textContent = `Showing ${filtered.length} of ${patternMatrix.length} patterns`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="card" style="text-align: center; padding: 48px 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">No matching patterns found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 420px; margin: 0 auto;">Try clearing your search or selecting a different category filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(pat => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = pat.id;

      card.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span class="badge badge-company" style="font-size: 0.8rem; font-weight: 700;">PATTERN</span>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">${pat.name}</h3>
            </div>
            <p style="color: var(--primary); font-weight: 500; font-size: 0.95rem; margin-bottom: 12px;">
              ${pat.whenToUse}
            </p>
          </div>
          <button class="btn-primary copy-pattern-code-btn" data-id="${pat.id}" style="padding: 7px 14px; font-size: 0.82rem; border-radius: 8px;">
            ${Icons.copy} Copy Java Template
          </button>
        </div>

        <div style="margin: 12px 0;">
          <h4 style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 8px;">
            Problem Statement Trigger Phrases:
          </h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${pat.indicators.map(ind => `
              <span style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); padding: 5px 11px; border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); box-shadow: var(--card-inner-highlight);">
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
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-amber);">Benchmark Problems:</span>
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
  }

  // Event Listeners
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderGrid();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      filterBtns.forEach(b => {
        const isActive = b.dataset.cat === activeFilter;
        b.style.background = isActive ? 'var(--primary)' : 'var(--bg-tertiary)';
        b.style.color = isActive ? 'var(--text-invert)' : 'var(--text-secondary)';
        b.style.borderColor = isActive ? 'var(--primary)' : 'var(--border-subtle)';
      });
      renderGrid();
    });
  });

  renderGrid();
  return container;
}

