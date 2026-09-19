import { aiUniverseData } from '../data/aiUniverseData.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';

// ─── Syntax highlighter for Python (use for AI/ML code) ──────
function highlightPython(code) {
  if (!code) return '';
  const keywords = ['import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif',
    'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'async',
    'await', 'with', 'as', 'try', 'except', 'finally', 'raise', 'lambda', 'print'];
  let highlighted = code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(#.*)$/gm, '<span style="color:#6a9955;">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|"""[\s\S]*?"""|\'\'\'[\s\S]*?\'\'\')/g,
      '<span style="color:#ce9178;">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#b5cea8;">$1</span>');
  keywords.forEach(kw => {
    highlighted = highlighted.replace(new RegExp(`\\b(${kw})\\b`, 'g'),
      '<span style="color:#569cd6;">$1</span>');
  });
  return highlighted;
}

function renderCodeBlock(code) {
  if (!code) return '';
  const lang = code.language || 'python';
  const highlighted = lang === 'python' ? highlightPython(code.content) : highlightJava(code.content);
  return `
    <div style="margin: 20px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 16px;
        background: rgba(15,23,42,0.9); border-radius: 10px 10px 0 0; border: 1px solid rgba(255,255,255,0.08); border-bottom: none;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="display: flex; gap: 5px;">
            <div style="width:10px;height:10px;border-radius:50%;background:#f43f5e;"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:#fbbf24;"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:#34d399;"></div>
          </div>
          <span style="color: var(--text-muted); font-size: 0.78rem; font-family: var(--font-mono);">${code.label || code.language}</span>
        </div>
        <span style="font-size: 0.72rem; color: var(--text-muted); padding: 2px 8px; background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.2); border-radius: 4px; font-weight: 700;">${(code.language || 'python').toUpperCase()}</span>
      </div>
      <pre style="margin: 0; padding: 20px; background: rgba(10,14,23,0.95); border: 1px solid rgba(255,255,255,0.08);
        border-top: none; border-radius: 0 0 10px 10px; overflow-x: auto; font-family: var(--font-mono);
        font-size: 0.83rem; line-height: 1.7; -webkit-overflow-scrolling: touch;"><code>${highlighted}</code></pre>
    </div>`;
}

function renderSection(section, topicColor) {
  switch (section.type) {

    case 'story':
      return `
        <div style="margin-bottom: 32px; padding: 24px; background: rgba(56,189,248,0.05);
          border: 1px solid rgba(56,189,248,0.15); border-radius: 14px; border-left: 4px solid ${topicColor};">
          <div style="font-size: 0.75rem; font-weight: 800; color: ${topicColor}; text-transform: uppercase;
            letter-spacing: 0.1em; margin-bottom: 10px;">📖 The Story</div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">${section.title}</h3>
          <div style="color: var(--text-secondary); line-height: 1.8; white-space: pre-line; font-size: 0.95rem;">${
            section.content.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary);">$1</strong>')
              .replace(/\`([^`]+)\`/g, '<code style="background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.88em;color:#38bdf8;">$1</code>')
          }</div>
        </div>`;

    case 'concept':
      const hasTable = section.table;
      const hasCode = section.code;
      return `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;
            display: flex; align-items: center; gap: 8px;">
            <span style="width:3px; height:1.2em; background:${topicColor}; border-radius:2px; display:inline-block;"></span>
            ${section.title}
          </h3>
          ${section.content ? `<div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.95rem; white-space: pre-line; margin-bottom: 16px;">${
            section.content
              .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary);">$1</strong>')
              .replace(/\`([^`]+)\`/g, '<code style="background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.88em;color:#38bdf8;">$1</code>')
          }</div>` : ''}
          ${hasTable ? renderTable(section.table) : ''}
          ${hasCode ? renderCodeBlock(section.code) : ''}
          ${section.items ? renderConceptItems(section.items, topicColor) : ''}
        </div>`;

    case 'realworld':
      return `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">${section.title}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
            ${section.examples.map(ex => `
              <div style="padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);
                border-radius: 12px; transition: all 0.2s ease;" class="ai-realworld-card">
                <div style="font-size: 1.8rem; margin-bottom: 8px;">${ex.icon}</div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem; margin-bottom: 6px;">${ex.name}</div>
                <div style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5;">${ex.how}</div>
              </div>`).join('')}
          </div>
        </div>`;

    case 'patterns':
      return `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">${section.title}</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${section.items.map((item, i) => `
              <div style="border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden;">
                <div style="padding: 14px 18px; background: rgba(${i%2===0?'56,189,248':'168,85,247'},0.07);
                  border-bottom: 1px solid var(--border-subtle); cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
                  onclick="this.parentElement.querySelector('.pattern-body').classList.toggle('open')">
                  <div>
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${i+1}. ${item.name}</div>
                    <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 2px;">${item.desc}</div>
                  </div>
                  <span style="color: var(--text-muted); font-size: 1.2rem; transition: transform 0.2s ease;" class="pattern-chevron">▼</span>
                </div>
                <div class="pattern-body" style="padding: 0; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                  <div style="padding: 16px 18px;">
                    <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Example</div>
                    <pre style="background: rgba(10,14,23,0.8); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px;
                      padding: 14px; font-family: var(--font-mono); font-size: 0.82rem; color: #a5b4fc; overflow-x: auto;
                      white-space: pre-wrap; margin-bottom: 12px; -webkit-overflow-scrolling: touch;">${item.example}</pre>
                    <div style="padding: 10px 14px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
                      border-radius: 8px; font-size: 0.83rem; color: #34d399;">
                      ✅ <strong>Result:</strong> ${item.output}
                    </div>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>`;

    case 'pipeline':
      return `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 20px;">${section.title}</h3>
          ${section.steps.map((step, i) => `
            <div style="display: flex; gap: 0; margin-bottom: 0;">
              <div style="display: flex; flex-direction: column; align-items: center; margin-right: 16px; flex-shrink: 0;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: ${topicColor}22;
                  border: 2px solid ${topicColor}; display: flex; align-items: center; justify-content: center;
                  font-weight: 900; color: ${topicColor}; font-size: 0.9rem; font-family: var(--font-mono);">${step.step}</div>
                ${i < section.steps.length - 1 ? `<div style="width: 2px; flex: 1; min-height: 20px; background: ${topicColor}44; margin: 4px 0;"></div>` : ''}
              </div>
              <div style="flex: 1; padding-bottom: ${i < section.steps.length - 1 ? '24px' : '0'};">
                <div style="font-size: 0.7rem; font-weight: 800; color: ${topicColor}; text-transform: uppercase;
                  letter-spacing: 0.08em; margin-bottom: 4px;">${step.phase}</div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 1rem; margin-bottom: 8px;">${step.title}</div>
                <div style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; margin-bottom: 12px;">${step.detail}</div>
                ${step.code ? renderCodeBlock({ language: 'python', label: `Step ${step.step} code`, content: step.code }) : ''}
              </div>
            </div>`).join('')}
        </div>`;

    case 'code':
      return `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">${section.title}</h3>
          ${renderCodeBlock(section.code)}
        </div>`;

    case 'quiz':
      return renderInlineQuiz(section.questions, topicColor);

    default:
      return '';
  }
}

function renderTable(table) {
  if (!table) return '';
  return `
    <div style="overflow-x: auto; border-radius: 10px; border: 1px solid var(--border-subtle); margin: 16px 0; -webkit-overflow-scrolling: touch;">
      <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="background: rgba(56,189,248,0.08);">
            ${table.headers.map(h => `<th style="padding: 10px 14px; text-align: left; color: #38bdf8; font-weight: 700; white-space: nowrap; border-bottom: 1px solid var(--border-subtle);">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${table.rows.map((row, i) => `
            <tr style="${i % 2 === 0 ? '' : 'background: rgba(255,255,255,0.02);'}">
              ${row.map(cell => `<td style="padding: 10px 14px; color: var(--text-secondary); border-bottom: 1px solid var(--border-subtle); min-width: 100px;">${cell.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')}</td>`).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderConceptItems(items, topicColor) {
  if (!items || !items.length) return '';
  return `
    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
      ${items.map(item => `
        <div style="padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle);
          border-radius: 10px; border-left: 3px solid ${topicColor};">
          <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem; margin-bottom: 4px;">${item.title}</div>
          <div style="color: var(--text-muted); font-size: 0.83rem; line-height: 1.6;">${item.desc}</div>
          ${item.metric ? `<div style="margin-top: 8px; font-size: 0.75rem; font-weight: 700; color: ${topicColor}; font-family: var(--font-mono);">📊 ${item.metric}</div>` : ''}
        </div>`).join('')}
    </div>`;
}

function renderInlineQuiz(questions, topicColor) {
  if (!questions?.length) return '';
  const q = questions[0];
  const id = `quiz-${Math.random().toString(36).substr(2, 6)}`;
  return `
    <div style="margin-bottom: 32px; padding: 20px; background: rgba(15,23,42,0.7); border: 1px solid ${topicColor}33;
      border-radius: 14px;" id="${id}">
      <div style="font-size: 0.75rem; font-weight: 800; color: ${topicColor}; text-transform: uppercase;
        letter-spacing: 0.1em; margin-bottom: 12px;">🎯 Check Your Understanding</div>
      <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem; line-height: 1.5; margin-bottom: 16px;">${q.q}</div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${q.options.map((opt, i) => `
          <button onclick="(function(btn, id, correct, explanation) {
            var container = document.getElementById(id);
            container.querySelectorAll('.quiz-opt').forEach(function(b, j) {
              b.disabled = true;
              if (j === correct) { b.style.background = 'rgba(16,185,129,0.2)'; b.style.borderColor = '#34d399'; b.style.color = '#34d399'; }
              else if (b === btn && j !== correct) { b.style.background = 'rgba(244,63,94,0.15)'; b.style.borderColor = '#f43f5e'; b.style.color = '#f87171'; }
            });
            var expEl = container.querySelector('.quiz-explanation');
            if (expEl) { expEl.style.display = 'block'; }
          })(this, '${id}', ${q.correct}, '')"
          class="quiz-opt" style="padding: 11px 14px; text-align: left; background: rgba(255,255,255,0.03);
            border: 1px solid var(--border-subtle); border-radius: 8px; color: var(--text-secondary);
            cursor: pointer; font-size: 0.88rem; transition: all 0.15s ease; line-height: 1.4; font-family: inherit;">
            <strong style="color: ${topicColor}; margin-right: 8px;">${String.fromCharCode(65+i)}.</strong> ${opt}
          </button>`).join('')}
      </div>
      <div class="quiz-explanation" style="display: none; margin-top: 14px; padding: 14px 16px;
        background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px;
        color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6;">
        <strong style="color: #38bdf8;">💡 Explanation: </strong>${q.explanation}
      </div>
    </div>`;
}

export function renderAIUniverseView() {
  const container = document.createElement('div');
  container.className = 'ds-foundations-layout';

  let activeId = aiUniverseData.topics[0].id;

  // ── SIDEBAR ──────────────────────────────────────────────
  const sidebar = document.createElement('nav');
  sidebar.className = 'ds-foundations-sidebar';

  function buildSidebar() {
    sidebar.innerHTML = `
      <div style="padding: 0 16px 8px; font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">AI Universe</div>
      <div style="padding: 8px 16px 12px;">
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px;">${aiUniverseData.topics.length} Topics · ~${aiUniverseData.estimatedHours}hrs</div>
        <div style="height: 4px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
          <div style="height: 100%; width: 33%; background: linear-gradient(90deg, #818cf8, #c084fc); border-radius: 99px;"></div>
        </div>
      </div>
      ${aiUniverseData.topics.map(topic => `
        <div class="ds-sidebar-item ${topic.id === activeId ? 'active' : ''}" data-id="${topic.id}" style="
          display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer;
          transition: all 0.15s ease; border-left: 3px solid transparent;
          ${topic.id === activeId ? `background: rgba(129,140,248,0.1); border-left-color: ${topic.color}; color: ${topic.color};` : 'color: var(--text-secondary);'}">
          <span style="font-size: 1.2rem; flex-shrink: 0;">${topic.icon}</span>
          <div style="min-width: 0;">
            <div style="font-weight: 600; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${topic.title}</div>
            <div style="font-size: 0.68rem; opacity: 0.7; margin-top: 1px;">${topic.difficulty} · ${topic.estimatedMins}min</div>
          </div>
        </div>`).join('')}
    `;

    sidebar.querySelectorAll('.ds-sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        activeId = item.dataset.id;
        buildSidebar();
        renderContent();
        content.scrollTop = 0;
      });
    });
  }

  // ── CONTENT AREA ─────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'ds-foundations-content';

  function renderContent() {
    const topic = aiUniverseData.topics.find(t => t.id === activeId);
    if (!topic) return;

    const topicIdx = aiUniverseData.topics.findIndex(t => t.id === activeId);
    const prevTopic = topicIdx > 0 ? aiUniverseData.topics[topicIdx - 1] : null;
    const nextTopic = topicIdx < aiUniverseData.topics.length - 1 ? aiUniverseData.topics[topicIdx + 1] : null;

    content.innerHTML = `
      <!-- Topic Header -->
      <div style="margin-bottom: 28px;">
        <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
          <div style="width: 56px; height: 56px; border-radius: 14px; font-size: 1.8rem;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            background: ${topic.color}22; border: 1px solid ${topic.color}44;">${topic.icon}</div>
          <div style="flex: 1; min-width: 0;">
            <h1 style="font-size: 1.75rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 6px; line-height: 1.2;">${topic.title}</h1>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; max-width: 700px;">${topic.hook}</p>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
          <span style="font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 99px;
            background: ${topic.color}22; color: ${topic.color}; border: 1px solid ${topic.color}44;">${topic.difficulty}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); padding: 3px 10px; border-radius: 99px;
            background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle);">⏱️ ${topic.estimatedMins} min read</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${topicIdx + 1} / ${aiUniverseData.topics.length}</span>
        </div>
      </div>

      <!-- Topic Content Sections -->
      <div id="ai-content-sections">
        ${topic.sections.map(section => renderSection(section, topic.color)).join('')}
      </div>

      <!-- Navigation Between Topics -->
      <div style="display: flex; gap: 12px; margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
        ${prevTopic ? `
          <button onclick="void(0)" data-nav="${prevTopic.id}" class="ai-topic-nav-btn" style="flex: 1; min-width: 160px;
            padding: 14px 16px; background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle);
            border-radius: 12px; cursor: pointer; text-align: left; transition: all 0.2s ease; color: var(--text-secondary);">
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px;">← Previous</div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.88rem;">${prevTopic.icon} ${prevTopic.title}</div>
          </button>` : '<div style="flex:1"></div>'}
        ${nextTopic ? `
          <button onclick="void(0)" data-nav="${nextTopic.id}" class="ai-topic-nav-btn" style="flex: 1; min-width: 160px;
            padding: 14px 16px; background: rgba(129,140,248,0.08); border: 1px solid rgba(129,140,248,0.25);
            border-radius: 12px; cursor: pointer; text-align: right; transition: all 0.2s ease; color: var(--text-secondary);">
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px;">Next →</div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.88rem;">${nextTopic.icon} ${nextTopic.title}</div>
          </button>` : ''}
      </div>
    `;

    // Prev/Next navigation
    content.querySelectorAll('.ai-topic-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeId = btn.dataset.nav;
        buildSidebar();
        renderContent();
        content.scrollTop = 0;
      });
    });

    // Pattern accordion open/close
    content.querySelectorAll('.pattern-body').forEach(body => {
      const chevron = body.previousElementSibling?.querySelector('.pattern-chevron');
      body.parentElement.querySelector('[onclick]').addEventListener('click', () => {
        const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px' && body.classList.contains('open');
        body.classList.toggle('open');
        if (!isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
          body.style.padding = '';
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
          body.style.maxHeight = '0px';
          if (chevron) chevron.style.transform = '';
        }
      }, { once: false });
    });
  }

  // Initialize
  buildSidebar();
  renderContent();
  container.appendChild(sidebar);
  container.appendChild(content);
  return container;
}
