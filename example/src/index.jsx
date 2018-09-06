/** @jsx createAudioElement */

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
} from 'web-audio-x';

renderAudioGraph(
    <AudioGraph>
        <Oscillator
            frequency={440}
            type="square"
        />
        <Gain gain={0.6} />
        <StereoPanner pan={-0.3} />
    </AudioGraph>
);
