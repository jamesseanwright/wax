const isConnectableNode = node => node instanceof AudioNode;

const connectTree = tree =>
    tree.entries.reduce((sourceEntry, targetEntry) => {
        const sourceNode = sourceEntry.isTree
            ? connectTree(sourceEntry)
            : sourceEntry.audioNode;

        const targetNode = targetEntry.isTree
            ? connectTree(targetEntry)
            : targetEntry.audioNode;

        if (isConnectableNode(sourceNode) && isConnectableNode(targetNode)) {
            sourceNode.connect(targetNode);
        }

        return targetEntry;
    });

export default connectTree;
