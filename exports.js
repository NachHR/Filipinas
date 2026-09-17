/* V8.9.0 — Local UTF-8 Markdown downloads. No network or storage writes. */
function markdownText(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/([\\`*_{}\[\]()#+.!|~-])/g, '\\$1').replace(/\r?\n/g, ' ');
}
function downloadMarkdown(filename, text) {
  const blob = new Blob(["\uFEFF", text], {type:'text/markdown;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  try { link.click(); }
  finally {
    link.remove();
    // Let the browser consume the URL before releasing it (including mobile browsers).
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
}
