
// gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器
var gulp = require('gulp');

var webpack = require('gulp-webpack');

var webpack_dev_config = require('./webpack.dev.config');
gulp.task('dev',[], function() {
    return gulp
        .src('.')
        .pipe(webpack(webpack_dev_config))
        .pipe(gulp.dest('dd'));//用于配置文件发布路径，如CDN或本地服务器//文件输出目录
});