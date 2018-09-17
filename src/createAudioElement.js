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
    asElementCreator((audioContext, onAudioNodeCreated) => {
        const mapResult = result =>
            result.isElementCreator
                ? result(audioContext, onAudioNodeCreated)
                : onAudioNodeCreated(result);

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children => children.map(mapResult);

        const result = Component.isClassBased // TODO: do we still need classes?
            ? new Component({
                children: createChildren(children),
                audioContext,
                ...props,
            }).render()
            : Component({
                children: createChildren(children),
                audioContext,
                ...props,
            });

        return mapResult(result);
    });

export default createAudioElement;
