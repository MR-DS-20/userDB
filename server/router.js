/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const { clientSend, serverSend } = require("../lib/messageTypes");
const jwt = require("./jwt");

const UserDB = require("./userDB");
const users = new UserDB();

const UUID_ERR_MSG = "UUID Missing from request. Please Try again.";

router.ws("/", function (ws) {
  ws.on("message", function (msg) {
    try {
      console.log('Message Received', msg)
      // Parse message then take action based on `msg.messageType`. `JSON.parse()` will throw error if just a string message
      msg = JSON.parse(msg);
    } catch (e) {
      errRes(ws, "Invalid message sent to server");
    }

    switch (msg?.messageType) {
      case clientSend.newUUID:
        // `newUUID` adds user to store and creates jwt, returning userData
        try {
          if (msg?.data?.uuid) {
            ws.send(
              JSON.stringify({
                messageType: serverSend.userData,
                data: users.addUser(msg.data.uuid),
              })
            );
          } else {
            errRes(ws, UUID_ERR_MSG);
          }
        } catch {
          errRes(ws)
        }

        break;
      case clientSend.login:
        // login request will return userData
        try {
          if (msg?.data?.uuid) {
            const userData = users.getUser(msg.data.uuid)
            if (userData) {

              ws.send(
                JSON.stringify({
                  messageType: serverSend.userData,
                  data: users.getUser(msg.data.uuid),
                })
              );
            } else {
              errRes(ws, 'User ID not Recognised')
            }
          } else {
            errRes(ws, UUID_ERR_MSG);
          }
        } catch {
          errRes(ws)
        }

        break;
      case clientSend.dataUpdate:
        // Verify jwt matches user, update store with changes, all errors result in client being informed of update failure
        try {
          if (msg?.data?.uuid) {
            const decodedToken = jwt.verifyJwt(msg.data.accessToken);
            if (msg.data.uuid === decodedToken) {
              users.updateData(msg.data.uuid, msg.data.added, msg.data.deleted);
            } else {
              socket.send(JSON.stringify({
                messageType: serverSend.updateFailed,
                data: msg.data
              }))
            }
          } else {
            socket.send(JSON.stringify({
              messageType: serverSend.updateFailed,
              data: msg.data
            }))
          }
        } catch (e) {
          socket.send(JSON.stringify({
            messageType: serverSend.updateFailed,
            data: msg.data
          }))
        }
        break;
      default:
        break;
    }
  });
});

/**
 * Reusable function to handle error responses
 */
function errRes(ws, message = "There was an error") {
  ws.send(JSON.stringify({ messageType: serverSend.error, data: message }));
}

exports.socketRoute = router;
