'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use('/regular', (req, res) => res.status(200).send({currentTimestamp: Date.now()}))
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

let openConnections = 0;

io.on('connection', (socket) => {
    openConnections++;

    io.emit('updated', {
        openConnections
    });

    // socket.on('ping-ping', (data) => {
    //     console.log('ping', data);
    // });

    socket.on('disconnect', () => {
        openConnections--;

        io.emit('updated', {
            openConnections
        });
    });
});
