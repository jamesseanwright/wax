# Introduction

[Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) is a exciting capability that allows developers to generate and manipulate sound in real-time (and to [render it for later use](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)), requiring nothing beyond JavaScript and a built-in browser API. Its audio graph model is conceptually logical, but writing imperative connection code can prove tedious, especially for larger graphs:

```js
oscillator.connect(gain);
gain.connect(stereoPanner);
bufferSource.connect(stereoPanner);
stereoPanner.connect(context.destination);
```

[There are ways of mitigating this "fatigue"](https://github.com/learnable-content/web-audio-api-mini-course/blob/lesson1.3/complete/index.js#L66), but what if we could declare our audio graph, and its components, as a tree of elements using [JSX](https://reactjs.org/docs/introducing-jsx.html)? Can we thus avoid directly specifying this connection code? Wax is an attempt at answering these questions.

Take the example found in the main README:

```jsx
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

This is analogous to:

```js
const context = new AudioContext();
const oscillator = context.createOscillator();
const gain = context.createGain();
const stereoPanner = context.createStereoPanner();
const getTime = time => context.currentTime + time;

oscillator.type = 'square';
oscillator.frequency.value = 200;
oscillator.frequency.exponentialRampToValueAtTime(800, getTime(3));
gain.gain.value = 0.2;
stereoPanner.pan.value = -0.2

oscillator.connect(gain);
gain.connect(stereoPanner);
stereoPanner.connect(context.destination);

oscillator.start();
oscillator.stop(getTime(3));
```

As React abstracts manual, imperative DOM operations, Wax abstracts manual, imperative Web Audio operations.

But how does Wax connect these nodes? The children of the root `<AudioGraph />` element **will be connected to one another in the order in which they're declared**. In our case:

1. `<Oscillator />` will be rendered and connected to the rendered `<Gain />`
2. `<Gain />` will be connected to `<StereoPanner />`
3. `<StereoPanner />` will be connected to `<Destination />` (`Destination` is a convenience component to consistently handle connections to the audio context's `destination` node)
