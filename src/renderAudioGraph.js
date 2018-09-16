import reduceNodes from './reduceNodes';

const renderAudioGraph = (render, context = new AudioContext()) => {
    const result = render(context);
    return reduceNodes(result); // TODO: return update/destroy func here?
};

export default renderAudioGraph;
