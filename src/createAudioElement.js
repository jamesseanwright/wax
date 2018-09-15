const asElementCreator = func => func.isElementCreator = true && func;

const createAudioElement = (Component, props, ...children) =>
    asElementCreator(audioContext => {
        const mapResult = result =>
            result.isElementCreator
                ? result(audioContext)
                : result; // respects child-based render props

        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children =>
            children.map(mapResult);

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
