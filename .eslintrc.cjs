module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // react补充配置
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'react-refresh', 'prettier', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': ['off'], //允许使用any
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['that'], // this可用的局部变量名称
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off', //允许使用@ts-ignore
    '@typescript-eslint/no-non-null-assertion': 'off', //允许使用非空断言
    'no-console': [
      //提交时不允许有console.log
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-debugger': 'warn', //提交时不允许有debugger
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          [`^react`, `antd`, 'zustand'],
          [`^`],
          [`.*/plugins/.*`, `^@/plugins$`, `.*/store/.*`, `^@/store$`, `.*/utils/.*`, `^@/utils$`, `.*/hooks/.*`, `^@/hooks$`],
          [`.*\\.tsx$`],
          [
            `^@/`,
            `.*/api/.*`,
            `^@/api$`,
            `.*/config/.*`,
            `^@/config$`,
            `.*/enums/.*`,
            `@/enums$`,
            `.*/assets/.*`,
            `^@/assets$`,
            `.*/styles/.*`,
            `^@/styles$`,
            `.*/type`,
            `.*/types`
          ]
        ]
      }
    ]
  },
};
