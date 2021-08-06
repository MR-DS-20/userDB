
import { socket } from "./ws.js"


// Create user ID
export function createUserID() {
    const uuid = generateUUID()
    if (socket.readyState === 1 && uuid) {
        socket.send(JSON.stringify({ 
            messageType: messageTypes.clientSend.newUUID, 
            data: { uuid: uuid } 
        }))
    } else {
        alert('Failed to create a new User. Please reload and try again')
    }
}

export function login(uuid) {
    socket.send(JSON.stringify({
        messageType: messageTypes.clientSend.login,
        data: { uuid: uuid}
    }))
}
// request token


function generateUUID() {
    if (uuidv4) {
        const id = uuidv4()
        console.log('New id created',id)
        return id
    } else {
        return undefined
    }
}