/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
*/
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import createStore from 'store/create';

import {AppContainer} from 'react-hot-loader';
import Redbox from 'redbox-react';
import {browserHistory} from 'react-router';
import config from 'config';

import ApiClient from '../helpers/ApiClient';
import Root from './root';

const client = new ApiClient();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);

const browserLanguage = window.navigator.userLanguage || window.navigator.language;

const component = (
    <AppContainer errorReporter={Redbox}>
        <Root
            store={store}
            history={browserHistory}
            browserLanguage={browserLanguage}
            client={client}
        />
    </AppContainer>
);

ReactDOM.render(component, dest);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (
        !config.disable_ssr
        &&
        (!dest || !dest.firstChild
            ||
            !dest.firstChild.attributes
            ||
            !dest.firstChild.attributes['data-react-checksum']
        )
    ) {
        console.error('Server-side React render was discarded.');
    }
}

if (module.hot) {
    const isString = string => typeof string === 'string';

    const orgError = console.error; // eslint-disable-line no-console

    console.error = (...args) => { // eslint-disable-line no-console
        if (
            args
            && args.length === 1
            && isString(args[0])
            && args[0].indexOf('You cannot change <Router ') > -1
        ) {
        // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };

    module.hot.accept('./root', () => {
        const UpdatedRoot = require('./root');

        ReactDOM.render(
            <AppContainer errorReporter={Redbox}>
                <UpdatedRoot
                    store={store}
                    history={browserHistory}
                    browserLanguage={browserLanguage}
                    client={client}
                />
            </AppContainer>,
        dest);
    });
}