import Immutable from 'immutable';

const TOGGLE_ON = 'actions/toggle/TOGGLE_ON';
const TOGGLE_OFF = 'actions/toggle/TOGGLE_OFF';
const TOGGLE = 'actions/toggle/TOGGLE';


const initialState = Immutable.fromJS({});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case TOGGLE_ON:
            return state.set(action.key, true);

        case TOGGLE_OFF:
            return state.set(action.key, false);

        case TOGGLE:
            return state.set(action.key, !state.get(action.key, null, false));

        default:
            return state;
    }
}

export function toggleOn(key) {
    return {
        type: TOGGLE_ON,
        key,
    };
}

export function toggleOff(key) {
    return {
        type: TOGGLE_OFF,
        key
    };
}

export function toggle(key) {
    return {
        type: TOGGLE,
        key
    };
}