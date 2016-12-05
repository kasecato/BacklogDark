const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProperties = require("postcss-custom-properties")
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const cssnext = require('cssnext');
const precss = require('precss');
const concat = require('gulp-concat');
const headerfooter = require('gulp-headerfooter');

// Src
const css_src_header = './src/css/backlog-dark-header.css';
const css_src_footer = './src/css/backlog-dark-footer.css';
const css_src_dir = [
    './src/css/Common.css'
    , './src/css/Dashboard.css'
    , './src/css/Project.css'
    //, './src/css/Settings.css'
    , './src/css/MultipleIssue.css'
    //, './src/css/launchbox.css'
    //, './src/css/colorbox-1.6.4.css'
    //, './src/css/Themes.css'
    //, './src/css/prettify.css'
];

// Dst
const css_dst_dir = './dest/css';
const css_dst_file = 'backlog-dark.css';

// PostCSS
gulp.task('css', function () {
    const processors = [
        stylelint()
        , reporter({clearMessages: true})
        , customProperties()
        , autoprefixer({browsers: ['last 2 version']})
        , cssnext
        , precss
        , mqpacker
        , csswring
    ];
    return gulp.src(css_src_dir)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(concat(css_dst_file))
        .pipe(headerfooter.header(css_src_header))
        .pipe(headerfooter.footer(css_src_footer))
        .pipe(sourcemaps.write('.'))
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

