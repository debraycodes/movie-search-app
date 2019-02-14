var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
// Must import body-parser module
var bodyParser = require('body-parser');

// Remove '/' from before 'public' as path.join() adds slashes by default
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Missing a closing parenthesis
app.use('/', express.static(path.join(__dirname, 'public')));
// Create middleware function to send favorites.html to browser on request
app.use('/favorites', express.static(path.join(__dirname, 'public', 'favorites.html')));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
  // app.get was missing closing brace and parenthesis
});
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
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});
// app.list should be app.listen
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
