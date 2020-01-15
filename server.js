var express  = require('express');
var mongojs = require('mongojs');
var db = mongojs("appointmentlist",["appointmentlist"]);
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.get('/appointmentlist', function(req,res){
    console.log("I received a GET request");
    db.appointmentlist.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});
app.get('/appointmentlist/:id',function(req,res){
  var id = req.params.id;
  console.log(id);
  db.appointmentlist.findOne({_id: mongojs.ObjectID(id)},function(err,doc){
    res.json(doc);
  });
});
app.post('/appointmentlist',function(req,res){
  console.log(req.body);
  db.appointmentlist.insert(req.body, function(err,doc){
    res.json(doc);
  });
});
app.delete('/appointmentlist/:id',function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.appointmentlist.remove({_id: mongojs.ObjectID(id)},function(err,doc){
    res.json(doc);
  })
});
app.put('/appointmentlist/:id',function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.appointmentlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, agenda: req.body.agenda, date: req.body.date, time: req.body.time }},
    new: true}, function(err,doc){
      res.json(doc);
    });
});
app.listen(3000);
console.log("server running on port) 3000");
