import trainee from './trainee/trainee_routes';
import trainer from './trainer/trainer_routes';
export default function (app) {
  trainee(app);
  trainer(app);
}
