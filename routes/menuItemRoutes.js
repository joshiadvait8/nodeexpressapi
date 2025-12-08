const router = require('express').Router();
const MenuItem = require('../models/MenuItem');

router.get("/", async (req, res) => {
    try {
        const items = await MenuItem.find(); 
        res.status(200).json(items);
    }catch (err) { 
        res.status(500).json({ error: err.message });
    }  
});
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        res.status(200).json(response);
    }catch (err) { 
        res.status(500).json({ error: err.message });
    }       
});

router.get("/:taste", async (req, res) => {
    try {
        let tastetype = req.params.taste;
        const items = await MenuItem.find({taste:tastetype}); 
        res.status(200).json(items);
    }catch (err) { 
        res.status(500).json({ error: err.message });
    }  
});

module.exports = router;