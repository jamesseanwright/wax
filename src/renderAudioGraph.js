import reduceNodes from './reduceNodes';
import { createNoOpTree, createReconciliationTree } from './reconciliationTree';

export const renderAudioGraph = (
    createGraphElement,
    context = new AudioContext(),
    reconciliationTree = createNoOpTree(),
) => reduceNodes(
    createGraphElement(context, reconciliationTree),
);

export const renderPersistentAudioGraph = (createGraphElement, context) =>
    renderAudioGraph(createGraphElement, context, createReconciliationTree());
