var custom_validation = angular.module('customValidation', []);

custom_validation.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        scope: {
            reference: '=validPasswordC'

        },
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.reference
                ctrl.$setValidity('noMatch', !noMatch);
                return (noMatch) ? noMatch : !noMatch;
            });

            scope.$watch("reference", function (value) {
                ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
            });
        }
    }
});

custom_validation.directive('uniqueEmail', ["UserService", function (UserService) {
  return {
    require:'ngModel',
    restrict:'A',
    link:function (scope, el, attrs, ctrl) {

      //TODO: We need to check that the value is different to the original

      //using push() here to run it as the last parser, after we are sure that other validators were run
      ctrl.$parsers.push(function (viewValue) {

        if (viewValue) {
            console.log("viewValue : ", viewValue);
          UserService.prepTime(viewValue, function(data){
            console.log(data);
            //if (data) {
              ctrl.$setValidity('uniqueEmail', data);
            //} else {
              //ctrl.$setValidity('uniqueEmail', false);
            //}
          });
          return viewValue;
        }
      });
    }
  };
}])