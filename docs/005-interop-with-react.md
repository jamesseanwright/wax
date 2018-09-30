# Interop with React

In the prior chapter, we learned how to update an existing audio graph whenever a `HTMLInputElement` fires a `change` event. Can we handle the visual UI with React while supporting JSX-declared audio graphs with React?

The problem is that we need to be able to use `React.createElement` and `createAudioElement` at the same time. What if we could create a single pragma that can select whether to use the former or the latter at runtime? The [`withReact` example app](https://github.com/jamesseanwright/wax/blob/master/example/src/withReact.jsx) has a solution:

```js
/** @jsx createElement */

import {
    isWaxComponent,
    ...
} from 'wax-core';

import combineElementCreators from './combineElementCreators';

const createElement = combineElementCreators(
    [isWaxComponent, createAudioElement],
    [() => true, React.createElement],
);
```

`combineElementCreators` is a function that takes a mapping between predicates and pragmas, and returns a new pragma to be targeted by our transpiler. In our example, if an element belongs to Wax (determined using the exposed `isWaxComponent` binding), then the `createAudioElement` pragma will be invoked; otherwise, we'll default to `React.createElement`. `combineElementCreators` isn't provided by Wax but can be implemented with a few lines of code:

```js
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
```

We can then instruct Babel to target this pragma in the usual way:

```json
{
    "presets": [
        ["@babel/react", {
            "pragma": "createElement"
        }]
    ]
}
```

The aforementioned `withReact` example demonstrates how `ReactDOM.render` and `renderPersistentAudioGraph` can be used across a single app.
