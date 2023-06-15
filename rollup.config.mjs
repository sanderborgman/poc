import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import replace from "@rollup/plugin-replace";
import { visualizer } from "rollup-plugin-visualizer";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  input: "dist/main.js",
  output: {
    dir: "output",
    format: "cjs",
    strict: false,
  },
  plugins: [
    nodeResolve({ preferBuiltins: false, browser: true }),
    commonjs(),
    inject({
      process: ["process/browser.js"],
    }),
    babel({
      babelHelpers: "bundled",
      configFile: "./.babelrc",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG || false),
      process: "process",
    }),
    visualizer(),
  ],
};
