import { NO_OP } from './components/NoOp';

const isConnectableNode = node => !node.isTree && node !== NO_OP;

const connectTree = tree =>
    tree.entries.reduce((sourceEntry, targetEntry) => {
        const sourceNode = sourceEntry.isTree
            ? connectTree(sourceEntry)
            : sourceEntry.node;

        const targetNode = targetEntry.isTree
            ? connectTree(targetEntry)
            : targetEntry.node;

        if (isConnectableNode(sourceNode) && isConnectableNode(targetNode)) {
            sourceNode.connect(targetNode);
        }

        return targetEntry;
    });

export default connectTree;
