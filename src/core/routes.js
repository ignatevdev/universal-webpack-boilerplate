import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {
    App,
    Home,
    NotFound
} from 'containers';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="*" component={NotFound} />
    </Route>
);