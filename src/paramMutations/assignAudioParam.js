const isMutation = value => typeof value === 'function';

const isMutationSequence = value =>
    Array.isArray(value) && value.every(isMutation);

const assignAudioParam = (param, value, currentTime) => {
    if (!value) {
        return;
    }

    if (isMutation(value)) {
        value(param, currentTime);
    } else if (isMutationSequence(value)) {
        value.forEach(paramMutation => paramMutation(param, currentTime));
    } else {
        param.value = value;
    }
};

export default assignAudioParam;
