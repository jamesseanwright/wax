import assignAudioParam from '../paramMutations/assignAudioParam';

export const createGain = assignParam =>
    ({
        audioContext,
        gain,
        node = audioContext.createGain(),
    }) => {
        assignParam(node.gain, gain, audioContext.currentTime);
        return node;
    };

export default createGain(assignAudioParam);
