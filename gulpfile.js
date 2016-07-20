var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    postcss = require('gulp-postcss'),
    precss = require('precss'),
    position  = require('postcss-position'),
    center  = require('postcss-center'),
    size  = require('postcss-size'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');
    coffee = require('gulp-coffee');

var watchPath = {
    css : ['src/postcss/**/*','src/postcss/*'],
    coffee : ['src/coffee/**/*','src/coffee/*']
};

var workPath = {
    css : ['src/postcss/**/*','src/postcss/*'],
    coffee : ['src/coffee/**/*','src/coffee/*']
};


/*sass转换Css*/
gulp.task('post-css', function () {
    var processors = [
        center,
        size,
        position,
        precss,
        autoprefixer({browsers: ['last 3 version']})

    ];
    return gulp.src(workPath.css)
        .pipe(changed('src/postcss/*'))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('src/css'));
});

/*coffee*/
gulp.task('coffee', function() {
  gulp.src(workPath.coffee)
    .pipe(changed('src/coffee/*'))
    .pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('src/js'));
});

gulp.task('watch',function(){
	gulp.watch(watchPath.css, function(event){
            gulp.run(['post-css']);
            console.log("********************    END SASS-CSS <"+event.path+"|||"+event.type+">    ********************");
        });
    /*coffee*/
    gulp.watch(watchPath.coffee, function(event){
            gulp.run(['coffee']);
            console.log("********************    END COFFEE <"+event.path.split("\\")[event.path.split("\\").length-1]+"|||"+event.type+">    ********************");
        });
});

gulp.task('default',['watch']); /*定义默认任务*/
