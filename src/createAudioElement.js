/* this decorator is to distinguish
 * child element creators from other
 * child functions i.e. render props */
const asElementCreator = func => func.isElementCreator = true && func;

const createAudioElement = (Component, props, ...children) =>
    asElementCreator(audioContext => {
        const mapResult = result =>
            result.isElementCreator
                ? result(audioContext)
                : result;

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
