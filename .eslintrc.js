module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: false,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/typescript',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-unused-vars': 0, // for typescript interfaces
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'no-multi-spaces': 0,
        'no-implicit-globals': 0,
        indent: ['error', 4, {
            SwitchCase: 1,
            MemberExpression: 1,
        }],
        'vue/html-indent': [2, 4, {
        }],
        'vue/html-self-closing': [2, {
            html: {
                void: 'never',
                normal: 'never',
                component: 'never',
            },
        }],
        'no-trailing-spaces': ['error', {
            skipBlankLines: false,
            ignoreComments: false,
        }],
        'linebreak-style': [0, 'unix'],
        'no-param-reassign': 0,
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'max-statements': [0, 64],
        'multiline-ternary': ['error', 'always-multiline'],
        'new-parens': [1],
        yoda: [0],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        'func-names': [0, 'as-needed'],
        'no-return-assign': 'error',
        'no-new-func': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'prefer-const': 'error',
        'arrow-body-style': 0,
        'prefer-destructuring': ['error',
            {
                VariableDeclarator: {
                    array: true,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
    },
}
