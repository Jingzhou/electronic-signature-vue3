// rollup-plugin-vue插件需指定版本，@5.1.9对应的是vue2.x，@6.0.0以上对应的是vue3.x
import vue from "rollup-plugin-vue";
// import resolve from "rollup-plugin-node-resolve";
import resolve from "@rollup/plugin-node-resolve";
// import babel from "rollup-plugin-babel";
import babel from "@rollup/plugin-babel";
// import commonjs from "rollup-plugin-commonjs"
import commonjs from "@rollup/plugin-commonjs";
// 处理css需要用到的插件是rollup-plugin-postcss。它支持css文件的加载、css加前缀、css压缩、对scss/less的支持等等
import postcss from "rollup-plugin-postcss";


const config = {
  input: "./index.js",
  output: {
    output: {
      file: "./dist/electronic-signature.es.js",
      format: "es", // 编译模式
    },
  },
  plugins: [
    // 引入的插件在这里配置
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    vue({
      css: true,
      compileTemplate: true,
    }),
    babel({
      exclude: "**/node_modules/**",
      babelHelpers: "runtime",
    }),
    commonjs(),
    postcss(),
  ],
  external: ['vue'] // 依赖模块
};
export default config;
