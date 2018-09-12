/** @jsx createAudioElement */

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Aggregation,
    AudioBufferSource,
    Oscillator,
    Gain,
    StereoPanner,
    Destination,
    setValueAtTime,
    exponentialRampToValueAtTime,
} from 'web-audio-x';

const fetchAsAudioBuffer = async (url, audioContext) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
};

const audioContext = new AudioContext();

(async () => {
    const yodel = await fetchAsAudioBuffer('/yodel.mp3', audioContext);

    renderAudioGraph(
        <AudioGraph>
            <Aggregation>
                <Oscillator
                    frequency={[
                        setValueAtTime(200, 0),
                        exponentialRampToValueAtTime(800, 3),
                    ]}
                    type="square"
                    endTime={3}
                />
                <Gain gain={0.2} />
                <StereoPanner pan={-1} />
            </Aggregation>
            <Aggregation>
                <AudioBufferSource buffer={yodel} />
                <Gain gain={1.4} />
                <StereoPanner pan={1} />
            </Aggregation>
            <Destination />
        </AudioGraph>,
        audioContext,
    );
})();
