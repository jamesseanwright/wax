import assignAudioParam from '../paramMutations/assignAudioParam';

const Oscillator = ({
    audioContext,
    detune = 0,
    frequency,
    type,
    onended,
    startTime = 0,
    endTime,
}) => {
    const node = audioContext.createOscillator();

    assignAudioParam(node.detune, detune, audioContext.currentTime);
    assignAudioParam(node.frequency, frequency, audioContext.currentTime);
    node.type = type;
    node.onended = onended;

    node.start(audioContext.currentTime + startTime);

    if (endTime) {
        node.stop(audioContext.currentTime + endTime);
    }

    return node;
};

export default Oscillator;
