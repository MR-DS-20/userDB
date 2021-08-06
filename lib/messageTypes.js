// Wrapper to allow Node.js and Browser to share this moudle
(function (exports) {
    exports.clientSend = {
        tokenRequest: 'tokenRequest',
        newUUID: 'newUUID'
    }
    exports.serverSend = {
        createdUUID: 'createdUUID',
        generatedToken: 'generatedToken'
    }
})(typeof exports === 'undefined' ? this['messageTypes'] = {} : exports);
