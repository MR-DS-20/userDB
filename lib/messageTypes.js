// Wrapper to allow Node.js and Browser to share this moudle
(function (exports) {
    exports.clientSend = {
        login: 'login',
        newUUID: 'newUUID',
        dataUpdate: 'dataUpdate'
    }
    exports.serverSend = {
        userData: 'userData',
        error: 'error',
        notification: 'notification'
    }
})(typeof exports === 'undefined' ? this['messageTypes'] = {} : exports);
