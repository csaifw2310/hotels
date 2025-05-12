//sets up the passport with a local authentication streategy, using a person model for use

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); //adjust the path as needed

passport.use(new LocalStrategy(async(Username, Password , done)=>{
  // Authentication logic here
try{
//   console.log('Recieved  Credential:', Username, Password);
  const user =  await Person.findOne({username:Username});
  if(!user)
    return done (null, false, {message: 'Incorrect username.'});

  const isPasswordMatch = await user.comparePassword(Password);
  if(isPasswordMatch)
    return done (null , user);
  else {
    return done (null , false,{message:'Incorrect password. '});
  }
}
catch(err){
 return done (err);
}
}));

module.exports=passport;