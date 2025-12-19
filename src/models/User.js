const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: string, reqiored: true, unique: true },
    password: { type: string, required: true },
    email:{type:string, required:true}
})