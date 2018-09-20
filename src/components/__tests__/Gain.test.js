jest.mock('../../paramMutations/assignAudioParam');

import Gain from '../Gain';
import assignAudioParam from '../../paramMutations/assignAudioParam';
import { createStubAudioContext } from '../../__tests__/helpers';

describe('Gain', () => {
    beforeEach(() => {
        assignAudioParam.mockImplementationOnce((param, value) => param.value = value);
    });

    afterEach(() => {
        assignAudioParam.mockReset();
    });

    it('should create a GainNode, assign its gain, and return said GainNode', () => {
        const audioContext = createStubAudioContext();
        const gain = 0.4;
        const node = Gain({ audioContext, gain });

        expect(assignAudioParam).toHaveBeenCalledTimes(1);
        expect(assignAudioParam).toHaveBeenCalledWith(node.gain, gain, audioContext.currentTime);
        expect(node.gain.value).toEqual(0.4);
    });

    it('should mutate an existing GainNode when provided', () => {
        const audioContext = createStubAudioContext();
        const node = audioContext.createGain();
        const gain = 0.7;
        const result = Gain({ audioContext, gain, node });

        expect(result).toBe(node);
        expect(assignAudioParam).toHaveBeenCalledTimes(1);
        expect(assignAudioParam).toHaveBeenCalledWith(node.gain, gain, audioContext.currentTime);
        expect(node.gain.value).toEqual(0.7);
    });
});
