/* This simply returns children at the,
 * moment but will become more involved as
 * we ultimately support complex graphs */

class AudioGraph extends AudioComponent {
    constructor({ audioContext = new AudioContext() }) {
        this.audioContext = audioContext;
    }

    render() {
        return this.props.children;
    }

    isAudioGraph() {
        return true;
    }
}

export default AudioGraph;
