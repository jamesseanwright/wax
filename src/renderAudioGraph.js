import reduceNodes from './reduceNodes';

const elementCreatedNoOp = element => element;

export const renderAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
    onElementCreated = elementCreatedNoOp
) => {
    const nodes = createGraphElement(context, onElementCreated);
    return reduceNodes(nodes);
};

export const renderPersistentAudioGraph = (createGraphElement, context) => {
    // TODO
};
