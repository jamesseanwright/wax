import { NO_OP } from './components/NoOp';

const connectNodes = nodes =>
    nodes.reduce((sourceNode, targetNode) => {
        const source = Array.isArray(sourceNode)
            ? connectNodes(sourceNode)
            : sourceNode;

        const target = Array.isArray(targetNode)
            ? connectNodes(targetNode)
            : targetNode;

        if (source !== NO_OP && target !== NO_OP) {
            source.connect(target);
        }

        return target;
    });

export default connectNodes;
