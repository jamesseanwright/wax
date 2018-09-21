import assignAudioParam from '../assignAudioParam';

describe('assignAudioParam', () => {
    it('should do nothing if a value is not provided', () => {
        const param = {};
        assignAudioParam(param, null, 1);
        expect(param).toEqual({});
    });

    it('should invoke the value with the param and current time when it`s a function', () => {
        const param = {};
        const value = jest.fn();
        const currentTime = 6;

        assignAudioParam(param, value, currentTime);

        expect(value).toHaveBeenCalledTimes(1);
        expect(value).toHaveBeenCalledWith(param, currentTime);
    });

    it('should invoke each value with the param and currenttime when it`s an array of functions', () => {
        const param = {};
        const value = [jest.fn(), jest.fn(), jest.fn()];
        const currentTime = 9;

        assignAudioParam(param, value, currentTime);

        value.forEach(mutator => {
            expect(mutator).toHaveBeenCalledTimes(1);
            expect(mutator).toHaveBeenCalledWith(param, currentTime);
        });
    });

    it('should assign the value to the param`s value property if it is not a function', () => {
        const param = {};
        const value = 5;

        assignAudioParam(param, value);

        expect(param.value).toEqual(value);
    });
});
