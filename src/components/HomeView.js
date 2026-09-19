import { Icons } from '../utils/icons.js';
import { Storage } from '../utils/storage.js';
import { curriculumTiers } from '../data/curriculumData.js';
import { dsFoundations } from '../data/dsFoundations.js';

export function renderHomeView(onNavigate) {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  const completed = Storage.getCompleted();
  const totalProblems = curriculumTiers.flatMap(t => t.problems).length;
  const totalDs = dsFoundations.length;
  const pct = totalProblems > 0 ? Math.round((completed.length / totalProblems) * 100) : 0;

  // Study plan weeks based on tier progress
  const tierProgress = curriculumTiers.map(tier => {
    const done = tier.problems.filter(p => completed.includes(p.id)).length;
    return { tier: tier.tier, done, total: tier.problems.length, name: tier.name.split(':')[1].trim() };
  });

  // What to do next — first incomplete tier/problem
  let nextAction = null;
  for (const tier of curriculumTiers) {
    const incomplete = tier.problems.find(p => !completed.includes(p.id));
    if (incomplete) {
      nextAction = { tier: tier.tier, problem: incomplete };
      break;
    }
  }

  container.innerHTML = `
    <!-- HERO Welcome Section -->
    <section style="padding: 40px 0 28px;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
        <div style="
          width: 56px; height: 56px; border-radius: 16px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; box-shadow: 0 6px 25px rgba(249,115,22,0.4);
        ">☕</div>
        <div>
          <h1 style="font-size: 2.2rem; font-weight: 900; letter-spacing: -0.03em;">
            Welcome to <span class="java-gradient-text">JavaAlgo Elite</span>
          </h1>
          <p style="color: var(--text-secondary); margin-top: 2px;">Your complete DSA + System Design guide to cracking the job market</p>
        </div>
      </div>
    </section>

    <!-- Progress Overview Stats -->
    <div class="hero-stats-row" style="justify-content: flex-start; margin-bottom: 36px;">
      <div class="stat-item">
        <div class="stat-val" id="home-problems-stat" style="color: var(--accent-emerald);">${completed.length}/${totalProblems}</div>
        <div class="stat-label">Problems Solved</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: var(--primary);">${pct}%</div>
        <div class="stat-label">Curriculum Done</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #c084fc;">${totalDs}</div>
        <div class="stat-label">DS Foundations</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #fbbf24;">6</div>
        <div class="stat-label">System Designs</div>
      </div>
    </div>

    <!-- TWO COLUMN LAYOUT -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 36px;">
      
      <!-- LEFT: Next Up Banner -->
      <div class="card" style="border-color: rgba(56,189,248,0.4); background: linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.08));">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
          ${Icons.sparkles}
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary);">📍 Continue Where You Left Off</h3>
        </div>
        ${nextAction ? `
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 8px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">TIER ${nextAction.tier} — Next Problem</p>
          <h4 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 6px;">${nextAction.problem.title}</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
            <span class="badge badge-${nextAction.problem.difficulty.toLowerCase()}">${nextAction.problem.difficulty}</span>
            <span class="badge badge-java" style="font-size: 0.7rem; text-transform: none;">${nextAction.problem.pattern}</span>
          </div>
          <button class="btn-primary" id="continue-btn" style="width: 100%; justify-content: center;">
            ${Icons.play} Go to Problem
          </button>
        ` : `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🏆</div>
            <p style="font-weight: 700; color: #34d399;">All problems completed! You're ready!</p>
          </div>
        `}
      </div>

      <!-- RIGHT: Today's Focus -->
      <div class="card">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          ${Icons.brain}
          <h3 style="font-size: 1.1rem; font-weight: 700;">🎯 Your Learning Path</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div class="home-nav-card" data-tab="foundations" style="
            padding: 12px 16px; background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.25);
            border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px;
          ">
            <span style="font-size: 1.4rem;">📚</span>
            <div>
              <div style="font-weight: 700; color: #c084fc;">Step 1: DS Foundations</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">8 data structures with full explanations & interactive visualizers</div>
            </div>
          </div>
          <div class="home-nav-card" data-tab="roadmap" style="
            padding: 12px 16px; background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25);
            border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px;
          ">
            <span style="font-size: 1.4rem;">🗺️</span>
            <div>
              <div style="font-weight: 700; color: var(--primary);">Step 2: 7-Tier Problem Roadmap</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Curated problems from Easy to FAANG-Hard with optimal Java solutions</div>
            </div>
          </div>
          <div class="home-nav-card" data-tab="patterns" style="
            padding: 12px 16px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);
            border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px;
          ">
            <span style="font-size: 1.4rem;">🔮</span>
            <div>
              <div style="font-weight: 700; color: #34d399;">Step 3: Master 14 Patterns</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Learn to recognize patterns in ANY new problem</div>
            </div>
          </div>
          <div class="home-nav-card" data-tab="system-design" style="
            padding: 12px 16px; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25);
            border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 12px;
          ">
            <span style="font-size: 1.4rem;">🏛️</span>
            <div>
              <div style="font-weight: 700; color: #fbbf24;">Step 4: System Design</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">URL Shortener, Instagram, WhatsApp, YouTube, Twitter, Redis</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tier Progress Tracker -->
    <div class="card" style="margin-bottom: 32px;">
      <div class="section-header" style="margin-bottom: 20px;">
        <div class="section-title-wrap">
          <div class="section-icon-box">${Icons.layers}</div>
          <div>
            <h2 class="section-title">Tier Progress Tracker</h2>
            <p class="section-subtitle">7-tier curriculum at a glance</p>
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
        ${tierProgress.map(t => {
          const pct = Math.round((t.done / t.total) * 100);
          const isDone = t.done === t.total;
          return `
            <div style="
              background: rgba(15,23,42,0.7); border: 1px solid ${isDone ? 'rgba(16,185,129,0.4)' : 'var(--border-subtle)'};
              border-radius: 10px; padding: 14px 16px;
            ">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span class="badge" style="background: rgba(56,189,248,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.25); font-size: 0.7rem;">TIER ${t.tier}</span>
                <span style="font-size: 0.8rem; color: ${isDone ? '#34d399' : 'var(--text-muted)'}; font-weight: 700;">${t.done}/${t.total} ${isDone ? '✓' : ''}</span>
              </div>
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 10px;">${t.name}</div>
              <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                <div style="height: 100%; width: ${pct}%; background: ${isDone ? '#10b981' : 'linear-gradient(90deg, #38bdf8, #818cf8)'}; border-radius: 3px; transition: width 0.5s ease;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- STUDY PLAN -->
    <div class="card" style="margin-bottom: 32px;">
      <div class="section-header" style="margin-bottom: 20px;">
        <div class="section-title-wrap">
          <div class="section-icon-box" style="background: rgba(251,191,36,0.1); color: #fbbf24;">${Icons.sparkles}</div>
          <div>
            <h2 class="section-title">📅 Recommended Study Plan</h2>
            <p class="section-subtitle">Structured 10-week job-ready curriculum</p>
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px;">
        ${[
          { week: 'Weeks 1-2', theme: 'Java Mastery', color: '#f97316', tasks: ['Java Collections & Syntax Refresher', 'Arrays, Strings, Sorting basics', 'HashMap frequency counters', 'Two Pointers (Two Sum, 3Sum)'] },
          { week: 'Weeks 3-4', theme: 'Linear DS + Search', color: '#38bdf8', tasks: ['Linked Lists (Reverse, Cycle, LRU)', 'Binary Search + Search on Answer', 'Sliding Window mastery', 'Stack & Monotonic Stack'] },
          { week: 'Weeks 5-6', theme: 'Trees & Heaps', color: '#34d399', tasks: ['Binary Tree traversals all 4', 'BST operations & validation', 'Heap/Priority Queue problems', 'Trie implementation'] },
          { week: 'Weeks 7-8', theme: 'Graphs + DSU', color: '#c084fc', tasks: ['BFS & DFS templates', 'Topological Sort (Kahn\'s)', 'Disjoint Set Union (Union-Find)', 'Dijkstra\'s shortest path'] },
          { week: 'Week 9', theme: 'Dynamic Programming', color: '#fbbf24', tasks: ['1D DP: Coin Change, LIS', '2D DP: Edit Distance, LCS', 'Knapsack variants', 'DP on intervals & grids'] },
          { week: 'Week 10', theme: 'System Design', color: '#f43f5e', tasks: ['Scalability fundamentals', 'Design URL Shortener & Instagram', 'Design WhatsApp & YouTube', 'RADIO interview framework'] }
        ].map(week => `
          <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 14px 16px; border-top: 3px solid ${week.color};">
            <div style="font-size: 0.75rem; color: ${week.color}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${week.week}</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 10px;">${week.theme}</div>
            <ul style="padding-left: 16px; color: var(--text-secondary); font-size: 0.82rem; display: flex; flex-direction: column; gap: 3px;">
              ${week.tasks.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Job Market Tips -->
    <div class="card" style="margin-bottom: 32px; background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9)); border-color: rgba(251,191,36,0.25);">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
        <span style="font-size: 1.5rem;">💼</span>
        <h2 style="font-size: 1.35rem; font-weight: 800;">Cracking the 2026 Job Market — What Really Matters</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
        ${[
          { icon: '🎯', title: 'Quality over Quantity', text: 'Solve 100 problems DEEPLY rather than rushing through 500. Master each pattern until you can solve it without hints.' },
          { icon: '🗣️', title: 'Communicate While Coding', text: 'Interviewers evaluate your THINKING, not just your code. Talk through your approach, trade-offs, and edge cases out loud.' },
          { icon: '🧪', title: 'Test Your Code', text: 'Always trace through a concrete example AFTER writing code. Catch bugs before the interviewer does. Say "Let me verify with [1,2,3,4]".' },
          { icon: '⚡', title: 'Start with Brute Force', text: 'State the O(N²) brute force immediately, then optimize. Never appear stuck. Brute force shows you understand the problem.' },
          { icon: '📐', title: 'Master System Design', text: 'Senior roles (3+ years exp) are 50% System Design. Even junior roles at top companies ask it. Start learning Week 10 onwards.' },
          { icon: '🔄', title: 'Do Mock Interviews', text: 'Technical skill ≠ interview skill. Use Pramp, interviewing.io, or pair up with a friend. Simulate real 45-min pressure.' }
        ].map(tip => `
          <div style="background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 14px 16px;">
            <div style="font-size: 1.4rem; margin-bottom: 6px;">${tip.icon}</div>
            <div style="font-weight: 700; color: #fbbf24; margin-bottom: 4px;">${tip.title}</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${tip.text}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Wire up navigation cards
  container.querySelectorAll('.home-nav-card').forEach(card => {
    card.addEventListener('click', () => {
      const tab = card.dataset.tab;
      onNavigate(tab);
    });
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Wire up continue button
  const continueBtn = container.querySelector('#continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      onNavigate('roadmap');
    });
  }

  // Update on progress changes
  window.addEventListener('progress-updated', () => {
    const updated = Storage.getCompleted();
    const stat = container.querySelector('#home-problems-stat');
    if (stat) stat.textContent = `${updated.length}/${totalProblems}`;
  });

  return container;
}
