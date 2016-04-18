var mongo = require('mongojs'),
     db = mongo('database', ['data']),
     data = db.collection('data');

var cb = function(res){
  return function(error, response){
    if(error) res.status(500).json(error);
  else res.status(200).json(response);
  };
};

module.exports = {
  postItem: function( req, res ){
    data.save(req.body, cb(res));
  },
  getItems: function( req, res ){
    data.find(req.query, cb(res));
  },
  getItem: function( req, res ){
    data.findOne({ _id: mongo.ObjectId(req.params.id) }, cb(res));
  },
  editItem: function( req, res ){
    data.update({ _id: mongo.ObjectId(req.params.id) }, req.body, cb(res));
  },
  deleteItem: function( req, res ){
    data.remove({ _id: mongo.ObjectId(req.params.id) }, cb(res));
  }
};
