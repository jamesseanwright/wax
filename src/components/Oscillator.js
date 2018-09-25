import asSourceNode from './asSourceNode';
import assignAudioParam from '../paramMutations/assignAudioParam';

export const createOscillator = assignParam =>
    ({
        audioContext,
        detune = 0,
        frequency,
        type,
        onended,
        enqueue,
        node = audioContext.createOscillator(),
    }) => {
        assignParam(node.detune, detune, audioContext.currentTime);
        assignParam(node.frequency, frequency, audioContext.currentTime);
        node.type = type;
        node.onended = onended;

        enqueue(node);

        return node;
    };

export default asSourceNode(
    createOscillator(assignAudioParam)
);
