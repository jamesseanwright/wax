import { NO_OP } from './components/NoOp';

const reduceNodes = nodes =>
    nodes.reduce((sourceNode, targetNode) => {
        const source = Array.isArray(sourceNode)
            ? reduceNodes(sourceNode)
            : sourceNode;

        const target = Array.isArray(targetNode)
            ? reduceNodes(targetNode)
            : targetNode;

        if (source !== NO_OP && target !== NO_OP) {
            source.connect(target);
        }

        return target;
    });

export default reduceNodes;
