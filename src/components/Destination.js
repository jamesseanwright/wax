/* A convenience wrapper to expose
 * the audio context's destination
 * as a Web Audio X Component. */

const Destination = ({ audioContext }) => audioContext.destination;

export default Destination;
