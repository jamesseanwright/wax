const isAudioNode = result => result instanceof AudioNode;

const createAudioElement = (Component, props, ...children) =>
    audioContext => {
        const result = Component.isClassBased
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

        return isAudioNode(result)
            ? result
            // required for deeply-nested element instances e.g. HOCs
            : createAudioElement(result, props, children)(audioContext);
    };

export default createAudioElement;
