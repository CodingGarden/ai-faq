import fs from 'fs'
import path from 'path'

async function readMarkdownFile() {
  const markdown = await fs.promises.readFile(path.join(__dirname, '../data', 'faq.md'), 'utf-8');
  return markdown;
}

interface MarkdownObject {
  prompt: string;
  completion: string;
}

function separateMarkdown(markdown: string): MarkdownObject[] {
  const markdownLines = markdown.split('\n');
  const markdownObjects: MarkdownObject[] = [];

  let currentObject: MarkdownObject | null = null;

  for (const line of markdownLines) {
    if (line.startsWith('#')) {
      if (line.startsWith('##')) {
        if (currentObject !== null) {
          markdownObjects.push(currentObject);
        }
        currentObject = { prompt: line.slice(3).trim(), completion: '' };
      }
    } else if (currentObject !== null) {
      currentObject.completion += line + '\n';
    }
  }

  if (currentObject !== null) {
    markdownObjects.push(currentObject);
  }

  return markdownObjects;
}

function objectsToJsonlString(objects: object[]): string {
  // @ts-ignore
  return objects.map(JSON.stringify).join('\n') + '\n';
}

function writeFile(jsonl: string) {
  return fs.promises.writeFile(path.join(__dirname, '../data', 'faq.jsonl'), jsonl);
}

readMarkdownFile()
  .then(separateMarkdown)
  .then(objectsToJsonlString)
  .then(writeFile);