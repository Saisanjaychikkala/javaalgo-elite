import { Icons } from '../utils/icons.js';
import { javaRefresherData } from '../data/javaRefresher.js';
import { javaCoreDeepDive } from '../data/javaCoreDeepDive.js';
import { javaInterviewQA } from '../data/javaInterviewQA.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';
import { showToast } from '../utils/toast.js';

export function renderJavaRefresherView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  let activeMainTab = 'core'; // 'core', 'collections', 'architecture', 'interviewQA'
  let currentCategory = 'all';
  let searchQuery = '';
  const expandedQAIds = new Set(['hashcode-equals-contract', 'string-immutability']);

  container.innerHTML = `
    <!-- Header -->
    <section class="hero-banner" style="padding-bottom: 24px;">
      <div class="hero-tag" style="background: rgba(249, 115, 22, 0.1); border-color: rgba(249, 115, 22, 0.3); color: #fb923c;">
        ${Icons.java} The Complete Java Mastery Track
      </div>
      <h1 class="hero-title">
        The Java <span class="java-gradient-text">Deep Dive & Architecture</span> Masterclass
      </h1>
      <p class="hero-desc">
        From zero memory mechanics (Stack vs Heap, JVM, OOP 4 Pillars, Generics) to Collections speed cheatsheets and the top 20 FAANG Java interview questions decoded.
      </p>

      <!-- Primary Sub-Tabs Navigation -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 20px 0 16px;" id="java-main-tabs">
        <button class="btn-primary main-tab-btn active" data-tab="core" style="padding: 10px 18px; font-size: 0.92rem;">
          🧱 Core Java & OOP Deep Dive (${javaCoreDeepDive.length})
        </button>
        <button class="btn-secondary main-tab-btn" data-tab="collections" style="padding: 10px 18px; font-size: 0.92rem;">
          ⚡ Syntax & Collections (${javaRefresherData.filter(d => d.category !== 'Architecture & "Why?"').length})
        </button>
        <button class="btn-secondary main-tab-btn" data-tab="architecture" style="padding: 10px 18px; font-size: 0.92rem;">
          🏛️ Architecture & "Why?" (${javaRefresherData.filter(d => d.category === 'Architecture & "Why?"').length})
        </button>
        <button class="btn-secondary main-tab-btn" data-tab="interviewQA" style="padding: 10px 18px; font-size: 0.92rem;">
          💬 FAANG Java Interview Q&A (${javaInterviewQA.length})
        </button>
      </div>

      <!-- Live Search Box -->
      <div style="max-width: 600px; margin: 0 auto 16px;">
        <div style="position: relative;">
          <input 
            type="text" 
            id="refresher-search-input" 
            placeholder="🔍 Search concepts, JVM, memory, classes, gotchas (e.g., heap, equals, deque, generics)..." 
            style="
              width: 100%; padding: 12px 16px 12px 42px; background: var(--bg-tertiary);
              border: 1px solid var(--border-subtle); border-radius: 12px; color: var(--text-primary);
              font-size: 0.92rem; outline: none; transition: border-color 0.2s; box-shadow: var(--card-inner-highlight);
            "
          />
          <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; opacity: 0.7;">⚡</span>
        </div>
      </div>

      <!-- Secondary Category Filter Pills (Dynamic per active tab) -->
      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 10px;" id="refresher-cat-filters">
        <!-- Rendered dynamically -->
      </div>
    </section>

    <!-- Cards Stream Container -->
    <div id="refresher-cards-list" style="display: flex; flex-direction: column; gap: 24px; margin: 24px 0 60px;">
      <!-- Populated dynamically -->
    </div>
  `;

  const cardsContainer = container.querySelector('#refresher-cards-list');
  const catFiltersContainer = container.querySelector('#refresher-cat-filters');
  const mainTabBtns = container.querySelectorAll('.main-tab-btn');
  const searchInput = container.querySelector('#refresher-search-input');

  function getCategoriesForCurrentTab() {
    if (activeMainTab === 'core') {
      const cats = ['all', ...new Set(javaCoreDeepDive.map(d => d.category))];
      return cats;
    } else if (activeMainTab === 'collections') {
      const filteredData = javaRefresherData.filter(d => d.category !== 'Architecture & "Why?"');
      const cats = ['all', ...new Set(filteredData.map(d => d.category))];
      return cats;
    } else if (activeMainTab === 'architecture') {
      return ['all'];
    } else if (activeMainTab === 'interviewQA') {
      const cats = ['all', ...new Set(javaInterviewQA.map(d => d.category))];
      return cats;
    }
    return ['all'];
  }

  function renderCategoryPills() {
    const cats = getCategoriesForCurrentTab();
    if (cats.length <= 1) {
      catFiltersContainer.innerHTML = '';
      return;
    }

    catFiltersContainer.innerHTML = cats.map(cat => `
      <button class="filter-btn ${cat === currentCategory ? 'active' : ''}" data-cat="${cat}">
        ${cat === 'all' ? 'All Topics' : cat}
      </button>
    `).join('');

    catFiltersContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        catFiltersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        renderCards();
      });
    });
  }

  function renderCoreDeepDiveCards() {
    const filtered = javaCoreDeepDive.filter(d => {
      const matchCat = currentCategory === 'all' || d.category === currentCategory;
      const matchSearch = !searchQuery ||
        d.title.toLowerCase().includes(searchQuery) ||
        d.summary.toLowerCase().includes(searchQuery) ||
        d.description.toLowerCase().includes(searchQuery) ||
        d.code.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      cardsContainer.innerHTML = renderEmptyState();
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = item.id;
      card.style.borderLeft = '4px solid #f97316';

      card.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span class="badge badge-java">${item.category}</span>
              <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary);">${item.title}</h3>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.5;">${item.description}</p>
          </div>
          <button class="btn-primary copy-card-code-btn" data-id="${item.id}" style="padding: 6px 14px; font-size: 0.8rem;">
            ${Icons.copy} Copy Code
          </button>
        </div>

        <div class="code-block-wrapper" style="margin: 14px 0;">
          <div class="code-header">
            <div class="code-header-left">
              <span class="code-lang-tag">${Icons.java} ${item.id}.java</span>
            </div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">In-Depth Architectural Pattern</span>
          </div>
          <pre class="code-content"><code>${highlightJava(item.code)}</code></pre>
        </div>

        ${item.keyTakeaways && item.keyTakeaways.length > 0 ? `
          <div class="callout callout-info" style="margin-top: 14px; background: rgba(14, 165, 233, 0.08); border-color: rgba(14, 165, 233, 0.25);">
            <span>${Icons.sparkles}</span>
            <div style="display: flex; flex-direction: column; gap: 5px;">
              <strong style="color: #38bdf8; font-size: 0.92rem;">Key Architectural Takeaways:</strong>
              ${item.keyTakeaways.map(t => `<div style="font-size: 0.86rem; color: #e0f2fe; line-height: 1.5;">• ${t}</div>`).join('')}
            </div>
          </div>
        ` : ''}
      `;

      const copyBtn = card.querySelector('.copy-card-code-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(item.code);
        showToast(`Copied "${item.title}" code to clipboard!`, 'success');
      });

      cardsContainer.appendChild(card);
    });
  }

  function renderCollectionsCards(dataToRender, accentColor = '#38bdf8') {
    const filtered = dataToRender.filter(d => {
      const matchCat = currentCategory === 'all' || d.category === currentCategory;
      const matchSearch = !searchQuery ||
        d.title.toLowerCase().includes(searchQuery) ||
        d.summary.toLowerCase().includes(searchQuery) ||
        d.description.toLowerCase().includes(searchQuery) ||
        d.code.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      cardsContainer.innerHTML = renderEmptyState();
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = item.id;
      card.style.borderLeft = `4px solid ${accentColor}`;

      card.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span class="badge badge-java">${item.category}</span>
              <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary);">${item.title}</h3>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">${item.description}</p>
          </div>
          <button class="btn-primary copy-card-code-btn" data-id="${item.id}" style="padding: 6px 14px; font-size: 0.8rem;">
            ${Icons.copy} Copy Snippet
          </button>
        </div>

        <div class="code-block-wrapper" style="margin: 14px 0;">
          <div class="code-header">
            <div class="code-header-left">
              <span class="code-lang-tag">${Icons.java} ${item.id}.java</span>
            </div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Optimal Idiom</span>
          </div>
          <pre class="code-content"><code>${highlightJava(item.code)}</code></pre>
        </div>

        ${item.tips && item.tips.length > 0 ? `
          <div class="callout callout-info" style="margin-top: 12px;">
            <span>${Icons.sparkles}</span>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <strong style="color: #38bdf8;">Interviewer Evaluation Tips:</strong>
              ${item.tips.map(t => `<div style="font-size: 0.85rem; color: #e0f2fe;">• ${t}</div>`).join('')}
            </div>
          </div>
        ` : ''}
      `;

      const copyBtn = card.querySelector('.copy-card-code-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(item.code);
        showToast(`Copied "${item.title}" snippet to clipboard!`, 'success');
      });

      cardsContainer.appendChild(card);
    });
  }

  function renderInterviewQACards() {
    const filtered = javaInterviewQA.filter(d => {
      const matchCat = currentCategory === 'all' || d.category === currentCategory;
      const matchSearch = !searchQuery ||
        d.question.toLowerCase().includes(searchQuery) ||
        d.shortAnswer.toLowerCase().includes(searchQuery) ||
        d.detailedExplanation.toLowerCase().includes(searchQuery) ||
        d.codeSnippet.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      cardsContainer.innerHTML = renderEmptyState();
      return;
    }

    // Header banner with Expand / Collapse All control
    const controlBar = document.createElement('div');
    controlBar.style.display = 'flex';
    controlBar.style.justifyContent = 'space-between';
    controlBar.style.alignItems = 'center';
    controlBar.style.marginBottom = '10px';
    controlBar.innerHTML = `
      <div style="font-size: 0.9rem; color: var(--text-muted);">
        Showing <strong>${filtered.length}</strong> top interview questions
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn-secondary" id="qa-expand-all-btn" style="padding: 4px 12px; font-size: 0.78rem;">Expand All</button>
        <button class="btn-secondary" id="qa-collapse-all-btn" style="padding: 4px 12px; font-size: 0.78rem;">Collapse All</button>
      </div>
    `;
    cardsContainer.appendChild(controlBar);

    controlBar.querySelector('#qa-expand-all-btn').addEventListener('click', () => {
      filtered.forEach(q => expandedQAIds.add(q.id));
      renderCards();
    });

    controlBar.querySelector('#qa-collapse-all-btn').addEventListener('click', () => {
      expandedQAIds.clear();
      renderCards();
    });

    filtered.forEach((item, index) => {
      const isExpanded = expandedQAIds.has(item.id);
      const card = document.createElement('div');
      card.className = 'card';
      card.id = item.id;
      card.style.borderLeft = '4px solid #a855f7';
      card.style.transition = 'all 0.2s ease';

      card.innerHTML = `
        <div style="cursor: pointer; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;" class="qa-header-row">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3);">
                Q${index + 1} · ${item.category}
              </span>
              <span class="badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); font-size: 0.7rem;">
                🔥 ${item.difficulty}
              </span>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); line-height: 1.4;">${item.question}</h3>
          </div>
          <button style="
            background: var(--bg-tertiary); border: 1px solid var(--border-subtle); color: var(--text-primary);
            width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; font-size: 1.2rem; flex-shrink: 0; box-shadow: var(--card-inner-highlight);
          ">
            ${isExpanded ? '−' : '+'}
          </button>
        </div>

        <!-- Quick Summary Box (Always visible) -->
        <div style="margin-top: 12px; padding: 10px 14px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px;">
          <strong style="color: #34d399; font-size: 0.85rem; display: block; margin-bottom: 2px;">Executive Answer for Interviews:</strong>
          <p style="color: #d1fae5; font-size: 0.88rem; line-height: 1.5; margin: 0;">${item.shortAnswer}</p>
        </div>

        <!-- Collapsible In-Depth Section -->
        ${isExpanded ? `
          <div style="margin-top: 16px; border-top: 1px solid var(--border-subtle); padding-top: 14px;" class="fade-in">
            <h4 style="font-size: 0.95rem; color: #fbbf24; margin-bottom: 8px;">In-Depth Technical Breakdown:</h4>
            <div style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; white-space: pre-line; margin-bottom: 14px;">
              ${item.detailedExplanation}
            </div>

            <div class="code-block-wrapper">
              <div class="code-header">
                <div class="code-header-left">
                  <span class="code-lang-tag">${Icons.java} Demonstration.java</span>
                </div>
                <button class="code-copy-btn copy-qa-code-btn" data-id="${item.id}">
                  ${Icons.copy} Copy Code
                </button>
              </div>
              <pre class="code-content"><code>${highlightJava(item.codeSnippet)}</code></pre>
            </div>
          </div>
        ` : ''}
      `;

      card.querySelector('.qa-header-row').addEventListener('click', () => {
        if (expandedQAIds.has(item.id)) {
          expandedQAIds.delete(item.id);
        } else {
          expandedQAIds.add(item.id);
        }
        renderCards();
      });

      const copyBtn = card.querySelector('.copy-qa-code-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(item.codeSnippet);
          showToast(`Copied code snippet for "${item.question.slice(0, 30)}..."`, 'success');
        });
      }

      cardsContainer.appendChild(card);
    });
  }

  function renderEmptyState() {
    return `
      <div class="card" style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🔎</div>
        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 6px;">No matching Java topics found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try searching for "heap", "equals", "generics", or switch tabs.</p>
      </div>
    `;
  }

  function renderCards() {
    cardsContainer.innerHTML = '';

    if (activeMainTab === 'core') {
      renderCoreDeepDiveCards();
    } else if (activeMainTab === 'collections') {
      const collectionsData = javaRefresherData.filter(d => d.category !== 'Architecture & "Why?"');
      renderCollectionsCards(collectionsData, '#38bdf8');
    } else if (activeMainTab === 'architecture') {
      const archData = javaRefresherData.filter(d => d.category === 'Architecture & "Why?"');
      renderCollectionsCards(archData, '#f97316');
    } else if (activeMainTab === 'interviewQA') {
      renderInterviewQACards();
    }
  }

  // Handle Main Sub-Tab Switching
  mainTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mainTabBtns.forEach(b => {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-secondary');
      });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary', 'active');

      activeMainTab = btn.dataset.tab;
      currentCategory = 'all'; // Reset category when switching tab
      renderCategoryPills();
      renderCards();
    });
  });

  // Handle Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderCards();
    });
  }

  // Initial Render
  renderCategoryPills();
  renderCards();

  return container;
}
