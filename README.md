# Wax

An experimental, JSX-compatible renderer for the Web Audio API. I wrote Wax for my [Manchester Web Meetup](https://www.meetup.com/Manchester-Web-Meetup) talk, _Manipulating the Web Audio API with JSX and custom renderers_ (video coming soon).

While it has decent test coverage and is stable, I still deem this to be a work-in-progress. **Use in production at your own risk!**

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

## Example Apps

Consult the [example](https://github.com/jamesseanwright/wax/tree/master/example) directory for a few small example apps that use Wax. The included [`README`](https://github.com/jamesseanwright/wax/blob/master/example/README.md) summarises them and details how they can be built and ran.

## Documentation

* [Introduction](https://github.com/jamesseanwright/wax/blob/master/docs/000-introduction.md)
* [Getting Started](https://github.com/jamesseanwright/wax/blob/master/docs/001-getting-started.md)
* [Manipulating Audio Parameters](https://github.com/jamesseanwright/wax/blob/master/docs/002-audio-parameters.md)
* [Building Complex Graphs with `<Aggregation />`s](https://github.com/jamesseanwright/wax/blob/master/docs/003-aggregations.md)
* [Updating Rendered `<AudioGraph />`s](https://github.com/jamesseanwright/wax/blob/master/docs/004-updating-audiographs.md)
* [Interop with React](https://github.com/jamesseanwright/wax/blob/master/docs/005-interop-with-react.md)
* [API Reference](https://github.com/jamesseanwright/wax/blob/master/docs/006-api-reference.md)
* [Local Development](https://github.com/jamesseanwright/wax/blob/master/docs/007-local-development.md)
