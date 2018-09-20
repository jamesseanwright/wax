export const createStubAudioContext = (currentTime = 0) => ({
    currentTime,
    createGain(value = 0) {
        return ({
            gain: {
                value,
            },
        });
    }
});
