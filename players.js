const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Získanie všetkých hráčov
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Pridanie nového hráča
router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        expiry: req.body.expiry
    });

    try {
        const newPlayer = await player.save();
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
