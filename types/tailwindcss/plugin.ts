import plugin from 'tailwindcss/plugin';

const removeScrollbarPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.remove-scrollbar': {
      scrollbarWidth: 'none', // Firefox
      '-ms-overflow-style': 'none', // IE 10+
    },
    '.remove-scrollbar::-webkit-scrollbar': {
      display: 'none', // Safari and Chrome
    },
  });
});

export default removeScrollbarPlugin;
