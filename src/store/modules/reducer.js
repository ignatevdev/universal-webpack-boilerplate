import {combineReducers} from 'redux-immutable';
import {reducer as form} from 'redux-form/immutable';

import storage from './store';
import localization from './locale';
import toggleReducer from './toggle';
import counter from './counter';

export default combineReducers({
    toggle: toggleReducer,
    localization,
    storage,
    counter,
    form
});
