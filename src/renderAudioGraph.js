import reduceNodes from './reduceNodes';

const nodeCreatedNoOp = result => result;

export const renderAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
    onAudioNodeCreated = nodeCreatedNoOp
) => {
    const nodes = createGraphElement(context, onAudioNodeCreated);
    return reduceNodes(nodes);
};

export const renderPersistentAudioGraph = (createGraphElement, context = new AudioContext()) => {
    // TODO
};
