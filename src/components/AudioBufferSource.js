import asSourceNode from './asSourceNode';
import assignAudioParam from '../paramMutations/assignAudioParam';

export const createAudioBufferSource = assignParam =>
    ({
        audioContext,
        buffer,
        detune,
        loop = false,
        loopStart = 0,
        loopEnd = 0,
        playbackRate,
        enqueue,
        node = audioContext.createBufferSource(),
    }) => {
        node.buffer = buffer;
        node.loop = loop;
        node.loopStart = loopStart;
        node.loopEnd = loopEnd;
        assignParam(node.detune, detune, audioContext.currentTime);
        assignParam(node.playbackRate, playbackRate, audioContext.currentTime);

        enqueue(node);

        return node;
    };

export default asSourceNode(
    createAudioBufferSource(
        assignAudioParam
    )
);
