/* This simply returns children at the,
 * moment but will become more involved as
 * we ultimately support complex graphs */

/** @jsx createAudioElement */

import createAudioElement from './createAudioElement';
import Destination from './Destination';
import AudioComponent from './AudioComponent';

class AudioGraph extends AudioComponent {
    render() {
        const { children, audioContext } = this.props;

        return [
            ...children,
            <Destination destination={audioContext.destination} />,
        ];
    }
}

export default AudioGraph;
