const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack 모듈 설정
module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // babel-loader로 읽을 파일 확장자 정규표현식
        exclude: "/node_modules", // 제외할 파일 경로
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"], // babel-loader에서 사용할 옵션
        },
      },
    ],
  },
  entry: {
    bundle: ["./index.js"],
  }, // 입력
  output: {
    path: path.join(__dirname, "dist"), // __dirname: 현재 실행 중인 폴더 경로
    filename: "[name].js",
  }, // 출력
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
  },
};
