const renderAudioGraph = (renderElement, context = new AudioContext()) => {
    const result = renderElement(context);

    if (Array.isArray(result)) {
        result.forEach(child => renderAudioGraph(child, context));
    }
};

export default renderAudioGraph;
