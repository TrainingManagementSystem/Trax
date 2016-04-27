import ctrl from './trainer_ctrl';

const requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(403).end();
};

export default function( app ){
  app.route('/api/trainers')
      .post(ctrl.newTrainer)
      .get(requireAuth, ctrl.getTrainers);
  app.route('/api/trainer/:id')
      .get(requireAuth, ctrl.getTrainer)
      .put(requireAuth, ctrl.updateTrainer)
      .delete(requireAuth, ctrl.deleteTrainer);
  app.route('/api/trainer/:id/password')
      .put(requireAuth, ctrl.updatePassword);
}
