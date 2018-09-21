import { createArrayWith } from './helpers';
import createAudioElement from '../createAudioElement';

describe('createAudioElement', () => {
    it('should conform to the JSX pragma signature and return a creator function', () => {
        const node = {};
        const audioContext = {};
        const Component = jest.fn().mockReturnValue(node);
        const props = { foo: 'bar', bar: 'baz' };
        const children = [{}, {}, {}];
        const creator = createAudioElement(Component, props, ...children);
        const result = creator(audioContext);

        expect(result).toBe(node);
        expect(Component).toHaveBeenCalledTimes(1);
        expect(Component).toHaveBeenCalledWith({
            children,
            audioContext,
            ...props,
        });
    });

    it('should render a creator when it is returned from a component', () => {
        const innerNode = {};
        const innerCreator = jest.fn().mockReturnValue(innerNode);

        innerCreator.isElementCreator = true;

        const audioContext = {};
        const Component = jest.fn().mockReturnValue(innerCreator);
        const creator = createAudioElement(Component, {});
        const result = creator(audioContext);

        expect(result).toBe(innerNode);
        expect(innerCreator).toHaveBeenCalledTimes(1);
        expect(innerCreator).toHaveBeenCalledWith(audioContext, undefined);
    });

    it('should invoke child creators when setting the parent`s `children` prop', () => {
        const children = createArrayWith(10, (_, id) => {
            const node = { id };
            const creator = jest.fn().mockReturnValue(node);
            creator.isElementCreator = true;

            return { node, creator };
        });

        const audioContext = {};
        const Component = jest.fn().mockReturnValue({});

        const creator = createAudioElement(
            Component,
            {},
            ...children.map(({ creator }) => creator),
        );

        creator(audioContext);

        expect(Component).toHaveBeenCalledWith({
            audioContext,
            children: children.map(({ node }) => node),
        });
    });
});
