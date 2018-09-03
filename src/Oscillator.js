import AudioComponent from './AudioComponent';

class Oscillator extends AudioComponent {
    render() {
        const {
            context,
            detune,
            frequency,
            type,
            onended,
            startTime = 0,
            // TODO: periodic wave, inherited props
        } = this.props;

        const node = context.createOscillator();

        node.detune = detune;
        node.frequency = frequency;
        node.type = type;
        node.onended = onended;

        node.start(startTime);

        return node;
    }
}

export default Oscillator;
