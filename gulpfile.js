const gulp = require('gulp');
const inject = require('gulp-inject');

// Gulp task to inject the script tag
gulp.task('inject-script', () => {
  const target = gulp.src('./**/*.html'); // Select all HTML files
  const sources = gulp.src(['Redirector/redirect-js-parser.ts'], { read: false });

  return target.pipe(inject(sources, {
    transform: (filePath) => `<script type="module" src="${filePath}"></script>`,
  }))
  .pipe(gulp.dest('./'));
});