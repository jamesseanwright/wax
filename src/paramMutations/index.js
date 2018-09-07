import createParamMutator from './createParamMutator';

export const setValueAtTime = createParamMutator('setValueAtTime');
export const linearRampToValueAtTime = createParamMutator('linearRampToValueAtTime');
export const exponentialRampToValueAtTime = createParamMutator('exponentialRampToValueAtTime');
export const setTargetAtTime = createParamMutator('setTargetAtTime');
export const setValueCurveAtTime = createParamMutator('setValueCurveAtTime');
