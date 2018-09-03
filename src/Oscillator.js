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
            endTime,
            // TODO: periodic wave, inherited props
        } = this.props;

        const node = context.createOscillator();

        node.detune = detune;
        node.frequency = frequency;
        node.type = type;
        node.onended = onended;

        node.start(context.currentTime + startTime);

        if (endTime) {
            node.stop(context.currentTime + endTime);
        }

        return node;
    }
}

export default Oscillator;
