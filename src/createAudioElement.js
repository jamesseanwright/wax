/* this decorator is to distinguish
 * child element creators from other
 * child functions i.e. render props.
 * It also reconciles nodes that have
 * already been rendered. */
const asElementCreator = func => {
    let element;

    const creator = (audioContext, reconciliationTree) => {
        if (!element) {
            element = func(audioContext, reconciliationTree);
        }

        return reconciliationTree.value = element;
    };

    creator.isElementCreator = true;
    return creator;
};

const createAudioElement = (Component, props, ...children) =>
    asElementCreator((audioContext, reconciliationTree) => {
        const mapResult = (result, i) =>
            result.isElementCreator
                ? result(audioContext, reconciliationTree.children[i])
                : result;

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
