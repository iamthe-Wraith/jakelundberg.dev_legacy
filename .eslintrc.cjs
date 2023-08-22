module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'unused-imports'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		parser: {
			// Specify a parser for each lang.
			ts: '@typescript-eslint/parser',
			js: 'espree',
			typescript: '@typescript-eslint/parser'
		}
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'no-prototype-builtins': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/semi': 'warn',
		indent: 'off',
		'linebreak-style': ['error', 'unix'],
		'no-empty-pattern': 'off',
		quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: false }],
		semi: ['error', 'always'],
		'svelte/no-at-html-tags': 'off',
		'unused-imports/no-unused-imports': ['error']
	}
};
