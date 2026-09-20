import { systemDesignData } from '../data/systemDesign.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';

export function renderSystemDesignView() {
  const container = document.createElement('div');
  container.className = 'sd-layout';

  let activeSection = 'framework';
  let activeProblem = null;

  // SIDEBAR
  const sidebar = document.createElement('nav');
  sidebar.className = 'sd-sidebar';

  function buildSidebar() {
    sidebar.innerHTML = `
      <div style="padding: 0 16px 8px; font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">System Design</div>
      
      <!-- Interview Framework -->
      <div class="sd-sidebar-item ${activeSection === 'framework' && !activeProblem ? 'sd-active' : ''}" data-section="framework" style="
        display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer;
        transition: all 0.15s ease; border-left: 3px solid transparent;
        ${activeSection === 'framework' && !activeProblem ? 'background: rgba(251,191,36,0.1); border-left-color: #fbbf24; color: #fbbf24;' : 'color: var(--text-secondary);'}
      ">
        <span style="font-size: 1.1rem;">🎯</span>
        <div>
          <div style="font-weight: 600; font-size: 0.88rem;">RADIO Framework</div>
          <div style="font-size: 0.7rem; opacity: 0.7;">Interview strategy</div>
        </div>
      </div>

      <!-- Fundamentals -->
      <div style="padding: 10px 16px 4px; font-size: 0.68rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px;">Fundamentals</div>
      ${systemDesignData.fundamentals.map(f => `
        <div class="sd-sidebar-item ${activeSection === f.id && !activeProblem ? 'sd-active' : ''}" data-section="${f.id}" style="
          display: flex; align-items: center; gap: 10px; padding: 9px 16px; cursor: pointer;
          transition: all 0.15s ease; border-left: 3px solid transparent;
          ${activeSection === f.id && !activeProblem ? 'background: rgba(56,189,248,0.1); border-left-color: #38bdf8; color: #38bdf8;' : 'color: var(--text-secondary);'}
        ">
          <span style="font-size: 1.1rem;">${f.icon}</span>
          <div style="font-weight: 600; font-size: 0.85rem;">${f.title}</div>
        </div>
      `).join('')}

      <!-- Problems -->
      <div style="padding: 10px 16px 4px; font-size: 0.68rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px;">Classic Problems</div>
      ${systemDesignData.problems.map(p => `
        <div class="sd-sidebar-item ${activeProblem === p.id ? 'sd-active' : ''}" data-problem="${p.id}" style="
          display: flex; align-items: center; gap: 10px; padding: 9px 16px; cursor: pointer;
          transition: all 0.15s ease; border-left: 3px solid transparent;
          ${activeProblem === p.id ? 'background: rgba(244,63,94,0.1); border-left-color: #f43f5e; color: #f43f5e;' : 'color: var(--text-secondary);'}
        ">
          <span style="font-size: 1.1rem;">${p.icon}</span>
          <div>
            <div style="font-weight: 600; font-size: 0.82rem; line-height: 1.3;">${p.title.split('/')[0].trim()}</div>
            <span class="badge-${p.difficulty.toLowerCase()}" style="
              font-size: 0.62rem; font-weight: 700; padding: 1px 6px; border-radius: 10px;
              ${p.difficulty === 'Medium' ? 'background: rgba(251,191,36,0.15); color: #fbbf24;' : 'background: rgba(244,63,94,0.15); color: #f43f5e;'}
            ">${p.difficulty}</span>
          </div>
        </div>
      `).join('')}
    `;

    sidebar.querySelectorAll('.sd-sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.dataset.problem) {
          activeProblem = item.dataset.problem;
          activeSection = '';
        } else {
          activeSection = item.dataset.section;
          activeProblem = null;
        }
        buildSidebar();
        renderContent();
      });
    });
  }

  // CONTENT
  const content = document.createElement('div');
  content.className = 'sd-content';

  function renderContent() {
    content.scrollTop = 0;

    if (activeSection === 'framework') {
      renderFramework();
    } else if (activeProblem) {
      const problem = systemDesignData.problems.find(p => p.id === activeProblem);
      if (problem) renderProblem(problem);
    } else {
      const fund = systemDesignData.fundamentals.find(f => f.id === activeSection);
      if (fund) renderFundamental(fund);
    }
  }

  function renderFramework() {
    const fw = systemDesignData.interviewFramework;
    content.innerHTML = `
      <div style="margin-bottom: 32px;">
        <h1 style="font-size: 2rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 8px;">
          🎯 ${fw.name}
        </h1>
        <p style="color: var(--text-secondary); max-width: 680px; line-height: 1.6;">
          A proven 5-step framework for crushing any system design interview question. 
          Interviewers want to see <strong style="color: var(--text-primary);">structured thinking</strong>, not just answers.
          This framework ensures you never freeze or miss critical aspects.
        </p>
      </div>

      <!-- Steps -->
      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px;">
        ${fw.steps.map((step, i) => `
          <div class="card" style="padding: 24px; border-left: 4px solid ${['#fbbf24','#38bdf8','#c084fc','#34d399','#f43f5e'][i]};">
            <div style="display: flex; align-items: flex-start; gap: 16px;">
              <div style="
                width: 52px; height: 52px; flex-shrink: 0; border-radius: 14px; display: flex; align-items: center; justify-content: center;
                background: ${['rgba(251,191,36,0.1)','rgba(56,189,248,0.1)','rgba(168,85,247,0.1)','rgba(16,185,129,0.1)','rgba(244,63,94,0.1)'][i]};
                font-size: 1.8rem; font-weight: 900; color: ${['#fbbf24','#38bdf8','#c084fc','#34d399','#f43f5e'][i]};
              ">${step.letter}</div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                  <h3 style="font-size: 1.2rem; font-weight: 800;">${step.name}</h3>
                  <span style="font-size: 0.75rem; background: var(--bg-tertiary); padding: 3px 10px; border-radius: 20px; color: var(--text-muted); border: 1px solid var(--border-subtle);">⏱ ${step.timeAllocation}</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 14px;">${step.description}</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 6px; margin-bottom: 12px;">
                  ${step.questions.map(q => `
                    <div style="display: flex; gap: 8px; font-size: 0.84rem; color: var(--text-secondary);">
                      <span style="color: ${['#fbbf24','#38bdf8','#c084fc','#34d399','#f43f5e'][i]}; flex-shrink: 0; margin-top: 1px;">→</span>
                      <span>${q}</span>
                    </div>
                  `).join('')}
                </div>
                <div style="
                  padding: 10px 14px; background: var(--bg-tertiary); border-radius: 8px;
                  border-left: 3px solid ${['#fbbf24','#38bdf8','#c084fc','#34d399','#f43f5e'][i]};
                  font-size: 0.84rem; color: var(--text-secondary); border: 1px solid var(--border-subtle);
                ">
                  💡 <strong style="color: var(--text-primary);">Pro Tip:</strong> ${step.tip}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Latency cheatsheet preview -->
      <div class="card" style="padding: 24px; background: linear-gradient(135deg, rgba(251,191,36,0.05), rgba(249,115,22,0.05)); border-color: rgba(251,191,36,0.25);">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: #fbbf24; margin-bottom: 14px;">⏱️ Quick Estimation Cheatsheet (Know These Cold!)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px;">
          ${[
            { item: 'L1 Cache', val: '~1 ns', note: '1 second analogy' },
            { item: 'RAM Access', val: '~100 ns', note: '2 minutes analogy' },
            { item: 'SSD Read (4KB)', val: '~100 µs', note: '3 hours analogy' },
            { item: 'Same DC Network', val: '~0.5 ms', note: '12 hours analogy' },
            { item: 'DB Query (indexed)', val: '~1–10 ms', note: '' },
            { item: 'Redis Cache hit', val: '~1–5 ms', note: '' },
            { item: 'Cross-continent', val: '~150 ms', note: '150 days analogy!' },
            { item: 'DNS Lookup', val: '~20–120 ms', note: 'Use CDN to reduce' },
          ].map(({ item, val, note }) => `
            <div style="padding: 10px 14px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <span style="font-size: 0.84rem; color: var(--text-secondary);">${item}</span>
                <span style="font-family: 'Fira Code', monospace; font-weight: 800; font-size: 0.84rem; color: #fbbf24;">${val}</span>
              </div>
              ${note ? `<div style="font-size: 0.72rem; color: var(--text-muted);">${note}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFundamental(fund) {
    content.innerHTML = `
      <div style="margin-bottom: 28px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-size: 2rem;">${fund.icon}</span>
          <h1 style="font-size: 2rem; font-weight: 900; letter-spacing: -0.03em;">${fund.title}</h1>
        </div>
      </div>

      <!-- Main Content -->
      <div class="card" style="padding: 28px; margin-bottom: 24px; line-height: 1.8; color: var(--text-secondary);">
        ${renderMarkdownSD(fund.content)}
      </div>

      <!-- Key Points -->
      <div class="card" style="padding: 22px; border-color: rgba(56,189,248,0.3); background: rgba(56,189,248,0.04);">
        <h3 style="font-size: 1rem; font-weight: 800; color: #38bdf8; margin-bottom: 14px;">🔑 Key Takeaways (Interview Ready)</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${fund.keyPoints.map(point => `
            <div style="display: flex; gap: 10px; font-size: 0.88rem; color: var(--text-secondary);">
              <span style="color: #38bdf8; flex-shrink: 0; font-weight: 800; margin-top: 1px;">✓</span>
              <span>${point}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderProblem(problem) {
    content.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom: 28px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span class="badge" style="${problem.difficulty === 'Hard' ? 'background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);' : 'background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3);'}">${problem.difficulty}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">⏱ ${problem.timeToDesign} interview</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Asked at: ${problem.companies.join(', ')}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 8px;">
          <span style="font-size: 2rem;">${problem.icon}</span>
          <h1 style="font-size: 1.9rem; font-weight: 900; letter-spacing: -0.03em;">${problem.title}</h1>
        </div>
        <p style="color: var(--text-secondary); max-width: 700px; line-height: 1.65;">${problem.overview}</p>
      </div>

      <!-- Requirements -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px;">
        <div class="card" style="padding: 20px;">
          <h3 style="font-size: 0.85rem; font-weight: 800; color: #34d399; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">✅ Functional Requirements</h3>
          <ul style="display: flex; flex-direction: column; gap: 6px; list-style: none;">
            ${problem.requirements.functional.map(r => `
              <li style="display: flex; gap: 8px; font-size: 0.88rem; color: var(--text-secondary);">
                <span style="color: #34d399; flex-shrink: 0;">→</span><span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="card" style="padding: 20px;">
          <h3 style="font-size: 0.85rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">⚡ Non-Functional Requirements</h3>
          <ul style="display: flex; flex-direction: column; gap: 6px; list-style: none;">
            ${problem.requirements.nonFunctional.map(r => `
              <li style="display: flex; gap: 8px; font-size: 0.88rem; color: var(--text-secondary);">
                <span style="color: #38bdf8; flex-shrink: 0;">→</span><span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      ${problem.estimation ? `
        <!-- Estimation -->
        <div class="card" style="padding: 20px; margin-bottom: 24px; border-color: rgba(168,85,247,0.3); background: rgba(168,85,247,0.04);">
          <h3 style="font-size: 0.85rem; font-weight: 800; color: #c084fc; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">📐 Back-of-the-Envelope Estimation</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${Object.entries(problem.estimation).map(([k, v]) => `
              <div style="font-size: 0.87rem; color: var(--text-secondary);">
                <span style="color: #c084fc; font-weight: 700; text-transform: capitalize;">${k}:</span> ${v}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Architecture -->
      <div class="card" style="padding: 24px; margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 16px;">🏗️ Architecture & Design</h3>
        <div style="line-height: 1.85; color: var(--text-secondary);">${renderMarkdownSD(problem.architecture)}</div>
      </div>

      <!-- Deep Dive Q&A -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 16px;">🧠 Deep Dive: Interviewer Follow-up Questions</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${problem.deepDive.map((qa, i) => `
            <details class="qa-accordion" style="
              background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 10px; overflow: hidden;
            ">
              <summary style="
                padding: 16px 20px; cursor: pointer; font-weight: 700; font-size: 0.92rem;
                display: flex; align-items: center; gap: 10px; list-style: none; color: var(--text-primary);
              ">
                <span style="
                  width: 24px; height: 24px; background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.3);
                  border-radius: 6px; display: flex; align-items: center; justify-content: center;
                  font-size: 0.75rem; color: #38bdf8; font-weight: 800; flex-shrink: 0;
                ">Q${i + 1}</span>
                ${qa.q}
                <span style="margin-left: auto; color: var(--text-muted); font-size: 0.8rem; font-weight: 400;">click to reveal ▾</span>
              </summary>
              <div style="
                padding: 16px 20px 18px 52px; border-top: 1px solid var(--border-subtle);
                font-size: 0.89rem; color: var(--text-secondary); line-height: 1.7;
                background: rgba(56,189,248,0.04);
              ">
                <strong style="color: #34d399;">A:</strong> ${qa.a}
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Wire sidebar initially
  buildSidebar();
  renderContent();

  container.appendChild(sidebar);
  container.appendChild(content);
  return container;
}

// Markdown renderer for system design content
function renderMarkdownSD(text) {
  if (!text) return '';
  return text
    .replace(/```sql([\s\S]*?)```/g, (_, code) => `<pre style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px; overflow-x: auto; margin: 12px 0;"><code style="font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #a5b4fc;">${code.trim()}</code></pre>`)
    .replace(/```([\s\S]*?)```/g, (_, code) => `<pre style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px; overflow-x: auto; margin: 12px 0;"><code style="font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #a5b4fc;">${code.trim()}</code></pre>`)
    .replace(/\|(.+)\|/g, (row) => {
      const cells = row.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td style="padding: 8px 14px; border: 1px solid var(--border-subtle); font-size: 0.84rem; color: var(--text-secondary);">${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>\n)+/gs, (rows) => `<div style="overflow-x: auto; margin: 12px 0;"><table style="border-collapse: collapse; width: 100%;">${rows}</table></div>`)
    .replace(/`([^`]+)`/g, '<code style="background: rgba(99,102,241,0.15); color: #a5b4fc; padding: 1px 6px; border-radius: 4px; font-size: 0.88em; font-family: Fira Code, monospace;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 700;">$1</strong>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4 style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 18px 0 8px;">$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 22px 0 10px;">$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2 style="font-size: 1.2rem; font-weight: 800; color: #38bdf8; margin: 28px 0 12px;">$1</h2>')
    .replace(/^- (.+)$/gm, '<div style="display: flex; gap: 8px; margin: 4px 0; font-size: 0.88rem; color: var(--text-secondary);"><span style="color: #38bdf8; flex-shrink: 0;">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '</p><p style="margin-top: 12px;">')
    .replace(/^(?!<)(.+)/gm, (line) => line.startsWith('<') ? line : `<p style="margin: 0;">${line}</p>`);
}
