import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'next/core-web-vitals',
      'next/typescript',
      'next',
      'prettier',
    ],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/recommended',
        ],
        rules: {
          'react/no-unescaped-entities': 'off',
          '@next/next/no-page-custom-font': 'off',
        },
      },
      {
        plugins: ['check-file'],
        files: ['src/**/*'],
        rules: {
          'check-file/filename-naming-convention': [
            'error',
            {
              '**/*.{ts,tsx}': 'KEBAB_CASE',
            },
            {
              ignoreMiddleExtensions: true,
            },
          ],
          'check-file/folder-naming-convention': [
            'error',
            {
              '!(src/app)/**/*': 'KEBAB_CASE',
              '!(**/__tests__)/**/*': 'KEBAB_CASE',
            },
          ],
        },
      },
    ],
  }),
];

export default eslintConfig;
