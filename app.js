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

const users = [
  {
    "name": "John Doe",
    "passport_number": "ABC123456",
    "driver_license_number": "DL123456",
    "pan_number": "ABCDE1234F",
    "govt_id_number": "GOV12345"
  },
  {
    "name": "Jane Smith",
    "passport_number": "XYZ789012",
    "driver_license_number": "DL789012",
    "pan_number": "FGHIJ5678K",
    "govt_id_number": "GOV67890"
  },
  {
    "name": "Michael Johnson",
    "passport_number": "LMN345678",
    "driver_license_number": "DL345678",
    "pan_number": "PQRST1234L",
    "govt_id_number": "GOV23456"
  },
  {
    "name": "Emily Williams",
    "passport_number": "UVW901234",
    "driver_license_number": "DL901234",
    "pan_number": "UVWXY5678M",
    "govt_id_number": "GOV78901"
  },
  {
    "name": "Daniel Lee",
    "passport_number": "OPQ567890",
    "driver_license_number": "DL567890",
    "pan_number": "ZABCD1234N",
    "govt_id_number": "GOV56789"
  },
  {
    "name": "Sarah Kim",
    "passport_number": "EFG123456",
    "driver_license_number": "DL123456",
    "pan_number": "EFGHI5678O",
    "govt_id_number": "GOV12345"
  },
  {
    "name": "William Chen",
    "passport_number": "HIJ789012",
    "driver_license_number": "DL789012",
    "pan_number": "JKLMN5678P",
    "govt_id_number": "GOV67890"
  },
  {
    "name": "Olivia Patel",
    "passport_number": "QRS345678",
    "driver_license_number": "DL345678",
    "pan_number": "QRSTU1234Q",
    "govt_id_number": "GOV23456"
  },
  {
    "name": "James Gupta",
    "passport_number": "VWX901234",
    "driver_license_number": "DL901234",
    "pan_number": "VWXYZ5678R",
    "govt_id_number": "GOV78901"
  },
  {
    "name": "Sophia Rao",
    "passport_number": "YZA567890",
    "driver_license_number": "DL567890",
    "pan_number": "BCDE1234S",
    "govt_id_number": "GOV56789"
  }
]

const buisness = [
  {
    "company_name": "ABC Tech Solutions",
    "date_of_establishment": "2020-03-15",
    "months_since_establishment": 40,
    "company_owner_name": "John Doe"
  },
  {
    "company_name": "Smith & Co. Consulting",
    "date_of_establishment": "2018-09-28",
    "months_since_establishment": 46,
    "company_owner_name": "Jane Smith"
  },
  {
    "company_name": "Johnson Enterprises",
    "date_of_establishment": "2019-05-10",
    "months_since_establishment": 50,
    "company_owner_name": "Michael Johnson"
  },
  {
    "company_name": "Williams Marketing Group",
    "date_of_establishment": "2022-01-05",
    "months_since_establishment": 19,
    "company_owner_name": "Emily Williams"
  },
  {
    "company_name": "Lee Industries",
    "date_of_establishment": "2021-11-20",
    "months_since_establishment": 20,
    "company_owner_name": "Daniel Lee"
  },
  {
    "company_name": "Kim's Creative Solutions",
    "date_of_establishment": "2020-07-01",
    "months_since_establishment": 36,
    "company_owner_name": "Sarah Kim"
  },
  {
    "company_name": "Chen & Sons Construction",
    "date_of_establishment": "2017-04-12",
    "months_since_establishment": 75,
    "company_owner_name": "William Chen"
  },
  {
    "company_name": "Patel Financial Services",
    "date_of_establishment": "2019-11-30",
    "months_since_establishment": 32,
    "company_owner_name": "Olivia Patel"
  },
  {
    "company_name": "Gupta IT Solutions",
    "date_of_establishment": "2021-06-18",
    "months_since_establishment": 25,
    "company_owner_name": "James Gupta"
  },
  {
    "company_name": "Rao's Restaurants",
    "date_of_establishment": "2023-02-10",
    "months_since_establishment": 5,
    "company_owner_name": "Sophia Rao"
  }
]

// Start your server on a specific port (e.g., 3000)
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
})

app.post("/user", async (req, res) => {
  try {
    const {idType, name, id_no} = req.body
    const user = users.find(user => user.name === name)
    if(user){
      if(idType === "passport"){
        if(user.passport_number === id_no){
          res.send({isVerified: true})
        }else{
          res.send({isVerified: false})
        }
      }else if(idType === "driver_license"){
        if(user.driver_license_number === id_no){
          res.send({isVerified: true})
        }else{
          res.send({isVerified: false})
        }
      }else if(idType === "pan"){
        if(user.pan_number === id_no){
          res.send({isVerified: true})
        }else{
          res.send({isVerified: false})
        }
      }else if(idType === "govt_id"){
        if(user.govt_id_number === id_no){
          res.send({isVerified: true})
        }else{
          res.send({isVerified: false})
        }
      }
    }else{
      res.send({isVerified: false})
    }
  } catch (error) {
    res.send()
  }
});

app.post("/verifyBuisness", (req,res) =>{
  const { name,  buisnessName} = req.body;
  const buisnessData = buisness.find(buisness => buisness.company_name === name)

  if(buisnessData){
    if(buisnessData.company_owner_name === buisnessName){
      res.send({isVerified: true})
    }else{
      res.send({isVerified: false})
    }
  }else{
    res.send({isVerified: false})
  }
})

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
