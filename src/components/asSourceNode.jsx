/* A higher-order component that
 * abstracts and centralises logic
 * for enqueuing the starting and
 * stopping of source nodes */

/** @jsx createAudioElement */

import createAudioElement from '../createAudioElement';

const createEnqueuer = ({ audioContext, startTime = 0, endTime }) =>
    node => {
        console.log('*****');
        node.start(audioContext.currentTime + startTime);

        if (endTime) {
            node.stop(audioContext.currentTime + endTime);
        }
    };

const asSourceNode = Component => props =>
    <Component
        enqueue={createEnqueuer(props)}
        {...props}
    />;

export default asSourceNode;
