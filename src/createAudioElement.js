const memoiseCreator = func => {
    let result;

    return (audioContext, onAudioNodeCreated) => {
        if (!result) {
            result = func(audioContext, onAudioNodeCreated);
        }

        return result;
    };
};

/* this decorator is to distinguish
 * child element creators from other
 * child functions i.e. render props.
 * It also reconciles nodes that have
 * already been rendered. */
const asElementCreator = func => {
    const memoisedCreator = memoiseCreator(func);

    memoisedCreator.isElementCreator = true;
    return memoisedCreator;
};

const createAudioElement = (Component, props, ...children) =>
    asElementCreator((audioContext, onElementCreated) => {
        const mapResult = result =>
            result.isElementCreator
                ? result(audioContext, onElementCreated)
                : onElementCreated(result);

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children => children.map(mapResult);

        return mapResult(
            Component({
                children: createChildren(children),
                audioContext,
                ...props,
            })
        );
    });

export default createAudioElement;
