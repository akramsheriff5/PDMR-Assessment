const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/admin',
{
  useNewUrlParser:true,
  useUnifiedTopology: true ,
}
);

const UserSchema=new mongoose.Schema({
  firstname: {
      type: String,
      required: true,
      trim: true
  },
  lastname: {
      type: String,
      required: true,
      trim: true
  },
  city: {
      type: String,
      required: true,
      trim: true
  },

  email:{
      type:String,
      required:true,
      unique:true
  },
  password:{
      type:String,
      required:true
      
  }
})


UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email})


    if (!user) {
        throw new Error('Unable to login')
    }
    if(password!=user.password){
        throw new Error('Unable to login')
    }
    else{
    return user
    }
}

const User = mongoose.model('User', UserSchema)

module.exports=User