const express = require("express");
const axios = require("axios");
const moment = require("moment");
const app = express();
const cors = require("cors");
const env = require('dotenv')
const expressfile = require("express-fileupload");
env.config()
app.use(express.json());
app.use(cors());
app.use(expressfile());


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/verify"; // Update with your provided redirect URL

// Start your server on a specific port (e.g., 3000)
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
})

app.post("/user", async (req, res) => {
});

// GitHub will redirect users back to this route after authentication
app.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;
    console.log(code);
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      },
      {
        headers: {
            'Content-Type': 'application/json',
        },
      }
    );

    const s1 = tokenResponse.data
    const s2 = s1.split("&scope")
    const s3 = s2[0].split("=")
    const access_token = s3[1];
    
    const profileResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { created_at} = profileResponse.data;
    const createdAtDate = moment(created_at);
    const currentDate = moment();
    const ageInDays = currentDate.diff(createdAtDate, "days");

    // Check if the user is 180 days old or not
    const isUser180DaysOld = ageInDays >= 180;

    res.send({isVerified : isUser180DaysOld, age: ageInDays});
  } catch (error) {
    console.log(error);
  }
});
