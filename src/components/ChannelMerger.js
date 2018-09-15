const ChannelMerger = ({ audioContext, inputs, children }) => {
    const merger = audioContext.createChannelMerger(inputs);
    const [setupConnections] = children;

    const connectToChannel = (node, channel) => {
        // assumption here that all nodes have 1 output. Extra param?
        node.connect(merger, 0, channel);
    };

    setupConnections(connectToChannel);

    return merger;
};

export default ChannelMerger;
