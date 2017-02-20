import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import {match} from 'react-router';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';

import http from 'http';
import compression from 'compression';

import createStore from 'store/create';
import routes from 'core/routes';

import Log from '../../utils/log';

import ApiClient from '../helpers/ApiClient';
import Html from '../helpers/Html';
import Wrapper from '../wrapper';


export default function (parameters) {
    const app = new Express();

    app.use('/', Express.static(path.join(__ROOT_FOLDER__, 'webroot')));

    const server = new http.Server(app);


    const chunks = parameters.chunks();
    const log = Log('webpage renderer'); // eslint-disable-line

    app.use((req, res) => {
        const hydrateOnClient = () => {
            res.send(
                `<!doctype html>\n${ReactDOM.renderToString(<Html assets={chunks} />)}`
            );
        };

        global._env = {};

        if (configuration.disable_ssr) {
            hydrateOnClient();
            return;
        }

        const client = new ApiClient(req);

        const history = createHistory(req.originalUrl);
        const store = createStore(history, client);

        const context = {};

        match(
            {
                history,
                routes,
                location: req.originalUrl
            },
            (error, redirectLocation, renderProps) => {
                if (redirectLocation) {
                    res.redirect(redirectLocation.pathname + redirectLocation.search);
                } else if (error) {
                    // console.error('ROUTER ERROR:', pretty.render(error));
                    res.status(500);
                    hydrateOnClient();
                } else if (renderProps) {
                    loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
                        const component = (
                            <Provider store={store}>
                                <Wrapper
                                    context={context}
                                    locale={req.headers['accept-language']}
                                >
                                    <ReduxAsyncConnect {...renderProps} />
                                </Wrapper>
                            </Provider>
                        );

                        const content = ReactDOM.renderToString(
                            <Html
                                assets={chunks}
                                component={component}
                                store={store}
                                context={context}
                            />
                        );

                        if (context.status) {
                            res.status(context.status);
                        } else {
                            res.status(200);
                        }

                        // Fetch cookies recieved during the server API requests
                        // and pass it to the client
                        for (const cookie of client.cookies) {
                            res.set('Set-Cookie', cookie);
                        }

                        res.send(`<!doctype html>\n${content}`);
                    });
                } else {
                    res.status(404).send('Not found');
                }
            }
        );
    });

    server.listen(configuration.server.http.port, (error) => {
        if (error) {
            log.error('Webpage rendering server shutdown due to an error', error);
            throw error;
        }

        log.info(`Webpage server is listening at http://localhost:${configuration.server.http.port}`);
    });
}