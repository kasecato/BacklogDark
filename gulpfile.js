const gulp = require('gulp');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const headerfooter = require('gulp-headerfooter');
const stylishDarkThemeGene = require('postcss-stylish-dark-theme-gene');
var cleanCSS = require('gulp-clean-css');

// Src
const css_src_header = './src/css/backlog-dark-header.css';
const css_src_footer = './src/css/backlog-dark-footer.css';
const css_src_dir = [
      './history/2017_03_05/*.css'
];

// Dst
const css_dst_dir = './dist/css';
const css_dst_file = 'backlog-dark.css';

// PostCSS
gulp.task('css', function () {
    const processors = [
        stylishDarkThemeGene
    ];
    return gulp.src(css_src_dir)
        .pipe(postcss(processors))
        .pipe(concat(css_dst_file))
        .pipe(headerfooter.header(css_src_header))
        .pipe(headerfooter.footer(css_src_footer))
        .pipe(cleanCSS(
            {level: 2}
        ))
        .pipe(gulp.dest(css_dst_dir));
});

// Watch
gulp.task('watch', function () {
    gulp.watch(css_src_dir, [
        'css'
    ]);
});


// Default Task
gulp.task('default', [
    'css'
    , 'watch'
]);
