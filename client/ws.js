/**
 * This file creates the socket connection, handles all incoming messages from server, 
 * and instantiates the userData object used as the data store in the app. Exports socket and userData
 */
import { hideLoginShowUserData } from "./renderers.js";

/**
 * Origin of the userData object that is used to maintain local data state
 */
let userData = {};

const socket = new WebSocket('ws://localhost:3000/');

socket.onopen = (event) => {
    socket.send(JSON.stringify({ messageType: messageTypes.clientSend.newConnection }));
};

socket.onerror = (ev, msg) => { 
    console.log(msg);
    alert('There was an issue connecting to the server');
}

/**
 * Handle all messages from the server
 */
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    //* Decide what action to take based on messageType
    switch (data.messageType) {
        case messageTypes.serverSend.userData:
            //Received after login or user creation so app needs to render data
            userData = data.data;
            hideLoginShowUserData(userData);

            break;
        case messageTypes.serverSend.error || messageTypes.serverSend.notification:
            alert(data.data);

            break;
        case messageTypes.serverSend.updateFailed:
            // Force a retry when a update fails
            socket.send(JSON.stringify({
                messageType: messageTypes.clientSend.dataUpdate,
                data: data.data
            }))
            break;
        default:
            break;
    }
}

// Send changes in data to data base on an interval
setInterval(() => {
    // Find added data
    const dataAdded = userData?.data?.filter(d => d?.new);

    //Find delted data
    let dataDeleted = userData?.data?.filter(d => d?.deleted);

    // Only send a message if there has been a change
    if (dataAdded?.length > 0 || dataDeleted?.length > 0) {
        socket.send(JSON.stringify({
            messageType: messageTypes.clientSend.dataUpdate,
            data:
            {
                uuid: userData.uuid,
                accessToken: userData.accessToken,
                added: dataAdded,
                deleted: dataDeleted
            }
        }))

        // Set new flag to false and remove deleted elements from user data
        userData.data.forEach((d, i) => {
            if (d?.new) { 
                d.new = false;
            }

            if (d?.deleted) {
                userData.data.splice(i, 1);
            }
        });
    }

}, 3000)

export { socket, userData }




