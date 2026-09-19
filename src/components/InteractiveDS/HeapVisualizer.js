// Heap (Min-Heap) Interactive Visualizer

export function renderHeapVisualizer(container) {
  let heap = [];
  let highlightIdx = -1;
  let highlightType = '';
  let message = '';

  const parent = i => Math.floor((i - 1) / 2);
  const left   = i => 2 * i + 1;
  const right  = i => 2 * i + 2;

  function swap(arr, i, j) { [arr[i], arr[j]] = [arr[j], arr[i]]; }

  function heapifyUp(arr, i) {
    while (i > 0 && arr[parent(i)] > arr[i]) {
      swap(arr, i, parent(i));
      i = parent(i);
    }
  }

  function heapifyDown(arr, i) {
    const n = arr.length;
    while (true) {
      let smallest = i;
      if (left(i) < n && arr[left(i)] < arr[smallest]) smallest = left(i);
      if (right(i) < n && arr[right(i)] < arr[smallest]) smallest = right(i);
      if (smallest === i) break;
      swap(arr, i, smallest);
      i = smallest;
    }
  }

  function insert(val) {
    heap.push(val);
    heapifyUp(heap, heap.length - 1);
  }

  function extractMin() {
    if (heap.length === 0) return null;
    const min = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    heapifyDown(heap, 0);
    return min;
  }

  // Get tree node positions from array index
  function getPos(i, depth, leftPct, rightPct) {
    const x = ((leftPct + rightPct) / 2);
    const y = depth * 64 + 36;
    return { x, y };
  }

  function renderHeapTree() {
    if (heap.length === 0) return '<div style="height: 120px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">Heap is empty</div>';

    const W = 540, PADDING = 20;
    const edges = [];
    const nodeEls = [];

    function addNodes(idx, depth, leftPct, rightPct) {
      if (idx >= heap.length) return;
      const { x, y } = getPos(idx, depth, leftPct, rightPct);
      const px = x * (W - 2 * PADDING) + PADDING;

      // Draw edges to children
      const li = left(idx), ri = right(idx);
      if (li < heap.length) {
        const { x: lx, y: ly } = getPos(li, depth + 1, leftPct, (leftPct + rightPct) / 2);
        const lpx = lx * (W - 2 * PADDING) + PADDING;
        edges.push(`<line x1="${px}" y1="${y}" x2="${lpx}" y2="${ly}" stroke="rgba(56,189,248,0.3)" stroke-width="2"/>`);
        addNodes(li, depth + 1, leftPct, (leftPct + rightPct) / 2);
      }
      if (ri < heap.length) {
        const { x: rx, y: ry } = getPos(ri, depth + 1, (leftPct + rightPct) / 2, rightPct);
        const rpx = rx * (W - 2 * PADDING) + PADDING;
        edges.push(`<line x1="${px}" y1="${y}" x2="${rpx}" y2="${ry}" stroke="rgba(56,189,248,0.3)" stroke-width="2"/>`);
        addNodes(ri, depth + 1, (leftPct + rightPct) / 2, rightPct);
      }

      const isRoot = idx === 0;
      const isHighlight = idx === highlightIdx;
      let fill = 'rgba(30,41,59,0.95)', stroke = 'rgba(244,63,94,0.4)', textColor = '#e2e8f0';
      if (isRoot) { stroke = '#f43f5e'; }
      if (isHighlight) {
        if (highlightType === 'insert') { fill = 'rgba(16,185,129,0.25)'; stroke = '#34d399'; textColor = '#34d399'; }
        if (highlightType === 'extract') { fill = 'rgba(244,63,94,0.25)'; stroke = '#f43f5e'; textColor = '#f43f5e'; }
        if (highlightType === 'peek') { fill = 'rgba(56,189,248,0.25)'; stroke = '#38bdf8'; textColor = '#38bdf8'; }
      }

      nodeEls.push(`
        <g>
          <circle cx="${px}" cy="${y}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2.5"
            style="filter: ${isHighlight ? `drop-shadow(0 0 10px ${stroke}88)` : 'none'}; transition: all 0.3s ease;"/>
          <text x="${px}" y="${y + 5}" text-anchor="middle" font-size="13" font-weight="700"
            font-family="Fira Code, monospace" fill="${textColor}">${heap[idx]}</text>
          ${isRoot ? `<text x="${px}" y="${y + 37}" text-anchor="middle" font-size="9" fill="#f43f5e" font-weight="800">MIN</text>` : ''}
          <text x="${px + 18}" y="${y - 16}" font-size="9" fill="rgba(255,255,255,0.2)" font-family="Fira Code">[${idx}]</text>
        </g>
      `);
    }

    addNodes(0, 0, 0, 1);

    const maxDepth = Math.floor(Math.log2(heap.length));
    const H = (maxDepth + 1) * 64 + 60;

    return `<svg width="100%" viewBox="0 0 ${W} ${H}" style="overflow: visible; display: block;">
      ${edges.join('')}
      ${nodeEls.join('')}
    </svg>`;
  }

  function render() {
    container.innerHTML = `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        
        <!-- Left: Tree view + controls -->
        <div style="flex: 2; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Controls -->
          <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            <input id="heap-val" type="number" value="15" placeholder="Value" style="
              width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
              border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
            ">
            <button class="heap-btn" data-act="insert" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">⬆️ offer(val)</button>
            <button class="heap-btn" data-act="extract" style="background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);">⬇️ poll() (extract min)</button>
            <button class="heap-btn" data-act="peek" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">👁️ peek()</button>
            <button class="heap-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺</button>
          </div>

          <!-- Message -->
          <div style="
            min-height: 42px; padding: 8px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; font-size: 0.87rem; font-family: 'Fira Code', monospace; color: #a5b4fc; line-height: 1.5;
          ">${message || '← offer() inserts and bubbles UP. poll() removes min and bubbles DOWN.'}</div>

          <!-- Tree SVG -->
          <div style="background: rgba(15,23,42,0.5); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px; overflow-x: auto;">
            ${renderHeapTree()}
          </div>
        </div>

        <!-- Right: Array representation + explainer -->
        <div style="flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Array representation -->
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Array Representation</div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              ${heap.map((val, i) => {
                const isMin = i === 0;
                const isHighlight = i === highlightIdx;
                return `
                  <div style="
                    display: flex; align-items: center; gap: 8px; padding: 7px 12px;
                    background: ${isHighlight ? 'rgba(16,185,129,0.12)' : isMin ? 'rgba(244,63,94,0.08)' : 'rgba(15,23,42,0.5)'};
                    border: 1px solid ${isHighlight ? 'rgba(16,185,129,0.3)' : isMin ? 'rgba(244,63,94,0.3)' : 'rgba(255,255,255,0.05)'};
                    border-radius: 6px; transition: all 0.3s ease;
                  ">
                    <span style="font-size: 0.7rem; color: rgba(255,255,255,0.25); font-family: 'Fira Code', monospace; width: 20px;">[${i}]</span>
                    <span style="font-size: 0.9rem; font-weight: 700; font-family: 'Fira Code', monospace; color: ${isMin ? '#f43f5e' : isHighlight ? '#34d399' : 'var(--text-primary)'};">${val}</span>
                    <span style="font-size: 0.7rem; color: rgba(255,255,255,0.2); margin-left: auto; font-family: 'Fira Code', monospace;">
                      ${i === 0 ? 'root/min' : `par=[${parent(i)}]`}
                    </span>
                  </div>
                `;
              }).join('')}
              ${heap.length === 0 ? '<div style="padding: 16px; color: var(--text-muted); text-align: center; font-size: 0.85rem;">Empty</div>' : ''}
            </div>
          </div>

          <!-- Heap Property Explainer -->
          <div class="card" style="padding: 16px;">
            <div style="font-weight: 700; color: #f43f5e; margin-bottom: 8px; font-size: 0.9rem;">🏔️ Min-Heap Property</div>
            <div style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
              For EVERY node: <code style="color: #a5b4fc; background: rgba(99,102,241,0.1); padding: 1px 5px; border-radius: 3px;">parent ≤ children</code><br>
              → Root is ALWAYS the minimum!<br>
              → NOT fully sorted (e.g., left child can be > right child)
            </div>
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 8px; font-size: 0.88rem;">📐 Array Index Formula</div>
            <div style="font-size: 0.8rem; font-family: 'Fira Code', monospace; color: var(--text-secondary); line-height: 1.9;">
              <span style="color: #c084fc;">Parent(i)</span> = (i-1)/2<br>
              <span style="color: #34d399;">Left(i)</span>   = 2i+1<br>
              <span style="color: #34d399;">Right(i)</span>  = 2i+2
            </div>
          </div>

          <!-- Operations -->
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${[
              { op: 'peek() → min', tc: 'O(1)', why: 'Root is always at index 0' },
              { op: 'offer(x)', tc: 'O(log N)', why: 'Insert at end, bubble UP' },
              { op: 'poll() → min', tc: 'O(log N)', why: 'Remove root, bubble DOWN' },
              { op: 'build heap', tc: 'O(N)', why: 'Heapify from last non-leaf' },
            ].map(({ op, tc, why }) => `
              <div style="padding: 8px 12px; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                  <span style="font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #c084fc;">${op}</span>
                  <span style="color: #34d399; font-weight: 800; font-size: 0.8rem; font-family: 'Fira Code', monospace;">${tc}</span>
                </div>
                <div style="font-size: 0.74rem; color: var(--text-muted);">${why}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.heap-btn').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });
  }

  function handleAction(act) {
    const val = parseInt(container.querySelector('#heap-val')?.value) || 15;
    highlightIdx = -1;

    if (act === 'reset') {
      heap = [];
      [30, 15, 50, 5, 20, 45, 60].forEach(v => insert(v));
      message = '↺ Reset. Min is always the ROOT. Notice how the array represents a tree!';
    } else if (act === 'insert') {
      heap.push(val);
      highlightIdx = heap.length - 1;
      highlightType = 'insert';
      const before = [...heap];
      heapifyUp(heap, heap.length - 1);
      highlightIdx = heap.indexOf(val);
      message = `⬆️ offer(${val}): Added to END (index ${before.length - 1}), then bubbled UP comparing with parent until heap property restored. O(log N).`;
    } else if (act === 'extract') {
      if (heap.length === 0) {
        message = '❌ Heap is empty! poll() returns null.';
      } else {
        const min = heap[0];
        highlightType = 'extract';
        highlightIdx = 0;
        const removed = extractMin();
        message = `⬇️ poll() → Returns ${removed} (always the minimum!). Last element moved to root, then bubbled DOWN. O(log N).`;
      }
    } else if (act === 'peek') {
      if (heap.length === 0) {
        message = '👁️ peek() → Heap is empty. Returns null.';
      } else {
        highlightIdx = 0;
        highlightType = 'peek';
        message = `👁️ peek() → ${heap[0]} is the MINIMUM. Root is always at index [0]. O(1) — no computation needed!`;
      }
    }

    render();
  }

  // Seed
  [30, 15, 50, 5, 20, 45, 60].forEach(v => insert(v));
  message = '👋 Min-Heap initialized! The root (red) is always the MINIMUM. Try offer() and poll()!';
  render();
}
