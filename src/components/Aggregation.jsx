/* An abstraction of ChannelMerger node
 * targetted towards aggregating multiple
 * source nodes into a single node, routed
 * to the returned merger node's sole input */

/** @jsx createAudioElement */

import createAudioElement from '../createAudioElement';
import AudioGraph from './AudioGraph';

const Aggregation = ({ children, audioContext }) => {
    const getSourceNode = (
        <AudioGraph
            audioContext={audioContext}
            children={children}
        />
    );

    // TODO: this is a bit weird!
    const sourceNode = getSourceNode();
    const merger = audioContext.createChannelMerger(1);

    sourceNode.connect(merger);

    return merger;
};

export default Aggregation;
