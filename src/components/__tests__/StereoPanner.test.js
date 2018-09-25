import { createStereoPanner } from '../StereoPanner';
import { createStubAudioContext } from '../../__tests__/helpers';

describe('StereoPanner', () => {
    let assignAudioParam;
    let StereoPanner;

    beforeEach(() => {
        assignAudioParam = jest.fn().mockImplementationOnce((param, value) => param.value = value);
        StereoPanner = createStereoPanner(assignAudioParam);
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
