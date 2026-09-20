// ============================================================
// SORTING GAME COMPONENT — JavaAlgo Elite v3.0
// Interactive Algorithm Race & Step-by-Step Visualization Arena
// ============================================================

import { Icons } from '../utils/icons.js';
import {
  sortingAlgorithms,
  dataDistributions,
  stepGenerators
} from '../data/sortingGameData.js';

export function renderSortingGameView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  // State
  let mode = 'race'; // 'race' or 'solo'
  let algo1Id = 'quick';
  let algo2Id = 'bubble';
  let distributionId = 'random';
  let arraySize = 25;
  let speed = 40; // ms per step

  let baseArray = [];
  let steps1 = [];
  let steps2 = [];
  let currentStep1 = 0;
  let currentStep2 = 0;
  let isRunning = false;
  let animTimer = null;
  let winner = null;

  // Initialize base array
  function initBaseArray() {
    const dist = dataDistributions.find(d => d.id === distributionId) || dataDistributions[0];
    baseArray = dist.generate(arraySize);
    resetSimulation();
  }

  function resetSimulation() {
    pauseSimulation();
    const gen1 = stepGenerators[algo1Id];
    const gen2 = stepGenerators[algo2Id];

    steps1 = gen1 ? gen1(baseArray) : [];
    steps2 = gen2 ? gen2(baseArray) : [];

    currentStep1 = 0;
    currentStep2 = 0;
    winner = null;

    updateUI();
  }

  function startSimulation() {
    if (isRunning) return;
    if (currentStep1 >= steps1.length - 1 && (mode === 'solo' || currentStep2 >= steps2.length - 1)) {
      resetSimulation();
    }
    isRunning = true;
    runLoop();
    updateControls();
  }

  function pauseSimulation() {
    isRunning = false;
    if (animTimer) {
      clearTimeout(animTimer);
      animTimer = null;
    }
    updateControls();
  }

  function stepForward() {
    pauseSimulation();
    let moved = false;
    if (currentStep1 < steps1.length - 1) {
      currentStep1++;
      moved = true;
    }
    if (mode === 'race' && currentStep2 < steps2.length - 1) {
      currentStep2++;
      moved = true;
    }
    checkWinner();
    updateUI();
  }

  function runLoop() {
    if (!isRunning) return;

    let advanced = false;
    if (currentStep1 < steps1.length - 1) {
      currentStep1++;
      advanced = true;
    }
    if (mode === 'race' && currentStep2 < steps2.length - 1) {
      currentStep2++;
      advanced = true;
    }

    checkWinner();
    renderBars(1);
    if (mode === 'race') renderBars(2);
    updateStats();

    if (advanced) {
      animTimer = setTimeout(runLoop, speed);
    } else {
      pauseSimulation();
      renderInsights();
    }
  }

  function checkWinner() {
    if (mode !== 'race') return;
    const finished1 = currentStep1 >= steps1.length - 1;
    const finished2 = currentStep2 >= steps2.length - 1;

    if (finished1 && !finished2 && !winner) {
      winner = 1;
    } else if (finished2 && !finished1 && !winner) {
      winner = 2;
    } else if (finished1 && finished2 && !winner) {
      // compare total steps
      if (steps1.length < steps2.length) winner = 1;
      else if (steps2.length < steps1.length) winner = 2;
      else winner = 'tie';
    }
  }

  // Build View DOM
  container.innerHTML = `
    <!-- Hero Banner -->
    <section class="hero-banner" style="padding-bottom: 24px;">
      <div class="hero-tag" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.3); color: #fbbf24;">
        🎮 Interactive Algorithm Battle Arena
      </div>
      <h1 class="hero-title">
        The Algorithm <span class="hero-gradient-text">Sorting Race</span>
      </h1>
      <p class="hero-desc">
        Watch sorting algorithms race head-to-head on identical arrays in real time. See how Big-O theory translates into actual comparisons and memory swaps across different real-world distributions.
      </p>

      <!-- Mode Selector -->
      <div style="display: flex; justify-content: center; gap: 8px; margin-top: 14px;">
        <button class="filter-btn active" id="mode-race-btn" style="padding: 8px 20px; font-weight: 700;">
          🏁 Race Mode (Side-by-Side)
        </button>
        <button class="filter-btn" id="mode-solo-btn" style="padding: 8px 20px; font-weight: 700;">
          🔬 Solo Deep Analysis
        </button>
      </div>
    </section>

    <!-- Controls Toolbar -->
    <div class="sorting-controls-card card" style="padding: 18px 22px; margin-bottom: 24px;">
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
        
        <!-- Left: Algorithm Selectors -->
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <div class="control-group">
            <label style="font-size: 0.75rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
              ⚡ Racer 1
            </label>
            <select id="algo1-select" class="form-select-sm" style="background: var(--bg-input); border: 1px solid rgba(56, 189, 248, 0.4); color: var(--text-primary); padding: 7px 12px; border-radius: 8px; font-weight: 600; box-shadow: var(--card-inner-highlight);">
              ${sortingAlgorithms.map(a => `<option value="${a.id}" ${a.id === algo1Id ? 'selected' : ''}>${a.icon} ${a.name} (${a.complexity.avg})</option>`).join('')}
            </select>
          </div>

          <div class="control-group" id="algo2-group">
            <label style="font-size: 0.75rem; font-weight: 700; color: #f472b6; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
              🔥 Racer 2
            </label>
            <select id="algo2-select" class="form-select-sm" style="background: var(--bg-input); border: 1px solid rgba(244, 114, 182, 0.4); color: var(--text-primary); padding: 7px 12px; border-radius: 8px; font-weight: 600; box-shadow: var(--card-inner-highlight);">
              ${sortingAlgorithms.map(a => `<option value="${a.id}" ${a.id === algo2Id ? 'selected' : ''}>${a.icon} ${a.name} (${a.complexity.avg})</option>`).join('')}
            </select>
          </div>

          <div class="control-group">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
              📊 Distribution
            </label>
            <select id="dist-select" class="form-select-sm" style="background: var(--bg-input); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 7px 12px; border-radius: 8px; font-weight: 600; box-shadow: var(--card-inner-highlight);">
              ${dataDistributions.map(d => `<option value="${d.id}" ${d.id === distributionId ? 'selected' : ''}>${d.icon} ${d.name}</option>`).join('')}
            </select>
          </div>

          <div class="control-group">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">
              🔢 Array Size
            </label>
            <select id="size-select" class="form-select-sm" style="background: var(--bg-input); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 7px 12px; border-radius: 8px; font-weight: 600; box-shadow: var(--card-inner-highlight);">
              <option value="15" ${arraySize === 15 ? 'selected' : ''}>15 Elements (Detailed)</option>
              <option value="25" ${arraySize === 25 ? 'selected' : ''}>25 Elements (Standard)</option>
              <option value="40" ${arraySize === 40 ? 'selected' : ''}>40 Elements (Stress Test)</option>
            </select>
          </div>
        </div>

        <!-- Right: Playback Buttons & Speed -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <button class="btn-primary" id="race-play-btn" style="padding: 9px 20px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
            <span id="race-play-icon">${Icons.play}</span>
            <span id="race-play-text">Start Race</span>
          </button>
          <button class="btn-secondary" id="race-step-btn" style="padding: 9px 14px; font-weight: 600;" title="Single Step Forward">
            ${Icons.step} Step
          </button>
          <button class="btn-secondary" id="race-reset-btn" style="padding: 9px 14px; font-weight: 600;" title="Reset Race">
            ${Icons.reset} Reset
          </button>
          <button class="btn-secondary" id="race-shuffle-btn" style="padding: 9px 14px; font-weight: 600;" title="Generate Fresh Array">
            🎲 New Data
          </button>

          <div style="display: flex; align-items: center; gap: 6px; margin-left: 6px;">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Speed:</span>
            <select id="speed-select" style="background: var(--bg-input); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 6px 10px; font-size: 0.8rem;">
              <option value="120">Slow</option>
              <option value="40" selected>Normal</option>
              <option value="15">Fast</option>
              <option value="4">Blitz ⚡</option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <!-- Battle Arena Display -->
    <div class="sorting-arena-container" id="sorting-arena" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;">
      
      <!-- Racer 1 Card -->
      <div class="card sorting-lane-card" id="lane-1" style="padding: 20px; border-top: 3px solid #38bdf8; position: relative;">
        <div class="lane-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="lane1-icon" style="font-size: 1.4rem;">⚡</span>
              <h2 id="lane1-title" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">Quick Sort</h2>
            </div>
            <div id="lane1-badges" style="display: flex; gap: 6px; margin-top: 6px;">
              <span class="badge badge-java" id="lane1-avg">Avg: O(N log N)</span>
              <span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-secondary);" id="lane1-space">Space: O(log N)</span>
            </div>
          </div>
          <div id="lane1-status-pill" class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.8rem; padding: 4px 10px;">
            Ready
          </div>
        </div>

        <!-- Metrics Row -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: var(--bg-tertiary); padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">COMPARISONS</div>
            <div id="lane1-comp-count" style="font-size: 1.15rem; font-weight: 800; color: #fbbf24; font-family: var(--font-mono);">0</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">SWAPS / WRITES</div>
            <div id="lane1-swap-count" style="font-size: 1.15rem; font-weight: 800; color: #f472b6; font-family: var(--font-mono);">0</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">STEP PROGRESS</div>
            <div id="lane1-step-count" style="font-size: 1.15rem; font-weight: 800; color: #34d399; font-family: var(--font-mono);">0 / 0</div>
          </div>
        </div>

        <!-- Bar Chart Canvas -->
        <div class="sorting-chart-box" id="lane1-bars" style="height: 240px; display: flex; align-items: flex-end; gap: 3px; padding: 12px 8px; background: rgba(8, 12, 20, 0.85); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); position: relative;">
          <!-- Rendered dynamically -->
        </div>

        <!-- Progress bar -->
        <div style="height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin-top: 12px;">
          <div id="lane1-progress-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #38bdf8, #818cf8); transition: width 0.1s linear;"></div>
        </div>
      </div>

      <!-- Racer 2 Card -->
      <div class="card sorting-lane-card" id="lane-2" style="padding: 20px; border-top: 3px solid #f472b6; position: relative;">
        <div class="lane-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="lane2-icon" style="font-size: 1.4rem;">🫧</span>
              <h2 id="lane2-title" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">Bubble Sort</h2>
            </div>
            <div id="lane2-badges" style="display: flex; gap: 6px; margin-top: 6px;">
              <span class="badge badge-java" id="lane2-avg">Avg: O(N²)</span>
              <span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-secondary);" id="lane2-space">Space: O(1)</span>
            </div>
          </div>
          <div id="lane2-status-pill" class="badge" style="background: rgba(244, 114, 182, 0.15); color: #f472b6; border: 1px solid rgba(244, 114, 182, 0.3); font-size: 0.8rem; padding: 4px 10px;">
            Ready
          </div>
        </div>

        <!-- Metrics Row -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: var(--bg-tertiary); padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">COMPARISONS</div>
            <div id="lane2-comp-count" style="font-size: 1.15rem; font-weight: 800; color: #fbbf24; font-family: var(--font-mono);">0</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">SWAPS / WRITES</div>
            <div id="lane2-swap-count" style="font-size: 1.15rem; font-weight: 800; color: #f472b6; font-family: var(--font-mono);">0</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">STEP PROGRESS</div>
            <div id="lane2-step-count" style="font-size: 1.15rem; font-weight: 800; color: #34d399; font-family: var(--font-mono);">0 / 0</div>
          </div>
        </div>

        <!-- Bar Chart Canvas -->
        <div class="sorting-chart-box" id="lane2-bars" style="height: 240px; display: flex; align-items: flex-end; gap: 3px; padding: 12px 8px; background: rgba(8, 12, 20, 0.85); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); position: relative;">
          <!-- Rendered dynamically -->
        </div>

        <!-- Progress bar -->
        <div style="height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin-top: 12px;">
          <div id="lane2-progress-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #f472b6, #fb923c); transition: width 0.1s linear;"></div>
        </div>
      </div>

    </div>

    <!-- Live Post-Race Insights Banner -->
    <div id="race-insights-panel" style="margin-bottom: 32px;"></div>

    <!-- Algorithm Deep Dive Knowledge Cards -->
    <div style="margin-top: 36px;">
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
        <span>📚</span> Algorithm Cheat Sheet & Interview Selection Rules
      </h3>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px;">
        ${sortingAlgorithms.map(algo => `
          <div class="card" style="padding: 20px; border-left: 4px solid ${algo.color}; background: var(--bg-card);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.3rem;">${algo.icon}</span>
                <span style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">${algo.name}</span>
              </div>
              <span class="badge" style="background: rgba(255,255,255,0.08); color: ${algo.color}; font-weight: 700;">
                ${algo.complexity.avg}
              </span>
            </div>

            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px;">
              ${algo.description}
            </p>

            <div style="font-size: 0.78rem; display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--border-subtle); padding-top: 10px;">
              <div>
                <strong style="color: #34d399;">Best For:</strong> <span style="color: var(--text-primary);">${algo.bestFor}</span>
              </div>
              <div>
                <strong style="color: #f87171;">Worst For:</strong> <span style="color: var(--text-primary);">${algo.worstFor}</span>
              </div>
              <div style="margin-top: 4px; background: rgba(255,255,255,0.03); padding: 6px 10px; border-radius: 6px; color: #fbbf24; font-style: italic;">
                💡 <strong>Pro Insight:</strong> ${algo.funFact}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Elements
  const playBtn = container.querySelector('#race-play-btn');
  const playText = container.querySelector('#race-play-text');
  const playIcon = container.querySelector('#race-play-icon');
  const stepBtn = container.querySelector('#race-step-btn');
  const resetBtn = container.querySelector('#race-reset-btn');
  const shuffleBtn = container.querySelector('#race-shuffle-btn');
  const speedSelect = container.querySelector('#speed-select');
  const algo1Select = container.querySelector('#algo1-select');
  const algo2Select = container.querySelector('#algo2-select');
  const algo2Group = container.querySelector('#algo2-group');
  const distSelect = container.querySelector('#dist-select');
  const sizeSelect = container.querySelector('#size-select');
  const modeRaceBtn = container.querySelector('#mode-race-btn');
  const modeSoloBtn = container.querySelector('#mode-solo-btn');
  const sortingArena = container.querySelector('#sorting-arena');
  const lane2 = container.querySelector('#lane-2');
  const insightsPanel = container.querySelector('#race-insights-panel');

  // Render Bar Charts
  function renderBars(laneNum) {
    const barsContainer = container.querySelector(`#lane${laneNum}-bars`);
    if (!barsContainer) return;

    const steps = laneNum === 1 ? steps1 : steps2;
    const currentStep = laneNum === 1 ? currentStep1 : currentStep2;
    const algoId = laneNum === 1 ? algo1Id : algo2Id;
    const algo = sortingAlgorithms.find(a => a.id === algoId) || sortingAlgorithms[0];

    const stepData = steps[currentStep] || {
      array: baseArray,
      comparing: [],
      swapping: null,
      sorted: []
    };

    const arr = stepData.array;
    const maxVal = Math.max(...baseArray, 1);
    const comparing = stepData.comparing || [];
    const swapping = stepData.swapping || [];
    const sorted = stepData.sorted || [];

    const isComplete = currentStep >= steps.length - 1;

    barsContainer.innerHTML = arr.map((val, idx) => {
      const heightPct = Math.max(8, Math.round((val / maxVal) * 100));
      let barColor = algo.color;
      let barShadow = 'none';

      if (isComplete || sorted.includes(idx)) {
        barColor = '#10b981'; // Emerald
        barShadow = '0 0 8px rgba(16, 185, 129, 0.6)';
      } else if (swapping && (swapping[0] === idx || swapping[1] === idx)) {
        barColor = '#ef4444'; // Red swap
        barShadow = '0 0 10px rgba(239, 68, 68, 0.8)';
      } else if (comparing.includes(idx)) {
        barColor = '#fbbf24'; // Yellow compare
        barShadow = '0 0 10px rgba(251, 191, 36, 0.8)';
      }

      return `
        <div style="
          flex: 1;
          height: ${heightPct}%;
          background: ${barColor};
          box-shadow: ${barShadow};
          border-radius: 3px 3px 0 0;
          transition: height 0.05s ease, background-color 0.05s ease;
          position: relative;
        ">
          ${arraySize <= 20 ? `<span style="position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%); font-size: 0.65rem; color: var(--text-muted); font-family: var(--font-mono);">${val}</span>` : ''}
        </div>
      `;
    }).join('');
  }

  function updateStats() {
    // Lane 1
    const s1 = steps1[currentStep1] || { comparisons: 0, swaps: 0 };
    container.querySelector('#lane1-comp-count').textContent = s1.comparisons || 0;
    container.querySelector('#lane1-swap-count').textContent = s1.swaps || 0;
    container.querySelector('#lane1-step-count').textContent = `${currentStep1} / ${Math.max(1, steps1.length - 1)}`;
    const pct1 = Math.round((currentStep1 / Math.max(1, steps1.length - 1)) * 100);
    container.querySelector('#lane1-progress-bar').style.width = `${pct1}%`;

    const statusPill1 = container.querySelector('#lane1-status-pill');
    if (currentStep1 >= steps1.length - 1) {
      statusPill1.textContent = winner === 1 ? '🏆 WINNER!' : 'Finished';
      statusPill1.style.background = winner === 1 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.1)';
      statusPill1.style.color = winner === 1 ? '#34d399' : '#fff';
      statusPill1.style.borderColor = winner === 1 ? '#10b981' : 'transparent';
    } else if (isRunning) {
      statusPill1.textContent = 'Sorting...';
      statusPill1.style.background = 'rgba(56, 189, 248, 0.15)';
      statusPill1.style.color = '#38bdf8';
    } else {
      statusPill1.textContent = 'Paused';
    }

    // Lane 2
    if (mode === 'race') {
      const s2 = steps2[currentStep2] || { comparisons: 0, swaps: 0 };
      container.querySelector('#lane2-comp-count').textContent = s2.comparisons || 0;
      container.querySelector('#lane2-swap-count').textContent = s2.swaps || 0;
      container.querySelector('#lane2-step-count').textContent = `${currentStep2} / ${Math.max(1, steps2.length - 1)}`;
      const pct2 = Math.round((currentStep2 / Math.max(1, steps2.length - 1)) * 100);
      container.querySelector('#lane2-progress-bar').style.width = `${pct2}%`;

      const statusPill2 = container.querySelector('#lane2-status-pill');
      if (currentStep2 >= steps2.length - 1) {
        statusPill2.textContent = winner === 2 ? '🏆 WINNER!' : 'Finished';
        statusPill2.style.background = winner === 2 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.1)';
        statusPill2.style.color = winner === 2 ? '#34d399' : '#fff';
        statusPill2.style.borderColor = winner === 2 ? '#10b981' : 'transparent';
      } else if (isRunning) {
        statusPill2.textContent = 'Sorting...';
        statusPill2.style.background = 'rgba(244, 114, 182, 0.15)';
        statusPill2.style.color = '#f472b6';
      } else {
        statusPill2.textContent = 'Paused';
      }
    }
  }

  function renderInsights() {
    if (!insightsPanel) return;

    const algo1 = sortingAlgorithms.find(a => a.id === algo1Id);
    const algo2 = sortingAlgorithms.find(a => a.id === algo2Id);
    const dist = dataDistributions.find(d => d.id === distributionId);

    const s1 = steps1[steps1.length - 1] || { comparisons: 0, swaps: 0 };
    const s2 = steps2[steps2.length - 1] || { comparisons: 0, swaps: 0 };

    let winnerText = '';
    let winnerExplanation = '';

    if (mode === 'race') {
      if (winner === 1) {
        winnerText = `🏆 ${algo1.name} won the race in ${steps1.length} steps!`;
      } else if (winner === 2) {
        winnerText = `🏆 ${algo2.name} won the race in ${steps2.length} steps!`;
      } else {
        winnerText = `🤝 It's a Tie! Both completed simultaneously!`;
      }

      // Educational reasoning
      if (distributionId === 'nearly-sorted' && (algo1Id === 'insertion' || algo2Id === 'insertion')) {
        winnerExplanation = `<strong>Why did Insertion Sort dominate?</strong> On nearly sorted arrays, Insertion Sort approaches $O(N)$ linear time because each element is already very close to its final position, requiring almost zero shifts!`;
      } else if (distributionId === 'reversed' && (algo1Id === 'bubble' || algo2Id === 'bubble')) {
        winnerExplanation = `<strong>Why was Bubble Sort so slow?</strong> On reverse-sorted inputs, Bubble Sort hits its worst-case scenario: $O(N^2)$ comparisons and maximum swaps, as every element must travel the entire length of the array.`;
      } else if (algo1Id === 'quick' || algo2Id === 'quick') {
        winnerExplanation = `<strong>Cache-Friendly Divide & Conquer:</strong> Quick Sort partitions the array around a pivot in-place, making sequential passes through cache lines without allocating auxiliary heap memory.`;
      } else {
        winnerExplanation = `Notice the trade-off: algorithms with fewer comparisons often perform more complex recursions or memory allocations.`;
      }
    } else {
      winnerText = `✅ ${algo1.name} completed sorting in ${steps1.length} steps!`;
      winnerExplanation = `Total Comparisons: <strong>${s1.comparisons}</strong> | Total Swaps / Writes: <strong>${s1.swaps}</strong>. Theoretical complexity: ${algo1.complexity.avg}.`;
    }

    insightsPanel.innerHTML = `
      <div class="card" style="padding: 22px; border: 1px solid rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.06);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #34d399; margin: 0;">
            ${winnerText}
          </h3>
          <span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-primary);">
            Data: ${dist.name} (${arraySize} items)
          </span>
        </div>
        <p style="font-size: 0.92rem; color: var(--text-primary); line-height: 1.5; margin: 0;">
          ${winnerExplanation}
        </p>

        ${mode === 'race' ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
            <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 8px;">
              <div style="font-weight: 700; color: #38bdf8; font-size: 0.9rem; margin-bottom: 4px;">${algo1.name}</div>
              <div style="font-size: 0.82rem; color: var(--text-secondary);">
                Comparisons: <strong>${s1.comparisons}</strong> | Swaps: <strong>${s1.swaps}</strong> | Steps: <strong>${steps1.length}</strong>
              </div>
            </div>
            <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 8px;">
              <div style="font-weight: 700; color: #f472b6; font-size: 0.9rem; margin-bottom: 4px;">${algo2.name}</div>
              <div style="font-size: 0.82rem; color: var(--text-secondary);">
                Comparisons: <strong>${s2.comparisons}</strong> | Swaps: <strong>${s2.swaps}</strong> | Steps: <strong>${steps2.length}</strong>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function updateControls() {
    playText.textContent = isRunning ? 'Pause' : 'Start Race';
    playIcon.innerHTML = isRunning ? Icons.close : Icons.play;
  }

  function updateUI() {
    // Update titles and badges
    const a1 = sortingAlgorithms.find(a => a.id === algo1Id) || sortingAlgorithms[0];
    container.querySelector('#lane1-icon').textContent = a1.icon;
    container.querySelector('#lane1-title').textContent = a1.name;
    container.querySelector('#lane1-avg').textContent = `Avg: ${a1.complexity.avg}`;
    container.querySelector('#lane1-space').textContent = `Space: ${a1.complexity.space}`;
    container.querySelector('#lane-1').style.borderTopColor = a1.color;

    if (mode === 'race') {
      const a2 = sortingAlgorithms.find(a => a.id === algo2Id) || sortingAlgorithms[1];
      container.querySelector('#lane2-icon').textContent = a2.icon;
      container.querySelector('#lane2-title').textContent = a2.name;
      container.querySelector('#lane2-avg').textContent = `Avg: ${a2.complexity.avg}`;
      container.querySelector('#lane2-space').textContent = `Space: ${a2.complexity.space}`;
      container.querySelector('#lane-2').style.borderTopColor = a2.color;
      lane2.style.display = 'block';
      algo2Group.style.display = 'block';
      sortingArena.style.gridTemplateColumns = window.innerWidth <= 768 ? '1fr' : '1fr 1fr';
    } else {
      lane2.style.display = 'none';
      algo2Group.style.display = 'none';
      sortingArena.style.gridTemplateColumns = '1fr';
    }

    renderBars(1);
    if (mode === 'race') renderBars(2);
    updateStats();
    updateControls();
    insightsPanel.innerHTML = '';
  }

  // Event Listeners
  playBtn.addEventListener('click', () => {
    if (isRunning) pauseSimulation();
    else startSimulation();
  });

  stepBtn.addEventListener('click', stepForward);
  resetBtn.addEventListener('click', resetSimulation);
  shuffleBtn.addEventListener('click', initBaseArray);

  speedSelect.addEventListener('change', (e) => {
    speed = parseInt(e.target.value, 10);
  });

  algo1Select.addEventListener('change', (e) => {
    algo1Id = e.target.value;
    resetSimulation();
  });

  algo2Select.addEventListener('change', (e) => {
    algo2Id = e.target.value;
    resetSimulation();
  });

  distSelect.addEventListener('change', (e) => {
    distributionId = e.target.value;
    initBaseArray();
  });

  sizeSelect.addEventListener('change', (e) => {
    arraySize = parseInt(e.target.value, 10);
    initBaseArray();
  });

  modeRaceBtn.addEventListener('click', () => {
    mode = 'race';
    modeRaceBtn.classList.add('active');
    modeSoloBtn.classList.remove('active');
    resetSimulation();
  });

  modeSoloBtn.addEventListener('click', () => {
    mode = 'solo';
    modeSoloBtn.classList.add('active');
    modeRaceBtn.classList.remove('active');
    resetSimulation();
  });

  // Handle responsive layout resize
  window.addEventListener('resize', () => {
    if (mode === 'race') {
      sortingArena.style.gridTemplateColumns = window.innerWidth <= 768 ? '1fr' : '1fr 1fr';
    }
  });

  // Initial load
  initBaseArray();

  return container;
}
