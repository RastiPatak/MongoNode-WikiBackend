const express = require('express');
const Page = require('../models/page');

const router = express.Router();

// Create a new page
router.post('/', async (req, res) => {
    try {
        const page = new Page(req.body);
        await page.save();
        res.status(201).send(page);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update an existing page
router.put('/:id', async (req, res) => {
    try {
        const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!page) {
            return res.status(404).send();
        }
        res.send(page);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a page
router.delete('/:id', async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).send();
        }
        res.send(page);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get pages by name
router.get('/', async (req, res) => {
    const { name } = req.query;
    const filter = name ? { name: new RegExp(name, 'i') } : {};
    try {
        const pages = await Page.find(filter).limit(20);
        res.send(pages);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
