/* An internal, workaround component
 * to inform the node connector that
 * no connection is required at this
 * point in the current subtree.
 * Used by Aggregation. */

export const NO_OP = 'NO_OP';

const NoOp = () => NO_OP;

export default NoOp;
