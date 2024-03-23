const express = require("express");
const app=express();
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))



app.get('/', function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/", function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const mail = req.body.email;
    // console.log(fname, lname, mail);
    var  data ={
        members: [
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us22.api.mailchimp.com/3.0/lists/e1425e8b85";
    const options ={
        method: "POST",
        auth: "angela1:c003bbc1d4f952cbb2d9883be524780e-us22"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
            
        }
        else{
                res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000,function(){
    console.log("your server is working");
})

// c003bbc1d4f952cbb2d9883be524780e-us22
// e1425e8b85