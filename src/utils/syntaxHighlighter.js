// Fast and elegant Java syntax highlighter

export function highlightJava(code) {
  if (!code) return '';

  // Escape HTML characters first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Placeholders for comments and strings to protect them from keyword replacement
  const tokens = [];
  const saveToken = (str, className) => {
    const placeholder = `___TOKEN_${tokens.length}___`;
    tokens.push(`<span class="${className}">${str}</span>`);
    return placeholder;
  };

  // 1. Comments
  escaped = escaped.replace(/\/\/[^\n]*/g, match => saveToken(match, 'code-comment'));
  escaped = escaped.replace(/\/\*[\s\S]*?\*\//g, match => saveToken(match, 'code-comment'));

  // 2. Strings and Characters
  escaped = escaped.replace(/"(\\.|[^"\\])*"/g, match => saveToken(match, 'code-string'));
  escaped = escaped.replace(/'(\\.|[^'\\])'/g, match => saveToken(match, 'code-string'));

  // 3. Annotations (@Override, etc.)
  escaped = escaped.replace(/@[a-zA-Z_]\w*/g, match => saveToken(match, 'code-annotation'));

  // 4. Java Keywords
  const keywords = [
    'public', 'private', 'protected', 'class', 'interface', 'enum',
    'static', 'final', 'void', 'return', 'new', 'if', 'else', 'for',
    'while', 'do', 'switch', 'case', 'break', 'continue', 'default',
    'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package',
    'this', 'super', 'null', 'true', 'false', 'instanceof'
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  escaped = escaped.replace(keywordRegex, '<span class="code-keyword">$1</span>');

  // 5. Built-in Types & Collections
  const types = [
    'int', 'long', 'double', 'float', 'char', 'boolean', 'byte', 'short',
    'String', 'Integer', 'Long', 'Double', 'Boolean', 'Character',
    'List', 'ArrayList', 'LinkedList', 'Set', 'HashSet', 'TreeSet', 'LinkedHashSet',
    'Map', 'HashMap', 'TreeMap', 'LinkedHashMap',
    'Queue', 'Deque', 'ArrayDeque', 'PriorityQueue', 'Stack',
    'Arrays', 'Collections', 'Math', 'StringBuilder', 'StringBuffer',
    'TreeNode', 'ListNode', 'Node', 'Comparator', 'Comparable'
  ];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  escaped = escaped.replace(typeRegex, '<span class="code-type">$1</span>');

  // 6. Numbers
  escaped = escaped.replace(/\b(\d+(\.\d+)?([fFdDlL])?)\b/g, '<span class="code-number">$1</span>');

  // 7. Method calls (identifier followed by '(')
  escaped = escaped.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, (match, p1) => {
    if (keywords.includes(p1) || types.includes(p1)) return match;
    return `<span class="code-method">${p1}</span>`;
  });

  // Restore tokens
  tokens.forEach((tokenHtml, idx) => {
    escaped = escaped.replace(`___TOKEN_${idx}___`, tokenHtml);
  });

  return escaped;
}
