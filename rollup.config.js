import { resolve as resolvePath } from 'path';
import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'example/src/index.jsx',
    output: {
        file: 'example/dist/index.js',
        format: 'iife',
    },
    plugins: [
        resolve(),
        alias({
            'web-audio-x': resolvePath(__dirname, 'dist', 'index.js'),
        }),
        babel(),
    ],
};
