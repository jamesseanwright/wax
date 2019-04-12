const createNodeTree = () => {
    const entries = [];

    return {
        get isTree() {
            return true;
        },

        get entries() {
            return entries;
        },

        append(Component, node) {
            const entry = { Component, node };
            entries.push(entry);
            return entry; // TODO: remove return?
        },

        branch(index) {
            const entry = entries[index];

            if (entry && entry.isTree) {
                return entry;
            }

            const subTree = createNodeTree();

            entries.push(subTree);

            return subTree;
        },

        getNodeOfTypeAtIndex(Component, index) {
            const entry = entries[index];

            return entry && entry.Component === Component && entry.node
                ? entry.node
                : undefined; // For property destructuring/defaults
        },
    };
};

export default createNodeTree;
