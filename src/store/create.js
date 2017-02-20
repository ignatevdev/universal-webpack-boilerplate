import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import Immutable from 'immutable';
import createMiddleware from './middleware/clientMiddleware';

export default function createStore(history, client, originalData) {
    const data = Immutable.fromJS(originalData);
    // Sync dispatched route actions to the history

    const middleware = [createMiddleware(client)];

    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }

    const reducer = require('./modules/reducer');

    const store = finalCreateStore(reducer, data);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer', () => {
            store.replaceReducer(require('./modules/reducer'));
        });
    }

    return store;
}