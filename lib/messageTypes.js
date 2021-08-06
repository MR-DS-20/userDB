// Wrapper to allow Node.js and Browser to share this moudle
(function (exports) {
    exports.clientSend = {
        login: 'login',
        newUUID: 'newUUID',
        dataUpdate: 'dataUpdate',
        newConnection: 'newConnection'
    }
    exports.serverSend = {
        userData: 'userData',
        error: 'error',
        notification: 'notification',
        updateFailed: 'updateFailed'
    }
})(typeof exports === 'undefined' ? this['messageTypes'] = {} : exports);
