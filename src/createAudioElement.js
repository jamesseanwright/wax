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
    const cachedCreator = cache(creator);
    cachedCreator.isElementCreator = true;
    return cachedCreator;
};

const getNodeFromTree = tree =>
    !Array.isArray(tree)
        ? tree
        : undefined; // facilitates with default prop in destructuring

const createAudioElement = (Component, props, ...children) =>
    asCachedCreator((audioContext, nodeTree = []) => {
        const mapResult = (result, i) =>
            result.isElementCreator
                ? result(audioContext, nodeTree[i])
                : result;

        /* we want to render children first so the nodes
         * can be directly consumed by their parents */
        const createChildren = children => children.map(mapResult);
        const existingNode = getNodeFromTree(nodeTree);

        return mapResult(
            Component({
                children: createChildren(children),
                audioContext,
                node: existingNode,
                ...props,
            })
        );
    });

export default createAudioElement;
