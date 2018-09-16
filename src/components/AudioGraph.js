import AudioComponent from './AudioComponent';

class AudioGraph extends AudioComponent {
    get isAudioGraph() {
        return true;
    }

    render() {
        return this.props.children;
    }
}


export default AudioGraph;
