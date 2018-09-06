/** @jsx createAudioElement */

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
    exponentialRampToValueAtTime,
} from 'web-audio-x';

renderAudioGraph(
    <AudioGraph>
        <Oscillator
            frequency={exponentialRampToValueAtTime(200, 3)} // TODO: support change sequences (array)
            type="square"
            endTime={3}
        />
        <Gain gain={0.6} />
        <StereoPanner pan={-0.3} />
    </AudioGraph>
);
