import React, {Component, PropTypes} from 'react';
import {LocaleProvider} from 'components';

export default class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        context: PropTypes.object,
        locale: PropTypes.string
    }
    static childContextTypes = {
        serverContext: PropTypes.object,
        setStatus: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.getChildContext = function getChildContext() {
            return {serverContext: props.context || {}};
        };
    }

    render() {
        const {locale} = this.props;

        return (
            <LocaleProvider locale={locale}>
                {this.props.children}
            </LocaleProvider>
        );
    }
}