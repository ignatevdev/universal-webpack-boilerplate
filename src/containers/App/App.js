import React, {PureComponent, PropTypes} from 'react';

import Helmet from 'react-helmet';

import meta from 'meta';

require('./App.styl');

export default class App extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const {children} = this.props;

        return (
            <div>
                <Helmet {...meta.head} />

                {children}
            </div>
        );
    }
}