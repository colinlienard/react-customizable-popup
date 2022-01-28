import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        exports: 'named',
        banner: '/* banner */',
        footer: '/* footer */',
      },
      {
        file: packageJson.module,
        format: 'esm',
        banner: '/* banner */',
        footer: '/* footer */',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        filterRoot: './src',
      }),
      postcss(),
      terser({
        format: {
          comments: false,
        },
      }),
    ],
  },
  {
    input: 'src/index.tsx',
    output: [{
      file: 'dist/index.d.ts',
      format: 'esm',
    }],
    plugins: [dts()],
    external: [/\.scss$/],
  },
];
