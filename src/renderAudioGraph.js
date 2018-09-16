import reduceNodes from './reduceNodes';

export const renderAudioGraph = (createGraphElement, context = new AudioContext()) => {
    const nodes = createGraphElement(context);
    return reduceNodes(nodes);
};

export const renderPersistentAudioGraph = (createGraphElement, context = new AudioContext()) => {

};
