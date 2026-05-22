const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const sourceDir = path.join(root, "assets");
const publicDir = path.join(root, "public");
const targetDir = path.join(publicDir, "assets");

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Assets source directory not found: ${sourceDir}`);
}

fs.mkdirSync(publicDir, { recursive: true });
fs.rmSync(targetDir, { recursive: true, force: true });
fs.cpSync(sourceDir, targetDir, {
  recursive: true,
  dereference: true
});

console.log(`Prepared public assets at ${targetDir}`);
