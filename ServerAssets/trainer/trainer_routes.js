var ctrl = require('./trainer_ctrl.js');

module.exports = function(app){
  app.route('/api/teacher/login')
      .get(ctrl.checkLogin);
  app.route('/api/teacher/newTeacher')
      .post(ctrl.newTeacher);
  app.route('/api/teacher/getTeacher')
      .get(ctrl.getTeacher);
  app.route('/api/teacher/addStudent')
      .patch(ctrl.addStudent);
  app.route('/api/teacher/removeStudent')
      .patch(ctrl.removeStudent);
};
