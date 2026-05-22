# HPP Cleanup Commands

Run these git commands to remove old files:

## Remove Old HTML Files
git rm -f about.html account.html allstar.html andrew.html backgroub.html basic.html bobnete.html brickprod.html buba.html cashaplay.html "chinese meme.html" Dogland.html dpeps7.html ds-store.html force.html funsta.html game.html "gta evo.html" gunna.html gymbros.html hppmail.html "juo cars.html" jweeter.html lists.html musicaly.html newsly.html old-browser-warning.html peppa.html register.html searches.html spectre.html swooshUI.html "the iframe page.html" video.html welcome.html

## Remove Old CSS Files
git rm -f abalat.css about.css andrew.css bobonete.css brickprod.css buba.css cashaplay.css "chinese meme.css" force.css funsta.css "gta evo.css" gunna.css juocars.css jweeter.css lists.css login.css musicaly.css newsly.css register.css searches.css sheet.css spectre.css "the iframe.css" video.css welcome.css

## Remove Old TS/JS Files
git rm -f app.ts request.ts index.js inject-script.js basic.js login.js login32.js register.js ESLINT.js gulpfile.js

## Remove Images
git rm -f "1200px-Open_Source_Initiative.svg.png" aimcpe.png appstore.webp Cokerso.gif cool.jpg cpu.png crowdstrikke.svg dlbk.jpg "dogland city.jpg" "dogland culture.png" "dogland lake.webp" "dogland mountains.jpeg" "dogland tours.png" funstabanner.jpg funstalogo.jpg funstaupdate.jpg gunna.png "hpp logo.png" hpp-n-l-p.png hppmailp.jpeg image.png jcars.JPG jweeterico.jpg "ll 021.png" "lol 101.jpg" musicaly.png n1.png NewslyPIC.png SwooshUI.png statikUI.webp VidTube-Logo.webp vim.jpg vim.png wtbox.png yeas.jpg

## Remove Config Files
git rm -f tsconfig.json changelog.md beta-policy.md Redirector-main.rs searchers-2.1.rs login.php logout.php cleanup-git.bat cleanup-git.sh

## Remove Old Directories
git rm -rf Redirector URI-protocol weatherAPI JS batch

## Final Commit
git commit -m "Clean up old files - HPP rebuild to file hosting server"

---

Alternative: Run the Node.js cleanup script:
node cleanup.js
