// Array Interactive Visualizer

export function renderArrayVisualizer(container) {
  let arr = [15, 42, 7, 93, 28, 61, 8, 37];
  let highlightIndex = -1;
  let highlightType = ''; // 'access', 'insert', 'delete', 'search'
  let message = '';

  function render() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input id="arr-val-input" type="number" placeholder="Value" value="99" style="
              width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
              border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
            ">
            <input id="arr-idx-input" type="number" placeholder="Index" value="2" min="0" style="
              width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
              border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
            ">
          </div>
          <button class="btn-viz" data-action="access" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">🔍 Access[i]</button>
          <button class="btn-viz" data-action="insert-end" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">➕ Insert at End</button>
          <button class="btn-viz" data-action="insert-mid" style="background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3);">↕️ Insert at Index</button>
          <button class="btn-viz" data-action="delete-idx" style="background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);">🗑️ Delete at Index</button>
          <button class="btn-viz" data-action="search" style="background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3);">🔎 Search Value</button>
          <button class="btn-viz" data-action="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺ Reset</button>
        </div>

        <!-- Message -->
        <div id="arr-msg" style="
          min-height: 36px; padding: 8px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-size: 0.88rem; font-family: 'Fira Code', monospace; color: #a5b4fc;
          ${message ? '' : 'opacity: 0.5;'}
        ">${message || '← Click an operation above to see what happens step by step'}</div>

        <!-- Array Cells -->
        <div style="overflow-x: auto; padding-bottom: 8px;">
          <div style="display: flex; flex-direction: column; gap: 0; min-width: fit-content;">
            <!-- Index labels -->
            <div style="display: flex;">
              <div style="width: 70px; flex-shrink: 0; font-size: 0.75rem; color: var(--text-muted); text-align: center; padding: 4px 0; font-weight: 700;">INDEX</div>
              ${arr.map((_, i) => `
                <div style="
                  width: 64px; text-align: center; font-size: 0.72rem; color: ${i === highlightIndex ? 'var(--primary)' : 'var(--text-muted)'};
                  font-weight: ${i === highlightIndex ? '800' : '600'}; padding: 4px 0;
                "> ${i}</div>
              `).join('')}
            </div>

            <!-- Value cells -->
            <div style="display: flex; align-items: center;">
              <div style="width: 70px; flex-shrink: 0; font-size: 0.75rem; color: var(--text-muted); text-align: center; font-weight: 700;">VALUE</div>
              ${arr.map((val, i) => {
                let cellBg = 'rgba(15,23,42,0.8)';
                let cellBorder = 'var(--border-subtle)';
                let cellColor = 'var(--text-primary)';
                let cellShadow = 'none';
                
                if (i === highlightIndex) {
                  if (highlightType === 'access') { cellBg = 'rgba(56,189,248,0.2)'; cellBorder = '#38bdf8'; cellColor = '#38bdf8'; cellShadow = '0 0 20px rgba(56,189,248,0.3)'; }
                  if (highlightType === 'insert') { cellBg = 'rgba(16,185,129,0.2)'; cellBorder = '#34d399'; cellColor = '#34d399'; cellShadow = '0 0 20px rgba(16,185,129,0.3)'; }
                  if (highlightType === 'delete') { cellBg = 'rgba(244,63,94,0.2)'; cellBorder = '#f43f5e'; cellColor = '#f43f5e'; cellShadow = '0 0 20px rgba(244,63,94,0.3)'; }
                  if (highlightType === 'search') { cellBg = 'rgba(251,191,36,0.2)'; cellBorder = '#fbbf24'; cellColor = '#fbbf24'; cellShadow = '0 0 20px rgba(251,191,36,0.3)'; }
                }
                return `
                  <div class="arr-cell" data-i="${i}" style="
                    width: 64px; height: 56px; display: flex; align-items: center; justify-content: center;
                    background: ${cellBg}; border: 2px solid ${cellBorder}; font-size: 1.05rem; font-weight: 700;
                    font-family: 'Fira Code', monospace; color: ${cellColor}; cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: ${cellShadow};
                    ${i === highlightIndex ? 'transform: translateY(-4px) scale(1.05);' : ''}
                  ">${val}</div>
                `;
              }).join('')}
            </div>

            <!-- Memory address row -->
            <div style="display: flex; margin-top: 4px;">
              <div style="width: 70px; flex-shrink: 0; font-size: 0.7rem; color: var(--text-muted); text-align: center; font-weight: 700;">ADDR</div>
              ${arr.map((_, i) => `
                <div style="
                  width: 64px; text-align: center; font-size: 0.65rem; color: rgba(255,255,255,0.2);
                  padding: 3px 0; font-family: 'Fira Code', monospace;
                ">${1000 + i * 4}</div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Big O card -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${[
            { op: 'Access arr[i]', tc: 'O(1)', color: '#34d399' },
            { op: 'Insert at end', tc: 'O(1)', color: '#34d399' },
            { op: 'Insert at mid', tc: 'O(N)', color: '#f97316' },
            { op: 'Search', tc: 'O(N)', color: '#f97316' },
            { op: 'Delete at mid', tc: 'O(N)', color: '#f97316' },
          ].map(({ op, tc, color }) => `
            <div style="
              padding: 6px 14px; background: rgba(15,23,42,0.7); border: 1px solid var(--border-subtle);
              border-radius: 8px; display: flex; align-items: center; gap: 8px; font-size: 0.8rem;
            ">
              <span style="color: var(--text-muted);">${op}</span>
              <span style="color: ${color}; font-weight: 800; font-family: 'Fira Code', monospace;">${tc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Wire buttons
    container.querySelectorAll('.btn-viz').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.action));
    });

    // Wire cell click for access
    container.querySelectorAll('.arr-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const i = parseInt(cell.dataset.i);
        highlightIndex = i;
        highlightType = 'access';
        message = `✅ arr[${i}] = ${arr[i]}  → Address: ${1000 + i * 4}. Computed in O(1): base_addr + (${i} × 4) = ${1000 + i * 4}`;
        render();
      });
    });
  }

  function handleAction(action) {
    const valInput = container.querySelector('#arr-val-input');
    const idxInput = container.querySelector('#arr-idx-input');
    const val = parseInt(valInput?.value) || 99;
    const idx = parseInt(idxInput?.value) || 0;

    if (action === 'reset') {
      arr = [15, 42, 7, 93, 28, 61, 8, 37];
      highlightIndex = -1;
      highlightType = '';
      message = '↺ Array reset to original values.';
    }
    else if (action === 'access') {
      if (idx < 0 || idx >= arr.length) {
        message = `❌ ArrayIndexOutOfBoundsException! Index ${idx} is out of range [0, ${arr.length - 1}]`;
        highlightIndex = -1;
      } else {
        highlightIndex = idx;
        highlightType = 'access';
        message = `✅ arr[${idx}] = ${arr[idx]}  → Memory address: ${1000 + idx * 4}  → O(1) direct access!`;
      }
    }
    else if (action === 'insert-end') {
      arr.push(val);
      highlightIndex = arr.length - 1;
      highlightType = 'insert';
      message = `✅ Inserted ${val} at END (index ${arr.length - 1}). O(1) amortized — no shifting needed!`;
    }
    else if (action === 'insert-mid') {
      if (idx < 0 || idx > arr.length) {
        message = `❌ Invalid index ${idx}. Must be 0 to ${arr.length}.`;
      } else {
        arr.splice(idx, 0, val);
        highlightIndex = idx;
        highlightType = 'insert';
        message = `✅ Inserted ${val} at index ${idx}. Shifted ${arr.length - 1 - idx} elements RIGHT. O(N) time!`;
      }
    }
    else if (action === 'delete-idx') {
      if (idx < 0 || idx >= arr.length) {
        message = `❌ Invalid index ${idx}. Must be 0 to ${arr.length - 1}.`;
      } else {
        const deleted = arr[idx];
        arr.splice(idx, 1);
        highlightIndex = Math.min(idx, arr.length - 1);
        highlightType = 'delete';
        message = `🗑️ Deleted ${deleted} at index ${idx}. Shifted ${arr.length - idx} elements LEFT to fill gap. O(N) time!`;
      }
    }
    else if (action === 'search') {
      const found = arr.indexOf(val);
      if (found === -1) {
        highlightIndex = -1;
        message = `🔎 Searched for ${val}. Not found! Checked all ${arr.length} elements. O(N) time.`;
      } else {
        highlightIndex = found;
        highlightType = 'search';
        message = `🔎 Found ${val} at index ${found} (checked ${found + 1} element${found > 0 ? 's' : ''})! O(N) time — had to scan sequentially.`;
      }
    }

    render();
  }

  render();
}
