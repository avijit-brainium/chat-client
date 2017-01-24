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