import Immutable from 'immutable';

const INCREASE = 'actions/counter/INCREASE';
const DECREASE = 'actions/counter/DECREASE';

const initialState = Immutable.Map();

export default function reducer(state = initialState, action = {}) {
    if (action.type === INCREASE) {
        const {key} = action;

        const prev = state.get(key) || 0;

        return state.set(key, prev + 1);
    }

    if (action.type === DECREASE) {
        const {key} = action;

        const prev = state.get(key) || 0;

        return state.set(key, prev - 1);
    }

    return state;
}

export function increaseCounter(key) {
    return {
        type: INCREASE,
        key
    };
}

export function decreaseCounter(key) {
    return {
        type: DECREASE,
        key
    };
}