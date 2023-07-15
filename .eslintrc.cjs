/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        "semi": false,
        "singleQuote": true,
        "printWidth": 100,
        "proseWrap": "preserve",
        "bracketSameLine": false,
        "endOfLine": "auto",
        "tabWidth": 2,
        "useTabs": false,
        "trailingComma": "none"
      }
    ],
    "vue/multi-word-component-names": "off",
    "no-undef": "off",
    "vue/prefer-import-from-vue": "off"
  }
}
