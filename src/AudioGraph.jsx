import Destination from './Destination';

class AudioGraph {
    constructor({ audioContext = new AudioContext() }) {
        this.audioContext = audioContext;
    }

    render() {
        const { children } = this.props;
        const destination = <Destination node={this.audioContext.destination} />;

        [...children, destination].reduce((sourceElement, targetElement) => {
            const sourceNode = sourceElement.render(); // TODO: move to renderer
            const targetNode = targetElement.render();

            sourceNode.connect(targetNode);

            return targetNode;
        });
    }
}

export default AudioGraph;
