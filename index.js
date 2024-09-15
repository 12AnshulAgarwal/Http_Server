// Import the express module
const express = require("express")
const app = express();
// Define an array 'users' with a user object that contains 'Kidneys' data
const users=[{
    name:"John",
    Kidneys:[{healthy:false}] // 'Kidneys' array with a single kidney object
}];

// Define a GET route for the root URL
app.get("/",function(req,res){
    const johnKidneys=users[0].Kidneys;
    const numberOfKidneys=johnKidneys.length;
    let numberOfHealthyKidneys=0;// Initialize a counter for healthy kidneys
    for(let i=0;i<johnKidneys.length;i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys=numberOfHealthyKidneys+1;
        }
    }
    // Calculate the number of unhealthy kidneys
    const numberOfUnhealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;
    // Send a JSON response with the kidney information
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})
// Middleware to parse incoming JSON data in the request body
app.use(express.json());
// Define a POST route for the root URL
app.post("/",function(req,res){
    // Extract the 'isHealthy' value from the request body (sent by the client)
    const isHealthy=req.body.isHealthy;
    users[0].Kidneys.push({
        healthy:isHealthy
    })
  res.json({
    msg:"Done!"
  })
})

app.put("/",function(req,res){
    for(let i=0;i<users[0].Kidneys.length;i++){
        users[0].Kidneys[i].healthy=true;
    }
          res.json({});
    })
//removing all the unhealthy kidneys
app.delete("/",function(req,res){
    const newKidneys=[];
        for(let i=0;i<users[0].Kidneys.length;i++){
            if(users[0].Kidneys[i].healthy){
                newKidneys.push({
                    healthy:true
                })
            }
        }
        users[0].Kidneys=newKidneys;
        res.json({msg:"done"})
        })
app.listen(3000);