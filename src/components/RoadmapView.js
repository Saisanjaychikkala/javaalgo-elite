import { Icons } from '../utils/icons.js';
import { curriculumTiers } from '../data/curriculumData.js';
import { Storage } from '../utils/storage.js';

export function renderRoadmapView(onSelectProblem) {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  let currentDiffFilter = 'all';
  let currentCompanyFilter = 'all';
  let searchQuery = '';

  const completedList = Storage.getCompleted();
  const allProblems = curriculumTiers.flatMap(t => t.problems);
  const totalCount = allProblems.length;
  const doneCount = completedList.length;

  container.innerHTML = `
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-tag">
        ${Icons.java} Zero to FAANG Java DSA Curriculum
      </div>
      <h1 class="hero-title">
        Master DSA in <span class="java-gradient-text">Java</span> to Crack <br />
        <span class="hero-gradient-text">Top-Tier Tech Interviews</span>
      </h1>
      <p class="hero-desc">
        A systematically curated 7-Tier roadmap covering foundational two-pointers, graph algorithms, dynamic programming, and advanced segment trees. Designed for engineers who know Java basics and want to achieve peak competitive problem-solving mastery.
      </p>

      <div class="hero-stats-row">
        <div class="stat-item">
          <div class="stat-val" id="stat-completed-val">${doneCount} / ${totalCount}</div>
          <div class="stat-label">Problems Solved</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color: var(--primary);">7 Tiers</div>
          <div class="stat-label">Curriculum Depth</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color: #c084fc;">14</div>
          <div class="stat-label">Universal Patterns</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color: #34d399;">100%</div>
          <div class="stat-label">Optimal Java Code</div>
        </div>
      </div>
    </section>

    <!-- Filters Bar -->
    <div class="filter-bar">
      <input 
        type="text" 
        class="filter-search-input" 
        id="roadmap-search" 
        placeholder="Filter by problem name or algorithm pattern..." 
      />

      <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Difficulty:</span>
        <button class="filter-btn active" data-filter-type="diff" data-val="all">All</button>
        <button class="filter-btn" data-filter-type="diff" data-val="easy">Easy</button>
        <button class="filter-btn" data-filter-type="diff" data-val="medium">Medium</button>
        <button class="filter-btn" data-filter-type="diff" data-val="hard">Hard</button>
      </div>

      <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Company:</span>
        <button class="filter-btn active" data-filter-type="company" data-val="all">All</button>
        <button class="filter-btn" data-filter-type="company" data-val="Google">Google</button>
        <button class="filter-btn" data-filter-type="company" data-val="Meta">Meta</button>
        <button class="filter-btn" data-filter-type="company" data-val="Amazon">Amazon</button>
        <button class="filter-btn" data-filter-type="company" data-val="Microsoft">Microsoft</button>
      </div>
    </div>

    <!-- Tiers Container -->
    <div id="tiers-list-container">
      <!-- Tiers rendered dynamically -->
    </div>
  `;

  const searchInput = container.querySelector('#roadmap-search');
  const tiersContainer = container.querySelector('#tiers-list-container');
  const filterBtns = container.querySelectorAll('.filter-btn');

  function renderTiers() {
    tiersContainer.innerHTML = '';
    const completed = Storage.getCompleted();

    curriculumTiers.forEach(tier => {
      // Filter problems in this tier
      const filteredProblems = tier.problems.filter(prob => {
        // Difficulty filter
        if (currentDiffFilter !== 'all' && prob.difficulty.toLowerCase() !== currentDiffFilter) {
          return false;
        }
        // Company filter
        if (currentCompanyFilter !== 'all' && !prob.companies.includes(currentCompanyFilter)) {
          return false;
        }
        // Search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = prob.title.toLowerCase().includes(q);
          const matchPattern = prob.pattern.toLowerCase().includes(q);
          const matchSummary = prob.summary.toLowerCase().includes(q);
          if (!matchTitle && !matchPattern && !matchSummary) return false;
        }
        return true;
      });

      if (filteredProblems.length === 0 && (searchQuery || currentDiffFilter !== 'all' || currentCompanyFilter !== 'all')) {
        return; // Skip empty tier when filters are active
      }

      const tierCompletedCount = tier.problems.filter(p => completed.includes(p.id)).length;
      const tierEl = document.createElement('div');
      tierEl.className = 'tier-group open';

      tierEl.innerHTML = `
        <div class="tier-header">
          <div class="tier-title-area">
            <span class="tier-number-badge">TIER ${tier.tier}</span>
            <div>
              <h3 class="tier-name">${tier.name}</h3>
              <p class="tier-summary-text">${tier.summary}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <span class="badge badge-easy" style="font-size: 0.72rem;">${tierCompletedCount}/${tier.problems.length} Done</span>
            <span class="tier-toggle-icon">${Icons.chevronDown}</span>
          </div>
        </div>

        <div class="tier-content-grid">
          ${filteredProblems.map(prob => {
            const isDone = completed.includes(prob.id);
            const diffClass = prob.difficulty.toLowerCase();
            return `
              <div class="problem-card ${isDone ? 'completed' : ''}" data-id="${prob.id}">
                <div>
                  <div class="problem-card-top">
                    <div class="problem-title-row">
                      <button class="check-btn" data-check-id="${prob.id}" title="${isDone ? 'Mark incomplete' : 'Mark complete'}">
                        ${isDone ? Icons.check : ''}
                      </button>
                      <h4 class="problem-title">${prob.title}</h4>
                    </div>
                    <span class="badge badge-${diffClass}">${prob.difficulty}</span>
                  </div>

                  <div style="margin: 8px 0 10px 30px;">
                    <span class="badge badge-java" style="font-size: 0.7rem; font-weight: 500;">
                      ${prob.pattern}
                    </span>
                  </div>

                  <p class="problem-card-desc" style="margin-left: 30px;">
                    ${prob.summary}
                  </p>
                </div>

                <div class="problem-card-footer" style="margin-left: 30px;">
                  <div class="companies-list">
                    ${prob.companies.slice(0, 3).map(c => `<span class="badge badge-company">${c}</span>`).join('')}
                    ${prob.companies.length > 3 ? `<span style="font-size: 0.7rem; color: var(--text-muted);">+${prob.companies.length - 3}</span>` : ''}
                  </div>
                  <span style="font-family: var(--font-mono); font-weight: 600; color: var(--accent-emerald);">
                    ${prob.timeComplexity}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      // Accordion toggle
      const header = tierEl.querySelector('.tier-header');
      header.addEventListener('click', (e) => {
        tierEl.classList.toggle('open');
        const grid = tierEl.querySelector('.tier-content-grid');
        grid.style.display = tierEl.classList.contains('open') ? 'grid' : 'none';
      });

      // Problem card click & check button click
      tierEl.querySelectorAll('.problem-card').forEach(card => {
        card.addEventListener('click', (e) => {
          // If check button clicked, toggle complete
          const checkBtn = e.target.closest('.check-btn');
          if (checkBtn) {
            e.stopPropagation();
            const probId = checkBtn.dataset.checkId;
            Storage.toggleCompleted(probId);
            renderTiers();
            return;
          }

          // Otherwise open modal
          const id = card.dataset.id;
          const prob = allProblems.find(p => p.id === id);
          if (prob) onSelectProblem(prob);
        });
      });

      tiersContainer.appendChild(tierEl);
    });

    // Update hero stat
    const statVal = container.querySelector('#stat-completed-val');
    if (statVal) {
      statVal.textContent = `${completed.length} / ${totalCount}`;
    }
  }

  // Filter events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.filterType;
      const val = btn.dataset.val;

      // Unselect siblings
      container.querySelectorAll(`.filter-btn[data-filter-type="${type}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (type === 'diff') currentDiffFilter = val;
      if (type === 'company') currentCompanyFilter = val;

      renderTiers();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTiers();
  });

  // Listen to global progress updates
  window.addEventListener('progress-updated', () => {
    renderTiers();
  });

  renderTiers();
  return container;
}
