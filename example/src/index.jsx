import {
    createAudioGraph,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
} from '../../';

renderAudioGraph(
    <AudioGraph>
        <Oscillator
            frequency={440}
            type="square"
            endTime={1}
        />
        <Gain gain={0.6} />
        <StereoPanner pan={-0.3} />
    </AudioGraph>
);
