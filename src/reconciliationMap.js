const serialise = (Component, depth) => `${Component.name}@${depth}`;

const createReconciliationMap = () => ({
    _reconciliations: new Map(),

    addIfNonExistent(Component, depth, element) {
        const key = serialise(Component, depth);

        if (!this._reconciliations.has(key)) {
            this._reconciliations.set(key, element);
        }

        return element;
    },

    getElement(Component, depth) {
        const key = serialise(Component, depth);

        if (this._reconciliations.has(key)) {
            return this._reconciliations.get(key);
        }

        // complements default props
        return undefined;
    }
});

export default createReconciliationMap;
