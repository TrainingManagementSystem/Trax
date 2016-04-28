var app = angular.module('traxApp');
app.controller('resetPasswordModal', function ($scope, $uibModalInstance, LoginService) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.resetPassword = function(){
    var newPassword = {
      password : $scope.newPassword.passwordOne
    };
    if(LoginService.user.trainees){
      LoginService.resetTrainerPassword(newPassword).then(function(){
        $scope.cancel();
        LoginService.user.password = $scope.newPassword.passwordOne;
      });
    }else{
      LoginService.resetTraineePassword(newPassword).then(function(){
        $scope.cancel();
        LoginService.user.password = $scope.newPassword.passwordOne;
      });
    }

  }

});
