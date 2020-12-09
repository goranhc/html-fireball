/** --------------------------
 * @version 1.0.0
 * @name    RevealTemplate
 * @author  Goran Hrustić
 * @host    ElaThemes
 * @year    2020
 * @url     www.elathemes.com
 * -------------------------- */

'use strict';

// -----------------------
// Configuration 
// -----------------------
const DEV =     require('./source/app/data/global.json');
const CONFIG =  require('./config.json');

const SOURCES = CONFIG.SOURCE;
const APP =     CONFIG.APP;
const DOCS =    CONFIG.DOCS; // !Docs
const COPY =    CONFIG.COPY;

var PROD =      DEV.settings.production;

// -----------------------
// Plugins
// -----------------------

var gulp =      require('gulp');
var sass =      require('gulp-sass');
var smaps =     require('gulp-sourcemaps');
var del =       require('del');
var include =   require('gulp-include')
var rename =    require('gulp-rename');
var minifyjs =  require('gulp-uglify');
var htmlmin =   require('gulp-htmlmin');
var gulpif =    require('gulp-if');
var imagemin =  require('gulp-imagemin');

// -----------------------
// Handlebars setup
// -----------------------

var Panini = require('panini').Panini;

var BUILDHTML = new Panini(APP);
    BUILDHTML.loadBuiltinHelpers();
    BUILDHTML.refresh();

// -----------------------
// Tasks
// -----------------------

// Deletes the dist folder so the build can start fresh.
// -----------------------------------------------------

gulp.task('reset', gulp.parallel(
    function resetProd() { return del(SOURCES.prod); },
    function resetDocs() { return del(SOURCES.docs); } // !Docs
));

// Copies the necessary files from src to dist.
// --------------------------------------------

gulp.task('copy', gulp.parallel(
    async function generateScripts() {
        if(PROD) {
            return gulp
            .src(SOURCES.src_js + '/core.js')
            .pipe(smaps.init())
            .pipe(include())
            .pipe(minifyjs())
            .pipe(rename('bundle.min.js'))
            .pipe(gulp.dest(SOURCES.prod_js))
        } else {
            return gulp
            .src(COPY.js)
            .pipe(gulp.dest(SOURCES.prod_js));
        }
    },
    async function generateStyles() {
        if (PROD) {
                return gulp
                .src(SOURCES.src_css + '/bundle.scss')
                .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
                .pipe(rename('bundle.min.css'))
                .pipe(gulp.dest(SOURCES.prod_css + '/vendor'));
            
        } else {
            return gulp
            .src(COPY.css)
            .pipe(gulp.dest(SOURCES.prod_css));
        }
    },
    async function copyFonts() {
        if(PROD) {
            return gulp 
            .src(COPY.css + 'fonts/**')
            .pipe(gulp.dest(SOURCES.prod_css));
        }
    },
    async function copyMedia() {
        return gulp
            .src(COPY.img)
            .pipe(gulp.dest(SOURCES.prod_img));
    },
    async function copySvg() {
        return gulp
            .src(COPY.svg)
            .pipe(gulp.dest(SOURCES.prod + '/assets/svg'));
    }
));

// Minify images
// -------------------

gulp.task('images', function () {
    return gulp
        .src(COPY.img)
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 80, progressive: true})
        ]))
        .pipe(gulp.dest(SOURCES.prod_img));
});

// Compile stylesheets
// -------------------

gulp.task('sass', function () {
    return gulp
        .src(SOURCES.src_css + '/style.scss')
        .pipe(smaps.init())
        .pipe(rename('style.css'))
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(smaps.write('.'))
        .pipe(gulp.dest(SOURCES.prod_css))
});

// Compiles HTML templates with Panini
// -----------------------------------

gulp.task('html', function () {
    return gulp
        .src(APP.root + '/**/*.hbs')
        .pipe(BUILDHTML.render())
        .pipe(rename({ extname: '.html' }))
        .pipe(gulpif(PROD, htmlmin({ collapseWhitespace: true, removeComments: true })))
        .pipe(gulp.dest(SOURCES.prod));
});

// !Documentation
// --------------------------------------------

var BUILDDOCS = new Panini(DOCS);
    BUILDDOCS.loadBuiltinHelpers();
    BUILDDOCS.refresh();

// !Compiles Documentation templates with Panini.
// --------------------------------------------

gulp.task("docs", gulp.parallel(
    function renderDocs() {
        return gulp
            .src(DOCS.root + '/**/*.hbs')
            .pipe(BUILDDOCS.render())
            .pipe(rename({ extname: '.html' }))
            .pipe(gulpif(!PROD, htmlmin({ collapseWhitespace: true, removeComments: true })))
            .pipe(gulp.dest(SOURCES.docs));
    },
    function bundleDocsStyles() {
        return gulp.src(SOURCES.src_css + '/docs.scss')
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(rename('docs.min.css'))
            .pipe(gulp.dest(SOURCES.docs_css + '/vendor'))
    },
    function bundleDocsScripts() {
        return gulp
            .src(SOURCES.src + '/docs/scripts/core.js')
            .pipe(smaps.init())
            .pipe(include())
            .pipe(minifyjs())
            .pipe(rename('docs.min.js'))
            .pipe(gulp.dest(SOURCES.docs_js))
    },
    function copyDocsFonts() {
        return gulp
            .src(COPY.css + '/**/fonts/**')
            .pipe(gulp.dest(SOURCES.docs_css));
    }
));

// !Convert images to placeholders
// ------------------------------

gulp.task('placeholder', function cretePlaceholders() {
    return gulp.src(COPY.img)
        .pipe(jimp({
            "": {
                brightness: 0.2,
                contrast: .2,
                blur: 40,
                greyscale: true,
            }
        }))
        .pipe(gulp.dest(SOURCES.prod_img));
});

// !Export for buyers
// ------------------

gulp.task('export', gulp.parallel(
    function buyers() {
        return gulp
            .src([
                '!' + SOURCES.src + '/**',
                '!' + SOURCES.src + '/docs/**',
                '!' + SOURCES.src + '/assets/scss/docs**',
                '!' + SOURCES.src + '/assets/scss/docs/**',
                SOURCES.prod + '/**',
                SOURCES.docs + '/**'
            ], {
                base: '.'
            })
            .pipe(gulp.dest('../reveal-buyers'));
    },
    function gulpfile() {
        return gulp
            .src('pckg-gulp.js')
            .pipe(rename('gulpfile.js'))
            .pipe(gulp.dest('../reveal-buyers'));
    },
    function config() {
        return gulp
            .src('pckg-config.json')
            .pipe(rename('config.json'))
            .pipe(gulp.dest('../reveal-buyers'));
    }
));

// ------------------------- Build project ---------------------------- //

gulp.task('build', gulp.series('reset', 'copy', 'sass', 'html', 'docs'));

// ------------------------- Build production -------------------------- //
// -------------------- Make sure to set PROD true --------------------- //

gulp.task('build-production', gulp.series('reset', 'copy', 'html', 'docs'));

// ------------------------ !Build package ---------------------------- //
// --------------------Make sure to set PROD false ---------------------//

gulp.task('build-package', gulp.series('reset', 'copy', 'sass', 'html', 'docs', 'placeholder', 'export')); 

gulp.task('build-package-clean', gulp.series('reset', 'copy', 'sass', 'html', 'docs', 'export')); 
