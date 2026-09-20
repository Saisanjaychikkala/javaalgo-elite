import { Icons } from '../utils/icons.js';
import { javaRefresherData } from '../data/javaRefresher.js';
import { curriculumTiers } from '../data/curriculumData.js';
import { patternMatrix } from '../data/patternMatrix.js';
import { showToast } from '../utils/toast.js';

export function createQuickSearchModal(onSelectProblem, onNavigateTab) {
  // Build searchable index
  const searchIndex = [];

  // 1. Refresher snippets
  javaRefresherData.forEach(item => {
    searchIndex.push({
      type: 'Java Cheat Sheet',
      title: item.title,
      subtitle: item.summary,
      category: item.category,
      rawCode: item.code,
      action: () => {
        onNavigateTab('refresher');
        setTimeout(() => {
          const el = document.getElementById(item.id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  });

  // 2. Curriculum problems
  curriculumTiers.forEach(tier => {
    tier.problems.forEach(prob => {
      searchIndex.push({
        type: 'DSA Problem',
        title: prob.title,
        subtitle: `${prob.difficulty} • ${prob.pattern} • ${prob.companies.join(', ')}`,
        category: `Tier ${tier.tier}`,
        action: () => {
          onSelectProblem(prob);
        }
      });
    });
  });

  // 3. Patterns
  patternMatrix.forEach(pat => {
    searchIndex.push({
      type: 'Interview Pattern',
      title: pat.name,
      subtitle: pat.whenToUse,
      category: 'Pattern Matrix',
      action: () => {
        onNavigateTab('patterns');
        setTimeout(() => {
          const el = document.getElementById(pat.id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  });

  // 4. Interactive Games & Speedrun
  searchIndex.push({
    type: 'Interactive Game',
    title: 'Algorithm Sorting Race Arena',
    subtitle: 'Bubble vs Selection vs Insertion vs Merge vs Quick Sort head-to-head race',
    category: 'Games',
    action: () => {
      onNavigateTab('games');
    }
  });

  searchIndex.push({
    type: 'Interactive Game',
    title: 'Big-O Complexity Speedrun Arena',
    subtitle: 'Test your ability to guess time complexity from 25 real code snippets',
    category: 'Games',
    action: () => {
      onNavigateTab('quiz');
    }
  });

  // DOM Container
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'quick-search-backdrop';

  backdrop.innerHTML = `
    <div class="modal-container quick-search-modal" role="dialog" aria-modal="true" aria-label="Quick Search">
      <div class="quick-search-input-wrap">
        <span style="color: var(--text-muted);">${Icons.search}</span>
        <input 
          type="text" 
          class="quick-search-input" 
          id="quick-search-field"
          placeholder="Search imports, Collections (Map, List, Queue), patterns, or problems..." 
          autocomplete="off"
        />
        <button class="modal-close-btn" id="search-close-btn" title="Close (Esc)">${Icons.close}</button>
      </div>

      <div class="quick-results-list" id="quick-results-list">
        <!-- Rendered results -->
      </div>
    </div>
  `;

  const inputField = backdrop.querySelector('#quick-search-field');
  const resultsList = backdrop.querySelector('#quick-results-list');
  const closeBtn = backdrop.querySelector('#search-close-btn');

  function renderResults(query = '') {
    const cleanQuery = query.toLowerCase().trim();
    let matches = [];

    if (!cleanQuery) {
      // Show high yield suggestions
      matches = searchIndex.slice(0, 7);
    } else {
      matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(cleanQuery) ||
        item.subtitle.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery) ||
        item.type.toLowerCase().includes(cleanQuery)
      ).slice(0, 15);
    }

    if (matches.length === 0) {
      resultsList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted);">
          No matches found for "<strong style="color: var(--text-primary);">${query}</strong>". Try searching "import", "PriorityQueue", "Two Sum", or "Sliding Window".
        </div>
      `;
      return;
    }

    resultsList.innerHTML = matches.map((item, idx) => `
      <div class="quick-result-item" data-idx="${idx}">
        <div class="quick-result-left">
          <div class="quick-result-title">${item.title}</div>
          <div class="quick-result-category">${item.type} • ${item.category} • ${item.subtitle}</div>
        </div>
        <span class="badge badge-company">Go</span>
      </div>
    `).join('');

    resultsList.querySelectorAll('.quick-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx, 10);
        closeSearch();
        matches[idx].action();
      });
    });
  }

  function openSearch() {
    backdrop.classList.add('open');
    inputField.value = '';
    renderResults('');
    setTimeout(() => inputField.focus(), 50);
  }

  function closeSearch() {
    backdrop.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeSearch);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeSearch();
  });

  inputField.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  // Global keyboard shortcut (Ctrl+K or Cmd+K, and Esc)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeSearch();
    }
  });

  return {
    el: backdrop,
    open: openSearch,
    close: closeSearch
  };
}
