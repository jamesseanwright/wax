import AudioComponent from './AudioComponent';

class StereoPanner extends AudioComponent {
    render() {
        const { context, pan } = this.props;
        const node = context.createStereoPanner();

        node.pan.value = pan;

        return node;
    }
}

export default StereoPanner;
