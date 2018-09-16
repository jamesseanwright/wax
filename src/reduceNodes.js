import { NO_OP }from './components/NoOp';

const reduceNodes = nodes =>
    nodes.reduce((sourceNode, targetNode) => {
        if (sourceNode !== NO_OP && targetNode !== NO_OP) {
            sourceNode.connect(targetNode);
        }

        return targetNode;
    });

export default reduceNodes;
