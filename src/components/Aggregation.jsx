/* An abstraction of ChannelMerger node
 * targetted towards aggregating multiple
 * source nodes into a single node, routed
 * to the returned merger node's sole input */

/** @jsx createAudioElement */

import createAudioElement from '../createAudioElement';
import ChannelMerger from './ChannelMerger';

const Aggregation = ({ children }) => (
    <ChannelMerger inputs={1}>
        {connectToChannel => {
            children.forEach(node => {
                connectToChannel(node, 0);
            });
        }}
    </ChannelMerger>
);

export default Aggregation;
