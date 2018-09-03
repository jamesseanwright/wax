const renderAudioGraph = (rootElement, context = new AudioContext()) => {
    if (!rootElement.isAudioGraph()) {
        throw new Error('Root element passed to renderAudioGraph must be <AudioGraph />!');
    }

    const children = rootElement.render();

    const target = children.reduce((sourceElement, targetElement) => {
        const sourceNode = sourceElement.render();
        const targetNode = targetElement.render();

        sourceNode.connect(targetNode);

        return targetNode;
    });

    target.connect(context.destination);
};

export default renderAudioGraph;
