# Getting Started

The entirety of Wax is available in a single package from npm, named `wax-core`. Install it into your project with:

```shell
npm i --save wax-core
```

Create a single entry point, `simple.jsx`, and replicate the following imports and audio graph.

```js
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
        <StereoPanner pan={-0.2} />
        <Destination />
    </AudioGraph>
);
```

While `<AudioGraph />` does nothing special at present, it may manipulate its children in future versions of Wax. Please ensure you always specify an `AudioGraph` as the root element of the tree.

But how do we actually build this? How can we instruct a transpiler that these JSX constructs should specifically target Wax? Firstly, let's look at the first binding we import from `wax-core`:

```js
import {
    createAudioElement,
    ...
} from 'wax-core';
```

Why are we importing this is we aren't calling it anywhere? Oh, but we are; when our JSX is transpiled, it'll resolve to invocations of `createAudioElement`. It is the Wax equivalent of `React.createAudioElement`, and follows the exact same signature!

```js
renderAudioGraph(
    createAudioElement(
        AudioGraph,
        null,
        createAudioElement(
            Oscillator,
            {
                frequency: [
                    setValueAtTime(200, 0),
                    exponentialRampToValueAtTime(800, 3)
                ],
                type: 'square',
                endTime: 3,
            },
        ),
        createAudioElement(Gain, { gain: 0.2 }),
        createAudioElement(StereoPanner, { pan: -0.2 }),
        createAudioElement(Destination, null),
    )
);
```

To achieve this transformation, we can use [Babel](https://babeljs.io) and the [`transform-react-jsx`](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) plugin; the latter exposes a `pragma` option that we can configure to transform JSX to `createAudioElement` calls:

```json
{
    "plugins": [
        ["@babel/transform-react-jsx", {
            "pragma": "createAudioElement"
        }]
    ]
}
```

Despite the name, this plugin performs general JSX transformations, defaulting to `React.createElement`. You do not need React to use Wax!

To create a bundle containing Wax and our app's code, we'll need a build tool **that supports ES Modules**. For the example apps, we use [Rollup](https://rollupjs.org/) and [`rollup-plugin-babel`](https://github.com/rollup/rollup-plugin-babel) to respect JSX transpilation ([config](https://github.com/jamesseanwright/wax/blob/master/rollup.config.js)).

Once we have our bundle, we can load it into a HTML document using a `<script>` element:

```html
<script src="/index.js"></script>
```
