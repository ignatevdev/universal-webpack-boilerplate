import isNumber from 'lodash/isNumber';
import isNull from 'lodash/isNull';

export function isAbsoluteURL(str) {
    return /^https?:\/\//i.test(str);
}

export function env(key) {
    let vars;

    if (__SERVER__) {
        vars = process.env[key];
    } else {
        vars = window._env[key];
    }

    return vars === undefined ? false : vars;
}

export function commafy(num) {
    const del = ' ';
    const str = num.toString().split('.');

    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, `$1${del}`);
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export function isHex(str) {
    const a = parseInt(str, 16);

    return (a.toString(16) === str.toLowerCase());
}

export function alphaNum(oas, obs, selector) {
    let as;
    let bs;

    if (selector) {
        as = selector(oas);
        bs = selector(obs);
    } else {
        as = oas;
        bs = obs;
    }

    let a1;
    let b1;
    let i = 0;
    let n;
    const rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;

    if (as === bs) return 0;
    if (isNull(as)) return -1;
    if (isNull(bs)) return 1;

    if (isNumber(as)) {
        as = as.toString();
    }

    if (isNumber(bs)) {
        bs = bs.toString();
    }

    const a = as.toLowerCase().match(rx);
    const b = bs.toLowerCase().match(rx);

    if (isNull(a)) return -1;
    if (isNull(b)) return 1;

    const L = a.length;

    while (i < L) {
        if (!b[i]) return 1;
        a1 = a[i];
        b1 = b[i++];

        if (a1 !== b1) {
            n = a1 - b1;
            if (!isNaN(n)) return n;
            return a1 > b1 ? 1 : -1;
        }
    }
    return b[i] ? -1 : 0;
}

export function getMotionConf(w, o = 0) {
    const s = o <= 0
    ? 1 - o
    : 1 / Math.sqrt(1 + ((2 * Math.PI) / (Math.log(1 / (o * o)) ** 2)));

    const ks = (2 * (Math.PI / w)) / Math.max(Math.sqrt(1 - (s * s)), 0.5);
    const c = 2 * ks * s;
    return [ks * ks, c];
}