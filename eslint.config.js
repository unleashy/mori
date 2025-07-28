import config from "@unleashy/eslint/svelte";

export default [
  ...config(import.meta.dirname),
  {
    rules: {
      "unicorn/prefer-global-this": "off",
      "no-unused-private-class-members": "off",
    },
  },
];
