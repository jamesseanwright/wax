const memoise = func => {
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
const asMemoisedCreator = creator => {
    const memoisedCreator = memoise(creator);
    memoisedCreator.isElementCreator = true;
    return memoisedCreator;
};

const getNodeFromTree = tree =>
    !Array.isArray(tree)
        ? tree
        : undefined; // faciliates with default prop in destructuring

const createAudioElement = (Component, props, ...children) =>
    asMemoisedCreator((audioContext, nodeTree = []) => {
        const mapResult = (result, i) =>
            result.isElementCreator
                ? result(audioContext, nodeTree[i])
                : result;

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
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
