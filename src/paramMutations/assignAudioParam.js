const assignAudioParam = (param, value, currentTime) => {
    if (typeof value === 'function') {
        value(param, currentTime);
    } else {
        param.value = value;
    }
};

export default assignAudioParam;
