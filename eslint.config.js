import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {globals: globals.browser},
        rules: {
            quotes: ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
            'jsx-quotes': ['error', 'prefer-double']
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];