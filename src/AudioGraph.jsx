import AudioContext from './AudioContext';

class AudioGraph extends AudioComponent {
    constructor({ audioContext = new AudioContext() }) {
        this.audioContext = audioContext;
    }

    render() {
        const context = <AudioContext audioContext={this.audioContext} />

        return [
            context,
            ...this.props.children,
        ];
    }

    isAudioGraph() {
        return true;
    }
}

export default AudioGraph;
