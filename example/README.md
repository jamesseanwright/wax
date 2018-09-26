# Example Apps

The `src` directory contains three example Wax applications, each bootstrapped by the same HTML document (index.html):

* `simple.jsx` - declares an oscillator, with a couple of scheduled frequency changes, whose gain and pan are altered

* `aggregation.jsx` - demonstrates how one can use the `<Aggregation />` component to build more complex audio graphs

* `withReact.jsx` - renders a slider element using React, which updates an `<AudioGraph />` whenever its value is changed. This calls `renderPersistentAudioGraph()`

## Running the Examples

After following the setup guide in the [local development documentation](https://github.com/jamesseanwright/wax/blob/master/docs/007-local-development.md), run `npm run dev` from the root of the repository. You can specify the `ENTRY` environment varible to select which app to run; this is the name of the app **without** the `.jsx` extension e.g. `ENTRY=withReact npm run dev`. If omitted, `simple` will be built and started.

The example apps are [built using rollup](https://github.com/jamesseanwright/wax/blob/master/rollup.config.js).
