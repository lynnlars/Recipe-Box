const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },  
  });

  userSchema.pre('save', async function(next) { //do this before save
    const user = this;
    if (user.isModified('password')) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        } catch (error) {
            return next(error);
        }
    }
});


  userSchema.methods.checkPassword = function(passwordAttempt){ 
   try {
      return bcrypt.compare(passwordAttempt, this.password)
   } catch (error) {
    throw(error)
   }
  }

  userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password //deletes password from console
    return user
  }


  module.exports = mongoose.model("User", userSchema)