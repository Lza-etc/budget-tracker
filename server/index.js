const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const { loginuser,registeruser,reset, userdetails } = require('./controllers/user.js');
//const { verifyToken } require('./middleware/auth';
const { connect } = require('./config/database.js');
const { addactivity, getactivity } = require('./controllers/activity.js');
const {setbudget,getbudget} = require('./controllers/budget.js');
// const session = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('cookie-session');
const cors = require('cors');

connect();
const app = express();

app.use(cors({origin: 'http://localhost:3000',
methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
credentials: true}));
app.use(express.static(path.resolve(__dirname,'../client/build')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use(session({
  secret: 'sfjsk,akqklqkqkel',
  saveUninitialized: true,
  resave: false,
    cookie: { secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000 ,httpOnly: false,},
  
}))


app.post('/api/login',loginuser);
app.post('/api/register',registeruser);
app.post('/api/reset',reset);
app.get('/api/user',userdetails);
//app.use(verifyToken);
app.post('/api/addactivity',addactivity);
app.get('/api/getactivity',getactivity);
app.post('/api/setbudget',setbudget);
app.get('/api/getbudget',getbudget);

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./build", "index.html"));
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    console.log(`Server listening on ${PORT}`);
    if(err){
      console.log(err);
      return;
    }
});
