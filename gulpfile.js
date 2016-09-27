var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("default", function(){
    console.log("hoge");
});
gulp.task("sass", function () {
    gulp.src("./frontend/assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))

});