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

        if (isAudioNode(result)) {
            return result;
        }

        if (Array.isArray(result)) {
            return result.map(renderer => renderer(audioContext));
        }

        return result(audioContext);
    };

export default createAudioElement;
