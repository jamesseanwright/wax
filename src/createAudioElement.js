import createNodeTree from './createNodeTree';

/* I chose "cache" over "memoise" here,
 * as we don't cache by the inner
 * arguments. We just want to avoid
 * recomputing the node for a certain
 * creator func reference. */
const cache = func => {
    let result;

    return (...args) => {
        if (!result) {
            result = func(...args);
        }

        return result;
    };
};

/* decoration is required to differentiate
 * between element creators and other function
 * children e.g. render props */
const asCachedCreator = creator => {
    const memoisedCreator = cache(creator);
    memoisedCreator.isElementCreator = true;
    return memoisedCreator;
};

const createAudioElement = (Component, props, ...children) =>
    asCachedCreator((audioContext, nodeTree = createNodeTree(), i = 0) => {
        const mapResult = (result, i) =>
            result.isElementCreator
                ? result(audioContext, nodeTree.branch(i), i)
                : result;

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children => children.map(mapResult);
        const existingNode = nodeTree.getNodeOfTypeAtIndex(Component, i);

        nodeTree.append( // TODO: make append call Component internally?!
            Component,
            mapResult(
                Component({
                    children: createChildren(children),
                    audioContext,
                    node: existingNode,
                    ...props,
                }),
            ),
        );

        return nodeTree;
    });

export default createAudioElement;
