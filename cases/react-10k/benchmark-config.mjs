export const config = {
  supportedTools: [
    'rspack',
    'rsbuild',
    'vite',
    'webpack',
    'farm',
    'parcel',
    'utoo',
  ],
  // Farm and Parcel are not enabled because the CI will fail
  defaultTools: [
    'rspack',
    'rsbuild',
    'vite',
    'webpack',
    'utoo',
  ],
  rootFile: 'f0.jsx',
  leafFile: 'd0/d0/d0/f0.jsx',
};
