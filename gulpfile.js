var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");

// gulp：watchが走る
gulp.task("default", ["watch"]);

// gulp build：sassが走る
gulp.task("build", ["sass"]);

// gulp sass：コンパイルされる
gulp.task("sass", function () {
    gulp.src("./frontend/assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))

});

// gulp watch：変更されるとコンパイルする
gulp.task("watch", function(){
    gulp.watch(["./frontend/assets/sass/**/*.scss"], ["sass"]);
});

// gulp server：ブラウザがたつ＆watchが走る
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