const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../mongoose/schemas/user.js');
const { comparePasswords } = require('../helpers/users.js');
passport.serializeUser((user, done) =>{
    done(null, user.id)
     
});

passport.deserializeUser(async(id, done) => {
    try{
        const findUser = await User.findById(id);
        if (!findUser) {
            throw new Error("User not found")
        }
        done(null, findUser)

    }
    catch (err) {
        done(err)

    }
})
passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const findUser = await User.findOne({ username });
        if (!findUser) {
          return done(null, false, { message: 'User not found' });
        }
        if (!(await comparePasswords(password, findUser.password))) {
          return done(null, false, { message: 'Bad credentials' });
        }
        return done(null, findUser);
      } catch (err) {
        return done(err);
      }
    })
  );
  
module.exports = passport;
