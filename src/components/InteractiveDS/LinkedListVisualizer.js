// Linked List Interactive Visualizer

export function renderLinkedListVisualizer(container) {
  let nodes = [15, 42, 7, 93, 28];
  let highlightIndex = -1;
  let highlightType = '';
  let message = '';

  function render() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <input id="ll-val" type="number" value="99" placeholder="Value" style="
            width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
          ">
          <input id="ll-idx" type="number" value="2" placeholder="Index" min="0" style="
            width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
          ">
          <button class="ll-btn" data-act="insert-head" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">⬅️ Insert HEAD</button>
          <button class="ll-btn" data-act="insert-tail" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">➡️ Insert TAIL</button>
          <button class="ll-btn" data-act="insert-mid" style="background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3);">↕️ Insert at Index</button>
          <button class="ll-btn" data-act="delete-head" style="background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);">🗑️ Delete HEAD</button>
          <button class="ll-btn" data-act="reverse" style="background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3);">🔄 Reverse</button>
          <button class="ll-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺ Reset</button>
        </div>

        <!-- Message -->
        <div style="
          min-height: 36px; padding: 8px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-size: 0.88rem; font-family: 'Fira Code', monospace; color: #a5b4fc;
        ">${message || '← Click an operation to see pointer re-wiring in action'}</div>

        <!-- Linked List Visual -->
        <div style="overflow-x: auto; padding: 16px 0;">
          <div style="display: flex; align-items: center; gap: 0; min-width: fit-content; padding: 8px 16px;">
            
            <!-- HEAD label -->
            <div style="
              display: flex; flex-direction: column; align-items: center; margin-right: 8px;
              font-size: 0.7rem; color: #34d399; font-weight: 800; text-transform: uppercase;
            ">
              <div style="width: 2px; height: 20px; background: #34d399;"></div>
              <div style="margin: 4px 0;">HEAD</div>
              <div>▼</div>
            </div>

            ${nodes.length === 0 ? `
              <div style="
                padding: 20px 40px; background: rgba(255,255,255,0.04); border: 2px dashed rgba(255,255,255,0.15);
                border-radius: 12px; color: var(--text-muted); font-size: 0.9rem;
              ">null (empty list)</div>
            ` : nodes.map((val, i) => {
              const isHighlight = i === highlightIndex;
              let bg = 'rgba(30,41,59,0.9)';
              let border = 'rgba(168,85,247,0.4)';
              let color = 'var(--text-primary)';
              let shadow = 'none';
              
              if (isHighlight) {
                if (highlightType === 'insert') { bg = 'rgba(16,185,129,0.2)'; border = '#34d399'; color = '#34d399'; shadow = '0 0 20px rgba(16,185,129,0.3)'; }
                if (highlightType === 'delete') { bg = 'rgba(244,63,94,0.2)'; border = '#f43f5e'; color = '#f43f5e'; shadow = '0 0 20px rgba(244,63,94,0.3)'; }
                if (highlightType === 'reverse') { bg = 'rgba(251,191,36,0.2)'; border = '#fbbf24'; color = '#fbbf24'; shadow = '0 0 20px rgba(251,191,36,0.3)'; }
              }
              
              const isLast = i === nodes.length - 1;
              return `
                <div style="display: flex; align-items: center;">
                  <!-- Node Box -->
                  <div style="
                    display: flex; border-radius: 10px; overflow: hidden;
                    border: 2px solid ${border}; box-shadow: ${shadow};
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    transform: ${isHighlight ? 'scale(1.07) translateY(-3px)' : 'scale(1)'};
                  ">
                    <!-- Data field -->
                    <div style="
                      padding: 10px 16px; background: ${bg}; font-size: 1.05rem; font-weight: 700;
                      font-family: 'Fira Code', monospace; color: ${color}; min-width: 48px; text-align: center;
                    ">
                      <div style="font-size: 0.6rem; color: rgba(255,255,255,0.3); margin-bottom: 2px;">DATA</div>
                      ${val}
                    </div>
                    <!-- Next pointer field -->
                    <div style="
                      padding: 10px 10px; background: rgba(15,23,42,0.6); border-left: 1px solid ${border};
                      font-size: 0.7rem; color: rgba(255,255,255,0.3); font-family: 'Fira Code', monospace;
                      display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 32px;
                    ">
                      <div style="margin-bottom: 2px;">NEXT</div>
                      <div style="color: ${isLast ? '#f43f5e' : '#38bdf8'}; font-size: 0.65rem;">${isLast ? 'null' : '→'}</div>
                    </div>
                  </div>
                  
                  <!-- Arrow between nodes -->
                  ${!isLast ? `
                    <div style="
                      display: flex; align-items: center; color: #38bdf8; font-size: 1.2rem; margin: 0 2px;
                    ">──→</div>
                  ` : ''}
                </div>
              `;
            }).join('')}

            ${nodes.length > 0 ? `
              <!-- null terminator -->
              <div style="
                margin-left: 4px; padding: 6px 12px; background: rgba(244,63,94,0.1);
                border: 1px solid rgba(244,63,94,0.3); border-radius: 8px;
                font-size: 0.8rem; color: #f43f5e; font-family: 'Fira Code', monospace; font-weight: 700;
              ">null</div>
            ` : ''}
          </div>
        </div>

        <!-- Index positions -->
        <div style="overflow-x: auto; padding: 0 16px;">
          <div style="display: flex; align-items: center; gap: 0; min-width: fit-content;">
            <div style="width: 62px; font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">Index</div>
            ${nodes.map((_, i) => `
              <div style="
                width: 76px; text-align: center; font-size: 0.78rem; color: var(--text-muted); font-weight: 600;
              ">[${i}]</div>
            `).join('')}
          </div>
        </div>

        <!-- Big O comparison table -->
        <div class="card" style="padding: 18px; overflow-x: auto;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Linked List vs Array Comparison</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; min-width: 400px;">
            ${[
              { op: 'Operation', ll: 'Linked List', arr: 'Array', header: true },
              { op: 'Access by index', ll: 'O(N) ❌', arr: 'O(1) ✅' },
              { op: 'Insert at HEAD', ll: 'O(1) ✅', arr: 'O(N) ❌' },
              { op: 'Insert at TAIL', ll: 'O(1) ✅', arr: 'O(1) ✅' },
              { op: 'Insert at MID', ll: 'O(N) to find', arr: 'O(N) to shift' },
              { op: 'Search', ll: 'O(N) ❌', arr: 'O(N) ❌' },
              { op: 'Delete at HEAD', ll: 'O(1) ✅', arr: 'O(N) ❌' },
              { op: 'Memory', ll: 'Scattered', arr: 'Contiguous ✅' },
            ].map(row => `
              <div style="padding: 7px 12px; background: rgba(15,23,42,0.5); border: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; ${row.header ? 'color: var(--text-muted); font-weight: 700;' : 'color: var(--text-secondary);'}">${row.op}</div>
              <div style="padding: 7px 12px; background: rgba(168,85,247,0.06); border: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; text-align: center; ${row.header ? 'color: #c084fc; font-weight: 700;' : 'color: var(--text-secondary); font-family: Fira Code, monospace;'}">${row.ll}</div>
              <div style="padding: 7px 12px; background: rgba(56,189,248,0.06); border: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; text-align: center; ${row.header ? 'color: #38bdf8; font-weight: 700;' : 'color: var(--text-secondary); font-family: Fira Code, monospace;'}">${row.arr}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.ll-btn').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });
  }

  function handleAction(act) {
    const val = parseInt(container.querySelector('#ll-val')?.value) || 99;
    const idx = parseInt(container.querySelector('#ll-idx')?.value) || 0;

    if (act === 'reset') {
      nodes = [15, 42, 7, 93, 28];
      highlightIndex = -1;
      highlightType = '';
      message = '↺ Reset to original list.';
    } else if (act === 'insert-head') {
      nodes.unshift(val);
      highlightIndex = 0;
      highlightType = 'insert';
      message = `⬅️ Insert ${val} at HEAD: Create new node → point newNode.next to old HEAD → update HEAD reference. O(1)!`;
    } else if (act === 'insert-tail') {
      nodes.push(val);
      highlightIndex = nodes.length - 1;
      highlightType = 'insert';
      message = `➡️ Insert ${val} at TAIL: Walk to last node (O(N) without tail ptr) → lastNode.next = newNode. O(1) with tail pointer!`;
    } else if (act === 'insert-mid') {
      if (idx < 0 || idx > nodes.length) {
        message = `❌ Index ${idx} out of range [0, ${nodes.length}]`;
      } else {
        nodes.splice(idx, 0, val);
        highlightIndex = idx;
        highlightType = 'insert';
        message = `↕️ Insert ${val} at index ${idx}: Walk ${idx} steps to prev node (O(N)) → prev.next = newNode → newNode.next = oldNode. Pointer rewiring only!`;
      }
    } else if (act === 'delete-head') {
      if (nodes.length === 0) {
        message = '❌ Cannot delete from empty list!';
      } else {
        const deleted = nodes[0];
        nodes.shift();
        highlightIndex = 0;
        highlightType = 'delete';
        message = `🗑️ Deleted HEAD (${deleted}): Just move HEAD = HEAD.next. Old head gets garbage collected. O(1)!`;
        setTimeout(() => { highlightIndex = -1; render(); }, 800);
      }
    } else if (act === 'reverse') {
      nodes.reverse();
      highlightType = 'reverse';
      highlightIndex = -1;
      message = `🔄 Reversed! Algorithm: Use 3 pointers (prev=null, curr=head, nextTemp). Walk: nextTemp=curr.next → curr.next=prev → prev=curr → curr=nextTemp. O(N).`;
    }

    render();
  }

  render();
  message = '👋 Try inserting/deleting nodes to see pointer manipulation!';
  render();
}
