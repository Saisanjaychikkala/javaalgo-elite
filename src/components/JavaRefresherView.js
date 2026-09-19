import { Icons } from '../utils/icons.js';
import { javaRefresherData } from '../data/javaRefresher.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';
import { showToast } from '../utils/toast.js';

export function renderJavaRefresherView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  let currentCategory = 'all';

  container.innerHTML = `
    <!-- Header -->
    <section class="hero-banner" style="padding-bottom: 20px;">
      <div class="hero-tag" style="background: rgba(249, 115, 22, 0.1); border-color: rgba(249, 115, 22, 0.3); color: #fb923c;">
        ${Icons.java} Syntax & Collections Fast Refresher
      </div>
      <h1 class="hero-title">
        The Java DSA <span class="java-gradient-text">Cheat Sheet</span> & Memory Refresher
      </h1>
      <p class="hero-desc">
        Never get stuck on how to import a List, initialize a Max-Heap with custom comparators, or convert arrays again. One-click copyable snippets, Big-O tables, and the exact idioms expected in FAANG technical screens.
      </p>

      <!-- Search Bar & Category Filter Pills -->
      <div style="max-width: 600px; margin: 0 auto 16px;">
        <div style="position: relative;">
          <input 
            type="text" 
            id="refresher-search-input" 
            placeholder="🔍 Search Java syntax, methods, gotchas (e.g., deque, stream, lru, comparator)..." 
            style="
              width: 100%; padding: 12px 16px 12px 42px; background: rgba(15,23,42,0.8);
              border: 1px solid var(--border-subtle); border-radius: 12px; color: #fff;
              font-size: 0.92rem; outline: none; transition: border-color 0.2s;
            "
          />
          <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; opacity: 0.7;">⚡</span>
        </div>
      </div>

      <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 10px;" id="refresher-cat-filters">
        <button class="filter-btn active" data-cat="all">All Topics</button>
        <button class="filter-btn" data-cat="Architecture & &quot;Why?&quot;">🏛️ Architecture & "Why?"</button>
        <button class="filter-btn" data-cat="Collections Framework">📦 Collections Framework</button>
        <button class="filter-btn" data-cat="Advanced Collections">⚡ Advanced Collections</button>
        <button class="filter-btn" data-cat="Modern Java">🚀 Modern Java (Streams/Records)</button>
        <button class="filter-btn" data-cat="Core Java">☕ Core Java</button>
        <button class="filter-btn" data-cat="Basics & Setup">🛠️ Basics & Setup</button>
        <button class="filter-btn" data-cat="Critical Nuances">⚠️ 10 Gotchas & Traps</button>
      </div>
    </section>

    <!-- Cards Stream -->
    <div id="refresher-cards-list" style="display: flex; flex-direction: column; gap: 28px; margin: 30px 0 60px;">
      <!-- Populated dynamically -->
    </div>
  `;

  const cardsContainer = container.querySelector('#refresher-cards-list');
  const catFilterBtns = container.querySelectorAll('#refresher-cat-filters .filter-btn');
  const searchInput = container.querySelector('#refresher-search-input');
  let searchQuery = '';

  function renderCards() {
    cardsContainer.innerHTML = '';

    const filtered = javaRefresherData.filter(d => {
      const matchCat = currentCategory === 'all' || d.category === currentCategory;
      const matchSearch = !searchQuery || 
        d.title.toLowerCase().includes(searchQuery) ||
        d.summary.toLowerCase().includes(searchQuery) ||
        d.description.toLowerCase().includes(searchQuery) ||
        d.code.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔎</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 6px;">No matching Java concepts found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try searching for "stack", "stream", "map", or clear your filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = item.id;

      card.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span class="badge badge-java">${item.category}</span>
              <h3 style="font-size: 1.3rem; font-weight: 700; color: #fff;">${item.title}</h3>
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

      // Copy code button event
      const copyBtn = card.querySelector('.copy-card-code-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(item.code);
        showToast(`Copied "${item.title}" snippet to clipboard!`, 'success');
      });

      cardsContainer.appendChild(card);
    });
  }

  catFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderCards();
    });
  }

  renderCards();
  return container;
}
