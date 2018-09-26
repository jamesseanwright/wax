# Building Complex Graphs with `<Aggregation />`s

Thus far, we have built a simple, linear audio graph. What if we want to build more complex graphs in which multiple sources connect to common nodes? In Wax, we can achieve this with the `<Aggregation />` component.

Say we wish to build the following graph:

![A more complex audio graph, with two separate nodes connecting to a single StereoPannerNode](https://raw.githubusercontent.com/jamesseanwright/wax/master/docs/images/complex-graph.png)

The Web Audio API is built for this, demonstrating how the audio node model is a pragmatic fit:

```js
// Node instantiation code assumed
oscillator.connect(gain);
gain.connect(stereoPanner);
bufferSource.connect(stereoPanner);
stereoPanner.connect(context.destination);
```

Great! But how can we achieve this with Wax? With the `<Aggregation />` component, that's how:

```js
import {
    Aggregation,
    ...
} from 'wax-core';

// [...]

const yodel = await fetchAsAudioBuffer('/yodel.mp3', audioContext);
const stereoPanner = <StereoPanner pan={0.4} />;

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
            <Gain gain={0.1} />
            {stereoPanner}
        </Aggregation>
        <Aggregation>
            <AudioBufferSource
                buffer={yodel}
            />
            {stereoPanner}
        </Aggregation>
        {stereoPanner}
        <Destination />
    </AudioGraph>,
    audioContext,
);
```

You can think of an aggregation as a nestable audio graph; it will connect its children sequentially. When the root `<AudioGraph />` is rendered, any inner `<Aggregation />` elements will be respected, avoiding double rendering and connection issues.

Typically, you'll declare a shared element in a single place, to which the other children of an aggregation can connect; said shared element can then be specified again in the main audio graph to ensure it is ultimately connected, directly or indirectly, to the destination node.

Let's clarify this within the above example. We declare a single `<StereoPanner />` element, which will create a single `StereoPannerNode` to which a `GainNode` and an `AudioBufferSourceNode` will respectively connect. Outside of the two `<Aggregation />` elements, we specify the same element instance again in the root audio graph, so that it will be connected to `audioContext.destination`. As we can reuse existing elements by declaration name within a set of curly braces in React, we can achieve the same in Wax; to summarise, these sharable elements can be used within inner aggregations and the root audio graph to generate more complex sounds.
