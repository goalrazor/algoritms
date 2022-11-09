module.exports = {
    env: {
        es6: true,
        browser: true,
    },

    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],

    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            ecmaVersion: 2018,
        },
        impliedStrict: true,
    },

    rules: {
        'no-continue': 'off',
        'flowtype/no-types-missing-file-annotation': 'off',
        'import/no-cycle': 'off',
    },

    overrides: [{
        files: ['*.ts', '*.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'comma',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false,
                },
                overrides: {
                    interface: {
                        multiline: {
                            delimiter: 'semi',
                            requireLast: true,
                        },
                    },
                },
            }],
            '@typescript-eslint/prefer-interface': 'off',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': ['error', {
                functions: false,
            }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    }],
};
