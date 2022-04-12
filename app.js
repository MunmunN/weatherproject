const express=require("express");
const app=express();
// get the data from a link
const https=require('https');

//body parser
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});



// after getting html page and clicking on submitting button I will get all these information
app.post("/",function(req,res){
  var city=req.body.city;
  
  var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=9d06fbac4284f0ad51ceda09fd804da";
  

  
//get method to fetch the data from url
// response will be the data from url
https.get(url,function(response){
  console.log(response.statusCode);//if it is 200 then it is ok  
  
  //extract JSON data
  response.on("data",function(data){
    const weatherdata=JSON.parse(data);
    const temp=weatherdata.main.temp;
    const description=weatherdata.weather[0].description;
    var icon=weatherdata.weather[0].icon;
    const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

    //res.write can have more than one line
    res.write("<h1>Temp of  is "+city+"is"+temp+"</h1>");
    res.write("<p>The weather is currently "+description+"</p>");
res.write("<img src="+imageurl+">")
      res.send();
  });

});

});
app.listen(3000,function(){
  console.log("server is running");
})
