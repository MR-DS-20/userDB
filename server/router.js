/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const { clientSend, serverSend } = require("../lib/messageTypes");

const UserDB = require("./userDB");
const users = new UserDB();

const UUID_ERR_MSG = "UUID Missing from request. Please Try again.";

router.ws("/", function (ws) {
  ws.on("message", function (msg) {
    try {
      // Parse message then take action based on `msg.messageType`. `JSON.parse()` will throw error if just a string message
      msg = JSON.parse(msg);

      switch (msg?.messageType) {
        case clientSend.newUUID:
          // `newUUID` adds user to store and creates jwt, returning userData
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

          break;
        case clientSend.login:
          if (msg?.data?.uuid) {
            // login request will return userData
            ws.send(
              JSON.stringify({
                messageType: serverSend.userData,
                data: users.getUser(msg.data.uuid),
              })
            );
          } else {
            errRes(ws, UUID_ERR_MSG);
          }
        case clientSend.dataUpdate:
          // Verify jwt matches user, update store with changes
          if (msg?.data?.uuid) {
            // TODO Validate JWT
            users.updateData(msg.data.uuid, msg.data.added, msg.data.deleted);
          } else {
            errRes(ws, UUID_ERR_MSG);
          }
        default:
          break;
      }
    } catch (e) {
      console.log("General Message:", msg);
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
