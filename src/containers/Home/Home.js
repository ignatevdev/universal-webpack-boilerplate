import React, {PureComponent, PropTypes} from 'react';
import Helmet from 'react-helmet';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {increaseCounter, decreaseCounter} from 'store/modules/counter';

import {Translate} from 'components';
import {Information} from 'components/Icons';

const styles = require('./Home.styl');

@connect(
    state => ({
        count: state.getIn(['counter', 'home'], 0)
    }),
    dispatch => bindActionCreators(
        {increaseCounter, decreaseCounter},
        dispatch
    )
)

export default class Home extends PureComponent {
    static propTypes = {
        increaseCounter: PropTypes.func.isRequired,
        decreaseCounter: PropTypes.func.isRequired,

        count: PropTypes.number.isRequired
    }

    render() {
        const {
            count,
            increaseCounter, decreaseCounter // eslint-disable-line no-shadow
        } = this.props;

        return (
            <div className={styles.home}>
                <Helmet title="Home page" />

                <Translate id="Homepage title" />

                <br />

                Amount: {count}

                <button
                    onClick={(e) => {
                        e.preventDefault();

                        decreaseCounter('home');
                    }}
                >
                    -
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault();

                        increaseCounter('home');
                    }}
                >
                    +
                </button>

                <Information />
            </div>
        );
    }
}