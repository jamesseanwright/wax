const exponentialRampToValueAtTime = (value, time) =>
    (param, currentTime) => {
        param.exponentialRampToValueAtTime(value, currentTime + time);
    };

export default exponentialRampToValueAtTime;
