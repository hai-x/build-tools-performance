// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createNodeUtooConfig } from '../../shared/utoopack.config.mjs';

const sourceDir = path.resolve(import.meta.dirname, 'src');

/**
 * @param {string} dir
 * @param {Record<string, string>} aliases
 */
const collectPackageAliases = (dir, aliases = {}) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectPackageAliases(entryPath, aliases);
      continue;
    }

    if (entry.name === 'package.json') {
      const packageJson = JSON.parse(readFileSync(entryPath, 'utf8'));

      if (typeof packageJson.name === 'string') {
        aliases[packageJson.name] = path.dirname(entryPath);
      }
    }
  }

  return aliases;
};

export default createNodeUtooConfig({
  entry: [
    {
      import: './src/entry.ts',
    },
  ],
  resolve: {
    alias: collectPackageAliases(sourceDir),
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
});
