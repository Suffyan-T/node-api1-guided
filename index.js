const express = require('express');

const Hubs = require('./data/hubs-model')

const server = express();

server.use(express.json());// Needed for POST and PUT/Patch

server.get('/', (req, res) =>{
    res.json({hello: 'web 26'})
})

// view a list of hubs
server.get('/api/hubs', (req, res) => {
    // got and get the hubs from the database
    Hubs.find().then(hubs =>{
        res.status(200).json(hubs);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({ errorMessage: 'Oopsi Daisies'})
    });
})

// ADD a hub
server.post('/api/hubs', (req, res) => {
    // axios.post(url, data, options); the data will be in body of the request
    const hubInfo = req.body;

    console.log('body', req.body)
    // validate the data, and if the data is valid save it
    Hubs.add(hubInfo).then(hub => {
        res.status(201).json(hub);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: {err}})
    })
})


const port = 5000;
server.listen(port, () => console.log(`\n API on port ${port}`))