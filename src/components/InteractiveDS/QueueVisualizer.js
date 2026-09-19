// Queue Interactive Visualizer (FIFO with BFS application)

export function renderQueueVisualizer(container) {
  let queue = [10, 25, 7, 48];
  let message = '';
  let lastAction = '';
  let highlightFront = false;
  let highlightBack = false;
  const MAX = 8;

  function render() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <input id="q-val" type="number" value="99" placeholder="Value" style="
            width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
          ">
          <button class="q-btn" data-act="enqueue" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">➕ enqueue(val)</button>
          <button class="q-btn" data-act="dequeue" style="background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);">📤 dequeue()</button>
          <button class="q-btn" data-act="peek" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">👁️ peek()</button>
          <button class="q-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺ Reset</button>
        </div>

        <!-- Message -->
        <div style="
          min-height: 36px; padding: 8px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-size: 0.88rem; font-family: 'Fira Code', monospace; color: #a5b4fc;
        ">${message || '← Click enqueue/dequeue to see FIFO in action'}</div>

        <!-- Queue Visualization (Horizontal) -->
        <div style="overflow-x: auto; padding: 16px 0;">
          <!-- ENTER FROM RIGHT label -->
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px; justify-content: flex-end; padding-right: 20px;">
            <span style="font-size: 0.7rem; color: #34d399; font-weight: 800; text-transform: uppercase;">ENQUEUE (enter from back) ➡</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0; min-width: fit-content; padding: 0 16px;">
            
            <!-- FRONT label -->
            <div style="
              display: flex; flex-direction: column; align-items: center; margin-right: 10px;
              font-size: 0.7rem; color: #f43f5e; font-weight: 800; text-transform: uppercase;
            ">
              <div>⬅ EXIT</div>
              <div>FRONT</div>
            </div>

            ${queue.length === 0 ? `
              <div style="
                padding: 24px 60px; background: rgba(255,255,255,0.03); border: 2px dashed rgba(255,255,255,0.1);
                border-radius: 12px; color: var(--text-muted); font-size: 0.9rem;
              ">Queue is empty (null)</div>
            ` : queue.map((val, i) => {
              const isFront = i === 0;
              const isBack = i === queue.length - 1;
              let bg = 'rgba(30,41,59,0.9)';
              let border = 'rgba(251,191,36,0.3)';
              let color = 'var(--text-primary)';
              let shadow = 'none';
              
              if (isFront && highlightFront) {
                bg = 'rgba(244,63,94,0.2)'; border = '#f43f5e'; color = '#f43f5e'; shadow = '0 0 20px rgba(244,63,94,0.25)';
              }
              if (isBack && highlightBack) {
                bg = 'rgba(16,185,129,0.2)'; border = '#34d399'; color = '#34d399'; shadow = '0 0 20px rgba(16,185,129,0.25)';
              }
              
              return `
                <div style="display: flex; align-items: center;">
                  <div style="
                    width: 64px; height: 64px; display: flex; flex-direction: column; align-items: center; justify-content: center;
                    background: ${bg}; border: 2px solid ${border};
                    border-left: ${i === 0 ? `2px solid ${border}` : 'none'};
                    font-size: 1.05rem; font-weight: 700; font-family: 'Fira Code', monospace; color: ${color};
                    transition: all 0.3s ease; box-shadow: ${shadow};
                    transform: ${(isFront && highlightFront) || (isBack && highlightBack) ? 'scale(1.06)' : 'scale(1)'};
                  ">
                    ${val}
                    ${isFront ? '<div style="font-size: 0.55rem; color: #f43f5e; font-weight: 800; margin-top: 3px;">FRONT</div>' : ''}
                    ${isBack ? '<div style="font-size: 0.55rem; color: #34d399; font-weight: 800; margin-top: 3px;">BACK</div>' : ''}
                  </div>
                </div>
              `;
            }).join('')}

            <!-- BACK label -->
            <div style="
              display: flex; flex-direction: column; align-items: center; margin-left: 10px;
              font-size: 0.7rem; color: #34d399; font-weight: 800; text-transform: uppercase;
            ">
              <div>BACK</div>
              <div>ENTER ➡</div>
            </div>
          </div>

          <!-- EXIT FROM LEFT label -->
          <div style="display: flex; align-items: center; gap: 4px; margin-top: 8px; padding-left: 20px;">
            <span style="font-size: 0.7rem; color: #f43f5e; font-weight: 800; text-transform: uppercase;">⬅ DEQUEUE (exit from front)</span>
          </div>
        </div>

        <!-- BFS Pattern Demo -->
        <div class="card" style="padding: 18px;">
          <div style="font-weight: 700; color: #fbbf24; margin-bottom: 10px; font-size: 0.95rem;">🌊 Queue's Most Important Use: BFS (Breadth-First Search)</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">BFS visits nodes level by level — exactly what Queue enables:</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.7; font-family: 'Fira Code', monospace; background: rgba(15,23,42,0.8); padding: 12px; border-radius: 8px;">
                Level 0: [A]<br>
                Level 1: [B, C]<br>
                Level 2: [D, E, F]<br>
                <br>
                Queue: [A] → dequeue A → enqueue B,C<br>
                Queue: [B,C] → dequeue B → enqueue D,E<br>
                Queue: [C,D,E] → dequeue C → enqueue F<br>
                Queue: [D,E,F] → ...
              </div>
            </div>
            <div>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">Key BFS template (know this cold):</div>
              <pre style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; font-size: 0.75rem; color: #a5b4fc; margin: 0; overflow-x: auto;"><code>Queue&lt;Node&gt; q = new ArrayDeque&lt;&gt;();
q.offer(root);
while (!q.isEmpty()) {
  int size = q.size(); // level size!
  for (int i = 0; i &lt; size; i++) {
    Node node = q.poll();
    // process node
    for (Node nb : node.neighbors)
      if (!visited[nb]) q.offer(nb);
  }
  // one full level done
}</code></pre>
            </div>
          </div>
        </div>

        <!-- O(1) operations -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${[
            { op: 'offer()', tc: 'O(1)', desc: 'Add to back' },
            { op: 'poll()', tc: 'O(1)', desc: 'Remove from front' },
            { op: 'peek()', tc: 'O(1)', desc: 'View front' },
            { op: 'PQ offer()', tc: 'O(log N)', desc: 'Priority Queue' },
            { op: 'PQ poll()', tc: 'O(log N)', desc: 'Priority Queue' },
          ].map(({ op, tc, desc }) => `
            <div style="
              padding: 6px 14px; background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle);
              border-radius: 8px; display: flex; align-items: center; gap: 8px; font-size: 0.8rem;
            ">
              <span style="color: var(--text-muted); font-family: 'Fira Code', monospace;">${op}</span>
              <span style="color: #34d399; font-weight: 800; font-family: 'Fira Code', monospace;">${tc}</span>
              <span style="color: rgba(255,255,255,0.2);">· ${desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.q-btn').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });
  }

  function handleAction(act) {
    const val = parseInt(container.querySelector('#q-val')?.value) || 99;
    highlightFront = false;
    highlightBack = false;

    if (act === 'reset') {
      queue = [10, 25, 7, 48];
      message = '↺ Queue reset.';
    } else if (act === 'enqueue') {
      if (queue.length >= MAX) {
        message = `❌ Queue full! Maximum ${MAX} elements.`;
      } else {
        queue.push(val);
        highlightBack = true;
        message = `✅ offer(${val}) → Added to BACK. FIFO: new arrivals go to the BACK of the line. O(1).`;
      }
    } else if (act === 'dequeue') {
      if (queue.length === 0) {
        message = '❌ Queue is empty! poll() returns null when empty (use poll, NOT remove()).';
      } else {
        const removed = queue.shift();
        highlightFront = true;
        message = `📤 poll() → Removed ${removed} from FRONT. FIFO: first in, first served. O(1). Queue size: ${queue.length}.`;
        setTimeout(() => { highlightFront = false; render(); }, 600);
      }
    } else if (act === 'peek') {
      if (queue.length === 0) {
        message = '👁️ peek() → Queue is empty. Returns null.';
      } else {
        highlightFront = true;
        message = `👁️ peek() → Front element is ${queue[0]}. NOT removed. Queue unchanged (${queue.length} elements). O(1).`;
      }
    }

    render();
  }

  render();
}
