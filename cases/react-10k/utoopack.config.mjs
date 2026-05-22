// @ts-check
import { isProd, targetBrowser } from '../../shared/constants.mjs';

export default {
  mode: isProd ? 'production' : 'development',
  target: targetBrowser,
  entry: [
    {
      import: './src/index.jsx',
      html: {
        template: './index-rspack.html',
      },
    },
  ],
  output: {
    path: './dist',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  react: {
    runtime: 'automatic',
    importSource: 'react',
  },
  optimization: {
    minify: isProd,
  },
  sourceMaps: !isProd,
  persistentCaching: true,
  devServer: {
    port: 3000,
    hot: true,
  },
};
