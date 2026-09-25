// Entfernt ein handgeschriebenes Inhaltsverzeichnis aus dem Markdown
// ("## Inhalt" + die Liste darunter), weil die Post-Seite das Verzeichnis
// automatisch links neben dem Text anzeigt. Die .md-Dateien bleiben unverändert.
const TITLES = new Set(['inhalt', 'inhaltsverzeichnis', 'contents', 'table of contents']);

const textOf = (node) =>
  node.type === 'text' || node.type === 'inlineCode'
    ? node.value
    : (node.children ?? []).map(textOf).join('');

export default function remarkStripToc() {
  return (tree) => {
    const kids = tree.children;
    const i = kids.findIndex(
      (n) => n.type === 'heading' && TITLES.has(textOf(n).trim().toLowerCase())
    );
    if (i === -1) return;
    let end = i + 1;
    while (end < kids.length && kids[end].type === 'list') end++;
    kids.splice(i, end - i);
  };
}
