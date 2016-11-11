import superagent from 'superagent';
import config from 'config';
import {isAbsoluteURL} from 'utils';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
    if (isAbsoluteURL(path)) {
        return path;
    }

    let url = config.api.host;

    if (url[url.length - 1] === '/') {
        url = url.slice(0, -1);
    }

    const adjustedPath = path[0] !== '/' ? `/${path}` : path;

    url += adjustedPath;

    return url;
}

export default class {
    constructor(req) {
        this.cookies = [];

        methods.forEach((method) => {
            this[method] = (path, { params, data } = {}) => new Promise(
                (resolve, reject) => {
                    const url = formatUrl(path);

                    const request = superagent[method](url);

                    if (params) {
                        request.query(params);
                    }

                    if (data) {
                        request.send(data);
                    }

                    request.end((err, {body} = {}) => (err ? reject(body || err) : resolve(body)));
                }
            );
        });
    }
}
