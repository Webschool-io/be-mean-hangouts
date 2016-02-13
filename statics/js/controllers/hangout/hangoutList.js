angular.module('hangouts.controllers')
  .controller('HangoutListController', ['$scope', '$sce', 'Hangout', function($scope, $sce, Hangout) {
    Hangout.query({}, function(response) {
      $scope.hangouts = response;
      var destaque = response[response.length -1];
      $scope.setDestaque(destaque);
    });

    $scope.setDestaque = function (hangout) {
      hangout.link = configYtLink(hangout.link);
      $scope.destaque = hangout;
    };

    var configYtLink = function (link) {
      if (typeof link == 'object') {
        return link;
      }

      var arrLink = link.split('watch?v=');
      return $sce.trustAsResourceUrl(
        'https://www.youtube.com/embed/' + arrLink[1]
      );
    };
  }]);
