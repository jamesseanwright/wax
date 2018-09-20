/** @jsx createAudioElement */
/* eslint-disable */
jest.mock('../../createAudioElement', () =>
    (Component, props, ...children) =>
        Component({
            children,
            ...props,
        })
);

import createAudioElement from '../../createAudioElement';
import asSourceNode from '../asSourceNode';

describe('asSourceNode HOC', () => {
    it('should create a new component that proxies incoming props and provides an enqueue prop', () => {
        const MyComponent = props => ({ props }); // TODO: common, reusable pattern across tests?
        const SourceComponent = asSourceNode(MyComponent);
        const sourceElement = <SourceComponent foo="bar" />;

        expect(sourceElement.props.foo).toEqual('bar');
        expect(sourceElement.props.enqueue).toBeDefined();
    });
});
