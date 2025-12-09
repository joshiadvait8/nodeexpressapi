const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save',async function(){
    const person = this;
    if(!person.isModified('password')){
        return;
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
       
    }catch(err){
        console.log(err);
        throw err;
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//compare function logic
// storedhashedpassword ->> extaract salt from it
//usergivenpassword + salt --> hash it 
// compare both hashes if match return true else false

const Person = mongoose.model('Person', personSchema, 'persons');

module.exports = Person;