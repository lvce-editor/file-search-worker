import { defineConfig } from 'eslint/config'
import config, { recommendedActions } from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config,
  ...recommendedActions,
  {
    ignores: ['packages/file-search-worker/test/GetJson.test.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    rules: {
      '@cspell/spellchecker': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      'github-actions/action-versions': 'off',
      'github-actions/no-e2e-in-release': 'off',
    },
  },
])
