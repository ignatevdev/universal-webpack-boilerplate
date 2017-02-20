import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {ReduxAsyncConnect} from 'redux-connect';
import {Router} from 'react-router';
import routes from 'core/routes';
import Wrapper from '../wrapper';

export default class extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired,

        browserLanguage: PropTypes.string.isRequired
    }

    render() {
        const {store, history, browserLanguage, client} = this.props;

        return (
            <Provider store={store} key="provider">
                <Router
                    render={
                        props =>
                            <Wrapper locale={browserLanguage}>
                                <ReduxAsyncConnect
                                    {...props}
                                    helpers={{client}}
                                    filter={item => !item.deferred}
                                />
                            </Wrapper>
                    }
                    history={history}
                >
                    {routes}
                </Router>
            </Provider>
        );
    }
}