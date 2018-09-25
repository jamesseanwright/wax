/** @jsx createElement */

import React from 'react';
import ReactDOM from 'react-dom';

import {
    isWaxComponent,
    createAudioElement,
    renderPersistentAudioGraph,
    AudioGraph,
    Oscillator,
    Gain,
    Destination,
} from 'wax-core';

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

    componentDidMount() {
        this.updateAudioGraph = renderPersistentAudioGraph(
            this.props.children(this.props.min),
        );
    }

    onChange({ target }) {
        this.updateAudioGraph(
            this.props.children(target.value),
        );
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
                <Destination />
            </AudioGraph>
        }
    </Slider>,
    document.querySelector('#react-target'),
);
