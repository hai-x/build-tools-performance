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

> Data from GitHub Actions: https://github.com/rstackjs/build-tools-performance/actions/runs/26564983827 (2026-05-29)

---

### react-1k

A React app with 1,000 components and 1,500 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-1k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.0.5 | 788ms🥇            | 636ms🥇              | 114ms🥇 | 342MB🥈      |
| Rsbuild 2.0.8    | 872ms🥈            | 844ms                | 140ms🥉 | 318MB🥇      |
| Vite 8.0.14      | 4030ms             | 3246ms               | 164ms   | 514MB🥉      |
| webpack 5.107.1  | 4236ms             | 2316ms               | 422ms   | 822MB        |
| Farm 1.7.11      | 1202ms🥉           | 646ms🥈              | 120ms🥈 | 555MB        |
| Parcel 2.16.4    | 3174ms             | 756ms🥉              | 227ms   | 1132MB       |
| Utoo 1.4.8       | 5201ms             | 5141ms               | 141ms   | 537MB        |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.5 | 680ms🥈          | 418ms🥉            | 273MB🥇      | 842.6kB🥈   | 222.0kB      |
| Rsbuild 2.0.8    | 745ms🥉          | 356ms🥈            | 279MB🥈      | 865.3kB     | 215.2kB🥇    |
| Vite 8.0.14      | 423ms🥇          | 445ms              | 293MB🥉      | 823.8kB🥇   | 218.1kB🥈    |
| webpack 5.107.1  | 3835ms           | 1271ms             | 693MB        | 846.3kB🥉   | 221.9kB🥉    |
| Farm 1.7.11      | 1514ms           | 789ms              | 393MB        | 1089.6kB    | 259.4kB      |
| Parcel 2.16.4    | 2956ms           | 767ms              | 1097MB       | 966.1kB     | 231.0kB      |
| Utoo 1.4.8       | 5235ms           | 333ms🥇            | 561MB        | 1069.0kB    | 238.9kB      |

---

### react-5k

A React app with 5,000 components and 5,000 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-5k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.0.5 | 850ms🥈            | 548ms🥈              | 98ms🥇  | 286MB🥈      |
| Rsbuild 2.0.8    | 843ms🥇            | 477ms🥇              | 100ms🥈 | 269MB🥇      |
| Vite 8.0.14      | 3340ms             | 2112ms               | 137ms   | 739MB        |
| webpack 5.107.1  | 9885ms             | 4392ms               | 2213ms  | 1646MB       |
| Farm 1.7.11      | 941ms🥉            | 556ms🥉              | 136ms🥉 | 521MB🥉      |
| Parcel 2.16.4    | 9040ms             | 1085ms               | 399ms   | 1871MB       |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.5 | 1510ms🥉         | 615ms🥈            | 624MB🥈      | 2794.1kB🥈  | 679.6kB🥈    |
| Rsbuild 2.0.8    | 1235ms🥈         | 607ms🥇            | 631MB🥉      | 2816.2kB🥉  | 679.6kB🥉    |
| Vite 8.0.14      | 918ms🥇          | 790ms🥉            | 656MB        | 2630.8kB🥇  | 693.0kB      |
| webpack 5.107.1  | 10368ms          | 2683ms             | 1266MB       | 2825.8kB    | 679.4kB🥇    |
| Farm 1.7.11      | 4843ms           | 1876ms             | 616MB🥇      | 3545.0kB    | 811.4kB      |
| Parcel 2.16.4    | 8533ms           | 1239ms             | 1986MB       | 3489.5kB    | 766.6kB      |

---

### react-10k

A React app with 10,000 components and 10,000 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-10k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.0.5 | 963ms🥈            | 685ms🥇              | 112ms🥇 | 346MB🥈      |
| Rsbuild 2.0.8    | 888ms🥇            | 701ms🥈              | 139ms🥉 | 317MB🥇      |
| Vite 8.0.14      | 5457ms🥉           | 2968ms🥉             | 134ms🥈 | 1189MB🥉     |
| webpack 5.107.1  | 17431ms            | 17633ms              | 2107ms  | 2151MB       |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.0.5 | 2602ms🥈         | 1207ms🥇           | 1118MB🥇     | 5861.2kB🥈  | 1367.1kB🥈   |
| Rsbuild 2.0.8    | 2742ms🥉         | 1209ms🥈           | 1125MB🥈     | 5903.5kB🥉  | 1366.0kB🥇   |
| Vite 8.0.14      | 1711ms🥇         | 1377ms🥉           | 1182MB🥉     | 5465.6kB🥇  | 1417.2kB     |
| webpack 5.107.1  | 21502ms          | 4831ms             | 1898MB       | 5934.5kB    | 1368.1kB🥉   |

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
| Rspack CLI 2.0.5 | 5629ms🥉         | 2035ms🥈           | 1380MB🥇     | 5031.4kB🥈  | 1445.6kB🥇   |
| Rsbuild 2.0.8    | 6288ms           | 2558ms             | 1513MB🥈     | 5031.4kB🥉  | 1445.6kB🥈   |
| Vite 8.0.14      | 4225ms🥈         | 3872ms             | 1709MB       | 5040.5kB    | 1450.7kB     |
| webpack 5.107.1  | 39715ms          | 20666ms            | 1968MB       | 5027.1kB🥇  | 1445.7kB🥉   |
| esbuild 0.28.0   | 4077ms🥇         | 3591ms             | N/A          | 6174.1kB    | 1785.5kB     |
| Farm 1.7.11      | 15188ms          | 3792ms             | 2196MB       | 7995.0kB    | 2699.9kB     |
| Parcel 2.16.4    | 29372ms          | 2392ms🥉           | 2418MB       | 5289.9kB    | 1485.4kB     |
| Utoo 1.4.8       | 29579ms          | 1000ms🥇           | 1658MB🥉     | 6618.9kB    | 1831.1kB     |

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
| Rspack CLI 2.0.5     | 1068ms           | 361ms🥈            | 433MB🥇      | 1803.0kB🥉  | 562.6kB🥉    |
| Rsbuild 2.0.8        | 1152ms           | 368ms🥉            | 441MB🥈      | 1802.3kB🥈  | 562.4kB🥈    |
| Vite 8.0.14          | 892ms🥉          | 853ms              | 646MB        | 1804.4kB    | 565.0kB      |
| Rollup 4.60.4        | 5450ms           | 5465ms             | 1292MB       | 1637.1kB🥇  | 507.6kB🥇    |
| Rolldown 1.0.2       | 642ms🥈          | 657ms              | 588MB        | 1804.0kB    | 563.9kB      |
| webpack 5.107.1      | 6521ms           | 1516ms             | 1345MB       | 1804.1kB    | 562.8kB      |
| esbuild 0.28.0       | 587ms🥇          | 594ms              | N/A          | 2104.9kB    | 635.7kB      |
| Farm 1.7.11          | 2647ms           | 944ms              | 775MB        | 2273.9kB    | 771.9kB      |
| Utoo 1.4.8           | 4590ms           | 282ms🥇            | 562MB🥉      | 2125.0kB    | 638.1kB      |

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
