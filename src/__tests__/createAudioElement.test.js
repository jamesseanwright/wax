import { createArrayWith } from './helpers';
import createAudioElement from '../createAudioElement';

const createElementCreator = node => {
    const creator = jest.fn().mockReturnValue(node);
    creator.isElementCreator = true;
    return creator;
};

const createAudioGraph = nodeTree =>
    nodeTree.map(node =>
        Array.isArray(node)
            ? createElementCreator(createAudioGraph(node))
            : createElementCreator(node)
    );


const assertNestedAudioGraph = (graph, nodeTree, audioContext) => {
    graph.forEach((creator, i) => {
        if (Array.isArray(creator)) {
            assertNestedAudioGraph(creator, nodeTree[i], audioContext);
        } else {
            expect(creator).toHaveBeenCalledTimes(1);
            expect(creator).toHaveBeenCalledWith(audioContext, nodeTree[i]);
        }
    });
};

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
        const innerCreator = createElementCreator(innerNode);
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
            const creator = createElementCreator(node);
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

    it('should reconcile existing nodes for the graph from the provided array', () => {
        const nodeTree = [
            { id: 0 },
            { id: 1 },
            [
                { id: 2 },
                { id: 3 },
                [
                    { id: 4 },
                    { id: 5 },
                ],
                { id: 6 },
            ],
            { id: 7 },
            { id: 8 },
        ];

        const audioContext = { isAudioContext: true };
        const graph = createAudioGraph(nodeTree);
        const Component = jest.fn().mockReturnValue(nodeTree);

        const audioGraphCreator = createAudioElement(
            Component,
            {},
            ...graph,
        );

        audioGraphCreator(audioContext, nodeTree);
        assertNestedAudioGraph(graph, nodeTree, audioContext);
    });

    it('should cache creator results', () => {
        const Component = jest.fn().mockReturnValue({});

        const creator = createAudioElement(
            Component,
            {},
        );

        creator({});
        creator({});

        expect(Component).toHaveBeenCalledTimes(1);
    });
});
