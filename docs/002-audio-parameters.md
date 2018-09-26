# Manipulating Audio Parameters

The [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) interface provides a means of changing audio properties, such as `OscillatorNode.prototype.frequency` and `GainNode.prototype.gain`, via direct values or scheduled events.

Looking at our app, we can observe that it a few parameter changes will occur:

```jsx
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
```

* `<Oscillator />`'s frequency will immediately be set to 200 Hz, then ramped to 800 Hz over a duration of 3 seconds

* `<Gain />`'s gain will be a constant value of `0.2`

* `<StereoPanner />`'s pan will be a constant value of `-0.2`

With this in mind, Wax components support param changes with various props, whose values can be:

* a single, constant value
* a single parameter mutation e.g. `frequency={setValueAtTime(200, 0)}`
* an array of parameter mutations (as above), which will be applied in order of declaration

## What Are Parameter Mutations?

Parameter mutations are functions that conform to those exposed by the `AudioParam` interface; If an audio parameter supports it, then Wax will export a mutation for it! All of them are exported for consumption, but to list them for transparency:

* `setValueAtTime`
* `linearRampToValueAtTime`
* `exponentialRampToValueAtTime`
* `setTargetAtTime`
* `setValueCurveAtTime`
