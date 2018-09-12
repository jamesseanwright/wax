const createAudioElement = (Component, props, ...children) =>
    audioContext =>
        Component.isClassBased
            ? new Component({
                children,
                audioContext,
                ...props,
            }).render()
            : Component({
                children,
                audioContext,
                ...props,
            });

export default createAudioElement;
