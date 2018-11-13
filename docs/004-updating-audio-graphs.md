# Updating Rendered `<AudioGraph />`s

Thus far, we have been rendering static audio graphs with the `renderAudioGraph` function. Say we now want to update a graph that creates an oscillator, whose frequency is dictated by a slider (`<input type="range" />`):

```js
import {
    renderAudioGraph,
    ...
} from 'wax-core';

const slider = document.body.querySelector('#slider');

slider.addEventListener('change', ({ target }) => {
    renderAudioGraph(
        <AudioGraph>
            <Oscillator frequency={target.value} />
        </AudioGraph>
    );
});
```

The problem with this approach is that we'll be creating a new audio node for each element whenever the slider's value changes! While `AudioNode`s are cheap to create, the above code will result in many frequencies being played at once; try at your own peril, but I can assure you that it sounds horrible.

To update a tree that already exists, one can replace `renderAudioGraph` with `renderPersistentAudioGraph`:

```js
import {
    renderPersistentAudioGraph,
    ...
} from 'wax-core';

const slider = document.body.querySelector('#slider');
let value = 40;

slider.value = value;

const audioGraph = (
    <AudioGraph>
        <Oscillator frequency={value} />
    </AudioGraph>
);

const updateAudioGraph = renderPersistentAudioGraph(audioGraph);

slider.addEventListener('change', ({ target }) => {
    value = target.value;
    updateAudioGraph(audioGraph);
});
```

By invoking the `updateAudioGraph` function returned by calling `renderPersistentAudioGraph`, we can update our existing tree of audio elements to reflect the latest property values; this internally reinvokes component logic across the tree, but against the already-created nodes. It's analogous to React's [reconciliation](https://reactjs.org/docs/reconciliation.html) algorithm, albeit infinitely less sophisticated.

## A Note on "Reconciliation"

At present, Wax will not diff element trees between renders to determine if nodes have been added or removed; it assumes that their structures are identical, and that only respective properties have changed. This is certaintly a big limitation and will be addressed properly if this project evolves from an experiment; for the time being, conditionally specifying elements will not work:

```js
<AudioGraph>
    {/* This won't work... yet. */}
    {makeNoise && <Oscillator frequency={frequency} />}
</AudioGraph>
```
