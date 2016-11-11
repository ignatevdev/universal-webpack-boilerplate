import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sprintf} from 'sprintf-js';

@connect(
    state => ({
        locale: state.getIn(['localization', 'locale'])
    })
)
export default class Translate extends PureComponent {
    static propTypes = {
        locale: PropTypes.string.isRequired, // Comes from the store

        context: PropTypes.string,
        id: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.array.isRequired
        ]),
        args: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }

    static contextTypes = {
        gettext: PropTypes.object.isRequired
    }

    render() {
        const {gettext} = this.context;
        const {context, id, args, locale} = this.props;

        let message;

        if (typeof id !== 'string') { // is plural
            if (context) {
                message = gettext.dnpgettext(locale, context, ...id);
            } else {
                message = gettext.dngettext(locale, ...id);
            }
        } else if (context) {
            message = gettext.dpgettext(locale, context, id);
        } else {
            message = gettext.dgettext(locale, id);
        }

        if (args) {
            message = sprintf(message, ...args);
        }

        return (
            <span>
                {message}
            </span>
        );
    }
}
