import React, {Component, PropTypes} from 'react';
import {LocaleProvider} from 'components';
import {App} from 'containers';

export default class Wrapper extends Component {
    static propTypes = {
        locale: PropTypes.string
    }

    render() {
        const {locale} = this.props;

        return (
            <LocaleProvider locale={locale}>
                <App />
            </LocaleProvider>
        );
    }
}