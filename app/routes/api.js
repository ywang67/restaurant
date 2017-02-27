/**
 * Created by Owner on 2017/2/3.
 */
var User = require('../models/user');
var UserRev = require('../models/userRev');
var jwt = require('jsonwebtoken');
var voucher_codes = require('voucher-code-generator');
var secret = 'guhan';

module.exports = function (router) {
    //http://localhost:8080/users
    //user registration route
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (user.username == null || user.username == "" || user.password == null || user.password == "" ||
            user.email == null || user.email == "") {
            res.json({success: false, message: 'Ensure username, password and E-mail were provided'});
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success: false, message: 'User name or password already exists!'});
                } else {
                    res.json({success: true, message: 'user created!'});
                }
            });
        }
    });
    //user login route
    //http://localhost:port/api/authenticate
    router.post('/authenticate', function (req, res) {
        User.findOne({username: req.body.username}).select('email username password').exec(function (err, user) {
            if (err) {
                throw err;
                console.log(err);
            }
            else {
                if (!user) {
                    res.json({success: false, message: 'Could not authenticate user'});
                } else if (user) {
                    if (req.body.password) {
                        var validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({success: false, message: 'Could not authenticate password'});
                        } else {
                          var token =  jwt.sign({username: user.username, email:user.email}, secret, { expiresIn: '1h' });
                            res.json({success: true, message: 'User authenticated', token: token});
                        }
                    } else {
                        res.json({success: false, message: 'No password provided'});
                    }
                }
            }
        });

    });
    router.post('/booking', function(req,res){
        /*res.send('testing booking route');*/
        var userRev = new UserRev();
        userRev.firstname = req.body.firstname;
        userRev.lastname = req.body.lastname;
        userRev.phone = req.body.phone;
        userRev.email = req.body.email;
        userRev.date = req.body.date;
        userRev.time = req.body.time;
        userRev.people = req.body.people;
        var confirmationCode = voucher_codes.generate({length:20 , charset: voucher_codes.charset('alphanumeric')});
        confirmationCode = confirmationCode[0];
        userRev.confirmationCode = confirmationCode;
        if (userRev.firstname == null || userRev.firstname == "" || userRev.lastname == null || userRev.lastname == "" ||
            userRev.phone == null || userRev.phone == ""|| userRev.email == null || userRev.email == ""|| userRev.people == null || userRev.people == ""|| userRev.date == null
            || userRev.date == ""|| userRev.time == null || userRev.time == "") {
            res.json({success: false, message: 'Ensure Full Name, E-mail and reservation Date were provided'});
        } else {
            userRev.save(function () {
                res.json({success:true, message:'Thank you for your Reservation, we are looking forward to see you', confirmationCode:userRev.confirmationCode
                , firstname: userRev.firstname, lastname: userRev.lastname, phone:userRev.phone, email:userRev.email, people:userRev.people,
                date:userRev.date, time:userRev.time});
            })
        }
    });

    router.use(function (req,res,next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            // verify token
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({success:false, message:'Token invalid'});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            res.json({success: false, message: 'No token provided'})
        }
    });

    router.post('/me',function (req,res) {
        res.send(req.decoded);
    });

    router.get('/permission', function (req,res) {
        User.findOne({username:req.decoded.username},function (err,user) {
            if(err) throw err;
            if(!user){
                res.json({success:false, message: 'No user was found !'})
            }else{
                res.json({success:true, permission:user.permission})
            }
        })
    });

    router.get('/allorders', function (req,res) {
        UserRev.find({}, function (err, allorders) {
            if(err) throw err;
            else{
                res.json({success:true, message: 'All orders were found', allorders:allorders})
            }
        })
    });

    router.delete('/cancelorder/:code', function(req,res){
        UserRev.remove({confirmationCode:req.params.code}, function (err) {
            if(err) throw err;
            else{
                res.json({success:true, message:"Successfully canceled the order!"})
            }
        })
    });

    router.get('/editorder/:code', function(req,res){
        /*console.log(req.params.code);*/
        UserRev.findOne({confirmationCode: req.params.code}).select('people date time').exec(function(err, order){
            if(err) throw err;
            else{
                res.json({success: true, message: 'the edit order was found', order: order});

            }
        })
    });

    router.get('/searchorder/:code', function(req,res){
        UserRev.findOne({confirmationCode:req.params.code}, function (err,order) {
            if(err) throw err;
            else{
                res.json({success:true, message:"The customer's order was found", order:order})
            }
        })
    })

    /*router.get('/searchorder/:code', function(req,res){
        UserRev.findOne({confirmationCode: req.body.confirmationCode}).select('firstname lastname phone email date ' +
            'time people confirmationCode').exec(function(err, order){
            if(err) throw err;
            else{
                res.json({success: true, message:"The customer's order was found", order:order})
            }
        })
    })*/
    
    router.put('/updateorder/', function (req,res) {
        //console.log(req.body);
        UserRev.findByIdAndUpdate({_id:req.body._id},
            {
                $set:{
                    people:req.body.people,
                    date: req.body.date,
                    time: req.body.time
                }
            },
            function (err) {
                if(err) {
                    throw err;

                } else {
                    res.json({success:true});
                }
            }
        );


    })

    return router;
}

