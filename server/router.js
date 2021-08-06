/* eslint-disable new-cap */
const express = require('express');
const { clientSend, serverSend } = require('../lib/messageTypes');
const router = express.Router();



router.ws('/', function (ws) {
  ws.on('message', function (msg) {

    try {
      // Parse message then take action based on `msg.messageType`. `JSON.parse()` will throw error if just a string message
      msg = JSON.parse(msg)

      switch (msg?.messageType) {
        case clientSend.newUUID:
          console.log('New UUID', msg.data.uuid);
          break;

        default:

          break;
      }
    } catch {
      console.log('General Message:', msg);
    }

    // ws.send('Message Received');
  });
});

exports.socketRoute = router;
