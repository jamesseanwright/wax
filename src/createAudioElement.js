const createAudioElement = (Component, props, ...children) =>
    audioContext =>
        Component.isClassBased
            ? new Component({
                ...props,
                audioContext,
                children,
            }).render()
            : Component({
                ...props,
                audioContext,
                children,
            });

export default createAudioElement;
