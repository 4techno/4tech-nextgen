const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outputFileTxt = path.join(rootDir, 'symphony_full_codebase.txt');
const publicTxt = path.join(rootDir, 'public', 'symphony_full_codebase.txt');
const zipFile = path.join(rootDir, 'public', 'portfolio_full_project.zip');
const rootZipFile = path.join(rootDir, 'portfolio_full_project.zip');

const IGNORED_DIRS = new Set(['node_modules', 'dist', '.git', '.cache', '.agents', '.system_generated', '.vscode']);
const IGNORED_FILES = new Set(['portfolio_full_project.zip', 'symphony_full_codebase.txt']);

function getAllFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (IGNORED_DIRS.has(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      const relPath = path.relative(rootDir, fullPath);
      if (!IGNORED_FILES.has(item) && !relPath.endsWith('.zip')) {
        fileList.push({ fullPath, relPath });
      }
    }
  }
  return fileList;
}

console.log('Collecting project files...');
const files = getAllFiles(rootDir);
console.log(`Found ${files.length} project files.`);

// 1. Create single combined whole file
let combined = `================================================================================\n`;
combined += `MOHAMMED VASHIR — SYMPHONY OF SYSTEMS (4TECH)\n`;
combined += `COMPLETE ALL-IN-ONE SINGLE SOURCE CODE FILE\n`;
combined += `Generated: ${new Date().toISOString()}\n`;
combined += `Total Files: ${files.length}\n`;
combined += `================================================================================\n\n`;

// Add table of contents
combined += `TABLE OF CONTENTS:\n`;
files.forEach((f, idx) => {
  combined += `[${String(idx + 1).padStart(2, '0')}] ${f.relPath.replace(/\\/g, '/')}\n`;
});
combined += `\n` + `=`.repeat(80) + `\n\n`;

// Append each file content
for (const f of files) {
  const isBinary = f.relPath.endsWith('.pdf') || f.relPath.endsWith('.glb') || f.relPath.endsWith('.wasm');
  combined += `\n` + `#`.repeat(80) + `\n`;
  combined += `FILE: ${f.relPath.replace(/\\/g, '/')}\n`;
  combined += `#`.repeat(80) + `\n\n`;

  if (isBinary) {
    combined += `[Binary file: ${fs.statSync(f.fullPath).size} bytes - available in zip / public folder]\n\n`;
  } else {
    try {
      const content = fs.readFileSync(f.fullPath, 'utf8');
      combined += content + `\n\n`;
    } catch (e) {
      combined += `[Error reading file: ${e.message}]\n\n`;
    }
  }
}

fs.writeFileSync(outputFileTxt, combined, 'utf8');
fs.writeFileSync(publicTxt, combined, 'utf8');
console.log(`Created whole codebase file at:`);
console.log(`- ${outputFileTxt} (${(fs.statSync(outputFileTxt).size / 1024).toFixed(1)} KB)`);
console.log(`- ${publicTxt}`);

// 2. Create clean zip archive using PowerShell Compress-Archive
try {
  const stagingDir = path.join(rootDir, '_export_staging');
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  fs.mkdirSync(stagingDir, { recursive: true });

  for (const f of files) {
    const dest = path.join(stagingDir, f.relPath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(f.fullPath, dest);
  }

  // Copy whole codebase txt into staging too
  fs.copyFileSync(outputFileTxt, path.join(stagingDir, 'symphony_full_codebase.txt'));

  if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
  if (fs.existsSync(rootZipFile)) fs.unlinkSync(rootZipFile);

  console.log('Compressing into zip archive...');
  execSync(`powershell -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${zipFile}' -Force"`, { stdio: 'inherit' });
  fs.copyFileSync(zipFile, rootZipFile);

  console.log(`Created zip archive at:`);
  console.log(`- ${zipFile} (${(fs.statSync(zipFile).size / 1024).toFixed(1)} KB)`);
  console.log(`- ${rootZipFile}`);

  fs.rmSync(stagingDir, { recursive: true, force: true });
} catch (err) {
  console.error('Zip creation error:', err.message);
}

console.log('Export complete.');
