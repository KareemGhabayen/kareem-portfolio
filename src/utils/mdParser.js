// src/utils/mdParser.js
// Central Data Parser — splits YAML front-matter from Markdown body.
// Zero dependencies. Works in any modern browser or Node environment.

/**
 * Parse a raw .md string into { meta, content }
 *
 * Front-matter format expected:
 *   ---
 *   key: "value"
 *   array: ["a", "b"]
 *   ---
 *   # Markdown body here
 *
 * @param {string} raw  - Raw file text
 * @returns {{ meta: Record<string, any>, content: string }}
 */
export function parse(raw = "") {
  const DELIMITER = /^---\s*$/m;
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  // Locate front-matter fences
  let fenceStart = -1;
  let fenceEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) {
      if (fenceStart === -1) {
        fenceStart = i;
      } else {
        fenceEnd = i;
        break;
      }
    }
  }

  if (fenceStart === -1 || fenceEnd === -1) {
    // No front-matter — return whole file as content
    return { meta: {}, content: raw.trim() };
  }

  const yamlLines = lines.slice(fenceStart + 1, fenceEnd);
  const meta = parseYaml(yamlLines);
  const content = lines.slice(fenceEnd + 1).join("\n").trim();

  return { meta, content };
}

/**
 * Minimal YAML parser — handles the subset used in this portfolio:
 *   key: scalar value
 *   key: "quoted value"
 *   key: ["a", "b", "c"]
 *
 * @param {string[]} lines
 * @returns {Record<string, any>}
 */
function parseYaml(lines) {
  const result = {};

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 1).trim();

    if (!key) continue;

    result[key] = parseYamlValue(rawValue);
  }

  return result;
}

function parseYamlValue(raw) {
  if (!raw) return "";

  // Array: ["a", "b"]
  if (raw.startsWith("[")) {
    try {
      return JSON.parse(raw);
    } catch {
      // Fallback: strip brackets and split
      return raw
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
  }

  // Quoted string
  if (/^["']/.test(raw)) {
    return raw.replace(/^["']|["']$/g, "");
  }

  // Boolean
  if (raw === "true") return true;
  if (raw === "false") return false;

  // Number
  if (!isNaN(raw) && raw !== "") return Number(raw);

  return raw;
}

/**
 * Convert a minimal Markdown string to HTML.
 * Handles: headings, bold, italic, inline code, paragraphs, ul lists.
 *
 * @param {string} md
 * @returns {string} HTML string
 */
export function toHTML(md = "") {
  let html = md
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold + Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`(.+?)`/g, "<code>$1</code>")
    // Unordered list items
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // Paragraphs (blank-line separated, not already a block element)
    .replace(/\n{2,}/g, "\n\n")
    .split("\n\n")
    .map((block) => {
      if (/^<[h1-6ul]/.test(block.trim())) return block;
      return `<p>${block.trim()}</p>`;
    })
    .join("\n");

  return html;
}
