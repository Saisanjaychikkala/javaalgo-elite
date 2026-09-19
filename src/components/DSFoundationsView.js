import { dsFoundations } from '../data/dsFoundations.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';
import { renderArrayVisualizer } from './InteractiveDS/ArrayVisualizer.js';
import { renderLinkedListVisualizer } from './InteractiveDS/LinkedListVisualizer.js';
import { renderStackVisualizer } from './InteractiveDS/StackVisualizer.js';
import { renderQueueVisualizer } from './InteractiveDS/QueueVisualizer.js';
import { renderHashMapVisualizer } from './InteractiveDS/HashMapVisualizer.js';
import { renderTreeVisualizer } from './InteractiveDS/TreeVisualizer.js';
import { renderHeapVisualizer } from './InteractiveDS/HeapVisualizer.js';
import { renderGraphVisualizer } from './InteractiveDS/GraphVisualizer.js';

const visualizerMap = {
  'arrays': renderArrayVisualizer,
  'linked-list': renderLinkedListVisualizer,
  'stack': renderStackVisualizer,
  'queue': renderQueueVisualizer,
  'hashmap': renderHashMapVisualizer,
  'binary-tree': renderTreeVisualizer,
  'bst': (c) => renderTreeVisualizer(c, true),
  'heap': renderHeapVisualizer,
  'graph': renderGraphVisualizer
};

export function renderDSFoundationsView() {
  const container = document.createElement('div');
  container.className = 'ds-foundations-layout';

  let activeId = dsFoundations[0].id;

  // SIDEBAR
  const sidebar = document.createElement('nav');
  sidebar.className = 'ds-foundations-sidebar';
  sidebar.innerHTML = `
    <div style="padding: 0 16px 12px; font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Data Structures</div>
    ${dsFoundations.map(ds => `
      <div class="ds-sidebar-item ${ds.id === activeId ? 'active' : ''}" data-id="${ds.id}" style="
        display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer;
        transition: all 0.15s ease; border-left: 3px solid transparent;
        ${ds.id === activeId ? `background: rgba(56,189,248,0.1); border-left-color: ${ds.color}; color: ${ds.color};` : 'color: var(--text-secondary);'}
      ">
        <span style="font-size: 1.15rem;">${ds.emoji}</span>
        <div>
          <div style="font-weight: 600; font-size: 0.88rem;">${ds.title}</div>
          <div style="font-size: 0.7rem; opacity: 0.7; margin-top: 1px;">${ds.category} · ${ds.difficulty}</div>
        </div>
      </div>
    `).join('')}
  `;

  // CONTENT AREA
  const content = document.createElement('div');
  content.className = 'ds-foundations-content';

  function renderDSTopic(id) {
    const ds = dsFoundations.find(d => d.id === id);
    if (!ds) return;

    content.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom: 32px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 10px;">
          <div style="
            width: 52px; height: 52px; border-radius: 14px; font-size: 1.6rem;
            display: flex; align-items: center; justify-content: center;
            background: ${ds.color}22; border: 1px solid ${ds.color}44;
          ">${ds.emoji}</div>
          <div>
            <h1 style="font-size: 2rem; font-weight: 900; letter-spacing: -0.03em;">${ds.title}</h1>
            <p style="color: var(--text-muted); margin-top: 2px; max-width: 600px; font-size: 0.95rem; line-height: 1.5;">${ds.tagline}</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge" style="background: ${ds.color}22; color: ${ds.color}; border: 1px solid ${ds.color}44;">${ds.category}</span>
          <span class="badge badge-${ds.difficulty.toLowerCase()}">${ds.difficulty}</span>
        </div>
      </div>

      <!-- Sections will be rendered here -->
      <div id="ds-sections-container"></div>

      <!-- Interactive Visualizer -->
      <div style="margin-top: 36px;">
        <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          🎬 Interactive Visualizer
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 20px;">Play with it!</span>
        </h2>
        <div id="ds-visualizer-container" class="card" style="padding: 24px;"></div>
      </div>
    `;

    // Render sections
    const sectionsContainer = content.querySelector('#ds-sections-container');
    ds.sections.forEach(section => {
      const sectionEl = document.createElement('div');
      sectionEl.style.cssText = 'margin-bottom: 32px;';

      if (section.type === 'concept') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px; color: var(--text-primary);">${section.title}</h2>
          <div class="card" style="padding: 24px; line-height: 1.75; color: var(--text-secondary);">${renderMarkdown(section.content)}</div>
        `;
      }

      else if (section.type === 'memory-model') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${section.title}</h2>
          <div class="card" style="padding: 24px; overflow-x: auto;">
            <div style="display: flex; flex-direction: column; gap: 0; min-width: 400px;">
              ${section.items.map(item => `
                <div style="display: flex; align-items: center;">
                  <div style="width: 80px; flex-shrink: 0; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-align: right; padding-right: 12px;">${item.label}</div>
                  <div style="display: flex; flex: 1;">
                    ${item.values.map(v => `
                      <div style="
                        flex: 1; padding: 10px 4px; text-align: center; font-family: 'Fira Code', monospace; font-size: 0.85rem;
                        border: 1px solid var(--border-subtle); font-weight: 600; color: var(--text-primary);
                        background: rgba(15,23,42,0.6);
                      ">${v}</div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">💡 ${section.note}</p>
          </div>
        `;
      }

      else if (section.type === 'operations') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${section.title}</h2>
          <div class="card" style="padding: 0; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: rgba(56,189,248,0.08); border-bottom: 1px solid var(--border-subtle);">
                  <th style="text-align: left; padding: 12px 16px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Operation</th>
                  <th style="text-align: center; padding: 12px 16px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Time</th>
                  <th style="text-align: center; padding: 12px 16px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Space</th>
                  <th style="text-align: left; padding: 12px 16px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Why?</th>
                </tr>
              </thead>
              <tbody>
                ${section.operations.map((op, i) => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); ${i % 2 === 0 ? 'background: rgba(15,23,42,0.3);' : ''}">
                    <td style="padding: 12px 16px; font-family: 'Fira Code', monospace; font-size: 0.85rem; color: #c084fc; font-weight: 600;">${op.op}</td>
                    <td style="padding: 12px 16px; text-align: center;">
                      <span style="
                        display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; font-family: 'Fira Code', monospace;
                        ${op.time.includes('1)') ? 'background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);' :
                          op.time.includes('log') ? 'background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);' :
                          'background: rgba(249,115,22,0.15); color: #f97316; border: 1px solid rgba(249,115,22,0.3);'}
                      ">${op.time}</span>
                    </td>
                    <td style="padding: 12px 16px; text-align: center; font-family: 'Fira Code', monospace; font-size: 0.82rem; color: var(--text-muted);">${op.space}</td>
                    <td style="padding: 12px 16px; font-size: 0.84rem; color: var(--text-secondary);">${op.why}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      else if (section.type === 'when-to-use') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${section.title}</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="card" style="padding: 20px; border-color: rgba(16,185,129,0.3);">
              <h4 style="color: #34d399; margin-bottom: 12px; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">✅ Use Arrays When</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                ${section.use.map(u => `<li style="color: var(--text-secondary); font-size: 0.88rem; padding-left: 0; display: flex; gap: 8px;"><span style="color: #34d399; flex-shrink: 0;">→</span><span>${u}</span></li>`).join('')}
              </ul>
            </div>
            <div class="card" style="padding: 20px; border-color: rgba(244,63,94,0.3);">
              <h4 style="color: #f43f5e; margin-bottom: 12px; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">❌ Avoid Arrays When</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                ${section.avoid.map(a => `<li style="color: var(--text-secondary); font-size: 0.88rem; padding-left: 0; display: flex; gap: 8px;"><span style="color: #f43f5e; flex-shrink: 0;">→</span><span>${a}</span></li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }

      else if (section.type === 'java-code') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${section.title}</h2>
          <div class="code-block">
            <div class="code-header">
              <span class="code-lang-badge">Java</span>
              <button class="btn-icon" data-code="${encodeURIComponent(section.code)}" title="Copy code" style="padding: 4px 10px; font-size: 0.75rem; background: rgba(255,255,255,0.06); border-radius: 6px; border: none; color: var(--text-muted); cursor: pointer;">Copy</button>
            </div>
            <pre style="margin: 0;"><code>${highlightJava(section.code)}</code></pre>
          </div>
        `;
        // Wire copy button
        const copyBtn = sectionEl.querySelector('[data-code]');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(decodeURIComponent(copyBtn.dataset.code)).then(() => {
              copyBtn.textContent = 'Copied!';
              setTimeout(() => copyBtn.textContent = 'Copy', 2000);
            });
          });
        }
      }

      else if (section.type === 'gotchas') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${section.title}</h2>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${section.items.map(item => `
              <div class="card" style="padding: 16px 20px; border-left: 3px solid #f97316; background: rgba(249,115,22,0.06);">
                <div style="font-weight: 700; color: #f97316; margin-bottom: 4px; font-size: 0.9rem;">⚠️ ${item.title}</div>
                <div style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        `;
      }

      else if (section.type === 'interview-patterns') {
        sectionEl.innerHTML = `
          <h2 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">${section.title}</h2>
          <div class="card" style="padding: 20px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${section.patterns.map(p => `
                <div style="display: flex; align-items: flex-start; gap: 10px; padding: 8px 10px; background: rgba(56,189,248,0.06); border-radius: 8px; border: 1px solid rgba(56,189,248,0.15);">
                  <span style="color: #38bdf8; flex-shrink: 0; margin-top: 1px;">🎯</span>
                  <span style="font-size: 0.88rem; color: var(--text-secondary);">${p}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      sectionsContainer.appendChild(sectionEl);
    });

    // Render interactive visualizer
    const vizContainer = content.querySelector('#ds-visualizer-container');
    const vizFn = visualizerMap[id];
    if (vizFn && vizContainer) {
      vizFn(vizContainer);
    } else if (vizContainer) {
      vizContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🚧</div>
          <div>Visualizer for this topic coming soon!</div>
        </div>
      `;
    }
  }

  // Render initial topic
  renderDSTopic(activeId);

  // Sidebar click events
  sidebar.addEventListener('click', e => {
    const item = e.target.closest('.ds-sidebar-item');
    if (!item) return;

    const id = item.dataset.id;
    activeId = id;

    // Update active states in sidebar
    sidebar.querySelectorAll('.ds-sidebar-item').forEach(el => {
      const ds = dsFoundations.find(d => d.id === el.dataset.id);
      const isActive = el.dataset.id === id;
      el.style.background = isActive ? 'rgba(56,189,248,0.1)' : '';
      el.style.borderLeftColor = isActive ? ds.color : 'transparent';
      el.style.color = isActive ? ds.color : 'var(--text-secondary)';
    });

    content.scrollTop = 0;
    renderDSTopic(id);
  });

  container.appendChild(sidebar);
  container.appendChild(content);
  return container;
}

// Simple inline markdown to HTML (bold, code, newlines, lists)
function renderMarkdown(text) {
  return text
    .replace(/```java([\s\S]*?)```/g, (_, code) => `<pre style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px; overflow-x: auto; margin: 12px 0;"><code style="font-family: 'Fira Code', monospace; font-size: 0.82rem; color: #a5b4fc;">${code.trim()}</code></pre>`)
    .replace(/`([^`]+)`/g, '<code style="background: rgba(99,102,241,0.15); color: #a5b4fc; padding: 1px 6px; border-radius: 4px; font-size: 0.9em; font-family: Fira Code, monospace;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 700;">$1</strong>')
    .replace(/\n\n/g, '</p><p style="margin-top: 14px;">')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}
