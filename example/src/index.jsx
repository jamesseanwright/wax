/** @jsx createAudioElement */

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
    setValueAtTime,
    exponentialRampToValueAtTime,
} from 'web-audio-x';

renderAudioGraph(
    <AudioGraph>
        <Oscillator
            frequency={[
                setValueAtTime(200, 0),
                exponentialRampToValueAtTime(800, 3),
            ]}
            type="square"
            endTime={3}
        />
        <Gain gain={0.6} />
        <StereoPanner pan={-0.3} />
    </AudioGraph>
);
