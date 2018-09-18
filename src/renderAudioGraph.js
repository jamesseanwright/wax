import reduceNodes from './reduceNodes';
import createReconciliationMap from './reconciliationMap';

export const renderAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
    reconciliationMap = createReconciliationMap(),
) => reduceNodes(
    createGraphElement(context, reconciliationMap),
);

export const renderPersistentAudioGraph = (
    createGraphElement,
    context = new AudioContext()
) => {
    const map = createReconciliationMap();
    renderAudioGraph(createGraphElement, context, map); // initial render
    return newGraph => renderAudioGraph(newGraph, context, map);
};
