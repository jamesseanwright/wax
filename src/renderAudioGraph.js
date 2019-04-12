import connectTree from './connectTree';

export const renderAudioGraph = (createGraphElement, context = new AudioContext()) => {
    const nodeTree = createGraphElement(context);
    connectTree(nodeTree);
    return nodeTree;
};

export const renderPersistentAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
) => {
    let nodeTree = renderAudioGraph(createGraphElement, context);

    return createNewGraphElement => {
        nodeTree = createNewGraphElement(context, nodeTree);
    };
};
