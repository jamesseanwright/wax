const isAudioNode = result => result instanceof AudioNode;

const getNodeKey = (Component, props, ...children) =>
    `${Component.name}${JSON.stringify(Object.keys(props || {}))}${JSON.stringify(children)}`;

const computedNodes = new Map();

const storeNode = (key, node) => computedNodes.set(key, node) && node;

const createAudioElement = (Component, props, ...children) => {
    const nodeKey = getNodeKey(Component, props, ...children);

    if (computedNodes.has(nodeKey)) {
        return () => computedNodes.get(nodeKey);
    }

    return audioContext => {
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
            ? storeNode(nodeKey, result)
            // required for deeply-nested element instances e.g. HOCs
            : createAudioElement(result, props, children)(audioContext);
    };
};

export default createAudioElement;
