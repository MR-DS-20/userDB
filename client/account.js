
import { socket } from "./ws.js"


// Create user ID
export function createUserID() {
    if (socket.readyState === 1) {
        const uuid = generateUUID()
        socket.send(JSON.stringify({ messageType: messageTypes.clientSend.newUUID, data: { uuid: uuid } }))
    } else {
        return undefined
    }
}
// request token


function generateUUID() {
    if (uuidv4) {
        const id = uuidv4()
        console.log(id)
        return id
    } else {
        return undefined
    }
}