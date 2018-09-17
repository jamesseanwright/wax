const createSubTree = element => ({
    _element: element,
    _children: new Map(),

    get element() {
        return element;
    },

    set element(value) {
        this._element = value;
        return value;
    },

    get children() {
        return this._children;
    },

    appendChild(creator, element) {
        this._children.set(creator, element);
    }
});

export const createNoOpTree = () => ({
    set element(element) {
        return element;
    },

    children: new Proxy([], {
        get() {
            return createNoOpTree();
        }
    }),
});

export const createReconciliationTree = () => createSubTree();
