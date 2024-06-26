module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"expo",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@tanstack/eslint-plugin-query/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["@tanstack/query"],
	rules: {
		"import/no-unresolved": "off",
	},
};
