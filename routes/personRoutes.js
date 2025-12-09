const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
    const data = req.body;
    const newPerson = new Person(data);
    try {
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});  

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Person.findById(id);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(id,updatePersonData,{
            new: true, //return updated document
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        res.status(200).json(response);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        res.status(200).json({message: 'Person deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})


module.exports = router;