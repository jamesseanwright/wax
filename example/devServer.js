'use strict';

/* node-static unfortunately doesn't provide
 * the correct Content-Type header for non-HTML
 * files, breaking the decoding of yodel.mp3.
 * Thus, I'm overriding this via this abstraction */

const PORT = 8080;
const DEFAULT_MIME_TYPE = 'application/html';

const http = require('http');
const path = require('path');
const url = require('url');
const nodeStatic = require('node-static');

const file = new nodeStatic.Server(
    path.join(__dirname, 'dist'),
    { cache: 0 },
);

const contentTypes = new Map([
    [/.*\.mp3/ig, 'audio/mp3'],
]);

const getContentType = req => {
    const { pathname } = url.parse(req.url);

    for (let [expression, mimeType] of contentTypes) {
        if (expression.test(pathname)) {
            return mimeType;
        }
    }

    return DEFAULT_MIME_TYPE;
};

const server = http.createServer((req, res) => {
    req.on('end', () => {
        res.setHeader('Content-Type', getContentType(req));
        file.serve(req, res);
    }).resume();
});

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log('Dev server listening on', PORT));
