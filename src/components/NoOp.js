/* An internal, workaround component
 * to inform the node connector that
 * no connection is required in this
 * tree level. Used by Aggregation */

export const NO_OP = 'NO_OP';

const NoOp = () => NO_OP;

export default NoOp;
