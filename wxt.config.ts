import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["webRequest", "webRequestBlocking", "*://*.twitter.com/*", "*://*.x.com"],
  },
  modules: ['@wxt-dev/module-react'],
});
