var socket = new WebSocket('ws://localhost:3000/')
socket.onopen = (event) => {
    socket.send('New Client Connection')
}

socket.onmessage = (event) => {
    console.log(event.data)
}

export {socket}