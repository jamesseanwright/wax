const ChannelMerger = ({
    audioContext,
    inputs,
    children,
    node = audioContext.createChannelMerger(inputs),
}) => {
    const [setupConnections] = children;

    const connectToChannel = (childNode, channel) => {
        // assumption here that all nodes have 1 output. Extra param?
        childNode.connect(node, 0, channel);
    };

    setupConnections(connectToChannel);

    return node;
};

export default ChannelMerger;
