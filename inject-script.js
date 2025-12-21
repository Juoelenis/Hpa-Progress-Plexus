const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDir = path.join(__dirname, 'c:\\Users\\dell\\Documents\\Devlop\\Hpa-Progress-Plexus-main');

// Script tag to inject
const scriptTag = '<script type="module" src="Redirector/redirect-js-parser.ts"></script>';

// Function to inject the script tag
function injectScriptTag(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(scriptTag)) {
    const updatedContent = content.replace('</body>', `  ${scriptTag}\n</body>`);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Injected script tag into: ${filePath}`);
  }
}

// Recursively process all HTML files
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.html')) {
      injectScriptTag(fullPath);
    }
  });
}

// Start processing
processDirectory(htmlDir);