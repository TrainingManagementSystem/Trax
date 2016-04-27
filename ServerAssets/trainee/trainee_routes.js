import ctrl from './trainee_ctrl';

const requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(403).end();
};

export default function( app ){
  app.route('/api/trainees')
     .post(requireAuth, ctrl.newTrainee)
     .get(requireAuth, ctrl.getTrainees);
  app.route('/api/trainee/:id')
     .get(requireAuth, ctrl.getTrainee)
     .put(requireAuth, ctrl.updateTrainee)
     .delete(requireAuth, ctrl.deleteTrainee);
 app.route('/api/trainee/:id/password')
     .put(requireAuth, ctrl.updatePassword);
}
