import assignAudioParam from '../paramMutations/assignAudioParam';

// TODO: higher-order component to compose source element
const AudioBufferSource = ({
    audioContext,
    buffer,
    detune,
    loop,
    loopStart = 0,
    loopEnd = 0,
    playbackRate,
    startTime = 0,
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
