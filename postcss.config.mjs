//post.css.config.mjs
// This file is used to configure PostCSS, a tool for transforming CSS with JavaScript.
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwind(),
    autoprefixer()
  ]
}
