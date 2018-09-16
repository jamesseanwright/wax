# Wax

A component-driven library to abstract the Web Audio API, intended to be targeted by JSX.

```jsx
/** @jsx createAudioElement */

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
    Destination,
    setValueAtTime,
    exponentialRampToValueAtTime,
} from 'wax-core';

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
        <Gain gain={0.2} />
        <StereoPanner pan={-1} />
        <Destination />
    </AudioGraph>
);
```

## Getting Started

TODO
