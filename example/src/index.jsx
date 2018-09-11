/** @jsx createAudioElement */

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    AggregateSource,
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
            {/* TODO: rename to <Aggregation />? */}
            <AggregateSource>
                <Oscillator
                    frequency={[
                        setValueAtTime(200, 0),
                        exponentialRampToValueAtTime(800, 3),
                    ]}
                    type="square"
                    endTime={3}
                />
                <AudioBufferSource buffer={yodel} />
            </AggregateSource>
            <Gain gain={0.6} />
            <StereoPanner pan={-0.3} />
            <Destination />
        </AudioGraph>,
        audioContext,
    );
})();
