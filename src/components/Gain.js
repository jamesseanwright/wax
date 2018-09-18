import assignAudioParam from '../paramMutations/assignAudioParam';

const Gain = ({
    audioContext,
    gain,
    node = audioContext.createGain(),
}) => {
    assignAudioParam(node.gain, gain, audioContext.currentTime);
    return node;
};

export default Gain;
