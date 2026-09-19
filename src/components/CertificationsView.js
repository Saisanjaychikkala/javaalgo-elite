import { certificationsData } from '../data/certificationsData.js';

function renderDifficultyStars(level) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span style="color: ${i < level ? '#fbbf24' : 'rgba(255,255,255,0.12)'}; font-size: 0.85rem;">★</span>`
  ).join('');
}

function renderDomainProgress(domain) {
  const total = domain.topics.length;
  const covered = domain.topics.filter(t => t.covered).length;
  const pct = Math.round((covered / total) * 100);
  return `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">${domain.name}</div>
        <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 99px; font-weight: 700;
          background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2);">${domain.weight}</span>
      </div>
      <div style="height: 5px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; margin-bottom: 10px;">
        <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #10b981, #38bdf8); border-radius: 99px; transition: width 0.6s ease;"></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 5px;">
        ${domain.topics.map(topic => `
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.9rem;">${topic.covered ? '✅' : '⬜'}</span>
            <span style="font-size: 0.82rem; color: ${topic.covered ? 'var(--text-secondary)' : 'var(--text-muted)'};">${topic.name}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderPracticeQuestions(questions, certColor) {
  if (!questions?.length) return '';
  return `
    <div>
      <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">🎯 Practice Questions</h3>
      ${questions.map((q, qi) => {
        const qid = `cert-q-${qi}-${Math.random().toString(36).substr(2,5)}`;
        return `
          <div style="margin-bottom: 20px; padding: 20px; background: rgba(15,23,42,0.7);
            border: 1px solid ${certColor}33; border-radius: 14px;" id="${qid}">
            <div style="font-weight: 600; color: var(--text-primary); font-size: 0.92rem; line-height: 1.5; margin-bottom: 14px;">
              Q${qi+1}. ${q.q}
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${q.options.map((opt, i) => `
                <button class="cert-quiz-opt" onclick="(function(btn, qid, correct, expl) {
                  var container = document.getElementById(qid);
                  container.querySelectorAll('.cert-quiz-opt').forEach(function(b, j) {
                    b.disabled = true;
                    b.style.cursor = 'default';
                    if (j === correct) { b.style.background = 'rgba(16,185,129,0.2)'; b.style.borderColor = '#34d399'; b.style.color = '#34d399'; }
                    else if (b === btn && j !== correct) { b.style.background = 'rgba(244,63,94,0.15)'; b.style.borderColor = '#f43f5e'; b.style.color = '#f87171'; }
                  });
                  var expEl = container.querySelector('.cert-explanation');
                  if (expEl) expEl.style.display = 'block';
                })(this, '${qid}', ${q.correct}, '')"
                style="padding: 11px 14px; text-align: left; background: rgba(255,255,255,0.03);
                  border: 1px solid var(--border-subtle); border-radius: 8px; color: var(--text-secondary);
                  cursor: pointer; font-size: 0.85rem; transition: all 0.15s ease; font-family: inherit; line-height: 1.4;">
                  <strong style="color: ${certColor}; margin-right: 8px;">${String.fromCharCode(65+i)}.</strong> ${opt}
                </button>`).join('')}
            </div>
            <div class="cert-explanation" style="display: none; margin-top: 14px; padding: 14px 16px;
              background: rgba(56,189,248,0.07); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px;
              color: var(--text-secondary); font-size: 0.85rem; line-height: 1.65;">
              <strong style="color: #38bdf8;">💡 Explanation: </strong>${q.explanation}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderStudySchedule(schedule, certColor) {
  if (!schedule?.length) return '';
  return `
    <div style="margin-bottom: 28px;">
      <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">📅 Study Schedule</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${schedule.map(week => `
          <div style="padding: 14px 18px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle);
            border-radius: 12px; border-left: 3px solid ${certColor};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-weight: 800; color: ${certColor}; font-size: 0.85rem; font-family: var(--font-mono);">Week ${week.week}</span>
              <span style="color: var(--text-secondary); font-weight: 600; font-size: 0.82rem;">${week.focus}</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${week.tasks.map(task => `
                <span style="font-size: 0.75rem; padding: 3px 10px; border-radius: 99px;
                  background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); color: var(--text-muted);">
                  ✓ ${task}
                </span>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

export function renderCertificationsView() {
  const container = document.createElement('div');
  container.style.cssText = 'min-height: 100%; padding-bottom: 60px;';

  let activeCertId = certificationsData.certs[0].id;

  const wrapper = document.createElement('div');
  wrapper.className = 'ds-foundations-layout';

  // ── SIDEBAR ────────────────────────────────────────────────
  const sidebar = document.createElement('nav');
  sidebar.className = 'ds-foundations-sidebar';

  function buildSidebar() {
    sidebar.innerHTML = `
      <div style="padding: 0 16px 12px; font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Certifications</div>
      ${certificationsData.certs.map(cert => `
        <div class="ds-sidebar-item ${cert.id === activeCertId ? 'active' : ''}" data-id="${cert.id}" style="
          display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer;
          transition: all 0.15s ease; border-left: 3px solid transparent;
          ${cert.id === activeCertId ? `background: ${cert.color}1a; border-left-color: ${cert.color}; color: ${cert.color};` : 'color: var(--text-secondary);'}">
          <span style="font-size: 1.3rem; flex-shrink: 0;">${cert.icon}</span>
          <div style="min-width: 0;">
            <div style="font-weight: 700; font-size: 0.82rem; line-height: 1.3; overflow: hidden; text-overflow: ellipsis;">${cert.title.split(':')[0]}</div>
            <div style="font-size: 0.68rem; opacity: 0.7; margin-top: 2px;">${cert.vendor} · ${cert.level}</div>
          </div>
        </div>`).join('')}
      <div style="padding: 12px 16px 4px; font-size: 0.68rem; color: rgba(255,255,255,0.2); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 8px;">Coming Soon 🔒</div>
      ${certificationsData.upcomingCerts.map(cert => `
        <div style="display: flex; align-items: center; gap: 10px; padding: 9px 16px; cursor: not-allowed; opacity: 0.4; color: var(--text-muted);">
          <span style="font-size: 1.1rem;">${cert.icon}</span>
          <div>
            <div style="font-weight: 600; font-size: 0.8rem;">${cert.title}</div>
            <div style="font-size: 0.67rem; opacity: 0.7;">ETA: ${cert.eta}</div>
          </div>
        </div>`).join('')}
    `;

    sidebar.querySelectorAll('.ds-sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        activeCertId = item.dataset.id;
        buildSidebar();
        renderContent();
        certContent.scrollTop = 0;
      });
    });
  }

  // ── CONTENT ────────────────────────────────────────────────
  const certContent = document.createElement('div');
  certContent.className = 'ds-foundations-content';

  function renderContent() {
    const cert = certificationsData.certs.find(c => c.id === activeCertId);
    if (!cert) return;

    const totalTopics = cert.domains.reduce((s, d) => s + d.topics.length, 0);
    const coveredTopics = cert.domains.reduce((s, d) => s + d.topics.filter(t => t.covered).length, 0);
    const overallPct = Math.round((coveredTopics / totalTopics) * 100);

    certContent.innerHTML = `
      <!-- Cert Header Card -->
      <div style="padding: 24px; background: linear-gradient(135deg, ${cert.color}18, ${cert.color}08);
        border: 1px solid ${cert.color}33; border-radius: 18px; margin-bottom: 28px;">
        <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
          <div style="font-size: 3rem; line-height: 1; flex-shrink: 0;">${cert.icon}</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 0.72rem; font-weight: 800; color: ${cert.color}; text-transform: uppercase;
              letter-spacing: 0.1em; margin-bottom: 6px;">${cert.vendor}</div>
            <h1 style="font-size: 1.5rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 6px; line-height: 1.2;">${cert.title}</h1>
            <div style="display: flex; gap: 16px; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-muted);">
              <span>📝 ${cert.examFormat}</span>
              <span>🎯 Pass: ${cert.passingScore}</span>
              <span>💰 ${cert.cost}</span>
            </div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 12px; margin-bottom: 16px;">
          ${[
            { label: 'Difficulty', val: renderDifficultyStars(cert.difficulty) },
            { label: 'Prep Time', val: `${cert.prepWeeks} weeks` },
            { label: 'Valid For', val: `${cert.validityYears} years` },
            { label: 'Level', val: cert.level },
          ].map(stat => `
            <div style="padding: 12px; background: rgba(0,0,0,0.2); border-radius: 10px; text-align: center;">
              <div style="font-size: 0.95rem; margin-bottom: 4px;">${stat.val}</div>
              <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">${stat.label}</div>
            </div>`).join('')}
        </div>
        <!-- Overall readiness bar -->
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.8rem;">
            <span style="color: var(--text-muted); font-weight: 700;">Topics Covered on JavaAlgo Elite</span>
            <span style="color: ${cert.color}; font-weight: 800;">${coveredTopics}/${totalTopics} (${overallPct}%)</span>
          </div>
          <div style="height: 8px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
            <div style="height: 100%; width: ${overallPct}%; background: linear-gradient(90deg, ${cert.color}, ${cert.color}aa); border-radius: 99px; transition: width 0.8s ease;"></div>
          </div>
        </div>
      </div>

      <!-- Domains -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px;">📋 Exam Domains</h2>
        ${cert.domains.map(d => renderDomainProgress(d)).join('')}
      </div>

      <!-- Study Schedule -->
      ${renderStudySchedule(cert.studySchedule, cert.color)}

      <!-- Practice Questions -->
      ${renderPracticeQuestions(cert.practiceQuestions, cert.color)}
    `;
  }

  buildSidebar();
  renderContent();
  wrapper.appendChild(sidebar);
  wrapper.appendChild(certContent);
  container.appendChild(wrapper);
  return container;
}
