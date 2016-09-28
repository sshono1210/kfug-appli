var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");
var php = require("gulp-connect-php");

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

    var config = {
        proxy: "127.0.0.1:8000",
        open: "external"
        //notify: false
    };

    var server = {
        base: "./public"
    };

    php.server(server,() => {
        browser(config)
    });

    gulp.watch(`./public/**/*`, () => {
        setTimeout(function(){
            browser.reload();
        },500);
    });

    gulp.watch([
        "./frontend/assets/sass/**/*.scss"
    ], function(){
        setTimeout(function(){
            browser.reload();
        }, 500);
    })
});