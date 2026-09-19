import { Icons } from '../utils/icons.js';
import { Storage } from '../utils/storage.js';

export function renderNavbar(activeTab, onTabChange, onOpenSearch) {
  const completed = Storage.getCompleted();
  const totalProblems = 22;
  const pct = Math.round((completed.length / totalProblems) * 100);

  const tabs = [
    { id: 'home',          label: 'Home',          icon: '🏠' },
    { id: 'foundations',   label: 'DS Foundations', icon: '📚' },
    { id: 'roadmap',       label: 'Roadmap',        icon: '🗺️' },
    { id: 'refresher',     label: 'Java Refresher', icon: '☕' },
    { id: 'patterns',      label: '14 Patterns',    icon: '🔮' },
    { id: 'visualizer',    label: 'Visualizer',     icon: '🎬' },
    { id: 'system-design', label: 'System Design',  icon: '🏛️' },
    { id: 'quiz',          label: 'Quiz',           icon: '🧠' },
  ];

  const nav = document.createElement('header');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="nav-container" style="max-width: 1600px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; gap: 0; height: 100%;">
      <!-- Brand -->
      <div class="brand" id="brand-logo" style="flex-shrink: 0; margin-right: 16px; cursor: pointer;">
        <div class="brand-icon">
          ${Icons.java}
        </div>
        <div>
          <span>Java<span class="hero-gradient-text">Algo</span> Elite</span>
        </div>
      </div>

      <!-- Tabs (scrollable on small screens) -->
      <nav class="nav-links" style="flex: 1; overflow-x: auto; display: flex; gap: 2px; scrollbar-width: none; padding: 0 4px;">
        ${tabs.map(tab => `
          <button class="nav-btn ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}" style="
            white-space: nowrap; display: flex; align-items: center; gap: 5px; font-size: 0.82rem;
            padding: 6px 12px; border-radius: 8px; ${tab.id === 'system-design' ? 'color: #fbbf24 !important;' : ''}
          ">
            <span style="font-size: 1rem;">${tab.icon}</span>
            ${tab.label}
          </button>
        `).join('')}
      </nav>

      <!-- Actions -->
      <div class="nav-actions" style="flex-shrink: 0; display: flex; align-items: center; gap: 12px; margin-left: 12px;">
        <button class="search-trigger-btn" id="search-trigger" title="Quick Lookup (Ctrl+K)">
          ${Icons.search}
          <span>Cheat Sheet</span>
          <span class="kbd-shortcut">Ctrl+K</span>
        </button>

        <div class="progress-pill" title="${completed.length} of ${totalProblems} problems completed">
          <span style="font-weight: 700; color: #10b981;" id="nav-completed-count">${completed.length}/${totalProblems}</span>
          <div class="progress-pill-bar">
            <div class="progress-pill-fill" id="nav-progress-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab click events
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => onTabChange(btn.dataset.tab));
  });

  nav.querySelector('#brand-logo').addEventListener('click', () => onTabChange('home'));
  nav.querySelector('#search-trigger').addEventListener('click', () => onOpenSearch());

  // Global progress updates
  window.addEventListener('progress-updated', () => {
    const list = Storage.getCompleted();
    const countEl = nav.querySelector('#nav-completed-count');
    const fillEl = nav.querySelector('#nav-progress-fill');
    if (countEl && fillEl) {
      countEl.textContent = `${list.length}/${totalProblems}`;
      fillEl.style.width = `${Math.round((list.length / totalProblems) * 100)}%`;
    }
  });

  return nav;
}
