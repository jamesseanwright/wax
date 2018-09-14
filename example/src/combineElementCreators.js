const getCreator = (map, Component) =>
    [...map.entries()]
        .find(([predicate]) => predicate(Component))[1];

const combineElementCreators = (...creatorBindings) => {
    const map = new Map(creatorBindings);

    return (Component, props, ...children) => {
        const creator = getCreator(map, Component);
        return creator(Component, props, ...children);
    };
};

export default combineElementCreators;
