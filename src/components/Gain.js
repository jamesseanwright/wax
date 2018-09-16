const Gain = ({ audioContext, gain }) => {
    const node = audioContext.createGain();

    node.gain.value = gain;

    return node;
};

export default Gain;
