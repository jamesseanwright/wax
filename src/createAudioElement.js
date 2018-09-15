const asElementCreator = func => func.isElementCreator = true && func;

const createAudioElement = (Component, props, ...children) =>
    asElementCreator(audioContext => {
        /* we want to render children first so the nodes
         * can be directly manipulated by their parents */
        const createChildren = children =>
            children.map(child => child.isElementCreator
                ? child(audioContext)
                : child
            ); // respects child-based render props

        const result = Component.isClassBased
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

        return result.isElementCreator
            ? result(audioContext)
            : result;
    });

export default createAudioElement;
