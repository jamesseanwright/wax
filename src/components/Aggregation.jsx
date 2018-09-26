import createAudioElement from '../createAudioElement';
import NoOp from './NoOp';
import AudioGraph from './AudioGraph';

const Aggregation = ({ children }) => (
    <AudioGraph>
        {children}
        <NoOp />
    </AudioGraph>
);

export default Aggregation;
