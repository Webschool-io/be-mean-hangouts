angular.module('hangouts.services')
    .service('Hangout', ['$resource', function($resource) {
        return $resource('/statics/data.json');
    }]);
