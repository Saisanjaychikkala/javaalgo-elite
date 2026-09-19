// ============================================================
// INTERACTIVE LINEAR REGRESSION & GRADIENT DESCENT CANVAS
// Allows users to click to add data points, adjust learning rate,
// and watch gradient descent fit the line y = w*x + b live!
// ============================================================

export function renderRegressionPlayground() {
  const container = document.createElement('div');
  container.className = 'regression-playground-card';
  container.style.cssText = `
    margin: 28px 0 36px;
    padding: 24px;
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(15, 23, 42, 0.9));
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  `;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
      <div>
        <div style="font-size: 0.75rem; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
          🧪 Live Interactive Math Lab
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: #f8fafc; margin: 0;">
          Gradient Descent Visualizer ($y = w \\cdot x + b$)
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px; max-width: 650px;">
          <strong>Click anywhere inside the coordinate grid</strong> to add data points. Hit <strong>Run Descent</strong> to watch the line feel the slope and slide into the minimum error valley!
        </p>
      </div>
      <span style="font-size: 0.72rem; padding: 4px 10px; border-radius: 99px; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); font-weight: 700;">
        Pure Math in Motion
      </span>
    </div>

    <!-- Live Telemetry Dashboard -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 16px;">
      <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); text-align: center;">
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Weight (w)</div>
        <div id="reg-weight-val" style="font-size: 1.15rem; font-weight: 800; color: #38bdf8; font-family: var(--font-mono);">0.000</div>
      </div>
      <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); text-align: center;">
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Bias (b)</div>
        <div id="reg-bias-val" style="font-size: 1.15rem; font-weight: 800; color: #c084fc; font-family: var(--font-mono);">0.000</div>
      </div>
      <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); text-align: center;">
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">MSE Loss (Error)</div>
        <div id="reg-loss-val" style="font-size: 1.15rem; font-weight: 800; color: #f87171; font-family: var(--font-mono);">0.000</div>
      </div>
      <div style="padding: 10px 14px; background: rgba(0,0,0,0.3); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); text-align: center;">
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Epochs (Steps)</div>
        <div id="reg-epoch-val" style="font-size: 1.15rem; font-weight: 800; color: #34d399; font-family: var(--font-mono);">0</div>
      </div>
    </div>

    <!-- Canvas Container -->
    <div style="position: relative; width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #0b0f19; margin-bottom: 16px;">
      <canvas id="regression-canvas" width="680" height="360" style="display: block; width: 100%; height: auto; cursor: crosshair; touch-action: none;"></canvas>
      <div style="position: absolute; bottom: 10px; right: 14px; font-size: 0.72rem; color: rgba(255,255,255,0.35); pointer-events: none;">
        Click to place points • Red dashed lines = residual errors
      </div>
    </div>

    <!-- Controls Row -->
    <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="reg-run-btn" style="
          padding: 8px 16px; background: #f59e0b; color: #000; border: none; border-radius: 8px;
          font-weight: 800; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">
          ▶ Run Descent
        </button>
        <button id="reg-step-btn" style="
          padding: 8px 14px; background: rgba(255,255,255,0.08); color: var(--text-primary); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
          Step 10x
        </button>
        <button id="reg-reset-btn" style="
          padding: 8px 14px; background: rgba(255,255,255,0.04); color: var(--text-secondary); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">
          Reset Line
        </button>
        <button id="reg-sample-btn" style="
          padding: 8px 14px; background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);
          border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">
          Sample Data
        </button>
        <button id="reg-clear-btn" style="
          padding: 8px 14px; background: rgba(239,68,68,0.08); color: #f87171; border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer;">
          Clear Points
        </button>
      </div>

      <!-- Hyperparameters Slider -->
      <div style="display: flex; align-items: center; gap: 12px; font-size: 0.8rem; color: var(--text-secondary);">
        <label for="reg-lr-slider" style="display: flex; align-items: center; gap: 6px;">
          <span>Learning Rate (α):</span>
          <input type="range" id="reg-lr-slider" min="0.001" max="0.05" step="0.001" value="0.01" style="cursor: pointer; width: 100px;">
          <span id="reg-lr-val" style="color: #f59e0b; font-weight: 800; font-family: var(--font-mono); min-width: 40px;">0.010</span>
        </label>
      </div>
    </div>
  `;

  // Attach interactive logic once attached to DOM
  setTimeout(() => {
    initRegressionEngine(container);
  }, 50);

  return container;
}

function initRegressionEngine(container) {
  const canvas = container.querySelector('#regression-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Internal dataset normalized from 0 to 1
  let points = [
    { x: 0.15, y: 0.22 },
    { x: 0.25, y: 0.38 },
    { x: 0.40, y: 0.46 },
    { x: 0.55, y: 0.62 },
    { x: 0.70, y: 0.73 },
    { x: 0.85, y: 0.91 }
  ];

  let w = 0.0;
  let b = 0.0;
  let lr = 0.01;
  let epochs = 0;
  let isRunning = false;
  let animId = null;

  const weightEl = container.querySelector('#reg-weight-val');
  const biasEl = container.querySelector('#reg-bias-val');
  const lossEl = container.querySelector('#reg-loss-val');
  const epochEl = container.querySelector('#reg-epoch-val');
  const runBtn = container.querySelector('#reg-run-btn');
  const stepBtn = container.querySelector('#reg-step-btn');
  const resetBtn = container.querySelector('#reg-reset-btn');
  const sampleBtn = container.querySelector('#reg-sample-btn');
  const clearBtn = container.querySelector('#reg-clear-btn');
  const lrSlider = container.querySelector('#reg-lr-slider');
  const lrVal = container.querySelector('#reg-lr-val');

  function computeLoss() {
    if (points.length === 0) return 0;
    let sum = 0;
    for (const p of points) {
      const pred = w * p.x + b;
      sum += Math.pow(pred - p.y, 2);
    }
    return sum / points.length;
  }

  function trainStep() {
    if (points.length === 0) return;
    const n = points.length;
    let dw = 0;
    let db = 0;

    for (const p of points) {
      const pred = w * p.x + b;
      const err = pred - p.y;
      dw += (2 / n) * err * p.x;
      db += (2 / n) * err;
    }

    w -= lr * dw;
    b -= lr * db;
    epochs++;
  }

  function updateDashboard() {
    weightEl.textContent = w.toFixed(3);
    biasEl.textContent = b.toFixed(3);
    const loss = computeLoss();
    lossEl.textContent = loss.toFixed(4);
    if (loss < 0.005) {
      lossEl.style.color = '#34d399';
    } else if (loss < 0.03) {
      lossEl.style.color = '#fbbf24';
    } else {
      lossEl.style.color = '#f87171';
    }
    epochEl.textContent = epochs;
  }

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    const pad = 40;

    // Background
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, W, H);

    // Coordinate Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = pad + (i / 10) * (W - 2 * pad);
      const y = H - pad - (i / 10) * (H - 2 * pad);
      // Vertical
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, H - pad);
      ctx.stroke();
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(W - pad, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, H - pad);
    ctx.lineTo(W - pad, H - pad);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px monospace';
    ctx.fillText('0', pad - 12, H - pad + 15);
    ctx.fillText('X (Input)', W / 2, H - 12);
    ctx.save();
    ctx.translate(14, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Y (Outcome)', 0, 0);
    ctx.restore();

    // Residual error lines (dashed red)
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
    ctx.lineWidth = 1.5;
    for (const p of points) {
      const px = pad + p.x * (W - 2 * pad);
      const py = H - pad - p.y * (H - 2 * pad);
      const predY = w * p.x + b;
      const clampedPredY = Math.max(0, Math.min(1.2, predY));
      const lineY = H - pad - clampedPredY * (H - 2 * pad);

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, lineY);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Fitted Line (Amber / Emerald glow)
    const x0 = 0;
    const y0 = w * x0 + b;
    const x1 = 1;
    const y1 = w * x1 + b;

    const screenX0 = pad;
    const screenY0 = H - pad - y0 * (H - 2 * pad);
    const screenX1 = W - pad;
    const screenY1 = H - pad - y1 * (H - 2 * pad);

    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(screenX0, screenY0);
    ctx.lineTo(screenX1, screenY1);
    ctx.stroke();
    ctx.restore();

    // Data points (Cyan circles with glow)
    for (const p of points) {
      const px = pad + p.x * (W - 2 * pad);
      const py = H - pad - p.y * (H - 2 * pad);

      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function loop() {
    if (isRunning) {
      for (let i = 0; i < 5; i++) {
        trainStep();
      }
      updateDashboard();
      draw();
      animId = requestAnimationFrame(loop);
    }
  }

  // Click on canvas to add points
  canvas.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const W = canvas.width;
    const H = canvas.height;
    const pad = 40;

    const scaleX = W / rect.width;
    const scaleY = H / rect.height;

    const actualX = clientX * scaleX;
    const actualY = clientY * scaleY;

    if (actualX >= pad && actualX <= W - pad && actualY >= pad && actualY <= H - pad) {
      const normX = (actualX - pad) / (W - 2 * pad);
      const normY = (H - pad - actualY) / (H - 2 * pad);
      points.push({ x: normX, y: normY });
      updateDashboard();
      draw();
    }
  });

  runBtn.addEventListener('click', () => {
    isRunning = !isRunning;
    if (isRunning) {
      runBtn.innerHTML = '⏸ Pause';
      runBtn.style.background = '#38bdf8';
      loop();
    } else {
      runBtn.innerHTML = '▶ Run Descent';
      runBtn.style.background = '#f59e0b';
      if (animId) cancelAnimationFrame(animId);
    }
  });

  stepBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) trainStep();
    updateDashboard();
    draw();
  });

  resetBtn.addEventListener('click', () => {
    isRunning = false;
    if (animId) cancelAnimationFrame(animId);
    runBtn.innerHTML = '▶ Run Descent';
    runBtn.style.background = '#f59e0b';
    w = 0.0;
    b = 0.0;
    epochs = 0;
    updateDashboard();
    draw();
  });

  sampleBtn.addEventListener('click', () => {
    points = [];
    const trueW = 0.65 + Math.random() * 0.4;
    const trueB = 0.1 + Math.random() * 0.2;
    for (let i = 0; i < 8; i++) {
      const x = 0.1 + (i / 7) * 0.8;
      const noise = (Math.random() - 0.5) * 0.15;
      const y = Math.max(0.05, Math.min(0.95, trueW * x + trueB + noise));
      points.push({ x, y });
    }
    epochs = 0;
    w = 0.0;
    b = 0.0;
    updateDashboard();
    draw();
  });

  clearBtn.addEventListener('click', () => {
    points = [];
    epochs = 0;
    w = 0.0;
    b = 0.0;
    updateDashboard();
    draw();
  });

  lrSlider.addEventListener('input', (e) => {
    lr = parseFloat(e.target.value);
    lrVal.textContent = lr.toFixed(3);
  });

  updateDashboard();
  draw();
}
