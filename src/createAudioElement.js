const createAudioElement = (Component, props, ...children) => {
    const creator = (audioContext, reconciliationMap, depth = 0) => {
        const mapResult = result =>
            result.isElementCreator
                ? result(audioContext, reconciliationMap, depth + 1)
                : result;

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children => children.map(mapResult);

        const existingNode = reconciliationMap.getElement(Component, depth);

        return reconciliationMap.addIfNonExistent(
            Component,
            depth,
            mapResult(
                Component({
                    children: createChildren(children),
                    audioContext,
                    node: existingNode,
                    ...props,
                })
            )
        );
    };

    /* to differentiate between element
     * creators and other function children
     * e.g. render props */
    creator.isElementCreator = true;

    return creator;
};

export default createAudioElement;
