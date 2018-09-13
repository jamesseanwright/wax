/* TODO: move this and dependencies to
 * separate package in example directory?
 */

import { resolve as resolvePath } from 'path';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const entry = process.env.ENTRY || 'simple';

export default {
    input: `example/src/${entry}.jsx`,
    output: {
        file: 'example/dist/index.js',
        format: 'iife',
    },
    plugins: [
        resolve(),
        commonjs(), // for React and ReactDOM
        alias({
            'web-audio-x': resolvePath(__dirname, 'dist', 'index.js'),
        }),
        babel(
            entry === 'withReact'
                && {
                    babelrc: false,
                    presets: [
                        ['@babel/react', {
                            pragma: 'createElement',
                            pragmaFrag: 'React.Fragment',
                        }],
                    ],
                    plugins: ['transform-inline-environment-variables'],
                }
        ),
    ],
};
