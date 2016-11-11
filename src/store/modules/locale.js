import Immutable from 'immutable';

const CHANGE_LOCALE = 'actions/locale/CHANGE_LOCALE';

const initialState = Immutable.fromJS({locale: 'ru'});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state.set('locale', action.locale);

        default:
            return state;
    }
}

export function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        locale
    };
}
