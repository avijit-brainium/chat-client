var app = angular.module('chatClient', ['ui.router', 'customValidation']);

app.constant('SERVICE_ENDPOINT', 'http://localhost:3000/api/');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
    
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'registerCtrl',
                authenticate: false
            })
            .state('logout', {
                url: '/logout',
                authenticate: true,
                controller: function($scope, $rootScope, $state){
                    localStorage.removeItem('x-access-token');
                    $rootScope.isLoggedIn = false;
                    $state.transitionTo('login');
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'registerCtrl',
                authenticate: false
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/partial-home.html',
                authenticate: false
            })
            .state('home.list', {
                url: '/list',
                templateUrl: 'views/partial-home-list.html',
                controller: function($scope){
                    $scope.names = ['John', 'Tim', 'Ricky', 'Arnold'];
                },
                authenticate: false
            })
            
            .state('home.paragraph', {
                url: '/paragraph',
                template: 'This is just some sample text...',
                authenticate: false
            })
            
            .state('about', {
                url: '/about',
                views: {
                    // the main template will be placed here (relatively named)
                    '': {
                        templateUrl: 'views/partial-about.html',
                        controller: 'aboutCtrl'
                    },
                    
                    // the child views will be defined here (absolutely named)
                    'columnOne@about': {template: 'I am in Column One under about'},
                    
                    // for column two, we'll define a separate controller 
                    'columnTwo@about': {
                        templateUrl: 'views/table-data.html',
                        controller: 'scotchController'
                    }
                },
                authenticate: true
            });
});

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






