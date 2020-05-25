import gulp from "gulp";
import cp from "child_process";
// import gutil from "gulp-util";
import PluginError from "plugin-error"
import log from "fancy-log";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "../dist", "-s", "site", "-v"];

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([cssnext(), cssImport({from: "./src/css/main.css"})]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new PluginError("webpack", err);
    log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("build", gulp.series("css", "js", "hugo"));
gulp.task("build-preview", gulp.series("css", "js", "hugo-preview"));

gulp.task("server", gulp.series("hugo", "css", "js", () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/css/**/*.css", gulp.series("css"));
  gulp.watch("./site/**/*", gulp.series("hugo"));
}));

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", () => {
    browserSync.reload();
    cb();
  });
}
