const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let counter = 0
wss.on('connection', (ws) => {
   counter++
    let counterM = {
        type: 'counterUpdate',
        counter: counter
    }
    wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(counterM));
    })
  console.log('Client connected');

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data)

    switch(message.type) {
        case 'postMessage':
        message.id = uuid()
        message.type = 'incomingMessage'
        wss.clients.forEach(function each(client) {
           
        client.send(JSON.stringify(message));
        })
          break;
        case "postNotification":
          // handle incoming notification
          message.type = 'incomingNotification'
          message.id = uuid()
          wss.clients.forEach(function each(client) {
           
            client.send(JSON.stringify(message));
          })
          break;
        default:
          // show an error in the console if the message type is unknown
         throw new Error("Unknown event type " + data.type);
      }
  
  
    
    
    
   
    console.log(message);
});
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', function () {
      counter--
      let counterM = {
        type: 'counterUpdate',
        counter: counter
    }
    wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(counterM));
    })
       console.log('Client disconnected')
    });
});