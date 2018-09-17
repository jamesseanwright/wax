export const createNoOpTree = () => ({
    setValue(element) {
        return element;
    },

    children: new Proxy([], {
        get() {
            return createNoOpTree();
        }
    }),
});
