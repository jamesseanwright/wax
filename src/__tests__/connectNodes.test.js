import { NO_OP } from '../components/NoOp';
import connectNodes from '../connectNodes';
import { createArrayWith } from './helpers';

const createStubAudioNode = () => ({
    connect: jest.fn(),
});

/* we concat item[item.length - 1] if item
 * is an array to match the reducing nature
 * of the connectNodes function. */
const flatten = array => array.reduce(
    (arr, item) => (
        arr.concat(Array.isArray(item) ? item[item.length - 1] : item)
    ), []);

describe('connectNodes', () => {
    it('should sequentially connect an array of audio nodes and return the last', () => {
        const nodes = createArrayWith(5, createStubAudioNode);
        const result = connectNodes(nodes);

        expect(result).toBe(nodes[nodes.length - 1]);

        nodes.reduce((previousNode, currentNode) => {
            expect(previousNode.connect).toHaveBeenCalledTimes(1);
            expect(previousNode.connect).toHaveBeenCalledWith(currentNode);
            return currentNode;
        });
    });

    it('should not connect NO_OP nodes', () => {
        const noOpIndex = 3;

        const nodes = createArrayWith(
            5,
            (_, i) => i === noOpIndex ? NO_OP : createStubAudioNode(),
        );

        connectNodes(nodes);

        nodes.reduce((previousNode, currentNode) => {
            if (currentNode === NO_OP) {
                expect(previousNode.connect).not.toHaveBeenCalled();
            } else if (previousNode !== NO_OP) {
                expect(previousNode.connect).toHaveBeenCalledTimes(1);
                expect(previousNode.connect).toHaveBeenCalledWith(currentNode);
            }

            return currentNode;
        });
    });

    it('should reduce multidimensional arrays of AudioNodes', () => {
        const nodes = [
            ...createArrayWith(3, createStubAudioNode),
            createArrayWith(4, createStubAudioNode),
            ...createArrayWith(2, createStubAudioNode),
        ];

        connectNodes(nodes);

        flatten(nodes).reduce((previousNode, currentNode) => {
            expect(previousNode.connect).toHaveBeenCalledTimes(1);
            expect(previousNode.connect).toHaveBeenCalledWith(currentNode);
            return currentNode;
        });
    });
});
