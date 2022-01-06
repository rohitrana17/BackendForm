const mongoose = require('mongoose');
var express=require("express");
var path = require("path");
var bodyParser=require("body-parser");
const port = process.env.PORT || 3000 ; 


const { link } = require("fs");
mongoose.connect('mongodb://localhost:27017/rohit');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){
	console.log("connection succeeded");
})


var app=express()


console.log(path.join(__dirname)); 

app.use(bodyParser.json());   
app.use(express.static('public'));               
app.use(bodyParser.urlencoded({
	extended: true                         
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('details').insertOne(data,function(err, collection){                
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});             

    
		
	return res.redirect('signup_sucess.html');   
})    


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');    
}).listen(port)                                      


console.log("server listening at port ${port} ");      
