const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const Game = mongoose.model('Game');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.publickey = req.body.publickey;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {    
    passport.authenticate('local', (err, user, info) => {            
        if (err) { return res.status(400).json(err); }
        else if (user.publickey != req.body.publickey){
        return res.status(404).json({ status: false, message: 'Invalid Credentials.'  });
        }
        // else if(!User.verifyPassword(password)){
        //     return res.status(404).json({ message: 'Wrong password.' });
        // }
        // else if(!user){
        //     return res.status(404).json({ message: 'Email is not registered.' });
        // }
        else if (user){ return res.status(200).json({ "token": user.generateJwt() });}
        else{ return res.status(404).json(info);}
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => { 
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });               
            }
            else{
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','publickey']) });
            }
        }
    );
}

module.exports.changepassword = (req, res, next) =>{ 
    console.log("changepass"+req.body.email);
User.findOne({"email":req.body.email},function(err,user){
    if (err){
        return res.status(404).json({ status: false, message: 'User record not found.' });               
    }

    else{
        if(!user.verifyPassword(req.body.passwordold)){ 
            console.log("wrong");
            
                return res.status(404).json({ status: false, message: 'User password is wrong.' });     
            }

            else{
                var _user = new User();
                console.log(user.email)
                console.log(req.body.password);
                
                User.findOneAndUpdate({'email':user.email},{$set:{"password":_user.encryptPassword(req.body.password)}},function(errr,userr){
                    if(!userr){
                        return res.status(404).json({ status: false, message: 'User record not found.' }); 
                    }                   
                    else if(userr) {
                        console.log("changed");
                        
                        return res.status(200).json(user);
                    }   
                })
            }
    }
})
}

module.exports.forgotpassword = (req, res, next) =>{
    console.log("in");
    var _user = new User();
    User.findOne({'email':req.body.email},function(err,user){
        if(!user){
            return res.status(404).json({ status: false, message: 'User record not found.' }); 
        }

        else if(user.publickey != req.body.publickey){
            return res.status(404).json({ status: false, message: 'User private key miss match.' }); 
        }          
        else {
            User.findOneAndUpdate({'email':user.email},{$set:{"password":_user.encryptPassword(req.body.password)}},function(errr,userr){
                if(!userr){
                    return res.status(404).json({ status: false, message: 'User record not found.' }); 
                }                  
                else {
                    console.log("success");                    
                    return res.status(200).json(user);
                }   
            })
        }
    })
   
}

module.exports.changepublickey = (req,res,next)=>{
    User.findOneAndUpdate({'email':req.body.email},{$set:{'publickey':req.body.publickey}},function(err,user){
        if(!user){
            return res.status(404).json({ status: false, message: 'User record not found.' }); 
        }

        else if(err){
            return res.status(400).json(err);
        }

        else {
            return res.status(200).json(user);
        }        

    })
}

module.exports.createBet = ( req, res, next )=>{  
    var Teams = new Game();
Game.find(function(errr,games){  
Teams.optionid = games.length+1;
Teams.team1 = req.body.team1;
Teams.team2 = req.body.team2;
Teams.selectTeam = req.body.selectTeam;
Teams.save(function(err,user){
    if (!err){
        console.log(user);
        
        res.send(user);
    }
else {
    if (err.code == 11000)
        res.status(422).send(["Error Occured"]);
    else
        return next(err);
}
})
})
}

module.exports.betDetails = (req, res, next) =>{
    Game.find(function(err,options){
        return res.json(options);
    })
}