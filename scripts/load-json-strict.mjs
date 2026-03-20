import fs from "fs/promises";

function isWhitespace(char) {
  return char === " " || char === "\n" || char === "\r" || char === "\t";
}

function parseString(source, start) {
  let i = start + 1;
  while (i < source.length) {
    const char = source[i];
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') return { value: JSON.parse(source.slice(start, i + 1)), end: i + 1 };
    i += 1;
  }
  throw new Error(`unterminated string at position ${start}`);
}

function scanValue(source, start, filePath) {
  let i = start;
  while (isWhitespace(source[i])) i += 1;
  const char = source[i];

  if (char === "{") {
    i += 1;
    const seen = new Set();
    while (true) {
      while (isWhitespace(source[i])) i += 1;
      if (source[i] === "}") return i + 1;
      if (source[i] !== '"') throw new Error(`${filePath}: expected string key at position ${i}`);
      const keyToken = parseString(source, i);
      if (seen.has(keyToken.value)) throw new Error(`${filePath}: duplicate key '${keyToken.value}' detected before JSON parse at position ${i}`);
      seen.add(keyToken.value);
      i = keyToken.end;
      while (isWhitespace(source[i])) i += 1;
      if (source[i] !== ":") throw new Error(`${filePath}: expected ':' after key '${keyToken.value}' at position ${i}`);
      i = scanValue(source, i + 1, filePath);
      while (isWhitespace(source[i])) i += 1;
      if (source[i] === "}") return i + 1;
      if (source[i] !== ",") throw new Error(`${filePath}: expected ',' or '}' at position ${i}`);
      i += 1;
    }
  }

  if (char === "[") {
    i += 1;
    while (true) {
      while (isWhitespace(source[i])) i += 1;
      if (source[i] === "]") return i + 1;
      i = scanValue(source, i, filePath);
      while (isWhitespace(source[i])) i += 1;
      if (source[i] === "]") return i + 1;
      if (source[i] !== ",") throw new Error(`${filePath}: expected ',' or ']' at position ${i}`);
      i += 1;
    }
  }

  if (char === '"') return parseString(source, i).end;

  const primitiveMatch = /^(true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(source.slice(i));
  if (!primitiveMatch) throw new Error(`${filePath}: invalid JSON token at position ${i}`);
  return i + primitiveMatch[0].length;
}

export async function loadJsonStrict(filePath) {
  const text = await fs.readFile(filePath, "utf8");
  const end = scanValue(text, 0, filePath);
  let i = end;
  while (isWhitespace(text[i])) i += 1;
  if (i !== text.length) throw new Error(`${filePath}: trailing content after position ${end}`);
  return JSON.parse(text);
}
