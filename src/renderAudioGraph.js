const renderAudioGraph = (renderElement, context = new AudioContext()) => {
    const result = renderElement(context);

    return Array.isArray(result)
        ? result.reduce((sourceNode, targetElement) => {
            if (!sourceNode) {
                return renderAudioGraph(targetElement, context);
            }

            const targetNode = renderAudioGraph(targetElement, context);

            sourceNode.connect(targetNode);

            return sourceNode;
        }, null)
        : result;
};

export default renderAudioGraph;
