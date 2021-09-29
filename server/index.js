const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const { loginuser,registeruser,reset, userdetails } = require('./controllers/user.js');
//const { verifyToken } require('./middleware/auth';
const { connect } = require('./config/database.js');
const { addactivity, getactivity } = require('./controllers/activity.js');
const {setbudget,getbudget} = require('./controllers/budget.js');
const session = require('express-session');

connect();
const app = express();

app.use(express.static(path.resolve(__dirname,'../client/build')))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Methods",
    "Origin,X-Requested-With,Content-Type,Accept,content-type"
  );
  next();
});

app.use(express.json())
app.use(session({
  secret: 'sfjsk,akqklqkqkel',
  saveUninitialized: true,
  resave: true
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    console.log(`Server listening on ${PORT}`);
    if(err){
      console.log(err);
      return;
    }
});
