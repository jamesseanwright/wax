const reduceNodes = nodes =>
    nodes.reduce((sourceNode, targetNode) => {
        sourceNode.connect(targetNode);
        return targetNode;
    });

export default reduceNodes;
