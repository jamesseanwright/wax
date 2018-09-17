// TODO: replace memoisation with tree.

const createAudioElement = (Component, props, ...children) => {
    const creator = (audioContext, tree) => {
        const mapResult = (result, i) =>
            result.isElementCreator
                ? result(audioContext, tree.getChild(i))
                : tree.setElement(creator, result);

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children => children.map(mapResult);

        return mapResult(
            Component({
                children: createChildren(children),
                audioContext,
                node: tree.getElement(creator),
                ...props,
            })
        );
    };

    return creator;
};

export default createAudioElement;
