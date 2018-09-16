/** @jsx createAudioElement */

import createAudioElement from '../createAudioElement';
import reduceNodes from '../reduceNodes';
import NoOp from './NoOp';

const Aggregation = ({ children }) => {
    reduceNodes(children);

    return <NoOp />;
};

export default Aggregation;
