// Graph Interactive Visualizer (BFS / DFS with SVG canvas)

export function renderGraphVisualizer(container) {
  // Fixed graph: node positions (for reproducibility)
  const nodeData = [
    { id: 0, label: 'A', x: 0.5, y: 0.12 },
    { id: 1, label: 'B', x: 0.2, y: 0.38 },
    { id: 2, label: 'C', x: 0.8, y: 0.38 },
    { id: 3, label: 'D', x: 0.1, y: 0.72 },
    { id: 4, label: 'E', x: 0.4, y: 0.72 },
    { id: 5, label: 'F', x: 0.65, y: 0.72 },
    { id: 6, label: 'G', x: 0.9, y: 0.72 },
  ];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[4,5]]; // undirected
  const adj = Array.from({ length: 7 }, () => []);
  edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u); });

  let visitedSet = new Set();
  let traversalLog = [];
  let queueOrStack = [];
  let startNode = 0;
  let traversalType = '';
  let message = '';
  let currentStep = -1;
  let steps = []; // Each step: { visited: Set, current: id, frontier: [] }

  function buildBFSSteps(start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    const log = [];
    const allSteps = [{ visited: new Set([start]), current: start, frontier: [...queue], label: `BFS Start: Queue = [${nodeData[start].label}]` }];

    while (queue.length) {
      const node = queue.shift();
      log.push(node);
      const nb = adj[node].filter(n => !visited.has(n));
      nb.forEach(n => { visited.add(n); queue.push(n); });
      if (queue.length > 0 || nb.length > 0) {
        allSteps.push({
          visited: new Set(visited),
          current: node,
          frontier: [...queue],
          label: `Visited ${nodeData[node].label}, Queue = [${queue.map(i => nodeData[i].label).join(', ')}]`
        });
      }
    }
    allSteps.push({ visited: new Set(visited), current: -1, frontier: [], label: `BFS Complete! Order: ${log.map(i => nodeData[i].label).join(' → ')}` });
    return allSteps;
  }

  function buildDFSSteps(start) {
    const visited = new Set();
    const log = [];
    const allSteps = [];

    function dfs(node) {
      visited.add(node);
      log.push(node);
      allSteps.push({
        visited: new Set(visited),
        current: node,
        frontier: [],
        label: `DFS: Visiting ${nodeData[node].label}. Visited = [${log.map(i => nodeData[i].label).join(', ')}]`
      });
      for (const nb of adj[node]) {
        if (!visited.has(nb)) dfs(nb);
      }
    }
    dfs(start);
    allSteps.push({ visited: new Set(visited), current: -1, frontier: [], label: `DFS Complete! Order: ${log.map(i => nodeData[i].label).join(' → ')}` });
    return allSteps;
  }

  function render() {
    const W = 520, H = 300;

    const currentStepData = steps[currentStep];
    const currVisited = currentStepData?.visited || new Set();
    const currCurrent = currentStepData?.current ?? -1;
    const currFrontier = currentStepData?.frontier || [];

    // SVG edges
    const edgeSVGs = edges.map(([u, v]) => {
      const nu = nodeData[u], nv = nodeData[v];
      const x1 = nu.x * W, y1 = nu.y * H, x2 = nv.x * W, y2 = nv.y * H;
      const bothVisited = currVisited.has(u) && currVisited.has(v);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="${bothVisited ? 'rgba(56,189,248,0.6)' : 'rgba(255,255,255,0.12)'}"
        stroke-width="${bothVisited ? 2.5 : 1.5}" stroke-dasharray="${bothVisited ? 'none' : '4,4'}"/>`;
    }).join('');

    // SVG nodes
    const nodeSVGs = nodeData.map(({ id, label, x, y }) => {
      const px = x * W, py = y * H;
      const isVisited = currVisited.has(id);
      const isCurrent = id === currCurrent;
      const isFrontier = currFrontier.includes(id);

      let fill = 'rgba(30,41,59,0.95)';
      let stroke = 'rgba(255,255,255,0.15)';
      let textColor = '#94a3b8';
      let shadow = 'none';

      if (isCurrent) { fill = 'rgba(249,115,22,0.35)'; stroke = '#f97316'; textColor = '#fff'; shadow = 'drop-shadow(0 0 12px rgba(249,115,22,0.6))'; }
      else if (isVisited) { fill = 'rgba(16,185,129,0.25)'; stroke = '#34d399'; textColor = '#34d399'; }
      else if (isFrontier) { fill = 'rgba(56,189,248,0.2)'; stroke = '#38bdf8'; textColor = '#38bdf8'; }

      return `
        <g class="graph-node" data-id="${id}" style="cursor: pointer;">
          <circle cx="${px}" cy="${py}" r="24" fill="${fill}" stroke="${stroke}" stroke-width="2.5"
            style="transition: all 0.4s ease; filter: ${shadow}"/>
          <text x="${px}" y="${py + 5}" text-anchor="middle" font-size="14" font-weight="800"
            font-family="Fira Code, monospace" fill="${textColor}">${label}</text>
        </g>
      `;
    }).join('');

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        
        <!-- Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Start:</label>
            <select id="graph-start" style="
              padding: 6px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
              border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
            ">
              ${nodeData.map(n => `<option value="${n.id}" ${n.id === startNode ? 'selected' : ''}>${n.label}</option>`).join('')}
            </select>
          </div>
          <button class="gr-btn" data-act="bfs" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">🌊 BFS (Queue)</button>
          <button class="gr-btn" data-act="dfs" style="background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3);">🕳️ DFS (Recursion)</button>
          <button class="gr-btn" data-act="next" style="background: rgba(249,115,22,0.15); color: #f97316; border: 1px solid rgba(249,115,22,0.3);" ${steps.length === 0 ? 'disabled style="opacity:0.4"' : ''}>▶ Next Step</button>
          <button class="gr-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺ Reset</button>
        </div>

        <!-- Message -->
        <div style="
          min-height: 36px; padding: 8px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-size: 0.87rem; font-family: 'Fira Code', monospace; color: #a5b4fc; line-height: 1.5;
        ">${currentStepData?.label || message || '← Select a start node, then click BFS or DFS. Press "Next Step" to animate!'}</div>

        <!-- Graph SVG -->
        <div style="background: rgba(15,23,42,0.5); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px; overflow-x: auto;">
          <svg width="100%" viewBox="0 0 ${W} ${H}" style="overflow: visible; display: block; min-height: 200px;">
            ${edgeSVGs}
            ${nodeSVGs}
          </svg>
        </div>

        <!-- Progress bar -->
        ${steps.length > 0 ? `
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700;">Step ${Math.max(0, currentStep + 1)} of ${steps.length}</span>
              <span style="font-size: 0.78rem; color: ${traversalType === 'bfs' ? '#38bdf8' : '#c084fc'}; font-weight: 700; text-transform: uppercase;">${traversalType === 'bfs' ? '🌊 BFS' : '🕳️ DFS'}</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${((currentStep + 1) / steps.length) * 100}%; background: ${traversalType === 'bfs' ? 'linear-gradient(90deg, #38bdf8, #818cf8)' : 'linear-gradient(90deg, #c084fc, #f43f5e)'}; border-radius: 3px; transition: width 0.3s;"></div>
            </div>
          </div>
        ` : ''}

        <!-- Legend -->
        <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700;">Legend:</span>
          ${[
            { color: '#f97316', label: 'Currently Visiting' },
            { color: '#34d399', label: 'Visited' },
            { color: '#38bdf8', label: 'In Queue/Frontier' },
            { color: 'rgba(255,255,255,0.15)', label: 'Unvisited' },
          ].map(({ color, label }) => `
            <div style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: var(--text-muted);">
              <div style="width: 14px; height: 14px; border-radius: 50%; background: ${color};"></div>
              <span>${label}</span>
            </div>
          `).join('')}
        </div>

        <!-- BFS vs DFS explainer -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="card" style="padding: 16px; border-color: rgba(56,189,248,0.3);">
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 8px;">🌊 BFS — Breadth-First Search</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6;">
              Uses a <strong style="color: var(--text-primary);">Queue</strong> (FIFO).<br>
              Explores all neighbors at distance 1, then distance 2...<br>
              <strong style="color: #34d399;">✅ Best for: Shortest path</strong> in unweighted graphs.<br>
              Time: O(V + E). Space: O(V).
            </div>
          </div>
          <div class="card" style="padding: 16px; border-color: rgba(168,85,247,0.3);">
            <div style="font-weight: 700; color: #c084fc; margin-bottom: 8px;">🕳️ DFS — Depth-First Search</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6;">
              Uses <strong style="color: var(--text-primary);">Recursion</strong> (implicit stack).<br>
              Goes as deep as possible before backtracking.<br>
              <strong style="color: #34d399;">✅ Best for: Cycle detection, topological sort</strong>.<br>
              Time: O(V + E). Space: O(V) recursion stack.
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.gr-btn').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });

    container.querySelector('#graph-start')?.addEventListener('change', e => {
      startNode = parseInt(e.target.value);
      steps = []; currentStep = -1; message = `Start node set to ${nodeData[startNode].label}. Click BFS or DFS!`;
      render();
    });

    // Node click to set start
    container.querySelectorAll('.graph-node').forEach(el => {
      el.addEventListener('click', () => {
        startNode = parseInt(el.dataset.id);
        steps = []; currentStep = -1;
        message = `Start node set to ${nodeData[startNode].label}. Click BFS or DFS!`;
        render();
      });
    });
  }

  function handleAction(act) {
    if (act === 'bfs') {
      traversalType = 'bfs';
      steps = buildBFSSteps(startNode);
      currentStep = 0;
      message = `BFS starting from node ${nodeData[startNode].label}. Press "Next Step" to advance!`;
    } else if (act === 'dfs') {
      traversalType = 'dfs';
      steps = buildDFSSteps(startNode);
      currentStep = 0;
      message = `DFS starting from node ${nodeData[startNode].label}. Press "Next Step" to advance!`;
    } else if (act === 'next') {
      if (currentStep < steps.length - 1) {
        currentStep++;
      }
    } else if (act === 'reset') {
      steps = []; currentStep = -1; traversalType = '';
      message = '↺ Reset. Click a node or select start, then BFS or DFS.';
    }
    render();
  }

  message = '👋 7-node undirected graph. Click any node to set start, then run BFS or DFS!';
  render();
}
