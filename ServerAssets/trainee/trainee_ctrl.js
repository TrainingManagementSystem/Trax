// const mongo = require('mongojs'),
//       db = mongo('database', ['data']),
//       data = db.collection('data');
//
// function cb (error, response) {
//     if(error) res.status(500).json(error);
//     else res.status(200).json(response);
// }
//
// module.exports = {
//   postItem( req, res ){
//     data.save(req.body, cb);
//   },
//   getItems( req, res ){
//     data.find(req.query, cb);
//   },
//   getItem( req, res ){
//     data.findOne({ _id: mongo.ObjectId(req.params.id) }, cb);
//   },
//   editItem( req, res ){
//     data.update({ _id: mongo.ObjectId(req.params.id) }, req.body, cb);
//   },
//   deleteItem( req, res ){
//     data.remove({ _id: mongo.ObjectId(req.params.id) }, cb);
//   }
// };
