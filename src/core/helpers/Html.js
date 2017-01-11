import React, {Component, PropTypes} from 'react';
import config from 'config';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    };

    render() {
        const {assets, component, store} = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();

        let data = '';

        if (store) {
            data = `
                window.__data=${serialize(store.getState())};
                window._env=${serialize(_env)}
            `;
        }

        return (
            <html lang="ru-RU">
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}

                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    {__PRODUCTION__ && Object.keys(assets.styles).map((style, key) =>
                        <link
                            href={assets.styles[style]}
                            key={key}
                            media="screen, projection"
                            rel="stylesheet"
                            type="text/css"
                            charSet="UTF-8"
                        />
                    )}
                </head>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{__html: content}} />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: data
                        }}
                        charSet="UTF-8"
                    />

                    <script src={assets.javascript.main} charSet="UTF-8" />
                </body>
            </html>
        );
    }
}
