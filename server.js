const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //process.env in our system
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('Unable to get to server.log');
    }
  });
  //res.send(`Hi`);
  //console.log(`${now}:`);

  next();
});
// app.use((req,res,next) => {
//   res.render('maintainance.hbs',{
//     pageTitle:'Maintainance page'
//   });
//   //next();
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle:'Project Page'
  });
});
// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
