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
          <p style="color: var(--text-secondary); margin-top: 2px;">DSA in Java · System Design · AI & ML Universe · AWS Cloud · Certifications — From noob to cracking any interview or certification in 2026</p>
        </div>
      </div>
    </section>

    <!-- Progress Overview Stats -->
    <div class="hero-stats-row" style="justify-content: flex-start; margin-bottom: 32px; flex-wrap: wrap; gap: 14px;">
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
        <div class="stat-label">DS Visualizers</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #fbbf24;">6</div>
        <div class="stat-label">System Designs</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #818cf8;">20</div>
        <div class="stat-label">AI/ML Topics + Canvas</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #38bdf8;">65 Qs</div>
        <div class="stat-label">Timed AWS Mock</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #f43f5e;">4</div>
        <div class="stat-label">Interview Drills</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" style="color: #fbbf24;">🎮 5</div>
        <div class="stat-label">Sorting Racers</div>
      </div>
    </div>

    <!-- SPOTLIGHT GRID: Continue Next Problem & Mock Interview Room -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 36px;">
      
      <!-- LEFT: Next Up Banner -->
      <div class="card" style="border-color: rgba(56,189,248,0.4); background: linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.08));">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
          ${Icons.sparkles}
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary);">📍 Continue Where You Left Off</h3>
        </div>
        ${nextAction ? `
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 8px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">TIER ${nextAction.tier} — Next Problem</p>
          <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 8px;">${nextAction.problem.title}</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;">
            <span class="badge badge-${nextAction.problem.difficulty.toLowerCase()}">${nextAction.problem.difficulty}</span>
            <span class="badge badge-java" style="font-size: 0.72rem; text-transform: none;">${nextAction.problem.pattern}</span>
          </div>
          <button class="btn-primary" id="continue-btn" style="width: 100%; justify-content: center;">
            ${Icons.play} Solve Next Problem
          </button>
        ` : `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🏆</div>
            <p style="font-weight: 700; color: #34d399;">All problems completed! You are interview ready!</p>
          </div>
        `}
      </div>

      <!-- RIGHT: Mock Interview Room (Unlocked) -->
      <div class="card" style="border-color: rgba(244,63,94,0.4); background: linear-gradient(135deg, rgba(244,63,94,0.08), rgba(168,85,247,0.08));">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.4rem;">🎙️</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: #f43f5e;">FAANG Mock Interview Room</h3>
          </div>
          <span style="font-size: 0.68rem; padding: 2px 8px; border-radius: 99px; background: rgba(244,63,94,0.2); color: #fb7185; border: 1px solid rgba(244,63,94,0.3); font-weight: 800;">NEW LIVE</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 16px;">
          Practice interactive, multi-turn technical interviews under real pressure. Handle senior engineer follow-up questions for <strong>LRU Cache</strong>, <strong>Median Stream</strong>, <strong>API Rate Limiting</strong>, and <strong>STAR Behavioral</strong> scenarios.
        </p>
        <button class="btn-secondary home-nav-card" data-tab="interview" style="width: 100%; justify-content: center; background: rgba(244,63,94,0.15); border-color: rgba(244,63,94,0.4); color: var(--text-primary); font-weight: 700;">
          🎙️ Enter Mock Interview Room
        </button>
      </div>
    </div>

    <!-- SIX CORE TRACKS GRID -->
    <div style="margin-bottom: 36px;">
      <div class="section-header" style="margin-bottom: 20px;">
        <div class="section-title-wrap">
          <div class="section-icon-box" style="background: rgba(99,102,241,0.15); color: #818cf8;">${Icons.layers}</div>
          <div>
            <h2 class="section-title">Core Learning Tracks</h2>
            <p class="section-subtitle">Everything required to go from engineering fundamentals to Senior FAANG offers</p>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
        
        <!-- Track 1: Java Refresher -->
        <div class="home-nav-card card" data-tab="refresher" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #f97316;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">☕</span>
            <span class="badge badge-java">Java Mastery</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Java Deep Dive, OOP & Interview Q&A</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            Stack vs Heap, JVM memory, 4 OOP Pillars, Generics, Collections cheatsheet, Architecture "Why?", and 20 FAANG Q&A flashcards.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #fb923c;">Explore Java Masterclass →</div>
        </div>

        <!-- Track 2: DS Foundations & Visualizer -->
        <div class="home-nav-card card" data-tab="foundations" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #38bdf8;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">📚</span>
            <span class="badge" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">8 Structures</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Data Structures & Visualizer</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            Interactive visual playground for Arrays, LinkedLists, Stacks, Queues, BSTs, Heaps, and Graphs with live operation buttons.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #38bdf8;">Launch Visual Playground →</div>
        </div>

        <!-- Track 3: 7-Tier Roadmap & Patterns -->
        <div class="home-nav-card card" data-tab="roadmap" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #10b981;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">🗺️</span>
            <span class="badge" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">7 Tiers</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">7-Tier Problem Roadmap</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            Curated problems with "How to Think" frameworks, real-world analogies, and transferable problem matrices.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #34d399;">View Problem Roadmap →</div>
        </div>

        <!-- Track 4: System Design Track -->
        <div class="home-nav-card card" data-tab="system-design" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #fbbf24;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">🏛️</span>
            <span class="badge" style="background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3);">6 Case Studies</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">System Design Track</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            URL Shortener, Instagram, WhatsApp, YouTube, Twitter, and Redis with interactive architecture diagrams and trade-offs.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #fbbf24;">Learn Distributed Systems →</div>
        </div>

        <!-- Track 5: AI & ML Universe -->
        <div class="home-nav-card card" data-tab="ai-universe" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #818cf8;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">🧠</span>
            <span class="badge" style="background: rgba(129,140,248,0.15); color: #a5b4fc; border: 1px solid rgba(129,140,248,0.3);">Interactive Canvas</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">AI & ML Universe</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            20 topics: ML From Scratch with live Gradient Descent Canvas, Neural Nets, Transformers, Agentic Workflows, and Road to AGI.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #a5b4fc;">Explore AI Universe →</div>
        </div>

        <!-- Track 6: AWS Cloud & Timed Mock Exam -->
        <div class="home-nav-card card" data-tab="certifications" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #38bdf8;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">☁️</span>
            <span class="badge" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">65-Q Mock Exam</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">AWS Cloud (CLF-C02)</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            Full 4 Domain study guides, Service Matcher game, and 90-minute timed 65-question official mock exam with domain report.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #38bdf8;">Start AWS Certification Prep →</div>
        </div>

        <!-- Track 7: Interactive Algorithm Battle & Games -->
        <div class="home-nav-card card" data-tab="games" style="cursor: pointer; transition: all 0.2s ease; border-left: 4px solid #f59e0b;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">🎮</span>
            <span class="badge" style="background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3);">Interactive Arena</span>
          </div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Algorithm Sorting Race & Big-O Arena</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            Watch Quick Sort, Merge Sort, Insertion Sort and Bubble Sort battle head-to-head on live animated bar charts across different data distributions.
          </p>
          <div style="font-size: 0.78rem; font-weight: 700; color: #fbbf24;">Launch Algorithm Battle Arena →</div>
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
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 14px 16px; border-top: 3px solid ${week.color}; box-shadow: var(--card-inner-highlight);">
            <div style="font-size: 0.75rem; color: ${week.color}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${week.week}</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">${week.theme}</div>
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
