import assignAudioParam from '../paramMutations/assignAudioParam';

const AudioBufferSource = ({
    audioContext,
    buffer,
    detune,
    loop,
    loopStart = 0,
    loopEnd = 0,
    playbackRate,
    startTime,
    endTime,
}) => {
    const node = audioContext.createBufferSource();

    node.buffer = buffer;
    node.loop = loop;
    node.loopStart = loopStart;
    node.loopEnd = loopEnd;
    assignAudioParam(node.detune, detune, audioContext.currentTime);
    assignAudioParam(node.playbackRate, playbackRate, audioContext.currentTime);

    node.start(audioContext.currentTime + startTime);

    if (endTime) {
        node.stop(audioContext.currentTime + endTime);
    }

    return node;
};

export default AudioBufferSource;
