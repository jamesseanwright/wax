import createParamMutator from '../createParamMutator';

describe('createParamMutator', () => {
    it('should create a func for public use which returns an inner function to manipulate AudioParams', () => {
        const audioParam = { setValueAtTime: jest.fn() };
        const setValueAtTime = createParamMutator('setValueAtTime');
        const mutateAudioParam = setValueAtTime(300, 7);

        mutateAudioParam(audioParam, 3);

        expect(audioParam.setValueAtTime).toHaveBeenCalledTimes(1);
        expect(audioParam.setValueAtTime).toHaveBeenCalledWith(300, 10);
    });
});
