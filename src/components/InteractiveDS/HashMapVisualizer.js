// HashMap Interactive Visualizer (Bucket + Hashing Demo)

export function renderHashMapVisualizer(container) {
  const NUM_BUCKETS = 8;
  let buckets = Array.from({ length: NUM_BUCKETS }, () => []);
  let lastKey = '';
  let lastBucket = -1;
  let message = '';
  let operations = [];

  function simpleHash(key) {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = (h * 31 + key.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(h) % NUM_BUCKETS;
  }

  function render() {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Controls -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <input id="hm-key" type="text" value="apple" placeholder="Key (String)" style="
            width: 100px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
          ">
          <input id="hm-val" type="number" value="5" placeholder="Value" style="
            width: 80px; padding: 7px 10px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
            border-radius: 8px; color: var(--text-primary); font-size: 0.9rem;
          ">
          <button class="hm-btn" data-act="put" style="background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);">📥 map.put(key, val)</button>
          <button class="hm-btn" data-act="get" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">🔍 map.get(key)</button>
          <button class="hm-btn" data-act="remove" style="background: rgba(244,63,94,0.15); color: #f43f5e; border: 1px solid rgba(244,63,94,0.3);">🗑️ map.remove(key)</button>
          <button class="hm-btn" data-act="reset" style="background: rgba(255,255,255,0.06); color: var(--text-muted); border: 1px solid var(--border-subtle);">↺ Reset</button>
        </div>

        <!-- Message -->
        <div style="
          min-height: 42px; padding: 10px 14px; background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle);
          border-radius: 8px; font-size: 0.87rem; font-family: 'Fira Code', monospace; color: #a5b4fc; line-height: 1.5;
        ">${message || '← Try: put("apple", 5), put("banana", 3), get("apple"). See how hashing works!'}</div>

        <!-- Buckets Visual -->
        <div style="display: flex; gap: 0; align-items: stretch;">
          <!-- Bucket column -->
          <div style="display: flex; flex-direction: column; flex: 1; gap: 0;">
            <div style="
              padding: 6px 12px; background: rgba(56,189,248,0.1); border: 1px solid var(--border-subtle);
              font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; display: flex; gap: 12px;
            ">
              <span style="width: 60px;">Bucket #</span>
              <span>Entries (Key → Value chains)</span>
            </div>
            ${buckets.map((bucket, i) => {
              const isActive = i === lastBucket;
              return `
                <div style="
                  display: flex; align-items: center; gap: 0; border: 1px solid ${isActive ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.05)'};
                  border-top: none; background: ${isActive ? 'rgba(249,115,22,0.06)' : (i % 2 === 0 ? 'rgba(15,23,42,0.4)' : 'transparent')};
                  transition: background 0.3s ease; min-height: 44px;
                ">
                  <!-- Bucket number -->
                  <div style="
                    width: 60px; flex-shrink: 0; text-align: center; font-size: 0.82rem; font-weight: 700;
                    padding: 10px 8px; border-right: 1px solid rgba(255,255,255,0.05);
                    color: ${isActive ? '#f97316' : 'var(--text-muted)'};
                    font-family: 'Fira Code', monospace;
                  ">[${i}]</div>
                  
                  <!-- Chain of entries -->
                  <div style="display: flex; align-items: center; gap: 0; padding: 8px 10px; flex-wrap: wrap; gap: 4px;">
                    ${bucket.length === 0 ? `
                      <span style="font-size: 0.75rem; color: rgba(255,255,255,0.15); font-family: 'Fira Code', monospace;">null</span>
                    ` : bucket.map((entry, j) => `
                      <div style="display: flex; align-items: center; gap: 2px;">
                        ${j > 0 ? '<span style="color: rgba(255,255,255,0.3); font-size: 0.8rem; margin: 0 2px;">→</span>' : ''}
                        <div style="
                          display: flex; border-radius: 6px; overflow: hidden; border: 1px solid ${entry.key === lastKey ? 'rgba(249,115,22,0.6)' : 'rgba(168,85,247,0.3)'};
                          box-shadow: ${entry.key === lastKey ? '0 0 10px rgba(249,115,22,0.2)' : 'none'};
                        ">
                          <div style="
                            padding: 4px 9px; background: ${entry.key === lastKey ? 'rgba(249,115,22,0.15)' : 'rgba(168,85,247,0.1)'};
                            font-size: 0.8rem; color: ${entry.key === lastKey ? '#f97316' : '#c084fc'}; font-family: 'Fira Code', monospace; font-weight: 700;
                          ">"${entry.key}"</div>
                          <div style="
                            padding: 4px 9px; background: rgba(15,23,42,0.6); border-left: 1px solid rgba(255,255,255,0.05);
                            font-size: 0.8rem; color: var(--text-primary); font-family: 'Fira Code', monospace; font-weight: 600;
                          ">${entry.val}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Load Factor -->
        <div>
          ${(() => {
            const totalEntries = buckets.flat().length;
            const loadFactor = (totalEntries / NUM_BUCKETS).toFixed(2);
            const pct = Math.min(Math.round((totalEntries / (NUM_BUCKETS * 0.75)) * 100), 100);
            const needsRehash = parseFloat(loadFactor) > 0.75;
            return `
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 700;">Load Factor: <span style="color: ${needsRehash ? '#f43f5e' : '#34d399'}; font-family: 'Fira Code', monospace;">${loadFactor}</span> (${totalEntries} entries / ${NUM_BUCKETS} buckets)</span>
                ${needsRehash ? '<span style="font-size: 0.75rem; color: #f43f5e; font-weight: 700; background: rgba(244,63,94,0.1); padding: 3px 8px; border-radius: 4px;">⚡ Would trigger rehash!</span>' : ''}
              </div>
              <div style="height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;">
                <div style="
                  height: 100%; width: ${pct}%; border-radius: 4px;
                  background: ${needsRehash ? 'linear-gradient(90deg, #f97316, #f43f5e)' : 'linear-gradient(90deg, #34d399, #38bdf8)'};
                  transition: width 0.4s ease;
                "></div>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Java HashMap rehashes when load factor exceeds <strong style="color: #fbbf24;">0.75</strong> — doubles bucket count and redistributes all entries.</div>
            `;
          })()}
        </div>

        <!-- Operations Log -->
        ${operations.length > 0 ? `
          <div class="card" style="padding: 14px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Operation Log (Latest First)</div>
            <div style="display: flex; flex-direction: column; gap: 3px; max-height: 120px; overflow-y: auto;">
              ${[...operations].reverse().slice(0, 6).map(op => `
                <div style="font-size: 0.8rem; color: var(--text-secondary); font-family: 'Fira Code', monospace; padding: 4px 8px; background: rgba(15,23,42,0.4); border-radius: 4px;">${op}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    container.querySelectorAll('.hm-btn').forEach(btn => {
      btn.style.cssText += '; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.83rem; font-weight: 600;';
      btn.addEventListener('click', () => handleAction(btn.dataset.act));
    });
  }

  function handleAction(act) {
    const key = (container.querySelector('#hm-key')?.value || 'key').trim();
    const val = parseInt(container.querySelector('#hm-val')?.value) || 0;
    lastKey = key;
    const bucket = simpleHash(key);
    lastBucket = bucket;

    if (act === 'reset') {
      buckets = Array.from({ length: NUM_BUCKETS }, () => []);
      lastKey = '';
      lastBucket = -1;
      operations = [];
      message = '↺ HashMap cleared. Try inserting some values!';
    } else if (act === 'put') {
      const hashSteps = `hashCode("${key}") % ${NUM_BUCKETS} = bucket[${bucket}]`;
      const existing = buckets[bucket].find(e => e.key === key);
      if (existing) {
        const oldVal = existing.val;
        existing.val = val;
        message = `📥 put("${key}", ${val}): ${hashSteps}\n→ Key already in bucket[${bucket}], updated value: ${oldVal} → ${val}. O(1) avg.`;
        operations.push(`put("${key}", ${val}) → bucket[${bucket}] (UPDATE: ${oldVal}→${val})`);
      } else {
        buckets[bucket].push({ key, val });
        const chainLen = buckets[bucket].length;
        message = `📥 put("${key}", ${val}): ${hashSteps}\n→ ${chainLen > 1 ? `⚠️ Collision! Chained with ${chainLen - 1} existing entry${chainLen > 2 ? 's' : ''}. ` : ''}Stored in bucket[${bucket}]. O(1) avg.`;
        operations.push(`put("${key}", ${val}) → bucket[${bucket}] ${chainLen > 1 ? '(COLLISION!)' : ''}`);
      }
    } else if (act === 'get') {
      const hashSteps = `hashCode("${key}") % ${NUM_BUCKETS} = bucket[${bucket}]`;
      const found = buckets[bucket].find(e => e.key === key);
      if (found) {
        message = `🔍 get("${key}"): ${hashSteps}\n→ ✅ Found! Value = ${found.val}. O(1) avg — direct bucket lookup, no full scan!`;
        operations.push(`get("${key}") → ${found.val} (found in bucket[${bucket}])`);
      } else {
        message = `🔍 get("${key}"): ${hashSteps}\n→ ❌ Key not found in bucket[${bucket}]. Returns null. O(1) avg.`;
        operations.push(`get("${key}") → null (not found in bucket[${bucket}])`);
      }
    } else if (act === 'remove') {
      const hashSteps = `hashCode("${key}") % ${NUM_BUCKETS} = bucket[${bucket}]`;
      const idx = buckets[bucket].findIndex(e => e.key === key);
      if (idx !== -1) {
        const removed = buckets[bucket][idx];
        buckets[bucket].splice(idx, 1);
        message = `🗑️ remove("${key}"): ${hashSteps}\n→ Removed entry {${key}: ${removed.val}} from bucket[${bucket}]. O(1) avg.`;
        operations.push(`remove("${key}") → removed from bucket[${bucket}]`);
      } else {
        message = `🗑️ remove("${key}"): ${hashSteps}\n→ Key not found in bucket[${bucket}]. Nothing removed.`;
      }
      lastKey = '';
    }

    render();
  }

  // Seed with initial values
  [['apple', 5], ['banana', 3], ['cherry', 8], ['date', 2], ['elderberry', 7]].forEach(([k, v]) => {
    const b = simpleHash(k);
    const existing = buckets[b].find(e => e.key === k);
    if (existing) existing.val = v;
    else buckets[b].push({ key: k, val: v });
  });
  message = '👋 Pre-loaded 5 entries. Try get("apple"), put("fig", 12), or cause a collision!';
  render();
}
