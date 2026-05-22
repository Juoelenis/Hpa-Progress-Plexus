#!/usr/bin/env node

/**
 * HPP Cleanup Script - Main Branch
 * Removes all old files using git
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const cwd = process.cwd();

const filesToDelete = [
  // Old HTML files
  'about.html', 'account.html', 'allstar.html', 'andrew.html', 'backgroub.html',
  'basic.html', 'bobnete.html', 'brickprod.html', 'buba.html', 'cashaplay.html',
  'chinese meme.html', 'Dogland.html', 'dpeps7.html', 'ds-store.html', 'force.html',
  'funsta.html', 'game.html', 'gta evo.html', 'gunna.html', 'gymbros.html',
  'hppmail.html', 'juo cars.html', 'jweeter.html', 'lists.html', 'musicaly.html',
  'newsly.html', 'old-browser-warning.html', 'peppa.html', 'register.html',
  'searches.html', 'spectre.html', 'swooshUI.html', 'the iframe page.html',
  'video.html', 'welcome.html', 'index.html', 'login.html',
  
  // Old CSS files
  'abalat.css', 'about.css', 'andrew.css', 'bobonete.css', 'brickprod.css',
  'buba.css', 'cashaplay.css', 'chinese meme.css', 'force.css', 'funsta.css',
  'gta evo.css', 'gunna.css', 'juocars.css', 'jweeter.css', 'lists.css',
  'login.css', 'musicaly.css', 'newsly.css', 'register.css', 'searches.css',
  'sheet.css', 'spectre.css', 'the iframe.css', 'video.css', 'welcome.css',
  
  // Old TS/JS files
  'app.ts', 'request.ts', 'inject-script.js', 'basic.js',
  'login.js', 'login32.js', 'register.js', 'ESLINT.js', 'gulpfile.js',
  
  // Images
  '1200px-Open_Source_Initiative.svg.png', 'aimcpe.png', 'appstore.webp',
  'Cokerso.gif', 'cool.jpg', 'cpu.png', 'crowdstrikke.svg', 'dlbk.jpg',
  'dogland city.jpg', 'dogland culture.png', 'dogland lake.webp',
  'dogland mountains.jpeg', 'dogland tours.png', 'funstabanner.jpg',
  'funstalogo.jpg', 'funstaupdate.jpg', 'gunna.png', 'hpp logo.png',
  'hpp-n-l-p.png', 'hppmailp.jpeg', 'image.png', 'jcars.JPG', 'jweeterico.jpg',
  'll 021.png', 'lol 101.jpg', 'musicaly.png', 'n1.png', 'NewslyPIC.png',
  'SwooshUI.png', 'statikUI.webp', 'VidTube-Logo.webp', 'vim.jpg', 'vim.png',
  'wtbox.png', 'yeas.jpg',
  
  // Config/misc files
  'tsconfig.json', 'changelog.md', 'beta-policy.md', 'Redirector-main.rs',
  'searchers-2.1.rs', 'login.php', 'logout.php',
];

const dirsToDelete = [
  'Redirector', 'URI-protocol', 'weatherAPI', 'JS', 'batch'
];

console.log('\n🧹 Cleaning Main Branch - Removing Old HPP Files\n');

let deleted = 0;
let notfound = 0;

// Delete files
for (const file of filesToDelete) {
  try {
    const filePath = path.join(cwd, file);
    if (fs.existsSync(filePath)) {
      execSync(`git rm -f "${filePath}"`, { stdio: 'pipe', cwd });
      console.log(`✓ Removed: ${file}`);
      deleted++;
    } else {
      notfound++;
    }
  } catch (e) {
    notfound++;
  }
}

// Delete directories
for (const dir of dirsToDelete) {
  try {
    const dirPath = path.join(cwd, dir);
    if (fs.existsSync(dirPath)) {
      execSync(`git rm -rf "${dirPath}"`, { stdio: 'pipe', cwd });
      console.log(`✓ Removed: ${dir}/`);
      deleted++;
    } else {
      notfound++;
    }
  } catch (e) {
    notfound++;
  }
}

console.log(`\n✅ Cleanup Complete!`);
console.log(`   Deleted: ${deleted} files/directories`);
console.log(`   Not found: ${notfound} (already removed)`);

console.log(`\n📝 Next Steps:`);
console.log(`   1. Review changes: git status`);
console.log(`   2. Commit: git commit -m "Clean up main branch - remove old HPP files"`);
console.log(`   3. Push: git push origin main`);
console.log(`\n✨ Main branch will be clean!\n`);

