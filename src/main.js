// JavaAlgo Elite v3.0 — Application Bootstrap

import { renderNavbar } from './components/Navbar.js';
import { renderHomeView } from './components/HomeView.js';
import { renderDSFoundationsView } from './components/DSFoundationsView.js';
import { renderRoadmapView } from './components/RoadmapView.js';
import { renderJavaRefresherView } from './components/JavaRefresherView.js';
import { renderPatternsView } from './components/PatternsView.js';
import { renderVisualizerView } from './components/VisualizerView.js';
import { renderSystemDesignView } from './components/SystemDesignView.js';
import { renderAIUniverseView } from './components/AIUniverseView.js';
import { renderCertificationsView } from './components/CertificationsView.js';
import { renderMockInterviewView } from './components/MockInterviewView.js';
import { renderQuizView } from './components/QuizView.js';
import { renderSortingGameView } from './components/SortingGame.js';
import { createProblemModal } from './components/ProblemModal.js';
import { createQuickSearchModal } from './components/QuickSearchModal.js';

const FULL_HEIGHT_TABS = ['foundations', 'system-design', 'ai-universe', 'certifications', 'interview'];
const VALID_TABS = [
  'home', 'foundations', 'roadmap', 'refresher', 'patterns',
  'visualizer', 'games', 'system-design', 'ai-universe', 'certifications', 'interview', 'quiz'
];

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
    this.problemModal = createProblemModal();
    this.quickSearchModal = createQuickSearchModal(
      (problem) => this.openProblem(problem),
      (tab) => this.switchTab(tab)
    );
    document.body.appendChild(this.problemModal.el);
    document.body.appendChild(this.quickSearchModal.el);

    this.renderHeader();

    this.mainContentEl = document.createElement('main');
    this.mainContentEl.id = 'main-content';
    this.applyMainStyles();
    this.appEl.appendChild(this.mainContentEl);

    this.renderFooter();
    this.renderCurrentView();

    window.addEventListener('hashchange', () => {
      const newTab = this.getInitialTab();
      if (newTab !== this.activeTab) this.switchTab(newTab, false);
    });

    // Keyboard shortcut: Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.quickSearchModal.open();
      }
    });

    this.initBackToTop();
  }

  initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.title = 'Back to top';
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    `;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  applyMainStyles() {
    const isFullHeight = FULL_HEIGHT_TABS.includes(this.activeTab);
    const isMobile = window.innerWidth <= 768;

    if (isFullHeight && !isMobile) {
      this.mainContentEl.style.cssText = `
        min-height: calc(100vh - var(--nav-height, 70px));
        padding: 0;
        overflow: hidden;
      `;
    } else {
      this.mainContentEl.style.cssText = `
        min-height: calc(100vh - var(--nav-height, 70px));
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
    if (updateHash) window.location.hash = newTab;
    this.applyMainStyles();
    this.renderHeader();

    const doRender = () => {
      this.renderCurrentView();
      if (!FULL_HEIGHT_TABS.includes(newTab)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => {
        doRender();
      });
    } else {
      doRender();
    }
  }

  renderCurrentView() {
    this.mainContentEl.innerHTML = '';
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
      case 'games':
        this.mainContentEl.appendChild(renderSortingGameView());
        break;
      case 'system-design':
        this.mainContentEl.appendChild(renderSystemDesignView());
        break;
      case 'ai-universe':
        this.mainContentEl.appendChild(renderAIUniverseView());
        break;
      case 'certifications':
        this.mainContentEl.appendChild(renderCertificationsView());
        break;
      case 'interview':
        this.mainContentEl.appendChild(renderMockInterviewView());
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
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px;">
          <span style="font-size: 1.1rem;">🚀</span>
          <span style="color: #fb923c; font-weight: 800;">JavaAlgo Elite v3.0</span>
          <span>•</span>
          <span>From Zero to Cracking Any Interview, Certification, or Offer</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 12px; font-size: 0.78rem;">
          <span>📚 DS Foundations</span>
          <span>·</span>
          <span>🗺️ 7-Tier Roadmap</span>
          <span>·</span>
          <span>🏛️ System Design</span>
          <span>·</span>
          <span>🤖 AI Universe</span>
          <span>·</span>
          <span>☁️ AWS Cloud</span>
          <span>·</span>
          <span>🎓 Certifications</span>
          <span>·</span>
          <span>🧠 Quiz</span>
        </div>
        <div style="font-size: 0.75rem;">
          Press <kbd class="kbd-shortcut">Ctrl</kbd> + <kbd class="kbd-shortcut">K</kbd> to search any topic, syntax, or problem.
        </div>
      </div>
    `;
    this.appEl.appendChild(footer);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
