import AudioComponent from './AudioComponent';

class Gain extends AudioComponent {
    render(audioContext) {
        const { gain } = this.props;
        const node = audioContext.createGain();

        node.gain.value = gain;

        return node;
    }
}

export default Gain;
