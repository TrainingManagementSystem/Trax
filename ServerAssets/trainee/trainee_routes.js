var ctrl = require('../controllers/backendControl');

module.exports = function( app ){
  app.route('/api/data')
     .get(ctrl.getItems)
     .post(ctrl.postItem);
  app.route('/api/data/:id')
     .get(ctrl.getItem)
     .put(ctrl.editItem)
     .delete(ctrl.deleteItem);
};
