/** @jsx createAudioElement */

jest.mock('../../createAudioElement', () =>
    (Component, props, ...children) => ({
        Component,
        props,
        children,
    }),
);

import createAudioElement from '../../createAudioElement';
import asSourceNode from '../asSourceNode';

describe('asSourceNode HOC', () => {
    it('should create a new component that proxies incoming props and provides an enqueue prop', () => {
        const Inner = {};
        const MyComponent = () => <Inner />;
        const SourceComponent = asSourceNode(MyComponent);
        const sourceElement = <SourceComponent foo="bar" />;

        console.log('****', sourceElement);

    });
});
