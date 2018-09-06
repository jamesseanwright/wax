const StereoPanner = ({ audioContext, pan }) => {
    const node = audioContext.createStereoPanner();

    node.pan.value = pan;

    return node;
};

export default StereoPanner;
