import { createOscillator } from '../Oscillator';
import { createStubAudioContext } from '../../__tests__/helpers';

describe('Oscillator', () => {
    let assignAudioParam;
    let Oscillator;

    beforeEach(() => {
        assignAudioParam = jest.fn().mockImplementation((param, value) => param.value = value);
        Oscillator = createOscillator(assignAudioParam);
    });

    it('should create an OscillatorNode, assign its props, and return said OscillatorNode', () => {
        const audioContext = createStubAudioContext();
        const detune = 7;
        const frequency = 300;
        const type = 'square';
        const onended = jest.fn();
        const enqueue = jest.fn();

        const node = Oscillator({
            audioContext,
            detune,
            frequency,
            type,
            onended,
            enqueue,
        });

        expect(assignAudioParam).toHaveBeenCalledTimes(2);
        expect(assignAudioParam).toHaveBeenCalledWith(node.detune, detune, audioContext.currentTime);
        expect(assignAudioParam).toHaveBeenCalledWith(node.frequency, frequency, audioContext.currentTime);
        expect(enqueue).toHaveBeenCalledTimes(1);
        expect(enqueue).toHaveBeenCalledWith(node);
        expect(node.frequency.value).toEqual(frequency);
        expect(node.detune.value).toEqual(detune);
        expect(node.onended).toBe(onended);
    });

    it('should mutate an existing OscillatorNode when provided', () => {
        const audioContext = createStubAudioContext();
        const node = audioContext.createOscillator();
        const frequency = 20;
        const enqueue = jest.fn();

        const result = Oscillator({
            audioContext,
            frequency,
            enqueue,
            node,
        });

        expect(result).toBe(node);
        expect(result.frequency.value).toEqual(20);
    });
});
