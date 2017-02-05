import React, {PureComponent, PropTypes} from 'react';
import Helmet from 'react-helmet';
import meta from 'meta';
import {Switch, Route} from 'react-router-dom';
import {Home} from 'containers';

require('./App.styl');

class NotFound extends PureComponent {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentWillMount() {
        if (__SERVER__) {
            this.context.router.staticContext.status = 404;
        }
    }

    render() {
        return (
            <div>Not found</div>
        );
    }
}

export default class App extends PureComponent {
    static propTypes = {
        params: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
                <Helmet {...meta.head} />

                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Home}
                    />

                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}