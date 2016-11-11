import Immutable from 'immutable';

const STORE = 'actions/store/STORE';

const initialState = Immutable.Map();

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case STORE:
            return state.set(action.key, Immutable.fromJS(action.data));

        default:
            return state;
    }
}

export function store(key, data) {
    return {
        type: STORE,
        key,
        data
    };
}
