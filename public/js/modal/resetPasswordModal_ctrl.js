var app = angular.module('traxApp');
app.controller('resetPasswordModal', function ($scope, $uibModalInstance, LoginService) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.newPassword = {};
  $scope.newPassword.passwordOne = '';
  $scope.newPassword.passwordTwo = '';
  $scope.resetPassword = function(){
    var newPassword = {
      password : $scope.newPassword.passwordOne
    };
    if(LoginService.user.trainees){
      LoginService.resetTrainerPassword(newPassword).then(
        function(result){
            console.log("response: ", result);
            LoginService.user.password = result.data.password;
            $scope.cancel();
        },
        function(error){
            console.log("Failed to update Password: ", error);
            alert("Failed to update Password");
        });
    }else{
      LoginService.resetTraineePassword(newPassword).then(
        function(result){
            console.log("response: ", result);
            LoginService.user.password = result.data.password;
            $scope.cancel();
        },
        function(error){
            console.log("Failed to update Password: ", error);
            alert("Failed to update Password");
        });
    }

  };

});
