const isAudioNode = result => result instanceof AudioNode;
const areAudioNodes = results => Array.isArray(results) && results.every(isAudioNode);

const createAudioElement = (Component, props, ...children) =>
    audioContext => {
        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const renderChildren = children =>
            children.map(renderer => renderer(audioContext));

        const result = Component.isClassBased
            ? new Component({
                children: renderChildren(children),
                audioContext,
                ...props,
            }).render()
            : Component({
                children: renderChildren(children),
                audioContext,
                ...props,
            });

        return isAudioNode(result) || areAudioNodes(result) // TODO: confirm this
            ? result
            : result(audioContext); // child element
    };

export default createAudioElement;
