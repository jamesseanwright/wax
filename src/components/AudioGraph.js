/* This simply returns children at the,
 * moment but will become more involved as
 * we ultimately support complex graphs */

const AudioGraph = ({ children, audioContext }) =>
    children.reduce((sourceNode, renderElement) => {
        const targetNode = renderElement(audioContext);

        if (sourceNode) {
            sourceNode.connect(targetNode);
        }

        return targetNode;
    }, null);

export default AudioGraph;
