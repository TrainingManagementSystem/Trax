var app = angular.module('traxApp');
app.controller('addClientModal', function ($scope, $uibModalInstance, LoginService, id) {

  $scope.newTrainee = {};
  $scope.newTrainee.trainer = id;
  $scope.newTrainee.message = 'Thank you for using FlexTrax. To activate your '+
                           'account, please visit us at www.flextrax.com/login.';

  $scope.addNewTrainee = function(){
      console.log("newTrainee: ", $scope.newTrainee);
      LoginService.addNewTrainee($scope.newTrainee).then(function( trainee, firstError ){
        console.log("first.then: ", trainee);
        if(firstError) return console.log("Failed to add trainee, please review and try again...\n", err);
        LoginService.user.trainees.push(trainee.data);
        LoginService.updateTrainer().then(function( trainer, secondError ){
          console.log("second.then: ", trainer);
          $uibModalInstance.close(trainer.data);
        });
      });
  };
});
