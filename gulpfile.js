/**
 * Created by vamous on 2017/5/5.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

gulp.task('default', function() {
    var jsFilter = filter('**/*.js', {restore : true});
    var cssFilter = filter('**/*.css', {restore : true});
    var indexHtmlFilter = filter(['**/*', '!index.html'], {restore : true});
                                /*第一个参数代表所有，第二个参数代表除了index.html文件*/
    return gulp.src('index.html')
        .pipe(useref())  /*找到注释标记（合并）*/
        .pipe(jsFilter)  /*把JS文件筛选出来*/
        .pipe(uglify())  /*对筛选出来的JS做压缩*/
        .pipe(jsFilter.restore) /*把JS文件扔回流里面*/
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())   /*前面的filter()排除了index.html，然后再打版本号*/
        .pipe(indexHtmlFilter.restore)  /*生成之后再恢复*/
        .pipe(revReplace())     /*更新index文件里面的引用*/
        .pipe(gulp.dest('dist'));   /*把管道里面的文件扔到dist目录之下*/
});
