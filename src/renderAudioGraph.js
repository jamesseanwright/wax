const renderAudioGraph = (renderElement, context = new AudioContext()) => {
    const result = renderElement(context);

    return Array.isArray(result)
        ? result.reduce((sourceElement, targetElement) => {
            const sourceNode = renderAudioGraph(sourceElement, context);
            const targetNode = renderAudioGraph(targetElement, context);

            sourceNode.connect(targetNode);

            return targetElement;
        })
        : result;
};

export default renderAudioGraph;
