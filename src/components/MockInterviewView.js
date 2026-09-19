// ============================================================
// MOCK INTERVIEW ROOM COMPONENT — JavaAlgo Elite
// Interactive scenario-based interview simulator
// ============================================================

import { mockInterviewData } from '../data/interviewData.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';

export function renderMockInterviewView() {
  const container = document.createElement('div');
  container.className = 'ds-foundations-layout';
  container.style.cssText = 'min-height: 100%; padding-bottom: 60px;';

  let activeTrackId = 'coding';
  let activeScenarioId = mockInterviewData.tracks[0].scenarios[0].id;
  let userChoices = {}; // { [stepIdx]: chosenOptionIdx }

  // ── SIDEBAR ────────────────────────────────────────────────
  const sidebar = document.createElement('nav');
  sidebar.className = 'ds-foundations-sidebar';

  function buildSidebar() {
    sidebar.innerHTML = `
      <div style="padding: 0 16px 10px; font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">
        Mock Interview Room
      </div>
      
      <!-- Track Switchers -->
      <div style="padding: 0 12px 14px; display: flex; flex-direction: column; gap: 4px;">
        ${mockInterviewData.tracks.map(track => `
          <button class="track-tab-btn" data-track="${track.id}" style="
            padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-align: left; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease;
            ${track.id === activeTrackId ? `background: ${track.color}22; color: ${track.color}; border-color: ${track.color}44;` : 'background: rgba(255,255,255,0.02); color: var(--text-muted);'}">
            ${track.icon} ${track.name}
          </button>`).join('')}
      </div>

      <div style="padding: 10px 16px 6px; font-size: 0.68rem; color: var(--text-muted); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; border-top: 1px solid var(--border-subtle);">
        Available Scenarios
      </div>

      <!-- Scenarios List -->
      ${getCurrentTrack().scenarios.map(sc => `
        <div class="ds-sidebar-item ${sc.id === activeScenarioId ? 'active' : ''}" data-scid="${sc.id}" style="
          display: flex; flex-direction: column; gap: 2px; padding: 10px 16px; cursor: pointer;
          transition: all 0.15s ease; border-left: 3px solid transparent;
          ${sc.id === activeScenarioId ? `background: rgba(56,189,248,0.1); border-left-color: #38bdf8; color: #38bdf8;` : 'color: var(--text-secondary);'}">
          <div style="font-weight: 700; font-size: 0.84rem; line-height: 1.3;">${sc.title}</div>
          <div style="font-size: 0.68rem; opacity: 0.7;">${sc.company} • ${sc.level}</div>
        </div>`).join('')}
    `;

    sidebar.querySelectorAll('.track-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTrackId = btn.dataset.track;
        const currentTrack = getCurrentTrack();
        activeScenarioId = currentTrack.scenarios[0].id;
        userChoices = {};
        buildSidebar();
        renderContent();
      });
    });

    sidebar.querySelectorAll('.ds-sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        activeScenarioId = item.dataset.scid;
        userChoices = {};
        buildSidebar();
        renderContent();
        content.scrollTop = 0;
      });
    });
  }

  function getCurrentTrack() {
    return mockInterviewData.tracks.find(t => t.id === activeTrackId) || mockInterviewData.tracks[0];
  }

  function getCurrentScenario() {
    const track = getCurrentTrack();
    return track.scenarios.find(s => s.id === activeScenarioId) || track.scenarios[0];
  }

  // ── CONTENT AREA ─────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'ds-foundations-content';

  function renderContent() {
    const sc = getCurrentScenario();
    const track = getCurrentTrack();

    content.innerHTML = `
      <!-- Header Banner -->
      <div style="padding: 24px; background: linear-gradient(135deg, ${track.color}15, rgba(15,23,42,0.85));
        border: 1px solid ${track.color}33; border-radius: 18px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: 1.8rem;">${track.icon}</span>
            <div>
              <span style="font-size: 0.72rem; font-weight: 800; color: ${track.color}; text-transform: uppercase; letter-spacing: 0.08em;">
                ${sc.company} • ${sc.level}
              </span>
              <h1 style="font-size: 1.45rem; font-weight: 900; margin: 2px 0 0; color: #f8fafc;">
                ${sc.title}
              </h1>
            </div>
          </div>
          <span style="font-size: 0.75rem; padding: 4px 10px; border-radius: 99px; background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid var(--border-subtle);">
            Live Simulation
          </span>
        </div>

        <!-- Problem Prompt -->
        <div style="padding: 16px 18px; background: rgba(0,0,0,0.35); border-left: 4px solid ${track.color}; border-radius: 0 12px 12px 0; font-size: 0.92rem; color: #f1f5f9; line-height: 1.6;">
          ${sc.problemPrompt}
        </div>
      </div>

      <!-- Dialogue Stepper -->
      <div style="display: flex; flex-direction: column; gap: 28px; margin-bottom: 36px;">
        ${sc.steps.map((step, stepIdx) => {
          const chosenOpt = userChoices[stepIdx];
          return `
            <div style="border: 1px solid var(--border-subtle); border-radius: 16px; overflow: hidden; background: rgba(15,23,42,0.6);">
              <!-- Step Header -->
              <div style="padding: 14px 18px; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 10px;">
                <span style="width: 24px; height: 24px; border-radius: 50%; background: ${track.color}22; color: ${track.color}; border: 1px solid ${track.color}44;
                  display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800;">
                  ${step.stepNumber}
                </span>
                <span style="font-weight: 800; color: var(--text-primary); font-size: 0.95rem;">${step.title}</span>
              </div>

              <div style="padding: 20px;">
                ${step.interviewerSays ? `
                  <div style="display: flex; gap: 12px; align-items: flex-start; margin-bottom: 18px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0;">
                      🎙️
                    </div>
                    <div style="padding: 12px 16px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); border-radius: 12px; color: #93c5fd; font-size: 0.88rem; line-height: 1.5;">
                      <strong>Interviewer: </strong>"${step.interviewerSays}"
                    </div>
                  </div>` : ''}

                <!-- User Interactive Responses -->
                ${step.options ? `
                  <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px;">
                    How will you answer? (Choose your pitch):
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                    ${step.options.map((opt, optIdx) => {
                      const isSelected = chosenOpt === optIdx;
                      return `
                        <div class="interview-opt-row" data-step="${stepIdx}" data-opt="${optIdx}" style="
                          padding: 14px 16px; border-radius: 10px; border: 1px solid ${isSelected ? track.color : 'var(--border-subtle)'};
                          background: ${isSelected ? `${track.color}15` : 'rgba(255,255,255,0.02)'}; cursor: pointer; transition: all 0.15s ease;">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span style="font-size: 0.88rem; color: ${isSelected ? '#f8fafc' : 'var(--text-secondary)'}; font-weight: 600;">
                              "${opt.text}"
                            </span>
                            ${isSelected ? `<span style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 99px; background: ${opt.points >= 25 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color: ${opt.points >= 25 ? '#34d399' : '#f87171'};">${opt.rating}</span>` : ''}
                          </div>
                        </div>`;
                    }).join('')}
                  </div>` : ''}

                <!-- Feedback & Interviewer Response -->
                ${chosenOpt !== undefined && step.options && step.options[chosenOpt] ? `
                  <div style="padding: 14px 18px; background: rgba(16,185,129,0.07); border-left: 3px solid #10b981; border-radius: 0 10px 10px 0; font-size: 0.88rem; color: #d1fae5; line-height: 1.6; margin-top: 12px;">
                    <strong>🎙️ Interviewer's Live Feedback: </strong><br>
                    ${step.options[chosenOpt].interviewerReply}
                  </div>` : ''}

                <!-- Code Block if step has code -->
                ${step.code ? `
                  <div style="margin-top: 14px;">
                    <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
                      Optimal Production Implementation:
                    </div>
                    <pre style="margin:0; padding:18px; background: rgba(10,14,23,0.95); border: 1px solid rgba(255,255,255,0.08); border-radius:10px; overflow-x:auto; font-family:var(--font-mono); font-size:0.83rem; line-height:1.7;"><code>${highlightJava(step.code)}</code></pre>
                  </div>` : ''}
              </div>
            </div>`;
        }).join('')}
      </div>

      <!-- Rubric Scorecard -->
      ${sc.rubric ? `
        <div style="padding: 22px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle); border-radius: 16px;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
            Evaluation Rubric
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0 0 16px;">
            How FAANG Interviewers Grade This Scenario
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
            ${sc.rubric.map(item => `
              <div style="padding: 14px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-weight: 700; color: var(--text-primary); font-size: 0.86rem;">${item.category}</span>
                  <span style="font-weight: 800; color: #34d399; font-size: 0.8rem;">${item.score}</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5;">${item.notes}</div>
              </div>`).join('')}
          </div>
        </div>` : ''}
    `;

    // Interactive option click
    content.querySelectorAll('.interview-opt-row').forEach(row => {
      row.addEventListener('click', () => {
        const step = parseInt(row.dataset.step, 10);
        const opt = parseInt(row.dataset.opt, 10);
        userChoices[step] = opt;
        renderContent();
      });
    });
  }

  buildSidebar();
  renderContent();
  container.appendChild(sidebar);
  container.appendChild(content);
  return container;
}
