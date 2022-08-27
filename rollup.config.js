import ts from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'es/index.js',
      format: 'esm',
    },
    {
      file: 'cjs/index.js',
      format: 'cjs',
    }
  ],
  plugins: [
    ts({
      compilerOptions: {
        declaration: false
      }
    })
  ]
};
