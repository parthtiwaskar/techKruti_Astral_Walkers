const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

const comment = '// This module is isolated. Do not directly access internal logic from other modules. Use contracts or APIs.\n';
const files = walk('./src/modules');
let count = 0;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.startsWith('// This module is isolated')) {
    fs.writeFileSync(f, comment + content);
    count++;
  }
});
console.log(`Added boundary comment to ${count} files.`);
