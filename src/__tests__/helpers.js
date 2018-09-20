export const createStubAudioContext = (currentTime = 0) => ({
    currentTime,
    createGain() {
        return {
            gain: {
                value: 0,
            },
        };
    },
    createStereoPanner() {
        return {
            pan: {
                value: 0,
            },
        };
    },
    createBufferSource() {
        return {
            detune: {
                value: 0,
            },
            playbackRate: {
                value: 0,
            },
        };
    }
});
