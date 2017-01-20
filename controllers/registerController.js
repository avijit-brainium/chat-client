app.controller('registerCtrl', function ($scope, $rootScope, $state, UserService) {
    
    //$rootScope.hideAllAlert();    
    console.log("$rootScope.isLoggedIn: ", $rootScope.isLoggedIn);
    
    // function to submit the form after all validation has occurred			
    $scope.submitRegistrationForm = function () {
        // check to make sure the form is completely valid
        //console.log("$scope.userForm.$valid : ", $scope.userForm.$valid);
        if ($scope.userForm.$valid) {            
            UserService.doRegistration($scope.user)
                    .success(function(response){
                        if(response.success){
                            $state.go('login');                            
                        }
                        console.log("This is my second change - Chnage made locally");
                        $rootScope.showAlert(response, true);
                    });
        }

    };
    
    $scope.submitLoginForm = function(){
        if ($scope.loginForm.$valid) {            
            UserService.doLogin($scope.user)
                    .success(function(response){
                        if(response.success){
                            //console.log(response);
                            localStorage.setItem('x-access-token', response.token);
                            $state.go('about');                            
                        }
                        $rootScope.showAlert(response, true);
                    });
        }
    }
    
});

