/* A higher-order component that
 * abstracts and centralises logic
 * for enqueuing the starting and
 * stopping of source nodes */

/** @jsx createAudioElement */

import elementCreator from '../createAudioElement';

const createEnqueuer = ({ audioContext, startTime = 0, endTime }) =>
    node => {
        if (node.isScheduled) {
            return;
        }

        node.start(audioContext.currentTime + startTime);

        if (endTime) {
            node.stop(audioContext.currentTime + endTime);
        }

        node.isScheduled = true;
    };

/* thunk to create HOC with cAE
 * as injectable dependency */
export const createAsSourceNode = createAudioElement =>
    Component =>
        props =>
            <Component
                enqueue={createEnqueuer(props)}
                {...props}
            />;

export default createAsSourceNode(elementCreator);
