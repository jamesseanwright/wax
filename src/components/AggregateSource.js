/* An abstraction of ChannelMerger node
 * targetted towards aggregating multiple
 * source nodes into a single node, routed
 * to the returned merger node's sole input */

const AggregateSource = ({ children, audioContext }) => {
    const merger = audioContext.createChannelMerger(1);

    children.forEach(renderElement => {
        const node = renderElement(audioContext);

        node.connect(merger);
    });

    return merger;
};

export default AggregateSource;
