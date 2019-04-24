const createNodeTree = () => {
    const entries = [];

    return {
        get isTree() {
            return true;
        },

        get entries() {
            return entries;
        },

        append(Component, audioNode) {
            const entry = { Component, audioNode };
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

            return entry && entry.Component === Component && entry.audioNode
                ? entry.audioNode
                : undefined; // For property destructuring/defaults
        },
    };
};

export default createNodeTree;
