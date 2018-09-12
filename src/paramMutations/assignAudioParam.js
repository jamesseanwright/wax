const isSingleMutation = value => value instanceof Function;

const isAudioParamSequence = value =>
    Array.isArray(value) && value.every(
        paramMutation => typeof paramMutation === 'function'
    );

const assignAudioParam = (param, value, currentTime) => {
    if (!value) {
        return;
    }

    if (isSingleMutation(value)) {
        value(param, currentTime);
    } else if (isAudioParamSequence(value)) {
        value.forEach(paramMutation => paramMutation(param, currentTime));
    } else {
        param.value = value;
    }
};

export default assignAudioParam;
