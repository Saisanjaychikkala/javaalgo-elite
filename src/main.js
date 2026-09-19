// JavaAlgo Elite v2.0 — Application Bootstrap

import { renderNavbar } from './components/Navbar.js';
import { renderHomeView } from './components/HomeView.js';
import { renderDSFoundationsView } from './components/DSFoundationsView.js';
import { renderRoadmapView } from './components/RoadmapView.js';
import { renderJavaRefresherView } from './components/JavaRefresherView.js';
import { renderPatternsView } from './components/PatternsView.js';
import { renderVisualizerView } from './components/VisualizerView.js';
import { renderSystemDesignView } from './components/SystemDesignView.js';
import { renderQuizView } from './components/QuizView.js';
import { createProblemModal } from './components/ProblemModal.js';
import { createQuickSearchModal } from './components/QuickSearchModal.js';

const FULL_HEIGHT_TABS = ['foundations', 'system-design'];
const VALID_TABS = ['home', 'foundations', 'roadmap', 'refresher', 'patterns', 'visualizer', 'system-design', 'quiz'];

class App {
  constructor() {
    this.appEl = document.getElementById('app');
    this.activeTab = this.getInitialTab();
    this.problemModal = null;
    this.quickSearchModal = null;
    this.mainContentEl = null;

    this.init();
  }

  getInitialTab() {
    const hash = window.location.hash.replace('#', '');
    return VALID_TABS.includes(hash) ? hash : 'home';
  }

  init() {
    this.appEl.innerHTML = '';

    // Initialize Modals
    this.problemModal = createProblemModal();
    this.quickSearchModal = createQuickSearchModal(
      (problem) => this.openProblem(problem),
      (tab) => this.switchTab(tab)
    );

    document.body.appendChild(this.problemModal.el);
    document.body.appendChild(this.quickSearchModal.el);

    // Render Navigation
    this.renderHeader();

    // Main Content Mount Point
    this.mainContentEl = document.createElement('main');
    this.mainContentEl.id = 'main-content';
    this.applyMainStyles();
    this.appEl.appendChild(this.mainContentEl);

    // Render Footer
    this.renderFooter();

    // Render initial view
    this.renderCurrentView();

    // Hash change listener
    window.addEventListener('hashchange', () => {
      const newTab = this.getInitialTab();
      if (newTab !== this.activeTab) {
        this.switchTab(newTab, false);
      }
    });
  }

  applyMainStyles() {
    const isFullHeight = FULL_HEIGHT_TABS.includes(this.activeTab);
    const isMobile = window.innerWidth <= 768;

    if (isFullHeight && !isMobile) {
      // Full-height tabs: sidebar + content layout, no padding, no footer on desktop
      this.mainContentEl.style.cssText = `
        min-height: calc(100vh - var(--nav-height, 64px));
        padding: 0;
        overflow: hidden;
      `;
    } else {
      this.mainContentEl.style.cssText = `
        min-height: calc(100vh - var(--nav-height, 64px));
        padding-bottom: ${isMobile ? '84px' : '60px'};
      `;
    }
  }

  renderHeader() {
    const existingNav = this.appEl.querySelector('.navbar');
    if (existingNav) existingNav.remove();

    const navbar = renderNavbar(
      this.activeTab,
      (newTab) => this.switchTab(newTab),
      () => this.quickSearchModal.open()
    );

    this.appEl.insertBefore(navbar, this.mainContentEl);
  }

  switchTab(newTab, updateHash = true) {
    if (this.activeTab === newTab && this.mainContentEl.children.length > 0) return;
    this.activeTab = newTab;

    if (updateHash) {
      window.location.hash = newTab;
    }

    this.applyMainStyles();
    this.renderHeader();
    this.renderCurrentView();

    // Only scroll for non-full-height tabs
    if (!FULL_HEIGHT_TABS.includes(newTab)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  renderCurrentView() {
    this.mainContentEl.innerHTML = '';

    // Hide/show footer for full-height tabs
    const footer = this.appEl.querySelector('footer');
    if (footer) {
      footer.style.display = FULL_HEIGHT_TABS.includes(this.activeTab) ? 'none' : '';
    }

    const navigateTo = (tab) => this.switchTab(tab);

    switch (this.activeTab) {
      case 'home':
        this.mainContentEl.appendChild(renderHomeView(navigateTo));
        break;
      case 'foundations':
        this.mainContentEl.appendChild(renderDSFoundationsView());
        break;
      case 'roadmap':
        this.mainContentEl.appendChild(renderRoadmapView((problem) => this.openProblem(problem)));
        break;
      case 'refresher':
        this.mainContentEl.appendChild(renderJavaRefresherView());
        break;
      case 'patterns':
        this.mainContentEl.appendChild(renderPatternsView());
        break;
      case 'visualizer':
        this.mainContentEl.appendChild(renderVisualizerView());
        break;
      case 'system-design':
        this.mainContentEl.appendChild(renderSystemDesignView());
        break;
      case 'quiz':
        this.mainContentEl.appendChild(renderQuizView());
        break;
      default:
        this.mainContentEl.appendChild(renderHomeView(navigateTo));
    }
  }

  openProblem(problem) {
    this.problemModal.open(problem);
  }

  renderFooter() {
    const footer = document.createElement('footer');
    footer.style.cssText = `
      border-top: 1px solid var(--border-subtle);
      padding: 36px 0;
      background: rgba(11, 15, 25, 0.95);
      color: var(--text-muted);
      font-size: 0.85rem;
      text-align: center;
    `;
    footer.innerHTML = `
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #fb923c; font-weight: 700;">JavaAlgo Elite v2.0</span>
          <span>•</span>
          <span>From DS Foundations to System Design — Everything you need to crack the job market</span>
        </div>
        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 12px; font-size: 0.8rem;">
          8 Interactive Data Structures · 7-Tier Roadmap · 14 Algorithm Patterns · 6 System Design Problems · Java Refresher · Recall Quiz
        </p>
        <div style="font-size: 0.75rem;">
          Press <kbd class="kbd-shortcut">Ctrl</kbd> + <kbd class="kbd-shortcut">K</kbd> anywhere to search syntax or problems.
        </div>
      </div>
    `;
    this.appEl.appendChild(footer);
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
