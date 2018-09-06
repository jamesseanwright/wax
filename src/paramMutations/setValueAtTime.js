const setValueAtTime = (value, time) =>
    (param, currentTime) => {
        param.setValueAtTime(value, currentTime + time);
    };

export default setValueAtTime;
