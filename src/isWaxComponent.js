import * as components from './components';

const componentsArray = Object.values(components);
const isWaxComponent = Component => componentsArray.includes(Component);

export default isWaxComponent;
