import assignAudioParam from '../paramMutations/assignAudioParam';

const StereoPanner = ({
    audioContext,
    pan,
    node = audioContext.createStereoPanner(),
}) => {
    assignAudioParam(node.pan, pan, audioContext.currentTime);
    return node;
};

export default StereoPanner;
