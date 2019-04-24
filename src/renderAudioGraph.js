import connectNodes from './connectNodes';

export const renderAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
) => {
    const nodes = createGraphElement(context);
    connectNodes(nodes);
    return nodes;
};

export const renderPersistentAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
) => {
    let nodes = renderAudioGraph(createGraphElement, context);

    return createNewGraphElement => {
        nodes = createNewGraphElement(context, nodes);
    };
};
