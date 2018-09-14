/** @jsx createElement */

import React from 'react';
import ReactDOM from 'react-dom';

import {
    isWaxComponent,
    createAudioElement,
    renderAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    StereoPanner,
    Destination,
} from 'web-audio-x';

import combineElementCreators from './combineElementCreators';

const createElement = combineElementCreators(
    [isWaxComponent, createAudioElement],
    [() => true, React.createElement],
);

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange({ target }) {
        renderAudioGraph(this.props.children(target.value));
    }

    render() {
        return (
            <input
                type="range"
                min={this.props.min}
                max={this.props.max}
                onChange={this.onChange}
            />
        );
    }
}

ReactDOM.render(
    <Slider
        min={40}
        max={800}
    >
        {value =>
            <AudioGraph>
                <Oscillator
                    frequency={value}
                    type="square"
                />
                <Gain gain={0.2} />
                <StereoPanner pan={-1} />
                <Destination />
            </AudioGraph>
        }
    </Slider>,
    document.querySelector('#react-target'),
);
