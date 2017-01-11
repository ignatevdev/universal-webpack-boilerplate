import React, {PureComponent, PropTypes} from 'react';
import Helmet from 'react-helmet';
import meta from 'meta';
import {Match, Miss} from 'react-router';
import {Home} from 'containers';

console.log(require('./App.css'));

export default class App extends PureComponent {
    static propTypes = {
        params: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };

    render() {
        const NotFound = () => <div>Not found</div>;

        return (
            <div>
                <Helmet {...meta.head} />

                <Match
                    exactly
                    pattern="/"
                    component={Home}
                />

                <Miss component={NotFound} />
            </div>
        );
    }
}
