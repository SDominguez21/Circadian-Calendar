const express     = require('express');
const router      = express.Router();
const User        = require('../models/User');
const bcrypt      = require('bcryptjs');
const passport    = require('passport');


router.get("/signup", (req, res, next) => {
    console.log("I'm inside get /signup");
    // res.render("../views/user-views/signup"); I DON'T KNOW 
  });

router.post('/signup', (req, res, next) => {
    console.log("calling signup route", req.body);

    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Please fill in missing information' });
      return;
    }
  
    // User.findOne({ username:username }, (err, foundUser) => {

    //     if(err){
    //         res.status(500).json({message: "Username check went bad."});
    //         return;
    //     }

    //     if (foundUser) {
    //         res.status(400).json({ message: 'Username taken. Choose another one.' });
    //         return;
    //     }
        
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const newUser = new User({
            username:username,
            password: hashPass,
        });
        
  
        newUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            req.login(newUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
            

                res.status(200).json({message: 'successfully logged in', newUser});
            });
        });
    });
// });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            console.log('--***********--', req.user);
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

router.get('/getcurrentuser', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.user) {
        let newObject = {};
        // newObject.username = req.user.username;
        // newObject._id = req.user._id;
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;