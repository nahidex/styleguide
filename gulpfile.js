var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'output';
var source = 'scss/*.scss';

gulp.task('styleguide:generate', function() {
  return gulp.src(source)
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        rootPath: outputPath,
        overviewPath: 'README.md',
        beforeBody: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">',
        styleguideProcessors: {
            40: function(styleguide) {
                styleguide.sections[0].description = styleguide.sections[0].description + ' [Description from custom Processor]';
            }
        }
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['scss/*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// Creating a default task
gulp.task('default', ['watch']);