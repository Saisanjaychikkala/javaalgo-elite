// Binary Tree / BST Interactive Visualizer

export function renderTreeVisualizer(container, isBST = false) {
  let nodes = [];
  let highlightId = null;
  let highlightType = '';
  let traversalOrder = [];
  let traversalStep = -1;
  let message = '';
  let nextId = 1;

  // Tree node: { id, val, left, right }
  // We'll store as an array-backed structure with parent links
  let root = null;

  class TNode {
    constructor(val) {
      this.val = val;
      this.id = nextId++;
      this.left = null;
      this.right = null;
    }
  }

  function insertBST(node, val) {
    if (!node) return new TNode(val);
    if (val < node.val) node.left = insertBST(node.left, val);
    else if (val > node.val) node.right = insertBST(node.right, val);
    return node;
  }

  function insertBT(node, val) {
    // Level-order insert (complete binary tree)
    const newNode = new TNode(val);
    if (!node) return newNode;
    const queue = [node];
    while (queue.length) {
      const curr = queue.shift();
      if (!curr.left) { curr.left = newNode; return node; }
      else queue.push(curr.left);
      if (!curr.right) { curr.right = newNode; return node; }
      else queue.push(curr.right);
    }
    return node;
  }

  function getInOrder(node, result = []) {
    if (!node) return result;
    getInOrder(node.left, result);
    result.push(node.id);
    getInOrder(node.right, result);
    return result;
  }
  function getPreOrder(node, result = []) {
    if (!node) return result;
    result.push(node.id);
    getPreOrder(node.left, result);
    getPreOrder(node.right, result);
    return result;
  }
  function getPostOrder(node, result = []) {
    if (!node) return result;
    getPostOrder(node.left, result);
    getPostOrder(node.right, result);
    result.push(node.id);
    return result;
  }
  function getLevelOrder(node) {
    if (!node) return [];
    const result = [], queue = [node];
    while (queue.length) {
      const curr = queue.shift();
      result.push(curr.id);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return result;
  }

  // Compute positions for SVG rendering
  function computePositions(node, depth = 0, leftBound = 0, rightBound = 1, positions = {}) {
    if (!node) return positions;
    const x = (leftBound + rightBound) / 2;
    const y = depth * 70 + 40;
    positions[node.id] = { x, y, node };
    computePositions(node.left, depth + 1, leftBound, x, positions);
    computePositions(node.right, depth + 1, x, rightBound, positions);
    return positions;
  }

  function getHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }

  function renderSVG(positions) {
    const W = 560, PADDING = 20;
    const height = getHeight(root);
    const H = Math.max(160, height * 70 + 60);

    const edges = [];
    const nodeEls = [];

    Object.entries(positions).forEach(([id, { x, y, node }]) => {
      const px = x * (W - 2 * PADDING) + PADDING;
      const py = y;

      if (node.left && positions[node.left.id]) {
        const { x: lx, y: ly } = positions[node.left.id];
        const lpx = lx * (W - 2 * PADDING) + PADDING;
        edges.push(`<line x1="${px}" y1="${py}" x2="${lpx}" y2="${ly}" stroke="rgba(56,189,248,0.3)" stroke-width="2"/>`);
      }
      if (node.right && positions[node.right.id]) {
        const { x: rx, y: ry } = positions[node.right.id];
        const rpx = rx * (W - 2 * PADDING) + PADDING;
        edges.push(`<line x1="${px}" y1="${py}" x2="${rpx}" y2="${ry}" stroke="rgba(56,189,248,0.3)" stroke-width="2"/>`);
      }

      const isHighlight = parseInt(id) === highlightId;
      const traversalIdx = traversalOrder.indexOf(parseInt(id));
      const isDone = traversalIdx !== -1 && traversalIdx <= traversalStep;
      const isCurrent = traversalIdx === traversalStep && parseInt(id) === traversalOrder[traversalStep];

      let fill = 'rgba(30,41,59,0.95)';
      let stroke = 'rgba(56,189,248,0.4)';
      let textColor = '#e2e8f0';

      if (isCurrent) { fill = 'rgba(249,115,22,0.35)'; stroke = '#f97316'; textColor = '#f97316'; }
      else if (isDone) { fill = 'rgba(16,185,129,0.2)'; stroke = '#34d399'; textColor = '#34d399'; }
      else if (isHighlight) { fill = 'rgba(56,189,248,0.25)'; stroke = '#38bdf8'; textColor = '#38bdf8'; }

      nodeEls.push(`
        <g class="tree-node" data-id="${id}" style="cursor: pointer;">
          <circle cx="${px}" cy="${py}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2.5"
            style="transition: all 0.3s ease; filter: ${isCurrent ? 'drop-shadow(0 0 8px rgba(249,115,22,0.5))' : 'none'}"/>
          <text x="${px}" y="${py + 5}" text-anchor="middle" font-size="13" font-weight="700"
            font-family="Fira Code, monospace" fill="${textColor}">${node.val}</text>
          ${isDone ? `<text x="${px + 18}" y="${py - 16}" font-size="10" fill="#34d399" font-weight="800">${traversalIdx + 1}</text>` : ''}
        </g>
      `);
    });

    return `<svg width="100%" viewBox="0 0 ${W} ${H}" style="overflow: visible; display: block;">
      ${edges.join('')}
      ${nodeEls.join('')}
    </svg>`;
  }

  function render() {
    const positions = root ? computePositions(root) : {};

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        
        <!-- Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <input id="tree-val" type="number" value="50" placeholder="Value" style="
            width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
          ">
          <button class="tree-btn" data-act="insert" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">➕ Insert</button>
          ${isBST ? '<button class="tree-btn" data-act="search" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">🔍 Search</button>' : ''}
          <button class="tree-btn" data-act="inorder" style="background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3);">📌 In-Order</button>
          <button class="tree-btn" data-act="preorder" style="background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3);">📌 Pre-Order</button>
          <button class="tree-btn" data-act="postorder" style="background: rgba(244,63,94,0.15); color: #f87171; border: 1px solid rgba(244,63,94,0.3);">📌 Post-Order</button>
          <button class="tree-btn" data-act="levelorder" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">🌊 Level-Order</button>
          <button class="tree-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺ Reset</button>
        </div>

        <!-- Message -->
        <div style="
          min-height: 36px; padding: 8px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-size: 0.88rem; font-family: 'Fira Code', monospace; color: #a5b4fc; line-height: 1.5;
        ">${message || '← Insert nodes, then try traversals. Click any node to highlight it!'}</div>

        <!-- Traversal progress -->
        ${traversalOrder.length > 0 ? `
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Order:</span>
            ${traversalOrder.map((id, i) => {
              const n = findNode(root, id);
              return `
                <div style="
                  width: 30px; height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
                  font-size: 0.82rem; font-weight: 700; font-family: 'Fira Code', monospace;
                  background: ${i < traversalStep ? 'rgba(16,185,129,0.2)' : i === traversalStep ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.05)'};
                  border: 1px solid ${i < traversalStep ? 'rgba(16,185,129,0.4)' : i === traversalStep ? '#f97316' : 'rgba(255,255,255,0.08)'};
                  color: ${i <= traversalStep ? '#fff' : 'var(--text-muted)'};
                  cursor: pointer;
                " data-step="${i}">${n ? n.val : '?'}</div>
              `;
            }).join('')}
            <button id="trav-next" style="
              padding: 4px 14px; background: rgba(249,115,22,0.15); border: 1px solid rgba(249,115,22,0.3);
              border-radius: 6px; color: #f97316; cursor: pointer; font-size: 0.82rem; font-weight: 600;
            ">${traversalStep < traversalOrder.length - 1 ? '▶ Next Step' : '✅ Done'}</button>
            <button id="trav-clear" style="
              padding: 4px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
              border-radius: 6px; color: var(--text-muted); cursor: pointer; font-size: 0.82rem;
            ">Clear</button>
          </div>
        ` : ''}

        <!-- Tree SVG -->
        <div style="background: rgba(15,23,42,0.5); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px; min-height: 200px; overflow-x: auto;">
          ${root ? renderSVG(positions) : `
            <div style="height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); gap: 8px;">
              <div style="font-size: 2rem;">🌱</div>
              <div style="font-size: 0.9rem;">Tree is empty. Insert some nodes!</div>
            </div>
          `}
        </div>

        ${root ? `
          <!-- Tree stats -->
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${[
              { label: 'Height', val: getHeight(root) - 1, color: '#38bdf8' },
              { label: 'Nodes', val: countNodes(root), color: '#34d399' },
              { label: 'Leaves', val: countLeaves(root), color: '#c084fc' },
              { label: 'Is Complete?', val: isComplete(root) ? 'Yes' : 'No', color: '#fbbf24' },
              ...(isBST ? [{ label: 'Min', val: findMin(root).val, color: '#34d399' }, { label: 'Max', val: findMax(root).val, color: '#f43f5e' }] : []),
            ].map(({ label, val, color }) => `
              <div style="padding: 6px 14px; background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.82rem;">
                <span style="color: var(--text-muted);">${label}: </span>
                <span style="color: ${color}; font-weight: 800; font-family: 'Fira Code', monospace;">${val}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Wire buttons
    container.querySelectorAll('.tree-btn').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });

    // Node click
    container.querySelectorAll('.tree-node').forEach(el => {
      el.addEventListener('click', () => {
        highlightId = parseInt(el.dataset.id);
        const n = findNode(root, highlightId);
        if (n) message = `Clicked node: val=${n.val}, left=${n.left ? n.left.val : 'null'}, right=${n.right ? n.right.val : 'null'}`;
        render();
      });
    });

    // Traversal next step
    container.querySelector('#trav-next')?.addEventListener('click', () => {
      if (traversalStep < traversalOrder.length - 1) {
        traversalStep++;
        const n = findNode(root, traversalOrder[traversalStep]);
        if (n) message = `Step ${traversalStep + 1}/${traversalOrder.length}: Visiting node ${n.val}`;
      } else {
        message = '✅ Traversal complete! All nodes visited.';
      }
      render();
    });
    container.querySelector('#trav-clear')?.addEventListener('click', () => {
      traversalOrder = []; traversalStep = -1; message = 'Traversal cleared.'; render();
    });
  }

  function findNode(node, id) {
    if (!node) return null;
    if (node.id === id) return node;
    return findNode(node.left, id) || findNode(node.right, id);
  }
  function countNodes(node) { return !node ? 0 : 1 + countNodes(node.left) + countNodes(node.right); }
  function countLeaves(node) { return !node ? 0 : (!node.left && !node.right ? 1 : countLeaves(node.left) + countLeaves(node.right)); }
  function isComplete(node) {
    if (!node) return true;
    const queue = [node]; let foundNull = false;
    while (queue.length) {
      const curr = queue.shift();
      if (!curr.left) foundNull = true;
      else { if (foundNull) return false; queue.push(curr.left); }
      if (!curr.right) foundNull = true;
      else { if (foundNull) return false; queue.push(curr.right); }
    }
    return true;
  }
  function findMin(node) { return node.left ? findMin(node.left) : node; }
  function findMax(node) { return node.right ? findMax(node.right) : node; }

  function handleAction(act) {
    const val = parseInt(container.querySelector('#tree-val')?.value) || 50;
    traversalOrder = []; traversalStep = -1;

    if (act === 'reset') {
      root = null; nextId = 1; highlightId = null; message = '↺ Tree cleared.';
      // Re-seed
      [50, 30, 70, 20, 40, 60, 80].forEach(v => {
        root = isBST ? insertBST(root, v) : insertBT(root, v);
      });
      message = '↺ Reset to default tree with 7 nodes. Try traversals!';
    } else if (act === 'insert') {
      const before = countNodes(root);
      root = isBST ? insertBST(root, val) : insertBT(root, val);
      if (countNodes(root) > before) {
        const n = findNode(root, nextId - 1);
        highlightId = nextId - 1;
        message = `✅ Inserted ${val}. ${isBST ? `BST property: went ${val < 50 ? 'LEFT' : 'RIGHT'} at root.` : 'Placed in next available position (level-order).'}`;
      } else {
        message = `ℹ️ ${val} already exists in BST. Duplicates ignored.`;
      }
    } else if (act === 'search' && isBST) {
      let curr = root, steps = 0;
      while (curr) {
        steps++;
        if (val === curr.val) { highlightId = curr.id; message = `✅ Found ${val} in ${steps} step${steps > 1 ? 's' : ''}! O(log N) = ~${Math.ceil(Math.log2(countNodes(root)))} steps for this tree.`; break; }
        if (val < curr.val) curr = curr.left;
        else curr = curr.right;
        if (!curr) { highlightId = null; message = `❌ ${val} not found after ${steps} steps. O(log N) search in balanced BST.`; }
      }
    } else if (act === 'inorder') {
      traversalOrder = getInOrder(root);
      traversalStep = 0;
      message = `📌 In-Order Traversal (Left → Root → Right): ${traversalOrder.map(id => findNode(root, id)?.val).join(' → ')}${isBST ? ' ← SORTED! In-Order always gives sorted output on BST!' : ''}`;
    } else if (act === 'preorder') {
      traversalOrder = getPreOrder(root);
      traversalStep = 0;
      message = `📌 Pre-Order Traversal (Root → Left → Right): ${traversalOrder.map(id => findNode(root, id)?.val).join(' → ')}. Good for: copying tree, prefix expressions.`;
    } else if (act === 'postorder') {
      traversalOrder = getPostOrder(root);
      traversalStep = 0;
      message = `📌 Post-Order Traversal (Left → Right → Root): ${traversalOrder.map(id => findNode(root, id)?.val).join(' → ')}. Good for: deleting tree, postfix expressions.`;
    } else if (act === 'levelorder') {
      traversalOrder = getLevelOrder(root);
      traversalStep = 0;
      message = `🌊 Level-Order Traversal (BFS): ${traversalOrder.map(id => findNode(root, id)?.val).join(' → ')}. Uses a Queue! Visits nodes level by level.`;
    }

    render();
  }

  // Seed initial tree
  [50, 30, 70, 20, 40, 60, 80].forEach(v => {
    root = isBST ? insertBST(root, v) : insertBT(root, v);
  });
  message = `👋 ${isBST ? 'BST' : 'Binary Tree'} initialized! Click nodes to inspect, or try the traversal buttons. Press "Next Step" to animate each visit.`;
  render();
}
