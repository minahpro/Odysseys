const fs = require('fs');
const path = require('path');

function generateStructure(dir, depth = 0) {
  const indent = ' '.repeat(depth * 2);
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    console.log(`${indent}${file}`);
    if (stats.isDirectory()) {
      generateStructure(filePath, depth + 1);
    }
  });
}
///
const projectRoot = path.resolve(__dirname, '.'); // Adjust the path as needed
generateStructure(projectRoot);

/// to generate run
// node generateStructure.js > project-structure.txt
