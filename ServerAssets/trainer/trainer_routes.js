import ctrl from './trainer_ctrl';

export default function( app ){
  app.route('/api/trainers')
      .post(ctrl.newTrainer)
      .get(ctrl.getTrainers);
  app.route('/api/trainer/:id')
      .get(ctrl.getTrainer)
      .put(ctrl.updateTrainer)
      .delete(ctrl.deleteTrainer);
}
