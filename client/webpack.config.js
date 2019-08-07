// // webpack.config.js
// module.exports = {
// 	...
//     module: {
//         rules: [{
//             test: /\.scss$/,
//             use: [
//                 "style-loader", // creates style nodes from JS strings
//                 "css-loader", // translates CSS into CommonJS
//                 "sass-loader" // compiles Sass to CSS, using Node Sass by default
//             ]
//         }]
//     }
// };

// // webpack.config.js
// module.exports = {
// 	...
//     module: {
//         rules: [{
//             test: /\.scss$/,
//             use: [{
//                 loader: "style-loader"
//             }, {
//                 loader: "css-loader"
//             }, {
//                 loader: "sass-loader",
//                 options: {
//                     includePaths: ["absolute/path/a", "absolute/path/b"]
//                 }
//             }]
//         }]
//     }
// };

module.exports = {
  ...{ devtool: 'source-map' }, // any "source-map"-like devtool is possible
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '$env: ' + process.env.NODE_ENV + ';'
            }
          }
        ]
      }
    ]
  }
};
