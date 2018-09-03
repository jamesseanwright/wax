import AudioComponent from './AudioComponent';

class StereoPanner extends AudioComponent {
    render(audioContext) {
        const { pan } = this.props;
        const node = audioContext.createStereoPanner();

        node.pan.value = pan;

        return node;
    }
}

export default StereoPanner;
