import ctrl from './trainee_ctrl';

export default function( app ){
  app.route('/api/trainees')
     .post(ctrl.newTrainee)
     .get(ctrl.getTrainees);
  app.route('/api/trainee/:id')
     .get(ctrl.getTrainee)
     .put(ctrl.updateTrainee)
     .delete(ctrl.deleteTrainee);
}
