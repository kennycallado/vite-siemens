import './style.css'
import '@siemens/ix/dist/siemens-ix/siemens-ix.css';

import 'htmx.org/dist/htmx.min.js';

import { applyPolyfills, defineCustomElements } from '@siemens/ix/loader';
import { themeSwitcher } from '@siemens/ix';
import { defineCustomElements as ixIconsDefineCustomElements } from '@siemens/ix-icons/loader';

// import htmx from 'htmx.org/dist/htmx.min.js';
// (() => {
//   htmx.on('htmx:load', (event) => {
//     console.log('htmx:load', event);
//   })
// })();

// Apply the polyfills and bind the custom elements to the window object
(async () => {
  await applyPolyfills();
  await ixIconsDefineCustomElements();
  await defineCustomElements();
})(); // <-- semi-colon is important here

// Theme switcher
(() => {
  // const themes = ['theme-classic-light', 'theme-classic-dark'];

  const getStoredTheme = () => localStorage.getItem('theme')
  // const setStoredTheme = (theme: string) => localStorage.setItem('theme', theme)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = (theme: string) => {
    if (theme === 'auto') {
      let preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      themeSwitcher.setTheme(preferredTheme === 'dark' ? 'theme-classic-dark' : 'theme-classic-light')
    } else {
      themeSwitcher.setTheme(theme === 'dark' ? 'theme-classic-dark' : 'theme-classic-light')
    }
  }

  setTheme(getPreferredTheme())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    let preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(preferredTheme)
  })
})(); // <-- semi-colon is important here

// Responsive Navigation
// (async ()=> {
//   // (min-width: 1400px) // lg
//   // (min-width: 1200px) // lg
//   // (min-width: 992px)  // lg
//   // (min-width: 768px)  // md
//   // (max-width: 576px)  // sm

//   await window.customElements.whenDefined('ix-application');
//   const nav = document.querySelector('ix-application');

//   window.matchMedia('(max-width: 575px)')
//     .addEventListener('change', (e) => { if (e.matches) nav!.breakpoints = ['sm'] });
//   window.matchMedia('(min-width: 576px) and (max-width: 991px)')
//     .addEventListener('change', (e) => { if (e.matches) nav!.breakpoints = ['md'] });
//   window.matchMedia('(min-width: 992px)')
//     .addEventListener('change', (e) => { if (e.matches) nav!.breakpoints = ['lg'] });

//   switch (true) {
//     case window.matchMedia('(max-width: 575px)').matches:
//       nav!.breakpoints = ['sm'];
//       break;
//     case window.matchMedia('(min-width: 576px) and (max-width: 991px)').matches: 
//       nav!.breakpoints = ['md'];
//       break;
//     case window.matchMedia('(min-width: 992px)').matches:
//       nav!.breakpoints = ['lg'];
//       break;
//     default:
//       break;
//   }
// })(); // <-- semi-colon is important here
