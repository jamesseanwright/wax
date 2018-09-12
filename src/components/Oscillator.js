import asSourceNode from './asSourceNode';
import assignAudioParam from '../paramMutations/assignAudioParam';

const Oscillator = ({
    audioContext,
    detune = 0,
    frequency,
    type,
    onended,
    enqueue,
}) => {
    const node = audioContext.createOscillator();

    assignAudioParam(node.detune, detune, audioContext.currentTime);
    assignAudioParam(node.frequency, frequency, audioContext.currentTime);
    node.type = type;
    node.onended = onended;

    enqueue(node);

    return node;
};

export default asSourceNode(Oscillator);