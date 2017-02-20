import React, {PureComponent, PropTypes} from 'react';

import {getContext} from 'recompose';

@getContext({
    serverContext: PropTypes.object
})

export default class NotFound extends PureComponent {
    static propTypes = {
        serverContext: PropTypes.object
    }

    componentWillMount() {
        if (__SERVER__) {
            this.props.serverContext.status = 404;
        }
    }

    render() {
        return (
            <div>Not found</div>
        );
    }
}