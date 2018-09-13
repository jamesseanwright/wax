/** @jsx createAudioElement */

import React from 'react';
import ReactDOM from 'react-dom';

import {
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
    Destination,
} from 'web-audio-x';

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

ReactDOM.render(
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
);
