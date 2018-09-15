import reduceNodes from './reduceNodes';

const renderAudioGraph = (render, context = new AudioContext()) => {
    const result = render(context);
    return reduceNodes(result); // TODO: return reconciliation result here?!
};

export default renderAudioGraph;
