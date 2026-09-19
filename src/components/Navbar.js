import { Icons } from '../utils/icons.js';
import { Storage } from '../utils/storage.js';

export function renderNavbar(activeTab, onTabChange, onOpenSearch) {
  const completed = Storage.getCompleted();
  const totalProblems = 22;
  const pct = Math.round((completed.length / totalProblems) * 100);

  const tabs = [
    { id: 'home',          label: 'Home',          icon: '🏠', desc: 'Dashboard & 10-Week Plan' },
    { id: 'foundations',   label: 'DS Foundations', icon: '📚', desc: '8 Core Data Structures' },
    { id: 'roadmap',       label: 'Roadmap',        icon: '🗺️', desc: '7-Tier LeetCode Track' },
    { id: 'refresher',     label: 'Java Refresher', icon: '☕', desc: 'Syntax & Collections Cheatsheet' },
    { id: 'patterns',      label: '14 Patterns',    icon: '🔮', desc: 'Must-Know Algorithm Patterns' },
    { id: 'visualizer',    label: 'Visualizer',     icon: '🎬', desc: 'Interactive Step Visualizers' },
    { id: 'system-design', label: 'System Design',  icon: '🏛️', desc: 'RADIO & Distributed Architecture' },
    { id: 'quiz',          label: 'Quiz',           icon: '🧠', desc: 'Test Your Java & DSA Mastery' },
  ];

  const nav = document.createElement('header');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="nav-container">
      <!-- Brand -->
      <div class="brand" id="brand-logo">
        <div class="brand-icon">
          ${Icons.java}
        </div>
        <div>
          <span>Java<span class="hero-gradient-text">Algo</span> Elite</span>
        </div>
      </div>

      <!-- Desktop Tabs -->
      <nav class="nav-links desktop-nav-links">
        ${tabs.map(tab => `
          <button class="nav-btn ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}" style="${tab.id === 'system-design' ? 'color: #fbbf24 !important;' : ''}">
            <span class="nav-tab-icon">${tab.icon}</span>
            <span class="nav-tab-label">${tab.label}</span>
          </button>
        `).join('')}
      </nav>

      <!-- Actions -->
      <div class="nav-actions">
        <button class="search-trigger-btn" id="search-trigger" title="Quick Lookup (Ctrl+K)">
          ${Icons.search}
          <span class="search-btn-text">Cheat Sheet</span>
          <span class="kbd-shortcut">Ctrl+K</span>
        </button>

        <div class="progress-pill" title="${completed.length} of ${totalProblems} problems completed">
          <span style="font-weight: 700; color: #10b981;" id="nav-completed-count">${completed.length}/${totalProblems}</span>
          <div class="progress-pill-bar">
            <div class="progress-pill-fill" id="nav-progress-fill" style="width: ${pct}%"></div>
          </div>
        </div>

        <!-- Mobile Hamburger Button -->
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open Navigation Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Slide-out Drawer -->
    <div class="mobile-drawer-backdrop" id="mobile-backdrop"></div>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer-header">
        <div class="brand">
          <div class="brand-icon" style="width: 32px; height: 32px; font-size: 1rem;">
            ${Icons.java}
          </div>
          <span style="font-size: 1.1rem;">Java<span class="hero-gradient-text">Algo</span> Elite</span>
        </div>
        <button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close menu">
          ✕
        </button>
      </div>

      <!-- Mobile Progress summary -->
      <div class="mobile-drawer-progress">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
          <span style="color: var(--text-muted); font-weight: 600;">Overall Mastery</span>
          <span style="color: #10b981; font-weight: 700;">${pct}% (${completed.length}/${totalProblems})</span>
        </div>
        <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
          <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #10b981, #38bdf8); border-radius: 99px;"></div>
        </div>
      </div>

      <!-- Drawer Links -->
      <div class="mobile-drawer-links">
        ${tabs.map(tab => `
          <button class="mobile-drawer-item ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
            <span class="mobile-drawer-icon">${tab.icon}</span>
            <div class="mobile-drawer-text">
              <div class="mobile-drawer-title">${tab.label}</div>
              <div class="mobile-drawer-desc">${tab.desc}</div>
            </div>
            ${activeTab === tab.id ? '<span class="mobile-drawer-pill">Active</span>' : ''}
          </button>
        `).join('')}
      </div>

      <!-- Mobile Search Shortcut -->
      <div class="mobile-drawer-footer">
        <button class="mobile-search-btn" id="mobile-search-trigger">
          ${Icons.search}
          <span>Search Cheat Sheet & Problems</span>
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar (Thumb friendly) -->
    <nav class="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button class="bottom-nav-item ${activeTab === 'home' ? 'active' : ''}" data-tab="home">
        <span class="bottom-nav-icon">🏠</span>
        <span class="bottom-nav-label">Home</span>
      </button>
      <button class="bottom-nav-item ${activeTab === 'foundations' ? 'active' : ''}" data-tab="foundations">
        <span class="bottom-nav-icon">📚</span>
        <span class="bottom-nav-label">Foundations</span>
      </button>
      <button class="bottom-nav-item ${activeTab === 'roadmap' ? 'active' : ''}" data-tab="roadmap">
        <span class="bottom-nav-icon">🗺️</span>
        <span class="bottom-nav-label">Roadmap</span>
      </button>
      <button class="bottom-nav-item ${activeTab === 'system-design' ? 'active' : ''}" data-tab="system-design">
        <span class="bottom-nav-icon">🏛️</span>
        <span class="bottom-nav-label">System</span>
      </button>
      <button class="bottom-nav-item" id="bottom-nav-more">
        <span class="bottom-nav-icon">☰</span>
        <span class="bottom-nav-label">More</span>
      </button>
    </nav>
  `;

  // Drawer handlers
  const drawer = nav.querySelector('#mobile-drawer');
  const backdrop = nav.querySelector('#mobile-backdrop');
  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  nav.querySelector('#mobile-menu-btn').addEventListener('click', openDrawer);
  nav.querySelector('#bottom-nav-more').addEventListener('click', openDrawer);
  nav.querySelector('#mobile-drawer-close').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Tab clicks (desktop)
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      onTabChange(btn.dataset.tab);
    });
  });

  // Tab clicks (drawer)
  nav.querySelectorAll('.mobile-drawer-item').forEach(btn => {
    btn.addEventListener('click', () => {
      closeDrawer();
      onTabChange(btn.dataset.tab);
    });
  });

  // Tab clicks (bottom nav)
  nav.querySelectorAll('.bottom-nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      onTabChange(btn.dataset.tab);
    });
  });

  nav.querySelector('#brand-logo').addEventListener('click', () => {
    closeDrawer();
    onTabChange('home');
  });

  nav.querySelector('#search-trigger').addEventListener('click', () => onOpenSearch());
  nav.querySelector('#mobile-search-trigger').addEventListener('click', () => {
    closeDrawer();
    onOpenSearch();
  });

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
