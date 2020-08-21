const express = require("express");

const Resources = require("../resources/resourceModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "running..." });
});

server.get("/resources", (req, res) => {
    Resources.find()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.get("/resources/:id", (req, res) => {
    Resources.findById(req.params.id)
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.post("/resources", (req, res) => {
    Resources.insert(req.body)
        .then(ids => {
            res.status(201).json(req.body);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

server.delete("/resources/:id", (req, res) => {
    Resources.remove(req.params.id)
        .then(() => {
            res.status(200).json({ msg: 'resource is deleted' });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = server;
