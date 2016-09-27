var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");

gulp.task("default", ["watch"]);

gulp.task("sass", function () {
    gulp.src("./frontend/assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))

});

//gulp.task("watch", function(){
//    gulp.watch(["./frontend/assets/sass/**/*.scss"], ["sass"]);
//});

gulp.task("server", function(){
    browser.init({
        server: {
            baseDir: "./public"
        },
        open: "external"
    });
    gulp.watch([
        "./frontend/assets/sass/**/*.scss"
    ], function(){
        setTimeout(function(){
            browser.reload();
        }, 500);
    })
});