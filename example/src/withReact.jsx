/** @jsx createElement */


import React from 'react';
import ReactDOM from 'react-dom';
import * as wax from 'web-audio-x';
import combineElementCreators from './combineElementCreators';

const {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
    Destination,
} = wax;

const createElement = combineElementCreators(
    [Component => Component in wax, createAudioElement],
    [() => true, React.createElement],
);

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange({ target }) {
        this.props.children(target.value);
    }

    render() {
        return (
            <input
                type="range"
                min={this.props.min}
                max={this.props.max}
                change={this.onChange}
            />
        );
    }
}

ReactDOM.render( // no reconciliation should happen. Better way to mix renderers?!
    <>
        <Slider
            min={40}
            max={800}
        >
            {value => renderAudioGraph(
                <AudioGraph>
                    <Oscillator
                        frequency={value}
                        type="square"
                        endTime={3}
                    />
                    <Gain gain={0.2} />
                    <StereoPanner pan={-1} />
                    <Destination />
                </AudioGraph>,
            )}
        </Slider>
    </>
);
