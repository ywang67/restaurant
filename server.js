
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var User = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);

//http://localhost:8080/api/users

mongoose.connect('mongodb://localhost:27017/reservation',function(err){
    if(err){
        console.log('Not connected to the database' + err);
    }else{
        console.log('Successfully connected to MongDB')
    }
});

//http://localhost:8080/users
/*app.post('/users', function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if(user.username == null || user.username == "" || user.password == null || user.password == "" ||
        user.email == null || user.email == ""){
        res.send('Ensure username, password and E-mail were provided');
    }else {
        user.save(function(err){
            if(err){
                res.send('User name or password already exists!');
            }else{
                res.send('user created!');
            }
        });
    }
});*/

app.get('*',function (req, res) {
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'))
});

app.listen(port,function () {
    console.log("Running the server on port" + port);
});
