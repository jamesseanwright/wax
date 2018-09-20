jest.mock('../../paramMutations/assignAudioParam');

import { AudioBufferSource } from '../AudioBufferSource';
import assignAudioParam from '../../paramMutations/assignAudioParam';
import { createStubAudioContext } from '../../__tests__/helpers';

describe('AudioBufferSource', () => {
    beforeEach(() => {
        assignAudioParam.mockImplementationOnce((param, value) => param.value = value);
    });

    afterEach(() => {
        assignAudioParam.mockReset();
    });

    it('should create an AudioBufferSourceNode, assign its props, enqueue, and return said GainNode', () => {
        const audioContext = createStubAudioContext();
        const buffer = {};
        const loop = true;
        const loopStart = 1;
        const loopEnd = 3;
        const detune = 1;
        const playbackRate = 1;
        const enqueue = jest.fn();

        const node = AudioBufferSource({
            audioContext,
            buffer,
            loop,
            loopStart,
            loopEnd,
            detune,
            playbackRate,
            enqueue,
        });

        expect(node.buffer).toBe(buffer);
        expect(node.loop).toEqual(true);
        expect(node.loopStart).toEqual(1);
        expect(node.loopEnd).toEqual(3);

        expect(assignAudioParam).toHaveBeenCalledTimes(2);
        expect(assignAudioParam).toHaveBeenCalledWith(node.detune, detune, audioContext.currentTime);
        expect(assignAudioParam).toHaveBeenCalledWith(node.playbackRate, playbackRate, audioContext.currentTime);
        expect(enqueue).toHaveBeenCalledTimes(1);
        expect(enqueue).toHaveBeenCalledWith(node);
    });

    it('should respect and mutate an existing node if provided', () => {
        const audioContext = createStubAudioContext();
        const node = audioContext.createBufferSource();
        const buffer = {};

        const result = AudioBufferSource({
            audioContext,
            buffer,
            node,
            enqueue: jest.fn(),
        });

        expect(node).toBe(result);
        expect(node.buffer).toBe(buffer);
    });
});
