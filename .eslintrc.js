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
        'no-use-before-define': ['warn', { functions: false, classes: false }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-param-reassign': ['error', { props: false }],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                printWidth: 80,
                tabWidth: 4,
                endOfLine: 'auto',
            },
        ],
    },
};
