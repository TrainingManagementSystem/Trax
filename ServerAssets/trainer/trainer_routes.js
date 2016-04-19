import ctrl from './trainer_ctrl';

export default function(app){
  app.route('/api/trainer/login')
      .get(ctrl.checkLogin);
  app.route('/api/trainer/newTrainer')
      .post(ctrl.newTrainer);
  app.route('/api/trainer/getTrainer')
      .get(ctrl.getTrainer);
  app.route('/api/trainer/addTrainee')
      .patch(ctrl.addTrainee);
  app.route('/api/trainer/removeTrainee')
      .patch(ctrl.removeTrainee);
}
