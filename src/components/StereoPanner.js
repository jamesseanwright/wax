const StereoPanner = ({ audioContext, pan }) => {
    const node = audioContext.createStereoPanner();

    node.pan.value = pan; // TODO: support mutations
    return node;
};

export default StereoPanner;
