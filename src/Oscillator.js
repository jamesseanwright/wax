const Oscillator = ({
    audioContext,
    detune,
    frequency,
    type,
    onended,
    startTime = 0,
    endTime,
}) => {
    const node = audioContext.createOscillator();

    node.detune = detune;
    node.frequency = frequency;
    node.type = type;
    node.onended = onended;

    node.start(audioContext.currentTime + startTime);

    if (endTime) {
        node.stop(audioContext.currentTime + endTime);
    }

    return node;
};

export default Oscillator;
