const Gain = ({ audioContext, gain }) => {
    const node = audioContext.createGain();

    node.gain.value = gain; // TODO: support mutations

    return node;
};

export default Gain;
