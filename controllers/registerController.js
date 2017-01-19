app.controller('registerCtrl', function ($scope, $rootScope, $state, UserService) {
    
    //$rootScope.hideAllAlert();    
    
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
                        $rootScope.showAlert(response, true);
                    });
        }

    };
    
    $scope.submitLoginForm = function(){
        if ($scope.userForm.$valid) {            
            UserService.doLogin($scope.user)
                    .success(function(response){
                        if(response.success){
                            console.log(response);
                            //$state.go('login');                            
                        }
                        $rootScope.showAlert(response, true);
                    });
        }
    }
    
    /*$scope.test = function(){
        var str = 'file:///storage/emulated/0/Android/data/com.bestoffriend.bof/cache/FB_IMG_1480866589437.jpg?1484289522554';
        var img = str.lastIndexOf('?');
        console.log(img);
        var substr = str.substring(0, img);
        console.log(substr);
    }
    $scope.test();*/
});

