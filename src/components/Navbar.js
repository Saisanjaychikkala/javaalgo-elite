import { Icons } from '../utils/icons.js';
import { Storage } from '../utils/storage.js';

export function renderNavbar(activeTab, onTabChange, onOpenSearch) {
  const completed = Storage.getCompleted();
  const totalProblems = 22;
  const pct = Math.round((completed.length / totalProblems) * 100);

  const tabs = [
    { id: 'home',          label: 'Home',           icon: '🏠', desc: 'Dashboard & Study Plan',          group: 'core' },
    { id: 'foundations',   label: 'DS Foundations',  icon: '📚', desc: '8 Core Data Structures',          group: 'dsa' },
    { id: 'roadmap',       label: 'Roadmap',         icon: '🗺️', desc: '7-Tier LeetCode Track',           group: 'dsa' },
    { id: 'refresher',     label: 'Java Refresher',  icon: '☕', desc: 'Syntax & Collections Cheatsheet', group: 'dsa' },
    { id: 'patterns',      label: 'Patterns',        icon: '🔮', desc: '14 Must-Know Algo Patterns',      group: 'dsa' },
    { id: 'visualizer',    label: 'Visualizer',      icon: '🎬', desc: 'Step-by-Step Animations',         group: 'dsa' },
    { id: 'system-design', label: 'System Design',   icon: '🏛️', desc: 'Distributed Systems Mastery',    group: 'advanced' },
    { id: 'interview',     label: 'Mock Interview',  icon: '🎙️', desc: 'FAANG Scenario Drills',          group: 'advanced' },
    { id: 'ai-universe',   label: 'AI Universe',     icon: '🤖', desc: 'AI → RAG → Agents → MCPs',       group: 'ai' },
    { id: 'certifications',label: 'Certifications',  icon: '🎓', desc: 'Claude · Antigravity · AWS',      group: 'ai' },
    { id: 'quiz',          label: 'Quiz',            icon: '🧠', desc: 'Test Your Mastery',               group: 'core' },
  ];

  // For bottom nav (show 4 most important + More)
  const bottomNavTabs = [
    tabs.find(t => t.id === 'home'),
    tabs.find(t => t.id === 'foundations'),
    tabs.find(t => t.id === 'ai-universe'),
    tabs.find(t => t.id === 'certifications'),
  ];

  const nav = document.createElement('header');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="nav-container" style="max-width: 1700px; margin: 0 auto; padding: 0 16px; display: flex; align-items: center; gap: 0; height: 100%;">
      <!-- Brand -->
      <div class="brand" id="brand-logo" style="flex-shrink: 0; margin-right: 12px; cursor: pointer;">
        <div class="brand-icon">${Icons.java}</div>
        <div style="line-height: 1.1;">
          <div style="font-size: 1.1rem;">Java<span class="hero-gradient-text">Algo</span> Elite</div>
          <div style="font-size: 0.58rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.04em;">v3.0 · LEARN · CRACK · SHIP</div>
        </div>
      </div>

      <!-- Desktop Tabs — scrollable row -->
      <nav class="desktop-nav-links" style="flex: 1; overflow-x: auto; display: flex; gap: 2px; scrollbar-width: none; padding: 0 4px;">
        ${tabs.map(tab => `
          <button class="nav-btn ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}" style="
            white-space: nowrap; display: flex; align-items: center; gap: 5px; font-size: 0.79rem;
            padding: 6px 10px; border-radius: 8px;
            ${tab.id === 'system-design' ? 'color: #fbbf24 !important;' : ''}
            ${tab.id === 'interview' ? 'color: #38bdf8 !important;' : ''}
            ${tab.id === 'ai-universe' ? 'color: #818cf8 !important;' : ''}
            ${tab.id === 'certifications' ? 'color: #34d399 !important;' : ''}
          ">
            <span style="font-size: 0.9rem;">${tab.icon}</span>
            <span class="nav-tab-label">${tab.label}</span>
          </button>`).join('')}
      </nav>

      <!-- Actions -->
      <div class="nav-actions" style="flex-shrink: 0; display: flex; align-items: center; gap: 8px; margin-left: 8px;">
        <button class="search-trigger-btn" id="search-trigger" title="Quick Lookup (Ctrl+K)">
          ${Icons.search}
          <span class="search-btn-text">Search</span>
          <span class="kbd-shortcut">Ctrl+K</span>
        </button>
        <div class="progress-pill" title="${completed.length} of ${totalProblems} completed">
          <span style="font-weight: 700; color: #10b981; font-size: 0.8rem;" id="nav-completed-count">${completed.length}/${totalProblems}</span>
          <div class="progress-pill-bar">
            <div class="progress-pill-fill" id="nav-progress-fill" style="width: ${pct}%"></div>
          </div>
        </div>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open Navigation Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Backdrop -->
    <div class="mobile-drawer-backdrop" id="mobile-backdrop"></div>

    <!-- Mobile Slide-out Drawer -->
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer-header">
        <div class="brand">
          <div class="brand-icon" style="width:32px;height:32px;font-size:0.9rem;">${Icons.java}</div>
          <div>
            <div style="font-size:1rem;">Java<span class="hero-gradient-text">Algo</span> Elite</div>
            <div style="font-size:0.6rem;color:var(--text-muted);font-weight:600;">v3.0 · LEARN · CRACK · SHIP</div>
          </div>
        </div>
        <button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close menu">✕</button>
      </div>

      <!-- Mobile Progress -->
      <div class="mobile-drawer-progress">
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:6px;">
          <span style="color:var(--text-muted);font-weight:600;">DSA Mastery</span>
          <span style="color:#10b981;font-weight:700;">${pct}% (${completed.length}/${totalProblems})</span>
        </div>
        <div style="height:5px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#10b981,#38bdf8);border-radius:99px;"></div>
        </div>
      </div>

      <!-- Drawer Links grouped -->
      <div class="mobile-drawer-links">
        <div style="font-size:0.65rem;color:var(--text-muted);font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:8px 8px 4px;">Core</div>
        ${tabs.filter(t => t.group === 'core').map(tab => renderDrawerItem(tab, activeTab)).join('')}
        <div style="font-size:0.65rem;color:var(--text-muted);font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:12px 8px 4px;">DSA & Algorithms</div>
        ${tabs.filter(t => t.group === 'dsa').map(tab => renderDrawerItem(tab, activeTab)).join('')}
        <div style="font-size:0.65rem;color:var(--text-muted);font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:12px 8px 4px;">Advanced</div>
        ${tabs.filter(t => t.group === 'advanced').map(tab => renderDrawerItem(tab, activeTab)).join('')}
        <div style="font-size:0.65rem;color:#818cf8;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:12px 8px 4px;">🤖 AI & Certifications</div>
        ${tabs.filter(t => t.group === 'ai').map(tab => renderDrawerItem(tab, activeTab)).join('')}
      </div>

      <!-- Drawer Search -->
      <div class="mobile-drawer-footer">
        <button class="mobile-search-btn" id="mobile-search-trigger">
          ${Icons.search} <span>Search All Topics (Ctrl+K)</span>
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Nav -->
    <nav class="mobile-bottom-nav" aria-label="Mobile Navigation">
      ${bottomNavTabs.map(tab => `
        <button class="bottom-nav-item ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}" style="-webkit-tap-highlight-color: transparent;">
          <span class="bottom-nav-icon">${tab.icon}</span>
          <span class="bottom-nav-label" style="font-size: 0.62rem;">${tab.label.split(' ')[0]}</span>
        </button>`).join('')}
      <button class="bottom-nav-item" id="bottom-nav-more" style="-webkit-tap-highlight-color: transparent;">
        <span class="bottom-nav-icon">☰</span>
        <span class="bottom-nav-label" style="font-size: 0.62rem;">More</span>
      </button>
    </nav>
  `;

  // ── Event Listeners ──────────────────────────────────────
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

  // Desktop tab clicks
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => onTabChange(btn.dataset.tab));
  });

  // Drawer item clicks
  nav.querySelectorAll('.mobile-drawer-item').forEach(btn => {
    btn.addEventListener('click', () => { closeDrawer(); onTabChange(btn.dataset.tab); });
  });

  // Bottom nav clicks
  nav.querySelectorAll('.bottom-nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => onTabChange(btn.dataset.tab));
  });

  nav.querySelector('#brand-logo').addEventListener('click', () => { closeDrawer(); onTabChange('home'); });
  nav.querySelector('#search-trigger').addEventListener('click', () => onOpenSearch());
  nav.querySelector('#mobile-search-trigger').addEventListener('click', () => { closeDrawer(); onOpenSearch(); });

  // Progress updates
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

function renderDrawerItem(tab, activeTab) {
  const isActive = tab.id === activeTab;
  const accentColors = {
    'ai-universe': '#818cf8',
    'certifications': '#34d399',
    'system-design': '#fbbf24',
  };
  const accent = accentColors[tab.id] || '#38bdf8';
  return `
    <button class="mobile-drawer-item ${isActive ? 'active' : ''}" data-tab="${tab.id}" style="${isActive ? `background: ${accent}1a; border-color: ${accent}44; color: ${accent};` : ''}">
      <span class="mobile-drawer-icon">${tab.icon}</span>
      <div class="mobile-drawer-text">
        <div class="mobile-drawer-title">${tab.label}</div>
        <div class="mobile-drawer-desc">${tab.desc}</div>
      </div>
      ${isActive ? '<span class="mobile-drawer-pill">Active</span>' : ''}
    </button>`;
}
