import asSourceNode from './asSourceNode';
import assignAudioParam from '../paramMutations/assignAudioParam';

const AudioBufferSource = ({
    audioContext,
    buffer,
    detune,
    loop,
    loopStart = 0,
    loopEnd = 0,
    playbackRate,
    enqueue,
}) => {
    const node = audioContext.createBufferSource();

    node.buffer = buffer;
    node.loop = loop;
    node.loopStart = loopStart;
    node.loopEnd = loopEnd;
    assignAudioParam(node.detune, detune, audioContext.currentTime);
    assignAudioParam(node.playbackRate, playbackRate, audioContext.currentTime);

    enqueue(node);

    return node;
};

export default asSourceNode(AudioBufferSource);
