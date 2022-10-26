const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

var path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/bf97d67be5";

    const options = {
        method: "POST",
        auth: "aadamson1:4b6f3b052beee0eb2ae82e316a8ae9bf-us18"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        
        });
    
    });

    request.write(jsonData);
    request.end();

});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000")
})

// API Keys
// 4b6f3b052beee0eb2ae82e316a8ae9bf-us18

// Audience ID for Mailchimp:
// bf97d67be5