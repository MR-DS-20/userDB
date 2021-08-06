import { hideLoginShowUserData } from "./renderers.js"

/**
 * Origin of the userData object that is used to maintain local data state
 */
let userData = {}

/**
 * The stale data object is used to compare to the userData that may have been changed, so that only changes can be sent to server for storage
 */
let staleData = {}

const socket = new WebSocket('ws://localhost:3000/')
socket.onopen = (event) => {
    socket.send('New Client Connection')
}

/**
 * Handle all messages from the server
 */
socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    //* Decide what action to take based on messageType
    switch (data.messageType) {
        case messageTypes.serverSend.userData:
            userData = data.data
            staleData = data.data
            hideLoginShowUserData(userData)
            break;

        default:
            console.log('Data Not Present:', event)
            break;
    }
}

export { socket, userData , staleData}




