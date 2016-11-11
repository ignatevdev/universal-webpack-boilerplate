import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router';
import Wrapper from '../wrapper';

export default class extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,

        browserLanguage: PropTypes.string.isRequired
    }

    render() {
        const {store, browserLanguage} = this.props;

        return (
            <Provider store={store} key="provider">
                <BrowserRouter>
                    <Wrapper locale={browserLanguage} />
                </BrowserRouter>
            </Provider>
        );
    }
}