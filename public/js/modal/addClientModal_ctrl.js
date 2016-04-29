var app = angular.module('traxApp');
app.controller('addClientModal', function ($scope, $uibModalInstance, LoginService, id) {

  $scope.newTrainee = {};
  $scope.newTrainee.trainer = id;
  $scope.newTrainee.message = 'Thank you for using FlexTrax. To activate your '+
                           'account, please visit us at www.flextrax.com/login.';

  $scope.addNewTrainee = function(){
      console.log("newTrainee: ", $scope.newTrainee);
      LoginService.addNewTrainee($scope.newTrainee).then(
        function( trainee ){
            console.log("Created trainee, attempting to add to trainer...", trainee);
            LoginService.user.trainees.push(trainee.data);
            LoginService.updateTrainer().then(
              function( trainer ){
                  console.log("Successfully saved to trainer: ", trainer);
                  $uibModalInstance.close(trainer.data);
              },
              function( trainer ){
                  console.log("second.then: ", trainer);
                  alert("Failed to save new client to the trainer");
              }
            );
        },
        function( error ){
            console.log("Failed to create trainee, please review and try again...\n", err);
            alert("Failed to create trainee, please review and try again...");
        }
      );
  };

});
