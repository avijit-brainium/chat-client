app.service('UserService', function($http, SERVICE_ENDPOINT){
    
    this.doRegistration = function(userData){
        return $http.post(SERVICE_ENDPOINT + 'register', {
            email: userData.email,
            password: userData.pass,
            first_name: userData.first_name,
            last_name: userData.last_name
        });
    }
    
    this.isDuplicateEmail = function (email) {
        return $http.get(SERVICE_ENDPOINT + 'check-email?email=' + email)
                    .success(function(response){
                        //console.log("response: ", response.success);
                        return response.success;
                    });
        
        
    },

    this.doLogin = function (user){
        return $http.post(SERVICE_ENDPOINT + 'login', {
            email: user.email,
            password: user.pass
        });
    },
    
    this.isAuthenticated = function(){
        var token = localStorage.getItem('x-access-token');
        if(typeof(token) != "undefined" && token != null && token != "")
            return true;
        return false;
    }
});

