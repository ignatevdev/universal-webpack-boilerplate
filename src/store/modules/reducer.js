import {combineReducers} from 'redux-immutable';
import {reducer as form} from 'redux-form/immutable';

import Immutable from 'immutable';

import {
    setToImmutableStateFunc,
    setToMutableStateFunc,
    immutableReducer as reduxAsyncConnect
} from 'redux-connect';

import storage from './store';
import localization from './locale';
import toggleReducer from './toggle';
import counter from './counter';

setToImmutableStateFunc(mutableState => Immutable.fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

export default combineReducers({
    toggle: toggleReducer,
    localization,
    storage,
    counter,
    reduxAsyncConnect,
    form
});
