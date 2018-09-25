/* TODO: replace with creator function that
 * receives jest.fn() as a parameter. */
jest.mock('../../paramMutations/assignAudioParam');

import StereoPanner from '../StereoPanner';
import assignAudioParam from '../../paramMutations/assignAudioParam';
import { createStubAudioContext } from '../../__tests__/helpers';

describe('StereoPanner', () => {
    beforeEach(() => {
        assignAudioParam.mockImplementationOnce((param, value) => param.value = value);
    });

    afterEach(() => {
        assignAudioParam.mockReset();
    });

    it('should create a StereoPannerNode, assign its pan, and return said StereoPannerNode', () => {
        const audioContext = createStubAudioContext();
        const pan = 0.4;
        const node = StereoPanner({ audioContext, pan });

        expect(assignAudioParam).toHaveBeenCalledTimes(1);
        expect(assignAudioParam).toHaveBeenCalledWith(node.pan, pan, audioContext.currentTime);
        expect(node.pan.value).toEqual(pan);
    });

    it('should mutate an existing StereoPannerNode when provided', () => {
        const audioContext = createStubAudioContext();
        const node = audioContext.createStereoPanner();
        const pan = 0.7;
        const result = StereoPanner({ audioContext, pan, node });

        expect(result).toBe(node);
        expect(assignAudioParam).toHaveBeenCalledTimes(1);
        expect(assignAudioParam).toHaveBeenCalledWith(node.pan, pan, audioContext.currentTime);
        expect(node.pan.value).toEqual(pan);
    });
});
