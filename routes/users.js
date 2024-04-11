const express = require('express');
const router = express.Router();
const {hashPassword} = require('../helpers/users.js')
const {registerUserValidationSchema} = require('../helpers/validationSchemas.js')
const {validationResult , checkSchema, matchedData} = require('express-validator');
const passport = require('passport')
const User = require('../mongoose/schemas/user.js');
const checkAuth = require('../middlewares/checkAuth.js');


router.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(200).json({ message: 'Login successful' });
});

router.post('/logout', (req,res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  req.logout((err) => {
    if (err) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  })
})

router.post('/register', checkSchema(registerUserValidationSchema), async (req, res, next) => {

  const data =  matchedData(req); 

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  try{
    data.password = await hashPassword(data.password);
    const newUser = new User(data);
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser)
  }
  catch (err){
    if (err.code === 11000) {
      return res.status(422).json({ error: 'Username already exists.'});
    }
    return res.status(500).json({error: "Internal Server error. Please try again"});
  }
});


router.delete('/delete_account', checkAuth, async(req, res, next) => {
  user_id = req.user._id
  try {
    const result = await User.deleteOne({_id: user_id})
    if (!result) {
      res.status(500).json({ error: "User deletion failed." });
  }
    req.logout((err) => {
      if (err) {
        return res.sendStatus(400);
      }
      return res.status(200).json({ message: `User deleted successfully.`});
    })

  }

  catch (err) {
      console.error("Error deleting User:", err);
      res.status(500).json({ error: "Internal Server Error" });
    
  }

})

module.exports = {
  router
}
