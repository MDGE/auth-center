module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    // backgroundColor: {
    //   base: 'var(--color-base)',
    //   'off-base': 'var(--color-off-base)',
    //   primary: 'var(--color-primary)',
    //   secondary: 'var(--color-secondary)',
    //   muted: 'var(--color-text-muted)',
    // },
    extend: {},
  },
  spacing: {
    px: '1px',
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
