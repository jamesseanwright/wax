const createSubTree = element => ({
    _element: element,
    _children: [],

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

    appendChild(child) {
        this._children = this._children.concat(child);
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

export const createReconciliationTree = () => ({
    set element(element) {
        return createSubTree(element);
    }
});
