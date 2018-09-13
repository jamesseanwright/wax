const getCreator = (map, Component) =>
    [...map.keys()]
        .filter(predicate => predicate(Component) && predicate)
        .reduce((_, predicate) => map[predicate]);


const combineElementCreators = (...creatorBindings) => {
    const map = new Map(creatorBindings);

    return (Component, props, ...children) => {
        const creator = getCreator(map, Component);
        creator(Component, props, ...children);
    };
};

export default combineElementCreators;
