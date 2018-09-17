import reduceNodes from './reduceNodes';
import { createNoOpTree } from './reconciliationTree';

export const renderAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
    reconciliationTree = createNoOpTree(),
) => {
    const nodes = createGraphElement(context, reconciliationTree);
    return reduceNodes(nodes);
};

export const renderPersistentAudioGraph = (createGraphElement, context) => {
    // const
};
