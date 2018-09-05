import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
} from '../..';

renderAudioGraph(
    <AudioGraph>
        <Oscillator
            frequency={440}
            type="square"
        />
        <Gain gain={0.6} />
    </AudioGraph>,
);
