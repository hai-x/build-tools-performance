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

> Data from GitHub Actions: https://github.com/rstackjs/build-tools-performance/actions/runs/28345010568 (2026-06-29)

---

### react-1k

A React app with 1,000 components and 1,500 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-1k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.1.1 | 1013ms🥇           | 1060ms               | 127ms🥈 | 362MB🥈      |
| Rsbuild 2.1.1    | 1112ms🥈           | 871ms🥈              | 157ms   | 333MB🥇      |
| Vite 8.1.0       | 5080ms             | 4438ms               | 142ms🥉 | 513MB        |
| webpack 5.108.1  | 5743ms             | 3187ms               | 528ms   | 832MB        |
| Farm 1.7.11      | 1601ms🥉           | 802ms🥇              | 122ms🥇 | 549MB        |
| Parcel 2.16.4    | 4760ms             | 2247ms               | 305ms   | 1126MB       |
| Utoo 1.4.17      | 7403ms             | 919ms🥉              | 143ms   | 439MB🥉      |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.1.1 | 969ms🥉          | 324ms🥇            | 271MB🥇      | 843.0kB🥈   | 222.3kB      |
| Rsbuild 2.1.1    | 593ms🥇          | 356ms🥈            | 281MB🥈      | 865.8kB     | 215.4kB🥇    |
| Vite 8.1.0       | 707ms🥈          | 611ms              | 282MB🥉      | 824.4kB🥇   | 218.3kB🥈    |
| webpack 5.108.1  | 5068ms           | 1560ms             | 652MB        | 843.7kB🥉   | 222.1kB🥉    |
| Farm 1.7.11      | 1933ms           | 1009ms             | 393MB        | 1090.0kB    | 257.5kB      |
| Parcel 2.16.4    | 4739ms           | 997ms              | 1140MB       | 966.6kB     | 231.3kB      |
| Utoo 1.4.17      | 7882ms           | 489ms🥉            | 412MB        | 864.4kB     | 233.5kB      |

---

### react-5k

A React app with 5,000 components and 5,000 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-5k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.1.1 | 959ms🥇            | 977ms🥉              | 126ms🥈 | 297MB🥈      |
| Rsbuild 2.1.1    | 1205ms🥈           | 895ms🥈              | 115ms🥇 | 267MB🥇      |
| Vite 8.1.0       | 4771ms             | 2823ms               | 133ms🥉 | 732MB        |
| webpack 5.108.1  | 14443ms            | 13130ms              | 2076ms  | 1545MB       |
| Farm 1.7.11      | 1645ms🥉           | 858ms🥇              | 143ms   | 505MB🥉      |
| Parcel 2.16.4    | 15161ms            | 3092ms               | 789ms   | 1811MB       |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.1.1 | 1835ms🥈         | 964ms🥇            | 612MB🥇      | 2794.5kB🥈  | 679.9kB🥈    |
| Rsbuild 2.1.1    | 2827ms🥉         | 1251ms🥉           | 626MB🥉      | 2816.6kB    | 679.9kB🥉    |
| Vite 8.1.0       | 1346ms🥇         | 1111ms🥈           | 649MB        | 2631.4kB🥇  | 693.3kB      |
| webpack 5.108.1  | 16113ms          | 4408ms             | 1219MB       | 2798.4kB🥉  | 679.3kB🥇    |
| Farm 1.7.11      | 7124ms           | 2498ms             | 622MB🥈      | 3545.4kB    | 803.3kB      |
| Parcel 2.16.4    | 13902ms          | 2198ms             | 2042MB       | 3490.0kB    | 766.9kB      |

---

### react-10k

A React app with 10,000 components and 10,000 modules from node_modules, using dynamic imports to simulate SPA.

```bash
CASE=react-10k pnpm benchmark
```

Development metrics:

| Name             | Startup (no cache) | Startup (with cache) | HMR     | Memory (RSS) |
| ---------------- | ------------------ | -------------------- | ------- | ------------ |
| Rspack CLI 2.1.1 | 987ms🥈            | 873ms🥈              | 165ms🥉 | 365MB🥈      |
| Rsbuild 2.1.1    | 892ms🥇            | 668ms🥇              | 117ms🥇 | 332MB🥇      |
| Vite 8.1.0       | 4946ms🥉           | 3062ms🥉             | 134ms🥈 | 1200MB🥉     |
| webpack 5.108.1  | 15300ms            | 15414ms              | 1959ms  | 2114MB       |

Build metrics:

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.1.1 | 3191ms🥉         | 1311ms🥈           | 1107MB🥇     | 5861.6kB🥈  | 1367.4kB🥉   |
| Rsbuild 2.1.1    | 2793ms🥈         | 1240ms🥇           | 1118MB🥈     | 5903.9kB    | 1366.2kB🥇   |
| Vite 8.1.0       | 1672ms🥇         | 1771ms🥉           | 1162MB🥉     | 5466.2kB🥇  | 1417.5kB     |
| webpack 5.108.1  | 21905ms          | 4705ms             | 1960MB       | 5870.2kB🥉  | 1367.0kB🥈   |

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
| Rspack CLI 2.1.1 | 6456ms           | 2409ms             | 1411MB🥉     | 5114.5kB🥈  | 1467.8kB🥈   |
| Rsbuild 2.1.1    | 5056ms🥉         | 1956ms🥈           | 1539MB       | 5114.6kB🥉  | 1467.8kB🥉   |
| Vite 8.1.0       | 2521ms🥇         | 2252ms🥉           | 997MB🥇      | 5126.1kB    | 1481.9kB     |
| webpack 5.108.1  | 19934ms          | 12009ms            | 2182MB       | 4977.9kB🥇  | 1445.4kB🥇   |
| esbuild 0.28.1   | 4755ms🥈         | 3111ms             | N/A          | 6292.2kB    | 1819.6kB     |
| Farm 1.7.11      | 17103ms          | 4486ms             | 2258MB       | 8142.4kB    | 2752.8kB     |
| Parcel 2.16.4    | 26453ms          | 2661ms             | 2617MB       | 5367.2kB    | 1509.5kB     |
| Utoo 1.4.17      | 22047ms          | 974ms🥇            | 1315MB🥈     | 5575.1kB    | 1583.5kB     |

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

| Name             | Build (no cache) | Build (with cache) | Memory (RSS) | Output size | Gzipped size |
| ---------------- | ---------------- | ------------------ | ------------ | ----------- | ------------ |
| Rspack CLI 2.1.1 | 3025ms           | 820ms🥈            | 431MB🥈      | 1810.6kB🥉  | 564.7kB🥉    |
| Rsbuild 2.1.1    | 2242ms           | 831ms🥉            | 441MB🥉      | 1809.9kB🥈  | 564.5kB🥈    |
| Vite 8.1.0       | 1582ms🥉         | 1482ms             | 441MB        | 1814.7kB    | 567.9kB      |
| Rollup 4.62.2    | 9004ms           | 8972ms             | 1305MB       | 1646.7kB🥇  | 510.5kB🥇    |
| Rolldown 1.1.3   | 1151ms🥇         | 1516ms             | 392MB🥇      | 1814.2kB    | 566.4kB      |
| webpack 5.108.1  | 9604ms           | 2299ms             | 1176MB       | 1813.8kB    | 565.7kB      |
| esbuild 0.28.1   | 1414ms🥈         | 1045ms             | N/A          | 2114.9kB    | 639.2kB      |
| Farm 1.7.11      | 5637ms           | 1901ms             | 793MB        | 2283.8kB    | 775.7kB      |
| Utoo 1.4.17      | 8305ms           | 591ms🥇            | 515MB        | 1854.1kB    | 576.9kB      |

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
