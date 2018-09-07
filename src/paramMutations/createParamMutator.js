/* Since AudioParam methods follow a
 * consistent signature, this function
 * allows one to trivially create functions
 * that will be consumed by users and
 * components to schedule value changes. */

const createParamMutator = name =>
    (value, time) =>
        (param, currentTime) => {
            param[name](value, currentTime + time);
        };

export default createParamMutator;
