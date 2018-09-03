const createAudioElement = (Component, props, children) => new Component({
    ...props,
    children,
});

export default createAudioElement;
