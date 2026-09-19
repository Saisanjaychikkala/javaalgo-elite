// Stack Interactive Visualizer (LIFO with call stack metaphor)

export function renderStackVisualizer(container) {
  let stack = [];
  let message = '';
  let lastAction = '';

  function render() {
    const MAX = 7;
    container.innerHTML = `
      <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
        
        <!-- Stack Visual (vertical) -->
        <div style="flex: 1; min-width: 220px;">
          <div style="text-align: center; margin-bottom: 14px;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Stack (${stack.length}/${MAX})</span>
          </div>
          
          <!-- TOP label -->
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; justify-content: center;">
            <div style="height: 1px; flex: 1; background: ${stack.length > 0 ? '#38bdf8' : 'transparent'};"></div>
            <span style="font-size: 0.75rem; color: ${stack.length > 0 ? '#38bdf8' : 'var(--text-muted)'}; font-weight: 800;">↑ TOP</span>
            <div style="height: 1px; flex: 1; background: ${stack.length > 0 ? '#38bdf8' : 'transparent'};"></div>
          </div>

          <!-- Stack cells (top to bottom) -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; min-height: 280px;">
            ${Array.from({ length: MAX }, (_, rawI) => {
              const i = MAX - 1 - rawI; // flip: stack[MAX-1] is at top visually
              const isEmpty = i >= stack.length;
              const isTop = i === stack.length - 1;
              const isNew = lastAction === 'push' && isTop;
              return `
                <div style="
                  width: 180px; height: 40px; display: flex; align-items: center; justify-content: center;
                  background: ${isEmpty ? 'rgba(255,255,255,0.02)' : isTop ? 'rgba(56,189,248,0.2)' : 'rgba(30,41,59,0.8)'};
                  border: ${isEmpty ? '1px dashed rgba(255,255,255,0.08)' : `2px solid ${isTop ? '#38bdf8' : 'rgba(56,189,248,0.3)'}`};
                  border-radius: 6px; font-size: ${isEmpty ? '0.7rem' : '1.05rem'};
                  font-family: 'Fira Code', monospace; font-weight: ${isTop ? '800' : '600'};
                  color: ${isEmpty ? 'rgba(255,255,255,0.1)' : isTop ? '#38bdf8' : 'var(--text-secondary)'};
                  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                  transform: ${isNew ? 'scale(1.06)' : 'scale(1)'};
                  box-shadow: ${isTop && !isEmpty ? '0 0 16px rgba(56,189,248,0.25)' : 'none'};
                  position: relative;
                ">
                  ${isEmpty ? `<span style="font-size: 0.65rem; opacity: 0.3;">slot ${i}</span>` : stack[i]}
                  ${isTop && !isEmpty ? '<span style="position: absolute; right: 8px; font-size: 0.65rem; color: #38bdf8; opacity: 0.8; font-weight: 800;">← TOP</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- BOTTOM label -->
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px; justify-content: center;">
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.1);"></div>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 800;">BOTTOM</span>
            <div style="height: 1px; flex: 1; background: rgba(255,255,255,0.1);"></div>
          </div>
        </div>

        <!-- Right Panel: Controls + Info -->
        <div style="flex: 2; min-width: 280px; display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Input & Buttons -->
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.05em;">Operations</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
              <input id="stack-val" type="number" value="42" placeholder="Value" style="
                width: 90px; padding: 8px 12px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
                border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
              ">
              <button class="stk-btn" data-act="push" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">
                ⬆️ push(val)
              </button>
              <button class="stk-btn" data-act="pop" style="background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);">
                ⬇️ pop()
              </button>
              <button class="stk-btn" data-act="peek" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">
                👁️ peek()
              </button>
              <button class="stk-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">
                ↺
              </button>
            </div>
          </div>

          <!-- Message -->
          <div style="
            padding: 12px 16px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; font-size: 0.87rem; font-family: 'Fira Code', monospace; color: #a5b4fc;
            min-height: 48px; display: flex; align-items: center;
          ">${message || '← Click push/pop/peek to see LIFO in action'}</div>

          <!-- LIFO Explainer -->
          <div class="card" style="padding: 16px 18px; background: rgba(56,189,248,0.06);">
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 8px; font-size: 0.9rem;">🔑 LIFO = Last In, First Out</div>
            <div style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6;">
              Like a stack of plates — you always <strong style="color: #fff;">add to the top</strong> and <strong style="color: #fff;">remove from the top</strong>. 
              The plate you put on LAST is the first one you'll use.
            </div>
          </div>

          <!-- Real World Uses -->
          <div class="card" style="padding: 16px 18px;">
            <div style="font-weight: 700; margin-bottom: 10px; font-size: 0.9rem;">🌍 Real World Examples</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${[
                { icon: '🔙', label: 'Browser Back Button', desc: 'Each page visit pushed. Back = pop.' },
                { icon: '↩️', label: 'Ctrl + Z (Undo)', desc: 'Each action pushed. Undo = pop.' },
                { icon: '📞', label: 'Function Call Stack', desc: 'foo() calls bar() — bar must return first!' },
                { icon: '✅', label: 'Balanced Parentheses', desc: 'Push opens. Match & pop for closes.' }
              ].map(({ icon, label, desc }) => `
                <div style="display: flex; gap: 8px; font-size: 0.82rem;">
                  <span>${icon}</span>
                  <div><span style="color: var(--text-primary); font-weight: 600;">${label}</span> — <span style="color: var(--text-muted);">${desc}</span></div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- O(1) all operations -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${['push()', 'pop()', 'peek()', 'isEmpty()'].map(op => `
              <div style="
                padding: 6px 12px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);
                border-radius: 8px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;
              ">
                <span style="color: var(--text-muted); font-family: 'Fira Code', monospace;">${op}</span>
                <span style="color: #34d399; font-weight: 800; font-family: 'Fira Code', monospace;">O(1)</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Wire buttons
    container.querySelectorAll('.stk-btn').forEach(btn => {
      btn.style.cssText += '; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });
  }

  function handleAction(act) {
    const valInput = container.querySelector('#stack-val');
    const val = parseInt(valInput?.value) || 42;
    lastAction = act;

    if (act === 'reset') {
      stack = [];
      message = '↺ Stack cleared.';
    } else if (act === 'push') {
      if (stack.length >= 7) {
        message = '❌ Stack Overflow! Stack is full. In Java, StackOverflowError happens in infinite recursion.';
      } else {
        stack.push(val);
        message = `⬆️ push(${val}) → Added to TOP. Stack size: ${stack.length}. O(1) — no shifting!`;
      }
    } else if (act === 'pop') {
      if (stack.length === 0) {
        message = '❌ Stack Underflow! Cannot pop from empty stack. Always check isEmpty() first!';
      } else {
        const popped = stack.pop();
        message = `⬇️ pop() → Removed ${popped} from TOP. Stack size: ${stack.length}. O(1) operation.`;
      }
    } else if (act === 'peek') {
      if (stack.length === 0) {
        message = '👁️ peek() → Stack is empty. Returns null in Java.';
      } else {
        message = `👁️ peek() → Top element is ${stack[stack.length - 1]}. NOT removed. Stack unchanged. O(1).`;
      }
    }

    render();
  }

  // Seed with some initial values
  stack = [10, 25, 7];
  message = '👋 Stack initialized with [10, 25, 7] — 7 is on top. Try push/pop/peek!';
  render();
}
