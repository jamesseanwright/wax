const createNodeTree = () => {
    const nodes = [];

    return {
        append(node) {
            nodes.push(node);
            return node;
        },

        getNodeAtIndex(node, index) {
            const existingNode = nodes[index];

            return existingNode && existingNode.constructor === node.constructor
                ? existingNode
                : undefined;
        },

        get(index) {
            return nodes[index];
        },
    };
};

export default createNodeTree;
