import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeLocale} from 'store/modules/locale';
import locale from 'locale';

import Gettext from 'node-gettext';
import en from 'localization/en/en_US.mo';

const resolve = {
    en: ['en', 'en_US', 'en-US']
};

@connect(
    state => ({
        defaultLocale: state.getIn(['localization', 'locale'])
    }),
    dispatch => bindActionCreators({
        changeLocale
    }, dispatch)
)

export default class Localization extends Component {
    static propTypes = {
        children: PropTypes.node,
        changeLocale: PropTypes.func.isRequired, // eslint-disable-line
        locale: PropTypes.string.isRequired, // eslint-disable-line
        defaultLocale: PropTypes.string.isRequired // eslint-disable-line
    }

    static childContextTypes = {
        gettext: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = this.initializeLocales();
    }

    getChildContext() {
        return {
            gettext: this.state.gettext
        };
    }

    componentWillMount() {
        this.setDefaultLocale();
    }

    setDefaultLocale = () => {
        const resolutions = {};
        const supported = [];

        for (const lang of Object.keys(resolve)) {
            const accepted = resolve[lang];

            accepted.forEach((item) => {
                supported.push(item);

                resolutions[item] = lang;
            });
        }

        const supportedLocales = new locale.Locales(
            supported, this.props.defaultLocale
        );

        const {changeLocale} = this.props; // eslint-disable-line

        const bestLocale = new locale.Locales(this.props.locale).best(supportedLocales).toString();

        if (bestLocale !== this.props.defaultLocale) {
            changeLocale(resolutions[bestLocale]);
        }
    }

    initializeLocales() {
        const gettext = new Gettext();

        // gettext.addTextdomain(
        //     'ru',
        //     new Buffer(ru, 'binary') // Fixes encoding
        // );

        gettext.addTextdomain(
            'en',
            new Buffer(en, 'binary') // Fixes encoding
        );

        return {
            gettext
        };
    }

    render() {
        return this.props.children;
    }
}