# Build Tools Comparison

Benchmark comparing JavaScript bundlers and build tools ([Rspack](https://github.com/web-infra-dev/rspack), [Rsbuild](https://github.com/web-infra-dev/rsbuild), [webpack](https://github.com/webpack/webpack), [Vite](https://github.com/vitejs/vite), [Rolldown](https://github.com/rolldown/rolldown), [esbuild](https://github.com/evanw/esbuild), [Rollup](https://github.com/rollup/rollup), [Parcel](https://github.com/parcel-bundler/parcel), [Farm](https://github.com/farm-fe/farm) and [Utoo](https://github.com/utooland/utoo)) for dev server startup time, build performance and bundle size for applications with different module sizes.

## Metrics

| Name                     | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| **Startup (no cache)**   | Time from starting the dev server to page loaded                           |
| **Startup (with cache)** | Time from starting the dev server to page loaded with cache                |
| **HMR**                  | Time to HMR after changing a module                                        |
| **Build (no cache)**     | Time taken to build the production bundles                                 |
| **Build (with cache)**   | Time taken to build the production bundles with cache                      |
| **Memory (RSS)**         | Memory usage at the end of a cold start or production build                |
| **Output size**          | Total size of the output bundle, minified with the default minifier        |
| **Gzipped size**         | Gzipped size of the output bundle, represents actual network transfer size |

## Notes

- Build target is set to `es2022` (`Chrome >= 93`) for all tools.
- Minification is enabled in production for all tools.
- Source map is enabled in development and disabled in production for all tools.
- Benchmarks run on GitHub Actions with variable hardware, which may cause inconsistent results.

Tooling details:

- webpack is configured to use SWC instead of Babel / Terser.
- Vite uses Rolldown and Oxc.

## Results

> Data from GitHub Actions: https://github.com/rstackjs/build-tools-performance/actions/runs/26383792932 (2026-05-27)

---

### react-1k

A React app with 1,000 components and 1,500 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-1k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.0.4 | 910ms🥈            | 624ms🥇              | 123ms🥈 | 340MB🥈      |
| Rsbuild 2.0.7    | 899ms🥇            | 728ms🥈              | 143ms🥉 | 315MB🥇      |
| Vite 8.0.14      | 3727ms             | 3022ms               | 152ms   | 505MB🥉      |
| webpack 5.107.1  | 3818ms             | 2374ms               | 410ms   | 821MB        |
| Farm 1.7.11      | 1207ms🥉           | 852ms🥉              | 167ms   | 556MB        |
| Parcel 2.16.4    | 3748ms             | 861ms                | 263ms   | 1141MB       |
| Utoo 1.4.8       | 5797ms             | 5124ms               | 122ms🥇 | 535MB        |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.4 | 484ms🥈          | 255ms🥇            | 275MB🥇      | 846.1kB🥈   | 222.1kB      |
| Rsbuild 2.0.7    | 542ms🥉          | 287ms🥈            | 280MB🥈      | 873.4kB     | 215.3kB🥇    |
| Vite 8.0.14      | 397ms🥇          | 394ms              | 292MB🥉      | 823.8kB🥇   | 218.1kB🥈    |
| webpack 5.107.1  | 3680ms           | 1167ms             | 698MB        | 846.3kB🥉   | 221.9kB🥉    |
| Farm 1.7.11      | 1788ms           | 1180ms             | 395MB        | 1089.6kB    | 259.4kB      |
| Parcel 2.16.4    | 3432ms           | 792ms              | 1109MB       | 966.1kB     | 231.0kB      |
| Utoo 1.4.8       | 6003ms           | 385ms🥉            | 560MB        | 1069.0kB    | 238.9kB      |

---

### react-5k

A React app with 5,000 components and 5,000 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-5k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.0.4 | 962ms🥇            | 662ms🥇              | 106ms🥇 | 286MB🥈      |
| Rsbuild 2.0.7    | 1008ms🥈           | 668ms🥈              | 119ms🥈 | 262MB🥇      |
| Vite 8.0.14      | 5387ms             | 2944ms               | 131ms🥉 | 735MB        |
| webpack 5.107.1  | 10207ms            | 5280ms               | 2291ms  | 1655MB       |
| Farm 1.7.11      | 1263ms🥉           | 784ms🥉              | 154ms   | 522MB🥉      |
| Parcel 2.16.4    | 13834ms            | 2528ms               | 665ms   | 1832MB       |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.4 | 1817ms🥈         | 807ms🥇            | 627MB🥈      | 2825.5kB🥈  | 680.2kB🥈    |
| Rsbuild 2.0.7    | 2308ms🥉         | 932ms🥈            | 634MB🥉      | 2852.1kB    | 680.2kB🥉    |
| Vite 8.0.14      | 1246ms🥇         | 1457ms🥉           | 658MB        | 2630.8kB🥇  | 693.0kB      |
| webpack 5.107.1  | 12591ms          | 3241ms             | 1266MB       | 2825.8kB🥉  | 679.4kB🥇    |
| Farm 1.7.11      | 6604ms           | 2370ms             | 615MB🥇      | 3545.0kB    | 811.4kB      |
| Parcel 2.16.4    | 12879ms          | 1661ms             | 2007MB       | 3489.5kB    | 766.6kB      |

---

### react-10k

A React app with 10,000 components and 10,000 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-10k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.0.4 | 1182ms🥇           | 890ms🥇              | 163ms🥇 | 360MB🥈      |
| Rsbuild 2.0.7    | 1293ms🥈           | 1113ms🥈             | 178ms🥉 | 319MB🥇      |
| Vite 8.0.14      | 9064ms🥉           | 5083ms🥉             | 164ms🥈 | 1155MB🥉     |
| webpack 5.107.1  | 23054ms            | 21361ms              | 2493ms  | 2122MB       |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.4 | 3987ms🥈         | 1975ms🥇           | 1130MB🥇     | 5934.0kB🥈  | 1368.7kB🥉   |
| Rsbuild 2.0.7    | 4681ms🥉         | 2188ms🥉           | 1139MB🥈     | 5984.4kB    | 1367.6kB🥇   |
| Vite 8.0.14      | 2288ms🥇         | 2107ms🥈           | 1177MB🥉     | 5465.6kB🥇  | 1417.2kB     |
| webpack 5.107.1  | 30510ms          | 6627ms             | 1883MB       | 5934.4kB🥉  | 1368.0kB🥈   |

---

### ui-components

A React app that imports UI components from several popular UI libraries.

Including [@mui/material](https://npmjs.com/package/@mui/material), [@radix-ui/themes](https://npmjs.com/package/@radix-ui/themes), [antd](https://npmjs.com/package/antd), [antd-mobile](https://npmjs.com/package/antd-mobile), [@chakra-ui/react](https://npmjs.com/package/@chakra-ui/react), [@fluentui/react](https://npmjs.com/package/@fluentui/react), [@headlessui/react](https://npmjs.com/package/@headlessui/react), [@mantine/core](https://npmjs.com/package/@mantine/core), [react-bootstrap](https://npmjs.com/package/react-bootstrap), [primereact](https://npmjs.com/package/primereact), [rsuite](https://npmjs.com/package/rsuite), [@arco-design/web-react](https://npmjs.com/package/@arco-design/web-react), [@coreui/react](https://npmjs.com/package/@coreui/react), [element-plus](https://npmjs.com/package/element-plus), [ant-design-vue](https://npmjs.com/package/ant-design-vue), [naive-ui](https://npmjs.com/package/naive-ui), [primevue](https://npmjs.com/package/primevue), [vant](https://npmjs.com/package/vant), and [vuetify](https://npmjs.com/package/vuetify).

```bash
CASE=ui-components pnpm benchmark
```

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.4 | 3979ms           | 1293ms🥈           | 1386MB🥇     | 5031.3kB🥈  | 1445.6kB🥇   |
| Rsbuild 2.0.7    | 3822ms🥉         | 1630ms🥉           | 1501MB🥈     | 5031.4kB🥉  | 1445.6kB🥈   |
| Vite 8.0.14      | 2628ms🥇         | 2393ms             | 1726MB       | 5040.5kB    | 1450.7kB     |
| webpack 5.107.1  | 26782ms          | 13303ms            | 1938MB       | 5027.1kB🥇  | 1445.7kB🥉   |
| esbuild 0.28.0   | 3631ms🥈         | 2570ms             | N/A          | 6174.1kB    | 1785.5kB     |
| Farm 1.7.11      | 11083ms          | 2895ms             | 2211MB       | 7995.0kB    | 2699.9kB     |
| Parcel 2.16.4    | 19735ms          | 1698ms             | 2488MB       | 5289.9kB    | 1485.4kB     |
| Utoo 1.4.8       | 19045ms          | 611ms🥇            | 1659MB🥉     | 6618.9kB    | 1831.1kB     |

---

### popular-libs

A browser app that imports a small number of live exports from 50 popular,
modern frontend libraries to compare tree-shaking quality across bundlers.

It keeps the original React/Vue/state/data set and adds 30 more mainstream
frontend packages with ESM-friendly entry points where practical, including
[axios](https://npmjs.com/package/axios),
[dayjs](https://npmjs.com/package/dayjs),
[clsx](https://npmjs.com/package/clsx),
[tailwind-merge](https://npmjs.com/package/tailwind-merge),
[class-variance-authority](https://npmjs.com/package/class-variance-authority),
[i18next](https://npmjs.com/package/i18next),
[react-i18next](https://npmjs.com/package/react-i18next),
[vue-i18n](https://npmjs.com/package/vue-i18n),
[immer](https://npmjs.com/package/immer),
[swr](https://npmjs.com/package/swr),
[framer-motion](https://npmjs.com/package/framer-motion),
[three](https://npmjs.com/package/three),
[lucide-react](https://npmjs.com/package/lucide-react),
[@headlessui/react](https://npmjs.com/package/@headlessui/react),
[@headlessui/vue](https://npmjs.com/package/@headlessui/vue),
[@heroicons/react](https://npmjs.com/package/@heroicons/react),
[@heroicons/vue](https://npmjs.com/package/@heroicons/vue),
[@radix-ui/react-slot](https://npmjs.com/package/@radix-ui/react-slot),
[query-string](https://npmjs.com/package/query-string),
[mitt](https://npmjs.com/package/mitt),
[fuse.js](https://npmjs.com/package/fuse.js),
[idb](https://npmjs.com/package/idb),
[dexie](https://npmjs.com/package/dexie),
[ky](https://npmjs.com/package/ky),
[lit](https://npmjs.com/package/lit),
[xstate](https://npmjs.com/package/xstate),
[preact](https://npmjs.com/package/preact),
[solid-js](https://npmjs.com/package/solid-js),
[swiper](https://npmjs.com/package/swiper), and
[remeda](https://npmjs.com/package/remeda).

```bash
CASE=popular-libs pnpm benchmark
```

Build metrics:

| Name                 | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| -------------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.4     | 1386ms           | 505ms🥉            | 434MB🥇      | 1802.9kB🥉  | 562.5kB🥉    |
| Rsbuild 2.0.7        | 1549ms           | 499ms🥈            | 445MB🥈      | 1802.2kB🥈  | 562.4kB🥈    |
| Vite 8.0.14          | 979ms🥉          | 1145ms             | 641MB        | 1804.4kB    | 565.0kB      |
| Rollup 4.60.4        | 8081ms           | 8046ms             | 1236MB       | 1637.1kB🥇  | 507.6kB🥇    |
| Rolldown 1.0.2       | 767ms🥇          | 800ms              | 589MB        | 1804.0kB    | 563.9kB      |
| webpack 5.107.1      | 9091ms           | 2065ms             | 1339MB       | 1804.1kB    | 562.8kB      |
| esbuild 0.28.0       | 788ms🥈          | 779ms              | N/A          | 2104.9kB    | 635.7kB      |
| Farm 1.7.11          | 3724ms           | 1241ms             | 784MB        | 2273.9kB    | 771.9kB      |
| Utoo 1.4.8           | 6651ms           | 343ms🥇            | 560MB🥉      | 2125.0kB    | 638.1kB      |

---

## Run locally

Run the `benchmark.ts` script to get the results (requires Node.js >= 22):

```bash
# Run the benchmark for the react-5k case
pnpm benchmark

# Run the benchmark for the react-10k case
CASE=react-10k pnpm benchmark
```

If you want to start the project with the specified tool, try:

```bash
pnpm i # install dependencies

# Cd to the case directory
cd cases/react-5k
cd cases/react-10k
cd cases/popular-libs

# Dev server
pnpm start:rspack # Start Rspack
pnpm start:rsbuild # Start Rsbuild
pnpm start:webpack # Start webpack
pnpm start:vite # Start Vite
pnpm start:farm # Start Farm

# Build
pnpm build:rspack # Build Rspack
pnpm build:rsbuild # Build Rsbuild
pnpm build:webpack # Build webpack
pnpm build:vite # Build Vite
pnpm build:farm # Build Farm
```

### Options

Use `CASE` to switch the benchmark case:

```bash
CASE=react-1k pnpm benchmark
CASE=react-5k pnpm benchmark
CASE=react-10k pnpm benchmark
CASE=popular-libs pnpm benchmark
```

Use `TOOLS` to specify the build tools or bundlers:

```bash
# Run with all tools
TOOLS=all pnpm benchmark

# Run Rspack and Rsbuild
TOOLS=rspack,rsbuild pnpm benchmark
```

Use `RUN_TIMES` to specify the number of runs (defaults to `3`):

```bash
RUN_TIMES=3 pnpm benchmark
```

Use `WARMUP_TIMES` to specify the number of warmup runs (defaults to `2`):

```bash
WARMUP_TIMES=2 pnpm benchmark
```

Use `FARM=true` to run Farm:

```bash
FARM=true pnpm benchmark
```

## Credits

Forked from [farm-fe/performance-compare](https://github.com/farm-fe/performance-compare), thanks to the Farm team!
