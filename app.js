var app = angular.module('chatClient', ['ui.router', 'customValidation']);

app.constant('SERVICE_ENDPOINT', 'http://localhost:3000/api/');

/**
 * Handeling HTTP error
 */

app.config(function($provide, $httpProvider){
    $provide.factory('ErrorInterceptor', function($q){
        return {
            responseError: function(rejection){
                console.log("Error Occurred: ", rejection);
                return $q.reject(rejection);
            }
        }
    });
    
    $httpProvider.interceptors.push('ErrorInterceptor');
});

app.run(function($rootScope, $state, $timeout, UserService){
    
    $rootScope.isLoggedIn = false;
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        
        //console.log("toState.authenticate : ", toState.authenticate);
        //console.log(UserService.isAuthenticated());
        if (toState.authenticate) {
            if(!UserService.isAuthenticated()){
                $state.transitionTo("login");
                event.preventDefault();
            } else {
                $rootScope.isLoggedIn = true;
            }
            
        } 
    });
    
    $rootScope.logout = function(){
        localStorage.removeItem('x-access-token');
        $rootScope.isLoggedIn = false;
        console.log("HI");
        console.log("$rootScope.isLoggedIn: ", $rootScope.isLoggedIn);
        //$state.transitionTo('login');
    }
    
    
    $rootScope.alert = {
        error: false,
        success: false,
        info: false,
        warning: false,
        text: "test"
    }
    // ======= Global Function ======== //
    $rootScope.hideAllAlert = function(){
        //console.log("Alert resetted...");
        $rootScope.alert = {
            error: false,
            success: false,
            info: false,
            warning: false,
            text: ""
        }
    }
    
    $rootScope.showAlert = function(msgData, auto){
        if(msgData.success)
            $rootScope.alert.success = true;
        else
            $rootScope.alert.error = true;
        
        $rootScope.alert.text = msgData.message;
        if((typeof(auto) != "undefined") && (auto == true)){
            $timeout(function(){
                $rootScope.hideAllAlert();
            }, 5000);
        }
    }
    
    //var data = {success: true, message: "This is error message"};
    //$rootScope.showAlert(data, true);
    $rootScope.hideAllAlert();
    
    
});






