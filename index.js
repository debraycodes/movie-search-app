var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
// Make PORT dynamic by giving it a Heroku compatible option
var PORT = 3000 || process.env.PORT;
// Must import body-parser module
var bodyParser = require('body-parser');

// Remove '/' from before 'public' as path.join() adds slashes by default
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Missing a closing parenthesis
app.use('/', express.static(path.join(__dirname, 'public')));
// Create middleware function to send favorites.html to browser on request

app.get('/favorites.html', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.sendFile('/favorites.html');
  // app.get was missing closing brace and parenthesis
});

app.get('/favorites', function(req, res){
  res.redirect('/favorites.html')
})
// Get route was missing '/' prefix and should actually be app.post
// as it accesses the req.body variable
app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
    // if statement was missing closing brace
  };
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  console.log('this is it -> '+JSON.stringify(data));
  fs.writeFileSync('data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.redirect('/favorites.html');
});
// app.list should be app.listen
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
