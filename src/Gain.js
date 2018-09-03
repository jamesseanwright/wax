import AudioComponent from './AudioComponent';

class Gain extends AudioComponent {
    render() {
        const { context, gain } = this.props;
        const node = context.createGain();

        node.gain.value = gain;

        return node;
    }
}

export default Gain;
