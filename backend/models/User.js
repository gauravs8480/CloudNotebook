const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
 name:{
    type:String,
 required:true
 },

 email:{
    type:String,
 unique:true
 },

 password:{
    type:String,
 required:true
 },

 timestamp:{
    type:Date,
default:Date.now 
},
  });

const User=mongoose.model('user',UserSchema);
// User.createIndexes()

module.exports=User;