import assignAudioParam from '../paramMutations/assignAudioParam';

export const createStereoPanner = assignParam =>
    ({
        audioContext,
        pan,
        node = audioContext.createStereoPanner(),
    }) => {
        assignParam(node.pan, pan, audioContext.currentTime);
        return node;
    };

export default createStereoPanner(assignAudioParam);
