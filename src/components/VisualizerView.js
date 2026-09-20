import { Icons } from '../utils/icons.js';
import { highlightJava } from '../utils/syntaxHighlighter.js';

export function renderVisualizerView() {
  const container = document.createElement('div');
  container.className = 'container fade-in';

  let currentAlgo = 'binary-search';
  let isPlaying = false;
  let timer = null;
  let speedMs = 1200;

  container.innerHTML = `
    <section class="hero-banner" style="padding-bottom: 20px;">
      <div class="hero-tag">
        ${Icons.play} Interactive Algorithm Dry-Run Visualizer
      </div>
      <h1 class="hero-title">
        Step-by-Step <span class="hero-gradient-text">Algorithm Tracing</span>
      </h1>
      <p class="hero-desc">
        Watch how pointers move, search spaces shrink, and sliding windows expand and contract in real time. Perfect for building crystal-clear mental models before writing Java code.
      </p>

      <!-- Algorithm Chooser -->
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
        <button class="filter-btn ${currentAlgo === 'binary-search' ? 'active' : ''}" data-algo="binary-search">
          Binary Search (O(log N))
        </button>
        <button class="filter-btn ${currentAlgo === 'two-pointers' ? 'active' : ''}" data-algo="two-pointers">
          Two Pointers (Container With Most Water)
        </button>
        <button class="filter-btn ${currentAlgo === 'sliding-window' ? 'active' : ''}" data-algo="sliding-window">
          Sliding Window (Max Subarray)
        </button>
      </div>
    </section>

    <div class="visualizer-wrapper">
      <div class="visualizer-controls">
        <div class="visualizer-btn-group">
          <button class="btn-primary" id="vis-play-btn" style="padding: 8px 16px;">
            <span id="vis-play-icon">${Icons.play}</span>
            <span id="vis-play-text">Play</span>
          </button>
          <button class="btn-secondary" id="vis-step-btn" style="padding: 8px 16px;">
            ${Icons.step} Next Step
          </button>
          <button class="btn-secondary" id="vis-reset-btn" style="padding: 8px 16px;">
            ${Icons.reset} Reset
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary);">
            <span>Speed:</span>
            <select id="vis-speed-select" style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 4px 8px;">
              <option value="1800">Slow (1.8s)</option>
              <option value="1200" selected>Normal (1.2s)</option>
              <option value="600">Fast (0.6s)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Live status description banner -->
      <div class="visualizer-status-banner" id="vis-status-banner">
        <span>Ready to begin execution.</span>
        <span id="vis-metrics-pill" class="badge badge-java" style="text-transform: none;">Step 0</span>
      </div>

      <!-- Canvas / Graphic Display -->
      <div class="array-container" id="vis-array-canvas">
        <!-- Rendered boxes/bars -->
      </div>

      <!-- Code Trace Box -->
      <div class="algorithm-trace-box" id="vis-code-trace">
        <!-- Lines of Java code being traced -->
      </div>
    </div>
  `;

  const playBtn = container.querySelector('#vis-play-btn');
  const playText = container.querySelector('#vis-play-text');
  const playIcon = container.querySelector('#vis-play-icon');
  const stepBtn = container.querySelector('#vis-step-btn');
  const resetBtn = container.querySelector('#vis-reset-btn');
  const speedSelect = container.querySelector('#vis-speed-select');
  const statusBanner = container.querySelector('#vis-status-banner');
  const metricsPill = container.querySelector('#vis-metrics-pill');
  const arrayCanvas = container.querySelector('#vis-array-canvas');
  const codeTrace = container.querySelector('#vis-code-trace');
  const algoBtns = container.querySelectorAll('[data-algo]');

  // ==========================================
  // SIMULATION STATE & ALGORITHMS
  // ==========================================

  // 1. Binary Search Simulation
  const bsData = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const bsTarget = 23;
  let bsSteps = [];
  let currentStepIdx = 0;

  function generateBSSteps() {
    const steps = [];
    let low = 0, high = bsData.length - 1;

    steps.push({
      low, high, mid: null, found: false, discardedLeft: false, discardedRight: false,
      codeLine: 1,
      msg: `Initialize pointers: low = 0 (val: ${bsData[0]}), high = ${high} (val: ${bsData[high]}). Target = ${bsTarget}.`
    });

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);
      steps.push({
        low, high, mid, found: false,
        codeLine: 2,
        msg: `Calculate mid = low + (high - low) / 2 = ${mid} (nums[${mid}] = ${bsData[mid]}).`
      });

      if (bsData[mid] === bsTarget) {
        steps.push({
          low, high, mid, found: true,
          codeLine: 3,
          msg: `TARGET FOUND! nums[${mid}] == ${bsTarget}. Return index ${mid}.`
        });
        break;
      } else if (bsData[mid] < bsTarget) {
        steps.push({
          low, high, mid, found: false,
          codeLine: 4,
          msg: `nums[${mid}] (${bsData[mid]}) < ${bsTarget}. Target is in right half. Set low = mid + 1 (${mid + 1}).`
        });
        low = mid + 1;
      } else {
        steps.push({
          low, high, mid, found: false,
          codeLine: 5,
          msg: `nums[${mid}] (${bsData[mid]}) > ${bsTarget}. Target is in left half. Set high = mid - 1 (${mid - 1}).`
        });
        high = mid - 1;
      }
    }
    return steps;
  }

  // 2. Two Pointers Simulation (Container With Most Water)
  const tpData = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  let tpSteps = [];

  function generateTPSteps() {
    const steps = [];
    let left = 0, right = tpData.length - 1;
    let maxArea = 0;

    steps.push({
      left, right, maxArea: 0, area: 0,
      codeLine: 1,
      msg: `Start with widest container: left = 0 (h: ${tpData[0]}), right = ${right} (h: ${tpData[right]}).`
    });

    while (left < right) {
      const width = right - left;
      const h = Math.min(tpData[left], tpData[right]);
      const area = width * h;
      maxArea = Math.max(maxArea, area);

      steps.push({
        left, right, maxArea, area,
        codeLine: 2,
        msg: `Current area = width(${width}) * minHeight(${h}) = ${area}. Max area so far = ${maxArea}.`
      });

      if (tpData[left] < tpData[right]) {
        steps.push({
          left, right, maxArea, area,
          codeLine: 3,
          msg: `height[left] (${tpData[left]}) < height[right] (${tpData[right]}). Advance left pointer inward.`
        });
        left++;
      } else {
        steps.push({
          left, right, maxArea, area,
          codeLine: 4,
          msg: `height[right] (${tpData[right]}) <= height[left] (${tpData[left]}). Move right pointer inward.`
        });
        right--;
      }
    }

    steps.push({
      left, right, maxArea, area: 0,
      codeLine: 5,
      msg: `Pointers met! Global maximum water trapped = ${maxArea}. Execution finished.`
    });

    return steps;
  }

  function setupCodeTrace(algo) {
    if (algo === 'binary-search') {
      codeTrace.innerHTML = `
        <div class="trace-line" data-line="1">int low = 0, high = nums.length - 1;</div>
        <div class="trace-line" data-line="2">while (low &lt;= high) { int mid = low + (high - low) / 2;</div>
        <div class="trace-line" data-line="3">    if (nums[mid] == target) return mid;</div>
        <div class="trace-line" data-line="4">    else if (nums[mid] &lt; target) low = mid + 1;</div>
        <div class="trace-line" data-line="5">    else high = mid - 1; } return -1;</div>
      `;
    } else if (algo === 'two-pointers') {
      codeTrace.innerHTML = `
        <div class="trace-line" data-line="1">int left = 0, right = height.length - 1, maxWater = 0;</div>
        <div class="trace-line" data-line="2">while (left &lt; right) { maxWater = Math.max(maxWater, Math.min(h[l], h[r]) * (r - l));</div>
        <div class="trace-line" data-line="3">    if (height[left] &lt; height[right]) left++;</div>
        <div class="trace-line" data-line="4">    else right--; }</div>
        <div class="trace-line" data-line="5">return maxWater;</div>
      `;
    } else {
      codeTrace.innerHTML = `
        <div class="trace-line" data-line="1">int left = 0, currentSum = 0, maxSum = 0;</div>
        <div class="trace-line" data-line="2">for (int right = 0; right &lt; nums.length; right++) {</div>
        <div class="trace-line" data-line="3">    currentSum += nums[right];</div>
        <div class="trace-line" data-line="4">    if (right - left + 1 == k) { maxSum = Math.max(maxSum, currentSum); currentSum -= nums[left++]; } }</div>
      `;
    }
  }

  function renderCurrentStep() {
    if (currentAlgo === 'binary-search') {
      const step = bsSteps[currentStepIdx] || bsSteps[0];
      statusBanner.firstElementChild.textContent = step.msg;
      metricsPill.textContent = `Step ${currentStepIdx + 1} of ${bsSteps.length}`;

      // Highlight code line
      codeTrace.querySelectorAll('.trace-line').forEach(line => {
        line.classList.toggle('active', parseInt(line.dataset.line, 10) === step.codeLine);
      });

      // Render Array Boxes
      arrayCanvas.innerHTML = bsData.map((val, idx) => {
        let boxClass = 'array-box';
        let ptrHtml = '';

        if (step.found && idx === step.mid) {
          boxClass += ' highlight-match';
        } else if (idx === step.mid) {
          boxClass += ' highlight-active';
        } else if (idx < step.low || idx > step.high) {
          boxClass += ' highlight-discarded';
        }

        if (idx === step.low && idx === step.high) {
          ptrHtml = `<span class="pointer-indicator pointer-mid">L/H</span>`;
        } else if (idx === step.low) {
          ptrHtml = `<span class="pointer-indicator pointer-left">low</span>`;
        } else if (idx === step.high) {
          ptrHtml = `<span class="pointer-indicator pointer-right">high</span>`;
        } else if (idx === step.mid) {
          ptrHtml = `<span class="pointer-indicator pointer-mid">mid</span>`;
        } else {
          ptrHtml = `<span style="height: 22px; display: block;"></span>`;
        }

        return `
          <div class="array-element-col">
            ${ptrHtml}
            <div class="${boxClass}">${val}</div>
            <span class="array-index">[${idx}]</span>
          </div>
        `;
      }).join('');
    } else if (currentAlgo === 'two-pointers') {
      const step = tpSteps[currentStepIdx] || tpSteps[0];
      statusBanner.firstElementChild.textContent = step.msg;
      metricsPill.textContent = `Area: ${step.area} | Max: ${step.maxArea}`;

      codeTrace.querySelectorAll('.trace-line').forEach(line => {
        line.classList.toggle('active', parseInt(line.dataset.line, 10) === step.codeLine);
      });

      arrayCanvas.innerHTML = tpData.map((val, idx) => {
        let boxClass = 'array-box';
        let ptrHtml = '';

        const isLeft = idx === step.left;
        const isRight = idx === step.right;

        if (isLeft || isRight) {
          boxClass += ' highlight-active';
        }

        if (isLeft) ptrHtml = `<span class="pointer-indicator pointer-left">L</span>`;
        else if (isRight) ptrHtml = `<span class="pointer-indicator pointer-right">R</span>`;
        else ptrHtml = `<span style="height: 22px; display: block;"></span>`;

        // Calculate height proportional bar
        const barHeight = Math.max(30, val * 16);

        return `
          <div class="array-element-col">
            ${ptrHtml}
            <div class="${boxClass}" style="height: ${barHeight}px;">
              ${val}
            </div>
            <span class="array-index">[${idx}]</span>
          </div>
        `;
      }).join('');
    }
  }

  function nextStep() {
    const totalSteps = currentAlgo === 'binary-search' ? bsSteps.length : tpSteps.length;
    if (currentStepIdx < totalSteps - 1) {
      currentStepIdx++;
      renderCurrentStep();
    } else {
      pause();
    }
  }

  function play() {
    isPlaying = true;
    playText.textContent = 'Pause';
    playIcon.innerHTML = Icons.pause;
    timer = setInterval(() => {
      const totalSteps = currentAlgo === 'binary-search' ? bsSteps.length : tpSteps.length;
      if (currentStepIdx < totalSteps - 1) {
        nextStep();
      } else {
        pause();
      }
    }, speedMs);
  }

  function pause() {
    isPlaying = false;
    playText.textContent = 'Play';
    playIcon.innerHTML = Icons.play;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function reset() {
    pause();
    currentStepIdx = 0;
    renderCurrentStep();
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) pause();
    else play();
  });

  stepBtn.addEventListener('click', () => {
    pause();
    nextStep();
  });

  resetBtn.addEventListener('click', reset);

  speedSelect.addEventListener('change', (e) => {
    speedMs = parseInt(e.target.value, 10);
    if (isPlaying) {
      pause();
      play();
    }
  });

  algoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      algoBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAlgo = btn.dataset.algo;
      reset();
      setupCodeTrace(currentAlgo);
      renderCurrentStep();
    });
  });

  // Init
  bsSteps = generateBSSteps();
  tpSteps = generateTPSteps();
  setupCodeTrace(currentAlgo);
  renderCurrentStep();

  return container;
}
