import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "./index.ts",
  output: {
    file: pkg.main,
    name: pkg.name,
    format: "cjs",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      babelrc: true,
      babelHelpers: "bundled",
    }),
    commonjs(),
    resolve(),
    json(),
    terser(),
  ],
};
