module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: false,
                printWidth: 80,
                tabWidth: 4,
                endOfLine: 'auto',
            },
        ],
    },
}
